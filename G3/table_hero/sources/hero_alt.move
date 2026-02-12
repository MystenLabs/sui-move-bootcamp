module table_hero::hero_alt;

use std::string::String;
use std::type_name::{Self, TypeName};
use sui::table::{Self, Table};

public struct Fire {}
public struct Water {}
public struct Earth {}
public struct Air {}

public struct Hero has key {
    id: UID,
    name: String,
    attributes: Table<TypeName, u16>,
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

    hero.attributes.add(type_name::get<Fire>(), 0u16);
    hero.attributes.add(type_name::get<Water>(), 0u16);
    hero.attributes.add(type_name::get<Earth>(), 0u16);
    hero.attributes.add(type_name::get<Air>(), 0u16);

    hero
}

public fun increase_attribute<T>(hero: &mut Hero, amount: u16) {
    let attribute = hero.attributes.borrow_mut(type_name::get<T>());
    *attribute = *attribute + amount;
}

public fun get_attribute<T>(hero: &Hero): u16 {
    let attribute = hero.attributes.borrow(type_name::get<T>());
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

    assert_eq(hero.attributes.contains(type_name::get<Fire>()), true);
    assert_eq(hero.attributes.contains(type_name::get<Water>()), true);
    assert_eq(hero.attributes.contains(type_name::get<Earth>()), true);
    assert_eq(hero.attributes.contains(type_name::get<Air>()), true);

    assert_eq(get_attribute<Fire>(&hero), 0);
    assert_eq(get_attribute<Water>(&hero), 0);
    assert_eq(get_attribute<Earth>(&hero), 0);
    assert_eq(get_attribute<Air>(&hero), 0);

    increase_attribute<Fire>(&mut hero, 10);
    increase_attribute<Water>(&mut hero, 20);
    increase_attribute<Earth>(&mut hero, 30);
    increase_attribute<Air>(&mut hero, 40);

    assert_eq(get_attribute<Fire>(&hero), 10);
    assert_eq(get_attribute<Water>(&hero), 20);
    assert_eq(get_attribute<Earth>(&hero), 30);
    assert_eq(get_attribute<Air>(&hero), 40);

    destroy(hero);
}
