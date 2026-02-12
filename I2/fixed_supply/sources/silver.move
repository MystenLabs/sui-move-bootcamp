/// Module: silver
module fixed_supply::silver;

use sui::coin::{Self, TreasuryCap, CoinMetadata};
use sui::dynamic_object_field as dof;
use sui::url;

public struct SILVER() has drop;

const DECIMALS: u8 = 9;
const NAME: vector<u8> = b"Silver";
const SYMBOL: vector<u8> = b"SILVER";
const DESCRIPTION: vector<u8> = b"Silver, commonly used by heroes to purchase necessary adventure equipment";
const ICON_URL: vector<u8> = b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/cWTbHE-yC4z3JLmEYWDXM6uhQ1nxu-R0GOLReRwQcH4";
const TOTAL_SUPPLY: u64 = 10_000_000_000_000_000_000;

public struct Freezer has key {
    id: UID
}

public struct TreasuryCapKey() has copy, drop, store;

fun init(otw: SILVER, ctx: &mut TxContext) {
    let (mut tcap, metadata) = create_silver_currency(otw, ctx);

    transfer::public_freeze_object(metadata);

    // Mint the total supply, and transfer it to sender.
    // Lock the treasury cap inside the freezer as DOF so that it is unusable
    // but still easily indexable, and lastly freeze Freezer.
    tcap.mint_and_transfer(TOTAL_SUPPLY, ctx.sender(), ctx);
    let mut freezer = Freezer {
        id: object::new(ctx),
    };
    dof::add(&mut freezer.id, TreasuryCapKey(), tcap);
    transfer::freeze_object(freezer)
}

fun create_silver_currency(
    otw: SILVER,
    ctx: &mut TxContext
): (TreasuryCap<SILVER>, CoinMetadata<SILVER>) {
    coin::create_currency<SILVER>(
        otw,
        DECIMALS,
        SYMBOL,
        NAME,
        DESCRIPTION,
        option::some(url::new_unsafe_from_bytes(ICON_URL)),
        ctx
    )
}

#[test_only]
use sui::{coin::Coin, test_scenario};

#[test]
fun test_init() {
    let publisher = @0x11111;

    let mut scenario = test_scenario::begin(publisher);
    init(SILVER(), scenario.ctx());
    scenario.next_tx(publisher);
    {
        let freezer = scenario.take_immutable<Freezer>();
        assert!(dof::exists_(&freezer.id, TreasuryCapKey()));
        let cap: &TreasuryCap<SILVER> = dof::borrow(&freezer.id, TreasuryCapKey());
        assert!(cap.total_supply() == TOTAL_SUPPLY);

        let coin = scenario.take_from_sender<Coin<SILVER>>();
        assert!(coin.value() == TOTAL_SUPPLY);
        scenario.return_to_sender(coin);
        test_scenario::return_immutable(freezer);
    };
    scenario.end();
}

