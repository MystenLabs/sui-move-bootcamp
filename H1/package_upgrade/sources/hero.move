module package_upgrade::hero;

use sui::package;

public struct HERO() has drop;

/// Hero NFT
public struct Hero has key, store {
    id: UID,
    lvl: u64,
    xp: u64,
    xp_2_lvl_up: u64,
}

fun init(otw: HERO, ctx: &mut TxContext) {
    package::claim_and_keep(otw, ctx);
}

/// Anyone can mint a hero.
/// Hero starts at level 1 with 0 XP, needing 100 XP to level up.
public fun mint_hero(ctx: &mut TxContext) {
    let hero = Hero {
        id: object::new(ctx),
        lvl: 1,
        xp: 0,
        xp_2_lvl_up: 100,
    };
    transfer::transfer(hero, ctx.sender());
}

// === Package Accessors ===

public(package) fun lvl(self: &Hero): u64 { self.lvl }
public(package) fun xp(self: &Hero): u64 { self.xp }
public(package) fun xp_2_lvl_up(self: &Hero): u64 { self.xp_2_lvl_up }

// === Package Mutators ===

public(package) fun add_xp(self: &mut Hero, amount: u64) {
    self.xp = self.xp + amount;
}

public(package) fun set_lvl(self: &mut Hero, value: u64) {
    self.lvl = value;
}

public(package) fun set_xp(self: &mut Hero, value: u64) {
    self.xp = value;
}

public(package) fun set_xp_2_lvl_up(self: &mut Hero, value: u64) {
    self.xp_2_lvl_up = value;
}
