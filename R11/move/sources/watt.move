/// # WATT Coin
///
/// Reward and settlement token for the R11 module.
#[allow(deprecated_usage)]
module depin_energy_monitor::watt;

use sui::clock::Clock;
use sui::coin::{Self, Coin, TreasuryCap};
use sui::event;
use sui::table::{Self, Table};

/// Reward mint for a single reading is too large.
const ERewardTooLarge: u64 = 0;
/// Faucet/demo request exceeds the daily limit.
const EExceedsDemoLimit: u64 = 1;
/// Faucet/demo request exceeds the per-request limit.
const EExceedsRequestLimit: u64 = 2;

const MAX_REWARD_PER_READING: u64 = 100;
const MAX_DEMO_PER_REQUEST: u64 = 25;
const MAX_DEMO_PER_DAY: u64 = 50;
const DAY_IN_MS: u64 = 86_400_000;

public struct WATT has drop {}

public struct UserMintRecord has store, drop {
    amount_today: u64,
    day_start: u64,
}

public struct RewardVault has key {
    id: UID,
    treasury_cap: TreasuryCap<WATT>,
    demo_records: Table<address, UserMintRecord>,
    max_reward_per_reading: u64,
}

public struct WattMinted has copy, drop {
    recipient: address,
    amount: u64,
    reason: vector<u8>,
}

fun init(otw: WATT, ctx: &mut TxContext) {
    let (treasury_cap, metadata) = coin::create_currency(
        otw,
        0,
        b"WATT",
        b"Energy Reward Coin",
        b"Reward and settlement token for the R11 energy monitor module.",
        option::none(),
        ctx,
    );

    transfer::public_freeze_object(metadata);

    let vault = RewardVault {
        id: object::new(ctx),
        treasury_cap,
        demo_records: table::new(ctx),
        max_reward_per_reading: MAX_REWARD_PER_READING,
    };

    transfer::share_object(vault);
}

public fun reward_for_verified_kwh(
    vault: &mut RewardVault,
    recipient: address,
    kwh_milli_delta: u64,
    ctx: &mut TxContext,
) {
    let amount = kwh_milli_delta / 1000;
    assert!(amount <= vault.max_reward_per_reading, ERewardTooLarge);

    if (amount == 0) {
        return
    };

    vault.treasury_cap.mint_and_transfer(amount, recipient, ctx);
    event::emit(WattMinted {
        recipient,
        amount,
        reason: b"verified_kwh",
    });
}

public fun request_demo_tokens(
    vault: &mut RewardVault,
    amount: u64,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    assert!(amount > 0 && amount <= MAX_DEMO_PER_REQUEST, EExceedsRequestLimit);

    let sender = ctx.sender();
    let current_day = clock.timestamp_ms() / DAY_IN_MS;

    if (!vault.demo_records.contains(sender)) {
        vault.demo_records.add(
            sender,
            UserMintRecord {
                amount_today: 0,
                day_start: current_day,
            },
        );
    };

    let record = vault.demo_records.borrow_mut(sender);
    if (record.day_start != current_day) {
        record.amount_today = 0;
        record.day_start = current_day;
    };

    assert!(record.amount_today + amount <= MAX_DEMO_PER_DAY, EExceedsDemoLimit);
    record.amount_today = record.amount_today + amount;

    vault.treasury_cap.mint_and_transfer(amount, sender, ctx);
    event::emit(WattMinted {
        recipient: sender,
        amount,
        reason: b"demo_faucet",
    });
}

public fun burn_for_settlement(vault: &mut RewardVault, payment: Coin<WATT>) {
    vault.treasury_cap.burn(payment);
}

public fun total_supply(vault: &RewardVault): u64 {
    vault.treasury_cap.total_supply()
}

public fun max_reward_per_reading(vault: &RewardVault): u64 {
    vault.max_reward_per_reading
}

public fun remaining_daily_allowance(
    vault: &RewardVault,
    user: address,
    clock: &Clock,
): u64 {
    let current_day = clock.timestamp_ms() / DAY_IN_MS;

    if (!vault.demo_records.contains(user)) {
        return MAX_DEMO_PER_DAY
    };

    let record = vault.demo_records.borrow(user);
    if (record.day_start != current_day) {
        return MAX_DEMO_PER_DAY
    };

    if (record.amount_today >= MAX_DEMO_PER_DAY) {
        return 0
    };

    MAX_DEMO_PER_DAY - record.amount_today
}

#[test_only]
public fun init_for_testing(ctx: &mut TxContext) {
    init(WATT {}, ctx);
}
