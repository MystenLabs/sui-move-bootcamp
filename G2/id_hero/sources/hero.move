module id_hero::hero;

use std::string::String;

public struct HeroRegistry has key {
    id: UID,
    heroes: vector<ID>, // this field stores a copied version of the ids of all heroes ever created (vector limits are ignored in this example)
    killed_heroes: vector<ID>, // this field stores a copied version of the ids of all heroes ever killed (vector limits are ignored in this example)
}

public struct Attribute has drop, store {
    name: String,
    level: u64,
}

public struct Hero has key {
    id: UID,
    name: String,
    attributes: vector<Attribute>,
}

fun init(ctx: &mut TxContext) {
    let r = HeroRegistry {
        id: object::new(ctx),
        heroes: vector[],
        killed_heroes: vector[],
    };
    transfer::share_object(r)
}

/// @dev This function is used to create a hero with a vector of attributes.
/// @dev It uses the map! macro to iterate over the attributes vector and convert each attribute name to an attribute object.
/// @notice It accepts a vector of attribute names and converts them to attributes with a level of 1.
/// @param name The name of the hero.
/// @param attributes The attributes names of the hero.
/// @param ctx The transaction context.
/// @return The hero.
public fun create_hero(
    r: &mut HeroRegistry,
    name: String,
    attributes: vector<String>,
    ctx: &mut TxContext,
): Hero {
    let hero_attributes = attributes.map!(|attribute| Attribute { name: attribute, level: 1 });

    let hero = Hero {
        id: object::new(ctx),
        name,
        attributes: hero_attributes,
    };

    let hero_id = object::id(&hero);
    r.heroes.push_back(hero_id);

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
///         is exist its scope due their drop ability, while the UID field will be deleted using the delete function as
///         it does not have the drop ability.
/// @param hero The hero to kill.
public fun kill_hero(r: &mut HeroRegistry, hero: Hero) {
    let Hero { id, name: _, attributes: _ } = hero;
    let hero_id = object::uid_to_inner(&id);
    r.killed_heroes.push_back(hero_id);
    id.delete();
}

// Test Only

#[test_only]
use sui::{test_scenario as ts, test_utils::{assert_eq, destroy}};

#[test]
public fun test_find_alive_heroes() {
    // we need test scenario because &mut tx_context::dummy() would return the same id for all heroes.
    let mut ts = ts::begin(@0xAA);

    init(ts.ctx());

    ts.next_tx(@0xAA);

    let mut registry = ts.take_shared<HeroRegistry>();

    let hero1 = create_hero(
        &mut registry,
        b"Hero 1".to_string(),
        vector[],
        ts.ctx(),
    );
    let hero2 = create_hero(
        &mut registry,
        b"Hero 2".to_string(),
        vector[],
        ts.ctx(),
    );
    let hero3 = create_hero(
        &mut registry,
        b"Hero 3".to_string(),
        vector[],
        &mut tx_context::dummy(),
    );

    let hero1_id = object::id(&hero1);
    let hero2_id = object::id(&hero2);
    let hero3_id = object::id(&hero3);

    kill_hero(&mut registry, hero1);
    kill_hero(&mut registry, hero2);

    let alive_heroes = registry.heroes.filter!(|hero_id| !registry.killed_heroes.contains(hero_id));
    assert_eq(alive_heroes.length(), 1);
    assert_eq(alive_heroes.contains(&hero1_id), false);
    assert_eq(alive_heroes.contains(&hero2_id), false);
    assert_eq(alive_heroes.contains(&hero3_id), true);

    destroy(hero3);
    destroy(registry);

    ts.end();
}
