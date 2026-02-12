module table_hero::hero;

use std::string::String;
use sui::table::{Self, Table};

public enum AttributeKey has copy, drop, store {
    Earth,
    Fire,
    Water,
    Air,
}

public struct Hero has key {
    id: UID,
    name: String,
    attributes: Table<AttributeKey, u16>,
}

/// @dev Creates a new hero with a given name and default attributes.
/// @param name The name of the hero.
/// @param ctx The transaction context.
/// @return A new hero with a given name and default attributes.
public fun create_hero(name: String, ctx: &mut TxContext): Hero {
    let mut hero = Hero {
        id: object::new(ctx),
        name,
        attributes: table::new(ctx),
    };

    hero.attributes.add(AttributeKey::Fire, 0u16);
    hero.attributes.add(AttributeKey::Water, 0u16);
    hero.attributes.add(AttributeKey::Earth, 0u16);
    hero.attributes.add(AttributeKey::Air, 0u16);

    hero
}

public fun increase_attribute(hero: &mut Hero, key: AttributeKey, amount: u16) {
    let attribute = hero.attributes.borrow_mut(key);
    *attribute = *attribute + amount;
}

public fun get_attribute(hero: &Hero, key: AttributeKey): u16 {
    let attribute = hero.attributes.borrow(key);
    *attribute
}

public fun transfer_hero(hero: Hero, to: address) {
    transfer::transfer(hero, to);
}

// Test Only

#[test_only]
use sui::test_utils::{assert_eq, destroy};

#[test]
public fun test_create_hero_and_increase_attributes() {
    let mut hero = create_hero(b"Hero".to_string(), &mut tx_context::dummy());

    assert_eq(hero.attributes.length(), 4);

    assert_eq(hero.attributes.contains(AttributeKey::Fire), true);
    assert_eq(hero.attributes.contains(AttributeKey::Water), true);
    assert_eq(hero.attributes.contains(AttributeKey::Earth), true);
    assert_eq(hero.attributes.contains(AttributeKey::Air), true);

    assert_eq(get_attribute(&hero, AttributeKey::Fire), 0);
    assert_eq(get_attribute(&hero, AttributeKey::Water), 0);
    assert_eq(get_attribute(&hero, AttributeKey::Earth), 0);
    assert_eq(get_attribute(&hero, AttributeKey::Air), 0);

    increase_attribute(&mut hero, AttributeKey::Fire, 10);
    increase_attribute(&mut hero, AttributeKey::Water, 20);
    increase_attribute(&mut hero, AttributeKey::Earth, 30);
    increase_attribute(&mut hero, AttributeKey::Air, 40);

    assert_eq(get_attribute(&hero, AttributeKey::Fire), 10);
    assert_eq(get_attribute(&hero, AttributeKey::Water), 20);
    assert_eq(get_attribute(&hero, AttributeKey::Earth), 30);
    assert_eq(get_attribute(&hero, AttributeKey::Air), 40);

    destroy(hero);
}
