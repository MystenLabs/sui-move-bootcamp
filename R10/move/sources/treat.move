/// # TREAT Token - Payment for Robot Rentals
///
/// A simple token used to pay for robot rental time.
/// 1 TREAT = 1 minute of robot rental time.
///
/// ## What This Module Teaches
/// - Creating a custom token with One-Time Witness (OTW)
/// - Rate-limited faucet to prevent abuse
/// - TreasuryCap for controlled minting
/// - Table for per-user tracking
///
/// ## Key Concepts
///
/// ### Rate Limiting with Table
/// We use a Table to track how many tokens each user has requested.
/// This prevents spam and ensures fair distribution.
///
/// ### Faucet Pattern
/// Anyone can request tokens from the faucet, but with limits:
/// - Maximum 10 TREAT per request
/// - Maximum 100 TREAT per day per user
// coin::create_currency is deprecated in favor of coin::create_currency_with_metadata_cap,
// which returns an unfreezable CoinMetadata capability. We use the deprecated version here
// for simplicity since we freeze metadata immediately and don't need mutation control.
#[allow(deprecated_usage)]
module robot_rental_platform::treat;

use sui::clock::Clock;
use sui::coin::{Self, TreasuryCap};
use sui::table::{Self, Table};

// ============================================
// CONSTANTS
// ============================================

/// Maximum tokens per faucet request
const MAX_PER_REQUEST: u64 = 10;

/// Maximum tokens per user per day
const MAX_PER_DAY: u64 = 100;

/// One day in milliseconds
const DAY_IN_MS: u64 = 86_400_000;

// ============================================
// ERROR CODES
// ============================================

/// Requested more than allowed per request
const EExceedsRequestLimit: u64 = 0;

/// Exceeded daily limit
const EExceedsDailyLimit: u64 = 1;

// ============================================
// ONE-TIME WITNESS
// ============================================

/// The One-Time Witness for TREAT token.
/// MUST be the module name in UPPERCASE.
public struct TREAT has drop {}

// ============================================
// DATA STRUCTURES
// ============================================

/// Per-user faucet tracking
public struct UserMintRecord has drop, store {
    /// Total minted today
    amount_today: u64,
    /// Day start timestamp (midnight)
    day_start: u64,
}

/// Shared faucet object
public struct Faucet has key {
    id: UID,
    /// Capability to mint tokens
    treasury_cap: TreasuryCap<TREAT>,
    /// Per-user mint tracking
    user_records: Table<address, UserMintRecord>,
}

// ============================================
// EVENTS
// ============================================

/// Emitted when tokens are minted from faucet
public struct TokensMinted has copy, drop {
    recipient: address,
    amount: u64,
    new_daily_total: u64,
}

// ============================================
// INITIALIZATION
// ============================================

/// Module initialization - creates TREAT token and faucet.
fun init(otw: TREAT, ctx: &mut TxContext) {
    let (treasury_cap, metadata) = coin::create_currency(
        otw,
        0, // 0 decimals - whole tokens only
        b"TREAT",
        b"Robot Treat",
        b"Tokens for renting robot time. 1 TREAT = 1 minute of rental.",
        option::none(),
        ctx,
    );

    // Freeze metadata
    transfer::public_freeze_object(metadata);

    // Create and share faucet
    let faucet = Faucet {
        id: object::new(ctx),
        treasury_cap,
        user_records: table::new(ctx),
    };

    transfer::share_object(faucet);
}

// ============================================
// FAUCET FUNCTIONS
// ============================================

/// Request TREAT tokens from the faucet.
///
/// Rate limited to prevent abuse:
/// - Max 10 per request
/// - Max 100 per day
///
/// ## Parameters
/// - `faucet`: The shared faucet object
/// - `amount`: How many tokens to request (1-10)
/// - `clock`: Sui system clock for day tracking
/// - `ctx`: Transaction context
public fun request_tokens(faucet: &mut Faucet, amount: u64, clock: &Clock, ctx: &mut TxContext) {
    // Validate request amount
    assert!(amount > 0 && amount <= MAX_PER_REQUEST, EExceedsRequestLimit);

    let sender = ctx.sender();
    let current_time = clock.timestamp_ms();
    let current_day = current_time / DAY_IN_MS;

    // Get or create user record
    if (!faucet.user_records.contains(sender)) {
        faucet
            .user_records
            .add(
                sender,
                UserMintRecord {
                    amount_today: 0,
                    day_start: current_day,
                },
            );
    };

    let record = faucet.user_records.borrow_mut(sender);

    // Reset if new day
    if (record.day_start != current_day) {
        record.amount_today = 0;
        record.day_start = current_day;
    };

    // Check daily limit
    assert!(record.amount_today + amount <= MAX_PER_DAY, EExceedsDailyLimit);

    // Update record
    record.amount_today = record.amount_today + amount;
    let new_total = record.amount_today;

    // Mint and transfer
    faucet.treasury_cap.mint_and_transfer(amount, sender, ctx);

    // Emit event
    sui::event::emit(TokensMinted {
        recipient: sender,
        amount,
        new_daily_total: new_total,
    });
}

// ============================================
// VIEW FUNCTIONS
// ============================================

/// Get total supply of TREAT tokens
public fun total_supply(faucet: &Faucet): u64 {
    faucet.treasury_cap.total_supply()
}

/// Get remaining daily allowance for a user
public fun remaining_daily_allowance(faucet: &Faucet, user: address, clock: &Clock): u64 {
    let current_day = clock.timestamp_ms() / DAY_IN_MS;

    if (!faucet.user_records.contains(user)) {
        return MAX_PER_DAY
    };

    let record = faucet.user_records.borrow(user);

    if (record.day_start != current_day) {
        return MAX_PER_DAY
    };

    if (record.amount_today >= MAX_PER_DAY) {
        return 0
    };

    MAX_PER_DAY - record.amount_today
}

/// Get max tokens per request
public fun max_per_request(): u64 {
    MAX_PER_REQUEST
}

/// Get max tokens per day
public fun max_per_day(): u64 {
    MAX_PER_DAY
}

// ============================================
// TEST HELPERS
// ============================================

#[test_only]
/// Initialize the module for testing.
/// This is needed because init() is called automatically during deployment
/// but must be called manually in tests.
public fun init_for_testing(ctx: &mut TxContext) {
    init(TREAT {}, ctx);
}
