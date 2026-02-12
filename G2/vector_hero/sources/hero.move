module vector_hero::hero;

use std::string::String;

public struct Attribute has store, drop {
    name: String,
    level: u64,
}

public struct Hero has key {
    id: UID,
    name: String,
    attributes: vector<Attribute>,
}


/// @dev This function is used to create a hero with a vector of attributes.
/// @dev It uses a while loop to iterate over the attributes vector and convert each attribute name to an attribute object.
/// @notice It accepts a vector of attribute names and converts them to attributes with a level of 1.
/// @param name The name of the hero.
/// @param attributes The attributes names of the hero.
/// @param ctx The transaction context.
/// @return The hero.
public fun create_hero_1(name: String, mut attributes: vector<String>, ctx: &mut TxContext): Hero {
    let mut hero_attributes = vector[];
    while (!attributes.is_empty()) {
        let attribute = attributes.pop_back();
        hero_attributes.push_back(Attribute { name: attribute, level: 1 });
    };

    let hero = Hero {
        id: object::new(ctx),
        name,
        attributes: hero_attributes,
    };

    hero
}

/// @dev This function is used to create a hero with a vector of attributes.
/// @dev It uses the map! macro to iterate over the attributes vector and convert each attribute name to an attribute object.
/// @notice It accepts a vector of attribute names and converts them to attributes with a level of 1.
/// @param name The name of the hero.
/// @param attributes The attributes names of the hero.
/// @param ctx The transaction context.
/// @return The hero.
public fun create_hero_2(name: String, attributes: vector<String>, ctx: &mut TxContext): Hero {
    let hero_attributes = attributes.map!(|attribute| Attribute { name: attribute, level: 1 });

    let hero = Hero {
        id: object::new(ctx),
        name,
        attributes: hero_attributes,
    };

    hero
}

/// @dev This function is used to create a hero with a vector of attributes.
/// @dev It accepts a vector of attribute objects.
/// @notice It accepts a vector of attribute objects and assignes them to the hero. This allows for the attributes to be
///         initialised with arbitrary level values.
/// @param name The name of the hero.
/// @param attributes The attributes of the hero.
/// @param ctx The transaction context.
/// @return The hero.
public fun create_hero_3(name: String, attributes: vector<Attribute>, ctx: &mut TxContext): Hero {
    let hero = Hero {
        id: object::new(ctx),
        name,
        attributes,
    };

    hero
}

public fun create_attribute(name: String, level: u64): Attribute {
    Attribute { name, level }
}

public fun transfer_hero(hero: Hero, to: address) {
    transfer::transfer(hero, to);
}

// Test Only

#[test_only]
use sui::test_utils::{assert_eq, destroy};

#[test]
public fun test_create_hero_with_while_loop() {
    let attributes = vector[
        b"fire".to_string(),
        b"water".to_string(),
        b"earth".to_string(),
        b"air".to_string(),
    ];
    let hero = create_hero_1(b"Hero 1".to_string(), attributes, &mut tx_context::dummy());

    assert_eq(hero.attributes.length(), 4);
    assert_eq(hero.attributes.any!(|a| a.name == b"fire".to_string()), true);
    assert_eq(hero.attributes.any!(|a| a.name == b"water".to_string()), true);
    assert_eq(hero.attributes.any!(|a| a.name == b"earth".to_string()), true);
    assert_eq(hero.attributes.any!(|a| a.name == b"air".to_string()), true);

    destroy(hero);
}

#[test]
public fun test_create_hero_with_macro() {
    let attributes = vector[
        b"fire".to_string(),
        b"water".to_string(),
        b"earth".to_string(),
        b"air".to_string(),
    ];
    let hero = create_hero_2(b"Hero 1".to_string(), attributes, &mut tx_context::dummy());

    assert_eq(hero.attributes.length(), 4);
    assert_eq(hero.attributes.any!(|a| a.name == b"fire".to_string()), true);
    assert_eq(hero.attributes.any!(|a| a.name == b"water".to_string()), true);
    assert_eq(hero.attributes.any!(|a| a.name == b"earth".to_string()), true);
    assert_eq(hero.attributes.any!(|a| a.name == b"air".to_string()), true);

    destroy(hero);
}
