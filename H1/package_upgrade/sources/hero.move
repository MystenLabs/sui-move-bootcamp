module package_upgrade::hero;

use std::string::String;

use sui::dynamic_field as df;
use sui::dynamic_object_field as dof;
use sui::package;

use package_upgrade::blacksmith::{Shield, Sword};
use package_upgrade::version::Version;

const EAlreadyEquippedShield: u64 = 0;
const EAlreadyEquippedSword: u64 = 1;

public struct HERO() has drop;

/// Hero NFT
public struct Hero has key, store {
    id: UID,
    health: u64,
    stamina: u64,
}

fun init(otw: HERO, ctx: &mut TxContext) {
    package::claim_and_keep(otw, ctx);
}

/// Anyone can mint a hero.
/// Hero starts with 100 health and 10 stamina.
public fun mint_hero(version: &Version, ctx: &mut TxContext): Hero {
    version.check_is_valid();
    Hero {
        id: object::new(ctx),
        health: 100,
        stamina: 10
    }
}

/// Hero can equip a single sword.
public fun equip_sword(self: &mut Hero, version: &Version, sword: Sword) {
    version.check_is_valid();
    if (df::exists_(&self.id, b"sword".to_string())) {
        abort(EAlreadyEquippedSword)
    };
    self.add_dof(b"sword".to_string(), sword)
}

/// Hero can equip a single shield.
public fun equip_shield(self: &mut Hero, version: &Version, shield: Shield) {
    version.check_is_valid();
    if (df::exists_(&self.id, b"shield".to_string())) {
        abort(EAlreadyEquippedShield)
    };
    self.add_dof(b"shield".to_string(), shield)
}

public fun health(self: &Hero): u64 {
    self.health
}

public fun stamina(self: &Hero): u64 {
    self.stamina
}

/// Returns the sword the hero has equipped.
/// Aborts if it does not exist.
public fun sword(self: &Hero): &Sword {
    dof::borrow(&self.id, b"sword".to_string())
}

/// Returns the shield the hero has equipped.
/// Aborts if it does not exist.
public fun shield(self: &Hero): &Shield {
    dof::borrow(&self.id, b"shield".to_string())
}

/// Generic add dynamic object field to the hero.
fun add_dof<T: key + store>(self: &mut Hero, name: String, value: T) {
    dof::add(&mut self.id, name, value)
}

#[test_only]
public fun init_for_testing(ctx: &mut TxContext) {
    init(HERO(), ctx);
}

#[test_only]
public fun uid_mut_for_testing(self: &mut Hero): &mut UID {
    &mut self.id
}

