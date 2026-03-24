/// COOKIE Token — 1 Billion Supply, Public Mint on Testnet
///
/// A token for the SuiBotics playground. Each COOKIE costs 1 robot action.
/// Anyone can mint from the public faucet (rate-limited per user per day).
///
/// Supply:     1,000,000,000 COOKIE (1B)
/// Decimals:   0 (whole tokens only)
/// Faucet:     100 per request, 1000 per user per day
#[allow(deprecated_usage)]
module cookie_token::cookie;

use sui::coin::{Self, Coin, TreasuryCap};
use sui::table::{Self, Table};
use sui::clock::Clock;
use sui::event;

// ── Constants ────────────────────────────────────────────────

const MAX_SUPPLY: u64 = 1_000_000_000;
const FAUCET_PER_REQUEST: u64 = 100;
const FAUCET_PER_DAY: u64 = 1_000;
const DAY_MS: u64 = 86_400_000;

// ── Errors ───────────────────────────────────────────────────

const ESupplyExceeded: u64 = 0;
const EAmountTooLarge: u64 = 1;
const EDailyLimitReached: u64 = 2;
const EAmountZero: u64 = 3;

// ── OTW ──────────────────────────────────────────────────────

public struct COOKIE has drop {}

// ── Faucet (shared object) ───────────────────────────────────

public struct CookieFaucet has key {
    id: UID,
    treasury_cap: TreasuryCap<COOKIE>,
    max_supply: u64,
    per_request: u64,
    per_day: u64,
    records: Table<address, MintRecord>,
}

public struct MintRecord has store, drop {
    amount_today: u64,
    day_start: u64,
}

// ── Events ───────────────────────────────────────────────────

public struct FaucetCreated has copy, drop {
    faucet_id: address,
    max_supply: u64,
}

public struct TokensMinted has copy, drop {
    recipient: address,
    amount: u64,
    total_supply: u64,
}

// ── Init ─────────────────────────────────────────────────────

fun init(otw: COOKIE, ctx: &mut TxContext) {
    let (treasury_cap, metadata) = coin::create_currency(
        otw,
        0,
        b"COOKIE",
        b"SuiBotics Cookie",
        b"Robot action token for the SuiBotics playground. 1 COOKIE = 1 robot action. 1B max supply, public faucet on testnet.",
        option::none(),
        ctx,
    );

    transfer::public_freeze_object(metadata);

    let faucet = CookieFaucet {
        id: object::new(ctx),
        treasury_cap,
        max_supply: MAX_SUPPLY,
        per_request: FAUCET_PER_REQUEST,
        per_day: FAUCET_PER_DAY,
        records: table::new(ctx),
    };

    event::emit(FaucetCreated {
        faucet_id: object::id_address(&faucet),
        max_supply: MAX_SUPPLY,
    });

    transfer::share_object(faucet);
}

// ── Public mint (faucet) ─────────────────────────────────────

/// Anyone can call this to mint COOKIE tokens.
/// Rate-limited: max 100 per request, 1000 per user per day.
public fun mint(
    faucet: &mut CookieFaucet,
    amount: u64,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    assert!(amount > 0, EAmountZero);
    assert!(amount <= faucet.per_request, EAmountTooLarge);

    let current_supply = faucet.treasury_cap.total_supply();
    assert!(current_supply + amount <= faucet.max_supply, ESupplyExceeded);

    let sender = ctx.sender();
    let now = clock.timestamp_ms();

    // Check / reset daily limit
    if (faucet.records.contains(sender)) {
        let record = &mut faucet.records[sender];
        if (now - record.day_start >= DAY_MS) {
            record.amount_today = 0;
            record.day_start = now;
        };
        assert!(record.amount_today + amount <= faucet.per_day, EDailyLimitReached);
        record.amount_today = record.amount_today + amount;
    } else {
        faucet.records.add(sender, MintRecord {
            amount_today: amount,
            day_start: now,
        });
    };

    faucet.treasury_cap.mint_and_transfer(amount, sender, ctx);

    event::emit(TokensMinted {
        recipient: sender,
        amount,
        total_supply: faucet.treasury_cap.total_supply(),
    });
}

// ── Burn ─────────────────────────────────────────────────────

/// Anyone can burn their own COOKIE tokens.
public fun burn(
    faucet: &mut CookieFaucet,
    coin: Coin<COOKIE>,
) {
    faucet.treasury_cap.burn(coin);
}

// ── View functions ───────────────────────────────────────────

public fun total_supply(faucet: &CookieFaucet): u64 {
    faucet.treasury_cap.total_supply()
}

public fun max_supply(faucet: &CookieFaucet): u64 {
    faucet.max_supply
}

public fun remaining_supply(faucet: &CookieFaucet): u64 {
    faucet.max_supply - faucet.treasury_cap.total_supply()
}

public fun per_request_limit(faucet: &CookieFaucet): u64 {
    faucet.per_request
}

public fun per_day_limit(faucet: &CookieFaucet): u64 {
    faucet.per_day
}
