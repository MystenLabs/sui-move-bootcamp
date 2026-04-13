/// Module: silver
module fixed_supply::silver;

use sui::coin::TreasuryCap;
use sui::coin_registry;

public struct SILVER has drop {}

const DECIMALS: u8 = 9;
const NAME: vector<u8> = b"Silver";
const SYMBOL: vector<u8> = b"SILVER";
const DESCRIPTION: vector<u8> = b"Silver, commonly used by heroes to purchase necessary adventure equipment";
const ICON_URL: vector<u8> = b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/cWTbHE-yC4z3JLmEYWDXM6uhQ1nxu-R0GOLReRwQcH4";
const TOTAL_SUPPLY: u64 = 10_000_000_000_000_000_000;

fun init(otw: SILVER, ctx: &mut TxContext) {
    let (mut builder, mut tcap) = create_silver_currency(otw, ctx);

    // Mint the total supply and transfer to sender.
    tcap.mint_and_transfer(TOTAL_SUPPLY, ctx.sender(), ctx);

    // Lock the supply as fixed — this consumes the TreasuryCap,
    // preventing any further minting or burning.
    builder.make_supply_fixed(tcap);

    let metadata_cap = builder.finalize(ctx);
    transfer::public_transfer(metadata_cap, ctx.sender());
}

fun create_silver_currency(
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

#[test_only]
use std::unit_test;

#[test]
fun test_init() {
    let publisher = @0x11111;

    let mut scenario = sui::test_scenario::begin(publisher);
    init(SILVER {}, scenario.ctx());
    scenario.next_tx(publisher);
    {
        let coin = scenario.take_from_sender<sui::coin::Coin<SILVER>>();
        assert!(coin.value() == TOTAL_SUPPLY);
        scenario.return_to_sender(coin);

        let metadata_cap = scenario.take_from_sender<coin_registry::MetadataCap<SILVER>>();
        unit_test::destroy(metadata_cap);
    };
    scenario.end();
}
