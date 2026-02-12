module publisher::hot_potato;

use std::string::String;
use sui::balance::{Self, Balance};
use sui::coin::{Self, Coin};
use sui::sui::SUI;

const MIN_PAYMENT: u64 = 1_000_000;

// Error: Insufficient payment
const EInvalidPayment: u64 = 100;

public struct HotPotato {
    payment_approved: bool,
}

public struct ContractBalance has key {
    id: UID,
    balance: Balance<SUI>,
}

public struct Hero has key {
    id: UID,
    name: String,
}

#[allow(unused_mut_parameter, unused_variable)]
fun init(ctx: &mut TxContext) {
    let contract_balance = ContractBalance {
        id: object::new(ctx),
        balance: balance::zero(),
    };

    transfer::share_object(contract_balance);
}

public fun borrow_potato(): HotPotato {
    HotPotato { payment_approved: false }
}

public fun process_payment(
    hot_potato: &mut HotPotato,
    contract_balance: &mut ContractBalance,
    payment: Coin<SUI>,
) {
    if (payment.value() >= MIN_PAYMENT) {
        hot_potato.payment_approved = true;
    };

    contract_balance.balance.join(payment.into_balance());
}

public fun mint_hero(hot_potato: HotPotato, ctx: &mut TxContext): Hero {
    let HotPotato { payment_approved } = hot_potato;
    assert!(payment_approved, EInvalidPayment);

    Hero {
        id: object::new(ctx),
        name: b"Hero".to_string(),
    }
}

#[test_only]
const ADMIN: address = @0x1;
#[test_only]
const USER: address = @0x2;
#[test_only]
use sui::test_scenario as ts;
#[test_only]
use sui::test_utils;

// Test with sufficient payment - PASSES
#[test]
fun test_hot_potato_success() {
    let mut scenario = ts::begin(ADMIN);

    // Initialize the contract
    init(scenario.ctx());
    scenario.next_tx(USER);

    // Take the shared ContractBalance
    let mut contract_balance = scenario.take_shared<ContractBalance>();

    // 1. Borrow the hot potato
    let mut potato = borrow_potato();

    // 2. Process payment (payment >= MIN_PAYMENT = 1_000_000)
    let payment = coin::mint_for_testing<SUI>(2_000_000, scenario.ctx());
    process_payment(&mut potato, &mut contract_balance, payment);

    // 3. Mint hero (this consumes the potato - hot potato pattern!)
    let hero = mint_hero(potato, scenario.ctx());

    // Verify that the hero was created
    test_utils::destroy(hero);

    ts::return_shared(contract_balance);
    scenario.end();
}

// Test with insufficient payment - FAILS with abort
#[test, expected_failure(abort_code = EInvalidPayment)]
fun test_hot_potato_insufficient_payment() {
    let mut scenario = ts::begin(ADMIN);

    // Initialize the contract
    init(scenario.ctx());
    scenario.next_tx(USER);

    // Take the shared ContractBalance
    let mut contract_balance = scenario.take_shared<ContractBalance>();

    // 1. Borrow the hot potato
    let mut potato = borrow_potato();

    // 2. Process payment (payment < MIN_PAYMENT = 1_000_000)
    let payment = coin::mint_for_testing<SUI>(500_000, scenario.ctx());
    process_payment(&mut potato, &mut contract_balance, payment);

    // 3. Try to mint hero - MUST FAIL because payment is insufficient
    let _hero = mint_hero(potato, scenario.ctx());

    // dummy abort to avoid warning, this line will never be reached
    abort 111
}

// Test with no payment - ABORTS
#[test, expected_failure(abort_code = EInvalidPayment)]
fun test_hot_potato_no_payment() {
    let mut scenario = ts::begin(ADMIN);

    // Initialize the contract
    init(scenario.ctx());
    scenario.next_tx(USER);

    // 1. Borrow the hot potato
    let potato = borrow_potato();

    // 2. Try to mint hero - MUST ABORT because no payment was made
    let _hero = mint_hero(potato, scenario.ctx());

    // dummy abort to avoid warning, this line will never be reached
    abort 111
}
