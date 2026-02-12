module uid_hero::hero;

use std::string::String;

public struct Attribute has drop, store {
    name: String,
    level: u64,
}

public struct Hero has key {
    id: UID,
    name: String,
    attributes: vector<Attribute>,
}

/// @dev This function is used to create a hero with a vector of attributes.
/// @dev It uses the map! macro to iterate over the attributes vector and convert each attribute name to an attribute object.
/// @notice It accepts a vector of attribute names and converts them to attributes with a level of 0.
/// @param name The name of the hero.
/// @param attributes The attributes names of the hero.
/// @param ctx The transaction context.
/// @return The hero.
public fun create_hero(name: String, attributes: vector<String>, ctx: &mut TxContext): Hero {
    let hero_attributes = attributes.map!(|attribute| Attribute { name: attribute, level: 0 });

    let hero = Hero {
        id: object::new(ctx),
        name,
        attributes: hero_attributes,
    };

    hero
}

public fun create_attribute(name: String, level: u64): Attribute {
    Attribute { name, level }
}

public fun transfer_hero(hero: Hero, to: address) {
    transfer::transfer(hero, to);
}

/// @dev This function is used to kill a hero.
/// @dev It accepts a hero and deletes the hero's uid.
/// @notice The hero object needs to be destuctured to access its fields.
///         The String and Attributes fields will be destroyed automatically as they will be dropped when the function
///         exits its scope due their drop ability, while the UID field will be deleted using the delete function as
///         it does not have the drop ability.
/// @param hero The hero to kill.
public fun kill_hero(hero: Hero) {
    let Hero { id, name: _, attributes: _ } = hero;
    id.delete();
}

// Test Only

#[test_only]
use sui::{test_scenario as ts, test_utils::assert_eq};

#[test]
public fun test_create_and_kill_hero() {
    let mut ts = ts::begin(@0xAA);

    assert_eq(ts.has_most_recent_for_sender<Hero>(), false);

    let attributes = vector[
        b"fire".to_string(),
        b"water".to_string(),
        b"earth".to_string(),
        b"air".to_string(),
    ];
    let hero = create_hero(b"Hero 1".to_string(), attributes, ts.ctx());
    transfer_hero(hero, @0xAA);

    ts.next_tx(@0xAA);

    assert_eq(ts.has_most_recent_for_sender<Hero>(), true);

    let hero = ts.take_from_sender<Hero>();
    kill_hero(hero);

    assert_eq(ts.has_most_recent_for_sender<Hero>(), false);

    ts.end();
}
