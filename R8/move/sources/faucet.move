/// # Faucet - Get Free COOKIEs!
///
/// A rate-limited token faucet that gives away free COOKIE tokens.
/// Like a water fountain, but for robot treats!
///
/// ## What This Module Teaches
/// - Using the Sui Clock for time-based logic
/// - Table storage for per-address tracking
/// - Rate limiting patterns
/// - Cross-module function calls
///
/// ## Key Concepts
///
/// ### The Clock Object
/// Sui provides a system Clock object (always at address 0x6).
/// It gives us the current timestamp in milliseconds.
/// We use it to track when users last requested tokens.
///
/// ### Tables
/// Tables are key-value stores that can grow indefinitely.
/// Unlike vectors, they don't load all data at once.
/// Perfect for tracking per-user state.
///
/// ### Rate Limiting
/// We track each user's minting history:
/// - How many tokens they've received today
/// - When they last made a request
/// Every 24 hours, their allowance resets.
module robot_tokenomics::faucet;

use robot_tokenomics::cookie::{Self, MintCap};
use sui::clock::Clock;
use sui::table::{Self, Table};

// ============================================
// CONSTANTS
// ============================================

/// Tokens given per faucet request
/// We give 10 at a time - enough to try several robot actions
const FAUCET_AMOUNT: u64 = 10;

/// Maximum tokens per address per day
/// Prevents hoarding while allowing experimentation
const MAX_DAILY_PER_ADDRESS: u64 = 100;

/// Duration of one day in milliseconds
/// 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
const DAY_IN_MS: u64 = 86_400_000;

// ============================================
// ERROR CODES
// ============================================

// Note: Rate limit errors are handled gracefully by returning 0 allowed amount
// rather than aborting, so no error codes are needed.

// ============================================
// DATA STRUCTURES
// ============================================

/// Tracks a user's minting history for rate limiting.
///
/// We store this in a Table, keyed by address.
/// Each user gets their own MintRecord.
public struct MintRecord has drop, store {
    /// How many tokens they've received in the current day
    amount_today: u64,
    /// Timestamp of their last request (for day boundary detection)
    last_request_time: u64,
}

/// The faucet manager - shared object that controls rate limiting.
///
/// Separate from MintCap because:
/// 1. Different concerns (rate limiting vs minting capability)
/// 2. Can be upgraded independently
/// 3. Cleaner code organization
public struct FaucetManager has key {
    id: UID,
    /// Tracks each user's minting history
    /// Key: user address, Value: their MintRecord
    records: Table<address, MintRecord>,
    /// Total tokens distributed through this faucet
    total_distributed: u64,
}

// ============================================
// INITIALIZATION
// ============================================

/// Create the FaucetManager when the module is published.
///
/// We share it so anyone can use the faucet.
fun init(ctx: &mut TxContext) {
    let faucet_manager = FaucetManager {
        id: object::new(ctx),
        records: table::new(ctx),
        total_distributed: 0,
    };

    transfer::share_object(faucet_manager);
}

// ============================================
// PUBLIC FUNCTIONS
// ============================================

/// Request COOKIE tokens from the faucet.
///
/// Anyone can call this, but rate limits apply:
/// - 10 tokens per request
/// - Maximum 100 tokens per day per address
/// - Daily limit resets every 24 hours
///
/// ## Parameters
/// - `faucet`: The shared FaucetManager
/// - `mint_cap`: The shared MintCap from cookie module
/// - `clock`: The Sui system Clock (always at 0x6)
/// - `ctx`: Transaction context
///
/// ## Example Usage (TypeScript)
/// ```typescript
/// const tx = new Transaction();
/// tx.moveCall({
///     target: `${PACKAGE_ID}::faucet::request`,
///     arguments: [
///         tx.object(FAUCET_MANAGER_ID),
///         tx.object(MINT_CAP_ID),
///         tx.object('0x6'),  // Clock is always at this address
///     ],
/// });
/// ```
public fun request(
    faucet: &mut FaucetManager,
    mint_cap: &mut MintCap,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    let sender = ctx.sender();
    let current_time = clock.timestamp_ms();

    // Check and update rate limit
    let allowed_amount = check_and_update_limit(faucet, sender, current_time, FAUCET_AMOUNT);

    // Only mint if we have allowance
    if (allowed_amount > 0) {
        cookie::mint(mint_cap, allowed_amount, sender, ctx);
        faucet.total_distributed = faucet.total_distributed + allowed_amount;
    };
}

