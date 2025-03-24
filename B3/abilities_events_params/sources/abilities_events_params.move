/// Module documentation:
/// This module defines the core logic for creating and managing heroes and their medals.
/// It showcases the use of structs, resources, shared objects, events, and testing
/// within a Sui Move smart contract.
module abilities_events_params::abilities_events_params;

use std::string::String;
use sui::event;

/// Error codes - Used for clarity and easier debugging.

/// Error code used when attempting to award a medal that is not available.
const EMedalOfHonorNotAvailable: u64 = 111;

// Structs: Define the data structures used in the module.

/// `Hero`: Represents a hero character with a unique ID, name, and medals. The `key` ability makes it an object.
public struct Hero has key {
    id: UID, // Required field for an object, must be type `UID`
    name: String,
    medals: vector<Medal>, // A vector containing the medals that belongs to this hero
}

/// `HeroRegistry`: A shared object that manages the collection of heroes in the system. `key` makes it an object, `store` allows storing it as a field in other structs.
public struct HeroRegistry has key, store {
    id: UID,
    heroes: vector<ID>, // A vector to store the IDs of all heroes
}

/// MedalStorage: A shared object to manage the available medals.
public struct MedalStorage has key, store {
    id: UID,
    medals: vector<Medal>, // Medals vector with Medal object
}

/// `HeroMinted`: An event emitted when a new hero is minted. `copy` and `drop` allow the event to be copied and discarded.
public struct HeroMinted has copy, drop {
    hero: ID, // `ID` of the hero that was created
    owner: address, // `address` of the account that now owns the hero
}

/// `Medal`: Represents a medal with a unique ID and name.  The `key` ability makes it an object, `store` allows storing it as a field in other structs.
public struct Medal has key, store {
    id: UID, // Unique object ID of the medal
    name: String, // Name of the medal (e.g., "Medal of Honor")
}

/// `init`: Module initializer called upon deployment.  Creates a shared `HeroRegistry` object with initial medals.
fun init(ctx: &mut TxContext) {
    // Create the Hero Registry and make it as shared object
    let registry = HeroRegistry {
        id: object::new(ctx),
        heroes: vector[],
    };
    transfer::share_object(registry);

    // Create the Hero medal storage and store all medals to that object
    let mut medalStorage = MedalStorage {
        id: object::new(ctx),
        medals: vector[],
    };
    medalStorage
        .medals
        .push_back(Medal {
            id: object::new(ctx),
            name: b"Medal of Honor".to_string(),
        });
    medalStorage
        .medals
        .push_back(Medal {
            id: object::new(ctx),
            name: b"Air Force Cross".to_string(),
        });
    medalStorage
        .medals
        .push_back(Medal {
            id: object::new(ctx),
            name: b"Legion of Merit".to_string(),
        });

    transfer::share_object(medalStorage);
}

/// `mint_hero`: Mints a new `Hero` object and records it in the `HeroRegistry`.
public fun mint_hero(name: String, registry: &mut HeroRegistry, ctx: &mut TxContext): Hero {
    let freshHero = Hero {
        id: object::new(ctx), // creates a new UID
        name,
        medals: vector[], //Hero is created with empty Medals
    };

    //Add the `Hero` reference to the `registry`
    registry.heroes.push_back(object::id(&freshHero));

    let minted = HeroMinted {
        hero: object::id(&freshHero),
        owner: ctx.sender(),
    };

    //Emit the hero minted event
    event::emit(minted);

    freshHero
}

/// `mint_and_keep_hero`:  Mints a new hero, and transfers it to the transaction sender's address.
public fun mint_and_keep_hero(name: String, registry: &mut HeroRegistry, ctx: &mut TxContext) {
    let hero = mint_hero(name, registry, ctx);
    transfer::transfer(hero, ctx.sender());
}

/// Function to award "Medal of Honor", the same logic can be applied to other medals
public fun award_medal_of_honor(hero: &mut Hero, medalStorage: &mut MedalStorage) {
    award_medal(hero, medalStorage, b"Medal of Honor".to_string());
}

/// Function to award "Legion of Merit", the same logic can be applied to other medals
public fun award_medal_of_merit(hero: &mut Hero, medalStorage: &mut MedalStorage) {
    award_medal(hero, medalStorage, b"Legion of Merit".to_string());
}

/// Function to award "Air Force Cross", the same logic can be applied to other medals
public fun award_medal_of_cross(hero: &mut Hero, medalStorage: &mut MedalStorage) {
    award_medal(hero, medalStorage, b"Air Force Cross".to_string());
}

///// Private Functions /////

