module display::hero;

use std::string::String;
use sui::display;
use sui::package;

public struct HERO has drop {}

public struct Hero has key, store {
    id: UID,
    name: String,
    blob_id: String,
}

fun init(otw: HERO, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);

    let keys = vector[b"name".to_string(), b"image_url".to_string(), b"description".to_string()];

    let values = vector[
        b"{name}".to_string(),
        b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/{blob_id}".to_string(),
        b"{name} - A true Hero of the Sui ecosystem!".to_string(),
    ];

    let mut display = display::new_with_fields<Hero>(
        &publisher,
        keys,
        values,
        ctx,
    );

    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}

public fun mint(name: String, blob_id: String, ctx: &mut TxContext): Hero {
    Hero {
        id: object::new(ctx),
        name,
        blob_id,
    }
}

#[test_only]
use sui::{test_scenario as ts, test_utils::assert_eq};
#[test_only]
use sui::display::Display;
#[test_only]
const ADMIN: address = @0xAA;

#[test]
fun test_publisher_receives_the_display_object() {
    let mut ts = ts::begin(ADMIN);

    init(HERO {}, ts.ctx());

    ts.next_tx(ADMIN);

    let display = ts.take_from_sender<Display<Hero>>();
    let fields = display.fields();
    assert_eq(display.version(), 1);
    assert_eq(*fields.get(&b"name".to_string()), b"{name}".to_string());
    assert_eq(
        *fields.get(&b"image_url".to_string()),
        b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/{image_url}".to_string(),
    );
    assert_eq(
        *fields.get(&b"description".to_string()),
        b"{name} - A true Hero of the Sui ecosystem!".to_string(),
    );

    ts.return_to_sender(display);

    ts.end();
}
