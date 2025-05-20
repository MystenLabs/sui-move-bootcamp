module abilities_events_params::abilities_events_params;

use std::debug::print;
use std::string::String;
use sui::event;

//Error Codes
const EMedalOfHonorNotAvailable: u64 = 111;

// Structs

public struct Hero has key {
    id: UID, // required
    name: String,
    medals: vector<ID>,
}

public struct HeroMinted has copy, drop {
    hero: ID,
    owner: address,
}

public struct HeroRegistry has key, store {
    id: UID,
    heroes: vector<ID>,
}

public struct Medal has key, store {
    id: UID,
    name: String,
}

public struct MedalStorage has key {
    id: UID,
    medals: vector<Medal>,
}

// Module Initializer
fun init(ctx: &mut TxContext) {
    let registry = HeroRegistry {
        id: object::new(ctx),
        heroes: vector[],
    };

    let medal_storage = MedalStorage {
        id: object::new(ctx),
        medals: vector[],
    };

    transfer::share_object(registry);
    transfer::share_object(medal_storage);
}

public fun mint_hero(registry: &mut HeroRegistry, name: String, ctx: &mut TxContext): Hero {
    let freshHero = Hero {
        id: object::new(ctx), // creates a new UID
        name,
        medals: vector[],
    };

    let hero_id = object::id(&freshHero);

    let minted = HeroMinted {
        hero: hero_id,
        owner: ctx.sender(),
    };

    event::emit(minted);
    registry.heroes.push_back(hero_id);

    freshHero
}

public entry fun mint_and_keep_hero(
    registry: &mut HeroRegistry,
    name: String,
    ctx: &mut TxContext,
) {
    let hero = mint_hero(registry, name, ctx);
    transfer::transfer(hero, ctx.sender());
}

public fun award_medal_of_honor(
    hero: &mut Hero,
    medal_storage: &mut MedalStorage,
    ctx: &mut TxContext,
) {
    let medal = Medal {
        id: object::new(ctx),
        name: b"Medal of Honor".to_string(),
    };
    let medal_id = object::id(&medal);
    medal_storage.medals.push_back(medal);
    hero.medals.push_back(medal_id);
}

/////// Tests ///////

#[test_only]
use sui::test_scenario as ts;
#[test_only]
use sui::test_scenario::{take_shared, return_shared};
#[test_only]
use sui::test_utils::{destroy, assert_eq};
//--------------------------------------------------------------
//  Test 1: Hero Creation
//--------------------------------------------------------------
//  Objective: Verify the correct creation of a Hero object.
//  Tasks:
//      1. Complete the test by calling the `mint_hero` function with a hero name.
//      2. Assert that the created Hero's name matches the provided name.
//      3. Properly clean up the created Hero object using `destroy`.
//--------------------------------------------------------------
#[test]
fun test_hero_creation() {
    let mut test = ts::begin(@USER);
    init(test.ctx());
    test.next_tx(@USER);

    //Get hero Registry
    let mut registry = take_shared<HeroRegistry>(&test);
    let hero = mint_hero(&mut registry, b"Flash".to_string(), test.ctx());
    assert_eq(hero.name, b"Flash".to_string());
    destroy(hero);
    return_shared(registry);
    test.end();
}

//--------------------------------------------------------------
//  Test 2: Event Emission
//--------------------------------------------------------------
//  Objective: Implement event emission during hero creation and verify its correctness.
//  Tasks:
//      1. Define a `HeroMinted` event struct with appropriate fields (e.g., hero ID, owner address).  Remember to add `copy, drop` abilities!
//      2. Emit the `HeroMinted` event within the `mint_hero` function after creating the Hero.
//      3. In this test, capture emitted events using `event::events_by_type<HeroMinted>()`.
//      4. Assert that the number of emitted `HeroMinted` events is 1.
//      5. Assert that the `owner` field of the emitted event matches the expected address (e.g., @USER).
//--------------------------------------------------------------
#[test]
fun test_event_thrown() {
    let mut test = ts::begin(@USER);
    init(test.ctx());
    test.next_tx(@USER);

    // Get registry and mint a hero
    let mut registry = take_shared<HeroRegistry>(&test);
    let hero = mint_hero(&mut registry, b"Flash".to_string(), test.ctx());

    // Get emitted events
    let events = event::events_by_type<HeroMinted>();
    assert_eq(events.length(), 1);

    // Verify event contents
    let minted_event = events[0];
    assert_eq(minted_event.owner, @USER);
    assert_eq(minted_event.hero, object::id(&hero));

    // Cleanup
    destroy(hero);
    return_shared(registry);
    test.end();
}

//--------------------------------------------------------------
//  Test 3: Medal Awarding
//--------------------------------------------------------------
//  Objective: Implement medal awarding functionality to heroes and verify its effects.
//  Tasks:
//      1. Define a `Medal` struct with appropriate fields (e.g., medal ID, medal name). Remember to add `key, store` abilities!
//      2. Add a `medals: vector<Medal>` field to the `Hero` struct to store the medals a hero has earned.
//      3. Create functions to award medals to heroes, e.g., `award_medal_of_honor(hero: &mut Hero)`.
//      4. In this test, mint a hero.
//      5. Award a specific medal (e.g., Medal of Honor) to the hero using your `award_medal_of_honor` function.
//      6. Assert that the hero's `medals` vector now contains the awarded medal.
//      7. Consider creating a shared `MedalStorage` object to manage the available medals.
//--------------------------------------------------------------
#[test]
fun test_medal_award() {
    let mut test = ts::begin(@USER);
    init(test.ctx());
    test.next_tx(@USER);

    // Get registry and mint a hero
    let mut registry = take_shared<HeroRegistry>(&test);
    let mut medal_storage = take_shared<MedalStorage>(&test);
    let mut hero = mint_hero(&mut registry, b"Flash".to_string(), test.ctx());

    // Award medal
    award_medal_of_honor(&mut hero, &mut medal_storage, test.ctx());

    // Verify medal was awarded
    assert_eq(vector::length(&hero.medals), 1);
    let medal_id = vector::borrow(&hero.medals, 0);
    let medal = vector::borrow(&medal_storage.medals, 0);
    assert_eq(object::id(medal), *medal_id);
    assert_eq(medal.name, b"Medal of Honor".to_string());

    // Cleanup
    destroy(hero);
    return_shared(registry);
    return_shared(medal_storage);
    test.end();
}
