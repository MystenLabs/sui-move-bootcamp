/// Module documentation:
/// This module defines the core logic for creating and managing heroes and their medals.
/// It showcases the use of structs, resources, shared objects, events, and testing
/// within a Sui Move smart contract.
module abilities_events_params::abilities_events_params;
use std::string::String;
use sui::event;

/// Error codes - Used for clarity and easier debugging.

/// Error code used when attempting to award a medal that is not available.
// const EMedalOfHonorNotAvailable: u64 = 111;

// Structs: Define the data structures used in the module.

/// `Hero`: Represents a hero character with a unique ID, name, and medals. The `key` ability makes it an object.
public struct Hero has key {
    id: UID, // Required field for an object, must be type `UID`
    name: String,
    medals: vector<Medal>, // A vector containing the medals that belongs to this hero
}

/// `mint_hero`: Mints a new `Hero` object and records it in the `HeroRegistry`.
public fun mint_hero(name: String, ctx: &mut TxContext): Hero {
    let freshHero = Hero {
        id: object::new(ctx), // creates a new UID
        name,
        medals: vector[], //Hero is created with empty Medals
    };

    let minted = HeroMinted {
        hero: object::id(&freshHero),
        owner: ctx.sender(),
    };

    //Emit the hero minted event
    event::emit(minted);

    freshHero
}

/// `HeroMinted`: An event emitted when a new hero is minted. `copy` and `drop` allow the event to be copied and discarded.
public struct HeroMinted has copy, drop {
    hero: ID, // `ID` of the hero that was created
    owner: address, // `address` of the account that now owns the hero
}


///// Type-less medals

/// `Medal`: Represents a medal with a unique ID and name.  The `key` ability makes it an object, `store` allows storing it as a field in other structs.
public struct Medal has key, store {
    id: UID, // Unique object ID of the medal
    name: String, // Name of the medal (e.g., "Medal of Honor")
}

/// `award_medal`:  Generic function to award a medal to a hero, based on medal name. It checks if the medal exist and then awards.
fun award_medal(hero: &mut Hero, medalName: String, ctx: &mut TxContext) {
    //Award the medal extracting the value
    hero.medals.push_back<Medal>(Medal {
        id: object::new(ctx),
        name: medalName,
    });
}

/// Function to award "Medal of Honor", the same logic can be applied to other medals
public fun award_medal_of_honor(hero: &mut Hero, ctx: &mut TxContext) {
    award_medal(hero, b"Medal of Honor".to_string(), ctx);
}

/*
///// Typed medals

/// `Medal`: Represents a medal with a unique ID and name.  The `key` ability makes it an object, `store` allows storing it as a field in other structs.
public struct Medal<T> has key, store {
    id: UID, // Unique object ID of the medal
    name: String, // Name of the medal (e.g., "Medal of Honor")
}

public struct Honor {}
public struct Merit {}

use std::type_name::{Self, TypeName}


/// `award_medal`:  Generic function to award a medal to a hero, based on medal name. It checks if the medal exist and then awards.
fun award_medal<T>(hero: &mut Hero) {
    //Award the medal extracting the value
    hero.medals.append(Medal {
        id: object::new(ctx),
        name: type_name::with_defining_ids<T>().into_string(),
    });
}

/// Function to award "Medal of Honor", the same logic can be applied to other medals
public fun award_medal_of_honor(hero: &mut Hero) {
    award_medal<Honor>(hero);
}

/// Function to award "Legion of Merit", the same logic can be applied to other medals
public fun award_medal_of_merit(hero: &mut Hero) {
    award_medal<Merit>(hero);
}

*/



/////// Tests ///////

///Importing test dependencies
#[test_only]
use sui::test_scenario as ts;
#[test_only]
use sui::test_utils::{destroy};
#[test_only]
use std::unit_test::assert_eq;

/// Basic test case to check `Hero` Object creation
#[test]
fun test_hero_creation() {
    let mut test = ts::begin(@USER);

    let hero = mint_hero(
        b"The Comedian".to_string(),
        test.ctx(),
    ); 
    // Check if `Hero` Object has the correct `name`
    assert_eq!(
        hero.name,
        b"The Comedian".to_string(),
    );

    destroy(hero);
    test.end();
}

/// Test that an event is emitted when a hero is minted.
#[test]
fun test_event_thrown() {
    let mut test = ts::begin(@USER);

    let hero = mint_hero(b"Doctor Manhattan".to_string(), test.ctx());
    assert_eq!(hero.name, b"Doctor Manhattan".to_string());
    let hero2 = mint_hero(b"Ozymandias".to_string(), test.ctx());

    // Capture all the events
    let events = event::events_by_type<HeroMinted>();
    // Check if there is 1 event
    assert_eq!(events.length(), 2);
    // Iterate all the events for that test
    let mut i = 0;
    while (i < events.length()) {
        //Check that all events where emitted by the @USER
        assert!(events[i].owner == @USER, 661);
        i = i + 1;
    };

    destroy(hero);
    destroy(hero2);
    test.end();
}

#[test]
fun test_medal_award() {
    let mut test = ts::begin(@USER);

    let mut hero = mint_hero(b"Rorschach".to_string(), test.ctx());

    award_medal_of_honor(&mut hero, test.ctx());
    //Check that the sizes where modified after the transaction
    assert_eq!(hero.medals.length(), 1);

    //award_medal_of_merit(&mut hero);
    //assert_eq!(hero.medals.length(), 2);

    destroy(hero);
    test.end();
}