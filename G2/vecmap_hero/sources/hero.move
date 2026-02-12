module vecmap_hero::vecmap_hero;

use std::string::String;
use sui::vec_map::{Self, VecMap};

public struct HeroRegistry has key {
    id: UID,
    heroes: VecMap<ID, bool>, // <hero_id, is_alive>
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
        heroes: vec_map::empty(),
    };
    transfer::share_object(r)
}

/// @dev This function is used to create a hero with a vector of attributes.
/// @dev It uses the map! macro to iterate over the attributes keys and convert each attribute name to an attribute object.
/// @notice It accepts a VecMap (K,V) of attribute names (K) and converts them to attributes with a level equal to (V).
///         Note that this is not necessarily the best approach in terms of performance but it's used to show case the 
///         way we can add a VecMap as an input parameter to a function from the client side.
/// @param name The name of the hero.
/// @param attributes The attributes names of the hero.`
/// @param ctx The transaction context.
/// @return The hero.
public fun create_hero(
    r: &mut HeroRegistry,
    name: String,
    attributes: VecMap<String, u64>,
    ctx: &mut TxContext,
): Hero {
    let hero_attributes = attributes
        .keys()
        .map!(|attribute| Attribute { name: attribute, level: *attributes.get(&attribute) });

    let hero = Hero {
        id: object::new(ctx),
        name,
        attributes: hero_attributes,
    };

    let hero_id = object::id(&hero);
    r.heroes.insert(hero_id, true);

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
    let hero_alive = r.heroes.get_mut(&hero_id);
    *hero_alive = false;
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
        vec_map::empty(),
        ts.ctx(),
    );
    let hero2 = create_hero(
        &mut registry,
        b"Hero 2".to_string(),
        vec_map::empty(),
        ts.ctx(),
    );
    let hero3 = create_hero(
        &mut registry,
        b"Hero 3".to_string(),
        vec_map::empty(),
        ts.ctx(),
    );

    let hero1_id = object::id(&hero1);
    let hero2_id = object::id(&hero2);
    let hero3_id = object::id(&hero3);

    kill_hero(&mut registry, hero1);
    kill_hero(&mut registry, hero2);

    let alive_heroes = registry.heroes.keys().filter!(|hero_id| *registry.heroes.get(hero_id));
    assert_eq(alive_heroes.length(), 1);
    assert_eq(alive_heroes.contains(&hero1_id), false);
    assert_eq(alive_heroes.contains(&hero2_id), false);
    assert_eq(alive_heroes.contains(&hero3_id), true);

    destroy(hero3);
    destroy(registry);

    ts.end();
}
