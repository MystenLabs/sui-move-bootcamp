module display::hero;
use std::string::String;
use sui::display_registry::{Self, DisplayRegistry, Display, DisplayCap};
use sui::package::{Self, Publisher};

public struct HERO has drop {}

public struct Hero has key, store {
    id: UID,
    name: String,
    blob_id: String,
}

fun init(otw: HERO, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);
    transfer::public_transfer(publisher, ctx.sender());
}

// In Display V2, the `DisplayRegistry` is a shared system object.
// Since `init` cannot receive shared objects, display creation
// must happen in a separate entry function called after publish.

entry fun create_display(
    registry: &mut DisplayRegistry,
    publisher: &mut Publisher,
    ctx: &mut TxContext,
) {}

public fun mint(name: String, blob_id: String, ctx: &mut TxContext): Hero {
    Hero {
        id: object::new(ctx),
        name,
        blob_id,
    }
}

#[test_only]
use sui::test_scenario as ts;
#[test_only]
use std::unit_test::assert_eq;
#[test_only]
const ADMIN: address = @0xAA;

#[test]
fun test_publisher_receives_the_display_object() {
    let mut ts = ts::begin(ADMIN);

    // Initialize system objects (DisplayRegistry, Clock, etc.)
    ts.create_system_objects();

    ts.next_tx(ADMIN);

    init(HERO {}, ts.ctx());

    ts.next_tx(ADMIN);

    let mut publisher = ts.take_from_sender<Publisher>();
    let mut registry = ts.take_shared<DisplayRegistry>();

    create_display(&mut registry, &mut publisher, ts.ctx());

    ts.next_tx(ADMIN);

    let display = ts.take_shared<Display<Hero>>();
    let fields = display.fields();
    assert_eq!(*fields.get(&b"name".to_string()), b"{name}".to_string());
    assert_eq!(
        *fields.get(&b"image_url".to_string()),
        b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/{blob_id}".to_string(),
    );
    assert_eq!(
        *fields.get(&b"description".to_string()),
        b"{name} - A true Hero of the Sui ecosystem!".to_string(),
    );

    let cap = ts.take_from_sender<DisplayCap<Hero>>();

    ts::return_to_sender(&ts, cap);
    ts::return_to_sender(&ts, publisher);
    ts::return_shared(display);
    ts::return_shared(registry);

    ts.end();
}
