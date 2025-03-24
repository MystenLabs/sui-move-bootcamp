module abilities_events_params::abilities_events_params;

use std::string::String;
use sui::event;

//Error Codes
const EMedalOfHonorNotAvailable: u64 = 111;

// Structs

public struct Hero has key {
    id: UID, // required
    name: String,
}

// Module Initializer
fun init(ctx: &mut TxContext) {}

public fun mint_hero(name: String, ctx: &mut TxContext): Hero {
    let freshHero = Hero {
        id: object::new(ctx), // creates a new UID
        name,
    };
    freshHero
}

public fun mint_and_keep_hero(name: String, ctx: &mut TxContext) {
    let hero = mint_hero(name, ctx);
    transfer::transfer(hero, ctx.sender());
}

/////// Tests ///////

#[test_only]
use sui::test_scenario as ts;
#[test_only]
use sui::test_scenario::{take_shared, return_shared};
#[test_only]
use sui::test_utils::{destroy, assert_eq};

#[test]
fun test_hero_creation() {
    let mut test = ts::begin(@USER);
    init(test.ctx());
    test.next_tx(@USER);

    //Get hero Registry

    let hero = mint_hero(b"Flash".to_string(), test.ctx());
    assert_eq(hero.name, b"Flash".to_string());

    destroy(hero);
    test.end();
}

#[test]
fun test_event_thrown() { assert_eq(1, 1); }

#[test]
fun test_medal_award() { assert_eq(1, 1); }
