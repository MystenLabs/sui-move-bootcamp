/// B1 Module Goals (what we tackle here)
/// - Packages/Modules: a single module with minimal public entry points
/// - Compiler flow: simple functions that compile cleanly
/// - Move Tests: sui::test_scenario, assert! (and/or assert_eq)
/// - Objects & drop: contrast an object that must be explicitly deleted
///   with a plain value type that can be ignored/overwritten if it has drop

module basic_move::basic_move;
use std::string::String;
#[test_only]
use sui::test_utils::destroy;
#[test_only]
use sui::test_scenario;

public struct Hero has key, store {
    id: object::UID,
    name: String, // Add a name field to name your Hero
}

// Value type WITH drop → can be ignored/overwritten.
public struct InsignificantWeapon has drop, store {
    power: u8,
}

// Value type WITHOUT drop → cannot be ignored/overwritten.
public struct Weapon has store {
    power: u8,
}

public fun mint_hero(name: String, ctx: &mut TxContext): Hero {
    Hero { id: object::new(ctx), name }
}

public fun create_insignificant_weapon(power: u8): InsignificantWeapon {
    InsignificantWeapon { power }
}

public fun create_weapon(power: u8): Weapon {
    Weapon { power }
}

#[test]
fun test_mint() {
    let mut test = test_scenario::begin(@0xCAFE);
    let hero = mint_hero(b"superman".to_string(), test.ctx());
    assert!(hero.name == b"superman".to_string(), 612);
    destroy_for_testing(hero);
    test.end();
}

// Demonstrate drop vs non-drop semantics
#[test]
fun test_drop_semantics() {
    // 1) Ignoring a value requires `drop`
    let _insignificant_weapon = create_insignificant_weapon(
        1,
    ); // OK: InsignificantWeapon has `drop` → Show compiler error when drop ability is removed

    // 2) Overwriting a variable drops the old value → requires `drop`
    let mut _insignificant_weapon2 = create_insignificant_weapon(2);
    _insignificant_weapon2 = create_insignificant_weapon(3); // OK: InsignificantWeapon has `drop`

    // 3) A type WITHOUT drop cannot be ignored/overwritten implicitly.
    // Correct way: explicitly CONSUME it (e.g., in this test via destroy)
    let weapon = create_weapon(4);
    destroy(weapon); // Consumes Weapon → Comment this line out to see the compiler error message
}

#[test_only]
fun destroy_for_testing(hero: Hero) {
    let Hero {
        id,
        name: _,
    } = hero;
    object::delete(id);
}
