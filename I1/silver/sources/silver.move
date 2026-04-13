/// Module: silver
module silver::silver;

use sui::coin::TreasuryCap;
use sui::coin_registry;

public struct SILVER has drop {}

const DECIMALS: u8 = 9;
const NAME: vector<u8> = b"Silver";
const SYMBOL: vector<u8> = b"SILVER";
const DESCRIPTION: vector<u8> = b"Silver, commonly used by heroes to purchase necessary adventure equipment";
const ICON_URL: vector<u8> = b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/cWTbHE-yC4z3JLmEYWDXM6uhQ1nxu-R0GOLReRwQcH4";

fun init(otw: SILVER, ctx: &mut TxContext) {
    let (builder, tcap) = create_currency(otw, ctx);
    let metadata_cap = builder.finalize(ctx);
    transfer::public_transfer(tcap, ctx.sender());
    transfer::public_transfer(metadata_cap, ctx.sender());
}

fun create_currency(
    otw: SILVER,
    ctx: &mut TxContext,
): (coin_registry::CurrencyInitializer<SILVER>, TreasuryCap<SILVER>) {
    coin_registry::new_currency_with_otw(
        otw,
        DECIMALS,
        SYMBOL.to_string(),
        NAME.to_string(),
        DESCRIPTION.to_string(),
        ICON_URL.to_string(),
        ctx,
    )
}

public fun mint(
    tcap: &mut TreasuryCap<SILVER>,
    amount: u64,
    ctx: &mut TxContext,
): sui::coin::Coin<SILVER> {
    tcap.mint(amount, ctx)
}

#[test_only]
use std::unit_test;

#[test]
fun test_create_currency() {
    let (builder, tcap) = create_currency(SILVER {}, &mut tx_context::dummy());
    assert!(tcap.total_supply() == 0);
    unit_test::destroy(builder);
    unit_test::destroy(tcap);
}

#[test]
fun test_mint() {
    let amount = 10_000_000_000;
    let mut ctx = tx_context::dummy();
    let (builder, mut tcap) = create_currency(SILVER {}, &mut ctx);

    let coin = mint(&mut tcap, amount, &mut ctx);

    assert!(coin.value() == amount);
    assert!(tcap.total_supply() == amount);

    unit_test::destroy(builder);
    unit_test::destroy(coin);
    unit_test::destroy(tcap);
}

#[test]
fun test_burn() {
    let amount = 10_000_000_000;
    let mut ctx = tx_context::dummy();
    let (builder, mut tcap) = create_currency(SILVER {}, &mut ctx);

    let coin = mint(&mut tcap, amount, &mut ctx);
    tcap.burn(coin);

    assert!(tcap.total_supply() == 0);

    unit_test::destroy(builder);
    unit_test::destroy(tcap);
}