/// Request a specific amount of tokens (up to remaining daily allowance).
///
/// Use this when you want more control over how many tokens to receive.
/// The actual amount will be capped at your remaining daily allowance.
public fun request_amount(
    faucet: &mut FaucetManager,
    mint_cap: &mut MintCap,
    amount: u64,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    let sender = ctx.sender();
    let current_time = clock.timestamp_ms();

    let allowed_amount = check_and_update_limit(faucet, sender, current_time, amount);

    if (allowed_amount > 0) {
        cookie::mint(mint_cap, allowed_amount, sender, ctx);
        faucet.total_distributed = faucet.total_distributed + allowed_amount;
    };
}

// ============================================
// INTERNAL FUNCTIONS
// ============================================

/// Check rate limit and update tracking. Returns the allowed mint amount.
///
/// This is the core rate limiting logic:
/// 1. If user has no record, they get full allowance
/// 2. If 24 hours have passed, reset their counter
/// 3. Otherwise, check remaining daily allowance
fun check_and_update_limit(
    faucet: &mut FaucetManager,
    user: address,
    current_time: u64,
    requested_amount: u64,
): u64 {
    if (faucet.records.contains(user)) {
        // User has a record - check if day has reset
        let record = faucet.records.borrow_mut(user);

        // Has a new day started? (24 hours since last request)
        if (current_time - record.last_request_time >= DAY_IN_MS) {
            // Reset daily counter
            record.amount_today = 0;
        };

        // Calculate remaining allowance
        let remaining = MAX_DAILY_PER_ADDRESS - record.amount_today;

        // Can't exceed remaining allowance
        let allowed = if (requested_amount > remaining) { remaining } else { requested_amount };

        // Update record
        record.amount_today = record.amount_today + allowed;
        record.last_request_time = current_time;

        allowed
    } else {
        // First time user - create new record
        let allowed = if (requested_amount > MAX_DAILY_PER_ADDRESS) {
            MAX_DAILY_PER_ADDRESS
        } else {
            requested_amount
        };

        let record = MintRecord {
            amount_today: allowed,
            last_request_time: current_time,
        };

        faucet.records.add(user, record);

        allowed
    }
}

// ============================================
// VIEW FUNCTIONS
// ============================================

/// Get the remaining daily allowance for an address.
///
/// Returns MAX_DAILY_PER_ADDRESS if:
/// - User has never used the faucet
/// - 24 hours have passed since their last request
public fun remaining_allowance(faucet: &FaucetManager, user: address, clock: &Clock): u64 {
    let current_time = clock.timestamp_ms();

    if (faucet.records.contains(user)) {
        let record = faucet.records.borrow(user);

        // Check if day has reset
        if (current_time - record.last_request_time >= DAY_IN_MS) {
            MAX_DAILY_PER_ADDRESS
        } else {
            MAX_DAILY_PER_ADDRESS - record.amount_today
        }
    } else {
        // New user gets full allowance
        MAX_DAILY_PER_ADDRESS
    }
}

/// Get total tokens distributed through this faucet.
public fun total_distributed(faucet: &FaucetManager): u64 {
    faucet.total_distributed
}

/// Get the standard faucet amount.
public fun faucet_amount(): u64 {
    FAUCET_AMOUNT
}

/// Get the maximum daily allowance.
public fun max_daily_allowance(): u64 {
    MAX_DAILY_PER_ADDRESS
}

// ============================================
// TEST HELPERS
// ============================================

#[test_only]
/// Test helper to initialize the module in tests
public fun init_for_testing(ctx: &mut TxContext) {
    init(ctx);
}
