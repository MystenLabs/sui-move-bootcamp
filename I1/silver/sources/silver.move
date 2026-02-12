/// Module: silver
module silver::silver;

use sui::coin::{TreasuryCap, CoinMetadata};
use sui::url;

public struct SILVER() has drop;

const ETodo: u64 = 0;

const DECIMALS: u8 = 9;
const NAME: vector<u8> = b"Silver";
const SYMBOL: vector<u8> = b"SILVER";
const DESCRIPTION: vector<u8> = b"Silver, commonly used by heroes to purchase necessary adventure equipment";
const ICON_URL: vector<u8> = b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/cWTbHE-yC4z3JLmEYWDXM6uhQ1nxu-R0GOLReRwQcH4";

fun init(otw: SILVER, ctx: &mut TxContext) {
    let (tcap, metadata) = create_silver_currency(otw, ctx);
    transfer::public_transfer(tcap, ctx.sender());
    transfer::public_freeze_object(metadata);
}

fun create_silver_currency(
    otw: SILVER,
    ctx: &mut TxContext
): (TreasuryCap<SILVER>, CoinMetadata<SILVER>) {
    // Use coin::create_currency
    todo!()
}

#[test_only]
use sui::{coin::Coin, test_utils};


#[test]
fun create_currency() {
    let (tcap, metadata) = create_silver_currency(
        SILVER(),
        &mut tx_context::dummy()
    );
    assert!(tcap.total_supply() == 0);
    assert!(metadata.get_decimals() == DECIMALS);
    assert!(metadata.get_name() == NAME.to_string());
    assert!(metadata.get_symbol() == SYMBOL.to_ascii_string());
    assert!(metadata.get_description() == DESCRIPTION.to_string());
    assert!(metadata.get_icon_url() == option::some(url::new_unsafe_from_bytes(ICON_URL)));
    test_utils::destroy(tcap);
    test_utils::destroy(metadata);
}

#[test]
fun mint() {
    let amount = 10_000_000_000;
    let mut ctx = tx_context::dummy();
    let (mut tcap, metadata) = create_silver_currency(
        SILVER(),
        &mut ctx
    );

    // Mint coin of amount
    let coin: Coin<SILVER> = todo!();

    assert!(coin.value() == amount);
    assert!(tcap.total_supply() == amount);

    test_utils::destroy(coin);
    test_utils::destroy(tcap);
    test_utils::destroy(metadata);
}

#[test]
fun burn() {
    let amount = 10_000_000_000;
    let mut ctx = tx_context::dummy();
    let (mut tcap, metadata) = create_silver_currency(
        SILVER(),
        &mut ctx
    );

    // Mint coin of amount
    let coin: Coin<SILVER> = todo!();

    // Burn coin
    todo!<()>();

    test_utils::destroy(tcap);
    test_utils::destroy(metadata);
}


public macro fun todo<$T>(): $T {
    abort(ETodo)
}
