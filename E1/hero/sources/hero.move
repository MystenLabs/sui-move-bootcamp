module hero::hero;
use hero::blacksmith::Sword;
use std::string::String;
use sui::dynamic_field as df;
use sui::dynamic_object_field as dof;

const EAlreadyEquipedSword: u64 = 1;

/// Hero NFT
public struct Hero has key, store {
    id: UID,
    health: u64,
    stamina: u64,
}

/// Anyone can mint a hero.
/// Hero starts with 100 heath and 10 stamina.
public fun mint_hero(ctx: &mut TxContext): Hero {
    Hero {
        id: object::new(ctx),
        health: 100,
        stamina: 10,
    }
}

/// Hero can equip a single sword.
/// Equiping a sword increases the `Hero`'s power by its attack.
public fun equip_sword(self: &mut Hero, sword: Sword) {
    if (df::exists_(&self.id, b"sword".to_string())) {
        abort (EAlreadyEquipedSword)
    };
    self.add_dof(b"sword".to_string(), sword)
}

public fun health(self: &Hero): u64 {
    self.health
}

public fun stamina(self: &Hero): u64 {
    self.stamina
}

/// Returns the sword the hero has equipped.
/// Aborts if it does not exists
public fun sword(self: &Hero): &Sword {
    dof::borrow(&self.id, b"sword")
}

/// Generic add dynamic object field to the hero.
fun add_dof<T: key + store>(self: &mut Hero, name: String, value: T) {
    dof::add(&mut self.id, name, value)
}

#[test_only]
public fun uid_mut_for_testing(self: &mut Hero): &mut UID {
    &mut self.id
}
