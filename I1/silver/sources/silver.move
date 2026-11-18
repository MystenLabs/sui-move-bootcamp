/// Module: silver
module silver::silver;

use std::string::String;
use sui::coin::{Self, TreasuryCap, Coin};
use sui::coin_registry::{Self, CoinRegistry, Currency, MetadataCap};
use sui::transfer::Receiving;

/// One-time witness for this module. `init` receives the only instance.
public struct SILVER() has drop;

const DECIMALS: u8 = 9;
const NAME: vector<u8> = b"Silver";
const SYMBOL: vector<u8> = b"SILVER";
const DESCRIPTION: vector<u8> = b"Silver, commonly used by heroes to purchase necessary adventure equipment";
const ICON_URL: vector<u8> = b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/cWTbHE-yC4z3JLmEYWDXM6uhQ1nxu-R0GOLReRwQcH4";

/// Creates `SILVER` on publish.
///
/// `coin::create_currency` is deprecated and must not be used. The witness is
/// consumed by `coin_registry::new_currency_with_otw`, which is what proves
/// this currency can be created only once.
///
/// `finalize` sends `Currency<SILVER>` to the coin registry address and returns
/// the `MetadataCap`. The currency is not usable until `finalize_registration`.
fun init(otw: SILVER, ctx: &mut TxContext) {
    let (initializer, treasury_cap) = coin_registry::new_currency_with_otw(
        otw,
        DECIMALS,
        SYMBOL.to_string(),
        NAME.to_string(),
        DESCRIPTION.to_string(),
        ICON_URL.to_string(),
        ctx,
    );
    let metadata_cap = initializer.finalize(ctx);
    transfer::public_transfer(treasury_cap, ctx.sender());
    transfer::public_transfer(metadata_cap, ctx.sender());
}

/// Promotes the `Currency<SILVER>` created in `init` into a shared registry object.
/// Anyone can call this. Metadata updates are impossible before it runs.
public fun finalize_registration(
    registry: &mut CoinRegistry,
    currency: Receiving<Currency<SILVER>>,
    ctx: &mut TxContext,
) {
    coin_registry::finalize_registration(registry, currency, ctx);
}

/// Mints `amount` of `SILVER` and sends the coin to `recipient`.
/// Only the holder of `TreasuryCap<SILVER>` can mint.
public fun mint(
    cap: &mut TreasuryCap<SILVER>,
    amount: u64,
    recipient: address,
    ctx: &mut TxContext,
) {
    let coin = coin::mint(cap, amount, ctx);
    transfer::public_transfer(coin, recipient);
}

/// Burns `coin` and returns how much the total supply decreased.
/// Only the holder of `TreasuryCap<SILVER>` can burn.
public fun burn(cap: &mut TreasuryCap<SILVER>, coin: Coin<SILVER>): u64 {
    coin::burn(cap, coin)
}

/// Replaces the description on the registered currency.
/// Requires the `MetadataCap` from `init`, and a currency that has been registered.
public fun update_description(
    currency: &mut Currency<SILVER>,
    cap: &MetadataCap<SILVER>,
    description: String,
) {
    coin_registry::set_description(currency, cap, description);
}

/// Destroys the `MetadataCap`. Further description, name, and icon updates abort.
/// This cannot be undone, and the cap cannot be claimed again.
public fun delete_metadata_cap(currency: &mut Currency<SILVER>, cap: MetadataCap<SILVER>) {
    coin_registry::delete_metadata_cap(currency, cap);
}

#[test_only]
use std::unit_test::assert_eq;
#[test_only]
use sui::object;
#[test_only]
use sui::test_scenario;
#[test_only]
use sui::test_utils::create_one_time_witness;

/// `init` transfers `Currency<SILVER>` to the coin registry address `0xc`.
/// The receiving ticket has to name that object, not the test registry's fresh id.
#[test_only]
const COIN_REGISTRY_ADDRESS: address = @0xc;

#[test]
fun mint_sends_coin_and_increases_supply() {
    let publisher = @0xA;
    let recipient = @0xB;
    let mut scenario = test_scenario::begin(publisher);
    init(create_one_time_witness<SILVER>(), scenario.ctx());

    scenario.next_tx(publisher);
    {
        let mut cap = scenario.take_from_sender<TreasuryCap<SILVER>>();
        let metadata_cap = scenario.take_from_sender<MetadataCap<SILVER>>();
        mint(&mut cap, 1_000, recipient, scenario.ctx());
        assert_eq!(cap.total_supply(), 1_000);
        scenario.return_to_sender(cap);
        scenario.return_to_sender(metadata_cap);
    };

    scenario.next_tx(recipient);
    {
        let coin = scenario.take_from_sender<Coin<SILVER>>();
        assert_eq!(coin.value(), 1_000);
        scenario.return_to_sender(coin);
    };
    scenario.end();
}