/// `award_medal`:  Generic function to award a medal to a hero, based on medal name. It checks if the medal exist and then awards.
fun award_medal(hero: &mut Hero, medalStorage: &mut MedalStorage, medalName: String) {
    let medalOption: Option<Medal> = get_medal(medalName, medalStorage);

    //Assert that exist the medal
    assert!(medalOption.is_some(), EMedalOfHonorNotAvailable);

    //Award the medal extracting the value
    hero.medals.append(medalOption.to_vec());
}

/// `get_medal`: Retrieves a medal from medal storage by name, or returns none if not found.
fun get_medal(name: String, medalStorage: &mut MedalStorage): option::Option<Medal> {
    let mut i = 0;
    let length = medalStorage.medals.length();
    while (i < length) {
        if (medalStorage.medals[i].name == name) {
            let extractedMedal = vector::remove(&mut medalStorage.medals, i);
            return option::some(extractedMedal)
        };
        i = i + 1;
    };
    option::none<Medal>()
}

/////// Tests ///////

///Importing test dependencies
#[test_only]
use sui::test_scenario as ts;
#[test_only]
use sui::test_utils::{destroy, assert_eq};
#[test_only]
use sui::test_scenario::{take_shared, return_shared};

/// Basic test case to check `Hero` Object creation
#[test]
fun test_hero_creation() {
    let mut test = ts::begin(@USER);
    init(test.ctx());
    test.next_tx(@USER);
    let mut registry = take_shared<HeroRegistry>(&test);
    let hero = mint_hero(b"Flash".to_string(), &mut registry, test.ctx()); //Check if `Hero` Object has the correct `name`
    assert_eq(
        hero.name,
        b"Flash".to_string(),
    );
    assert_eq(registry.heroes.length(), 1);
    return_shared(registry);
    destroy(hero);
    test.end();
}

/// Test that an event is emitted when a hero is minted.
#[test]
fun test_event_thrown() {
    let mut test = ts::begin(@USER); //Init the module
    init(test.ctx());
    test.next_tx(@USER);
    let mut registry = take_shared<HeroRegistry>(&test);
    let hero = mint_hero(b"Flash".to_string(), &mut registry, test.ctx());
    let hero2 = mint_hero(b"Flash".to_string(), &mut registry, test.ctx());
    assert_eq(hero.name, b"Flash".to_string()); //Check if there are 2 heroes created
    assert_eq(registry.heroes.length(), 2); //Capture all the events
    let events: vector<HeroMinted> = event::events_by_type<HeroMinted>(); //Check if there are 2 events
    assert_eq(events.length(), 2); //Iterate all the events for that test
    let mut i = 0;
    while (i < events.length()) {
        //Check that all events where emited by the @USER
        assert!(events[i].owner == @USER, 661);
        i = i + 1;
    };
    return_shared(registry);
    destroy(hero);
    destroy(hero2);
    test.end();
}

#[test]
fun test_medal_award() {
    let mut test = ts::begin(@USER);
    init(test.ctx());
    test.next_tx(@USER);

    let mut registry = take_shared<HeroRegistry>(&test);
    let mut medalStorage = take_shared<MedalStorage>(&test);

    let mut hero = mint_hero(b"Superman".to_string(), &mut registry, test.ctx());

    award_medal_of_honor(&mut hero, &mut medalStorage);

    //Check that the sizes where modified after the transaction
    assert_eq(hero.medals.length(), 1);
    assert_eq(medalStorage.medals.length(), 2);

    award_medal_of_merit(&mut hero, &mut medalStorage);
    assert_eq(hero.medals.length(), 2);
    assert_eq(medalStorage.medals.length(), 1);

    award_medal_of_cross(&mut hero, &mut medalStorage);
    assert_eq(hero.medals.length(), 3);
    assert_eq(medalStorage.medals.length(), 0);

    return_shared(registry);
    return_shared(medalStorage);
    destroy(hero);
    test.end();
}

#[test, expected_failure(abort_code = EMedalOfHonorNotAvailable)]
fun test_medal_award_error() {
    let mut test = ts::begin(@USER);
    init(test.ctx());
    test.next_tx(@USER);

    let mut registry = take_shared<HeroRegistry>(&test);
    let mut medalStorage = take_shared<MedalStorage>(&test);

    let mut hero = mint_hero(b"Superman".to_string(), &mut registry, test.ctx());

    award_medal_of_honor(&mut hero, &mut medalStorage);
    //Check that the sizes where modified after the transaction
    assert_eq(hero.medals.length(), 1);
    assert_eq(medalStorage.medals.length(), 2);

    //Try to award again, the medal is not available
    award_medal_of_honor(&mut hero, &mut medalStorage);

    return_shared(registry);
    return_shared(medalStorage);
    destroy(hero);
    test.end();
}
