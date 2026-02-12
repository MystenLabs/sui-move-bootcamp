module option_hero::hero;

use std::option::{some, none};
use std::string::String;
use sui::bag::{Self, Bag};

public struct Fire has copy, drop, store ()
public struct Water has copy, drop, store ()
public struct Earth has copy, drop, store ()
public struct Air has copy, drop, store ()

public struct Hero has key {
    id: UID,
    name: String,
    attributes: Bag,
}

/// @dev Creates a new hero with a given name and an empty bag of attributes.
/// @param name The name of the hero.
/// @param ctx The transaction context.
/// @return A new hero with a given name and an empty bag of attributes.
public fun create_hero(name: String, ctx: &mut TxContext): Hero {
    Hero {
        id: object::new(ctx),
        name,
        attributes: bag::new(ctx),
    }
}

public fun increase_fire_attribute(hero: &mut Hero, amount: u16) {
    let fire = if (hero.attributes.contains_with_type<Fire, u16>(Fire())) {
        hero.attributes.borrow_mut<Fire, u16>(Fire())
    } else {
        hero.attributes.add(Fire(), 0u16);
        hero.attributes.borrow_mut<Fire, u16>(Fire())
    };
    *fire = *fire + amount;
}

public fun increase_water_attribute(hero: &mut Hero, amount: u16) {
    let water = if (hero.attributes.contains_with_type<Water, u16>(Water())) {
        hero.attributes.borrow_mut<Water, u16>(Water())
    } else {
        hero.attributes.add(Water(), 0u16);
        hero.attributes.borrow_mut<Water, u16>(Water())
    };
    *water = *water + amount;
}

public fun increase_earth_attribute(hero: &mut Hero, amount: u16) {
    let earth = if (hero.attributes.contains_with_type<Earth, u16>(Earth())) {
        hero.attributes.borrow_mut<Earth, u16>(Earth())
    } else {
        hero.attributes.add(Earth(), 0u16);
        hero.attributes.borrow_mut<Earth, u16>(Earth())
    };
    *earth = *earth + amount;
}

public fun increase_air_attribute(hero: &mut Hero, amount: u16) {
    let air = if (hero.attributes.contains_with_type<Air, u16>(Air())) {
        hero.attributes.borrow_mut<Air, u16>(Air())
    } else {
        hero.attributes.add(Air(), 0u16);
        hero.attributes.borrow_mut<Air, u16>(Air())
    };
    *air = *air + amount;
}

public fun get_fire_attribute(hero: &Hero): Option<u16> {
    let fire = if (hero.attributes.contains_with_type<Fire, u16>(Fire())) {
        some(*hero.attributes.borrow<Fire, u16>(Fire()))
    } else {
        none()
    };
    fire
}

public fun get_water_attribute(hero: &Hero): Option<u16> {
    let water = if (hero.attributes.contains_with_type<Water, u16>(Water())) {
        some(*hero.attributes.borrow<Water, u16>(Water()))
    } else {
        none()
    };
    water
}

public fun get_earth_attribute(hero: &Hero): Option<u16> {
    let earth = if (hero.attributes.contains_with_type<Earth, u16>(Earth())) {
        some(*hero.attributes.borrow<Earth, u16>(Earth()))
    } else {
        none()
    };
    earth
}

public fun get_air_attribute(hero: &Hero): Option<u16> {
    let air = if (hero.attributes.contains_with_type<Air, u16>(Air())) {
        some(*hero.attributes.borrow<Air, u16>(Air()))
    } else {
        none()
    };
    air
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

    assert_eq(hero.attributes.length(), 0);

    increase_water_attribute(&mut hero, 20);
    increase_air_attribute(&mut hero, 40);

    assert_eq(get_fire_attribute(&hero), none());
    assert_eq(get_water_attribute(&hero), some(20));
    assert_eq(get_earth_attribute(&hero), none());
    assert_eq(get_air_attribute(&hero), some(40));

    destroy(hero);
}