#[test]
fun burn_returns_amount_and_decreases_supply() {
    let publisher = @0xA;
    let mut scenario = test_scenario::begin(publisher);
    init(create_one_time_witness<SILVER>(), scenario.ctx());

    scenario.next_tx(publisher);
    {
        let mut cap = scenario.take_from_sender<TreasuryCap<SILVER>>();
        let metadata_cap = scenario.take_from_sender<MetadataCap<SILVER>>();
        mint(&mut cap, 1_000, publisher, scenario.ctx());
        scenario.return_to_sender(cap);
        scenario.return_to_sender(metadata_cap);
    };

    scenario.next_tx(publisher);
    {
        let mut cap = scenario.take_from_sender<TreasuryCap<SILVER>>();
        let metadata_cap = scenario.take_from_sender<MetadataCap<SILVER>>();
        let coin = scenario.take_from_sender<Coin<SILVER>>();
        let burned = burn(&mut cap, coin);
        assert_eq!(burned, 1_000);
        assert_eq!(cap.total_supply(), 0);
        scenario.return_to_sender(cap);
        scenario.return_to_sender(metadata_cap);
    };
    scenario.end();
}

/// Same shape as a witness, wrong name. `is_one_time_witness` checks the type, so
/// `SILVER()` is accepted and this is the value that must abort.
#[test_only]
public struct FORGED() has drop;

#[test]
fun update_description_then_locks_metadata() {
    let mut scenario = test_scenario::begin(@0xA);
    let (initializer, treasury_cap) = coin_registry::new_currency_with_otw(
        create_one_time_witness<SILVER>(),
        DECIMALS,
        SYMBOL.to_string(),
        NAME.to_string(),
        DESCRIPTION.to_string(),
        ICON_URL.to_string(),
        scenario.ctx(),
    );
    // `finalize` would send the currency to `0xc`. Unwrap keeps it so the cap can be used.
    let (mut currency, metadata_cap) = initializer.finalize_unwrap_for_testing(scenario.ctx());
    let updated = b"Silver for locked metadata".to_string();
    update_description(&mut currency, &metadata_cap, updated);
    assert_eq!(currency.description(), updated);
    delete_metadata_cap(&mut currency, metadata_cap);
    assert!(currency.is_metadata_cap_deleted());
    std::unit_test::destroy(currency);
    std::unit_test::destroy(treasury_cap);
    scenario.end();
}

/// `create_coin_data_registry_for_testing` builds a fresh id, while `init` sends the
/// currency to `0xc`. `receive` aborts until the test registry is that object.
#[test, expected_failure(abort_code = 3, location = sui::transfer)]
fun finalize_registration_requires_registry_that_owns_currency() {
    let publisher = @0xA;
    let mut scenario = test_scenario::begin(@0x0);
    coin_registry::share_for_testing(
        coin_registry::create_coin_data_registry_for_testing(scenario.ctx()),
    );

    scenario.next_tx(publisher);
    init(create_one_time_witness<SILVER>(), scenario.ctx());

    scenario.next_tx(publisher);
    let mut registry = scenario.take_shared<CoinRegistry>();
    let registry_id = object::id_from_address(COIN_REGISTRY_ADDRESS);
    let currency = test_scenario::most_recent_receiving_ticket<Currency<SILVER>>(&registry_id);
    finalize_registration(&mut registry, currency, scenario.ctx());
    test_scenario::return_shared(registry);
    scenario.end();
}

#[test, expected_failure(abort_code = coin_registry::ENotOneTimeWitness)]
fun forged_witness_cannot_create_currency() {
    let mut scenario = test_scenario::begin(@0xA);
    let (initializer, treasury_cap) = coin_registry::new_currency_with_otw(
        FORGED(),
        DECIMALS,
        SYMBOL.to_string(),
        NAME.to_string(),
        DESCRIPTION.to_string(),
        ICON_URL.to_string(),
        scenario.ctx(),
    );
    std::unit_test::destroy(initializer);
    std::unit_test::destroy(treasury_cap);
    scenario.end();
}
