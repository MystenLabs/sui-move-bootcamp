module scenario::xp_tome;

use scenario::acl::Admins;

/// XPTome is used to level-up a Hero.
public struct XPTome has key {
    id: UID,
    /// Health to be added to the `Hero`'s health.
    health: u64,
    /// Stamina to be added to the `Hero`'s health.
    stamina: u64
}

public fun new(
    admins: &Admins,
    health: u64,
    stamina: u64,
    recipient: address,
    ctx: &mut TxContext
) {
    admins.authorize(ctx);
    transfer::transfer(XPTome {
        id: object::new(ctx),
        health,
        stamina,
    }, recipient);
}

public fun health(self: &XPTome): u64 {
    self.health
}

public fun stamina(self: &XPTome): u64 {
    self.stamina
}

public(package) fun destroy(self: XPTome): (u64, u64) {
    let XPTome { id, health, stamina } = self;
    id.delete();
    (health, stamina)
}

#[test_only]
public fun new_for_testing(health: u64, stamina: u64): XPTome {
    XPTome {
        id: object::new(&mut tx_context::dummy()),
        health,
        stamina
    }
}

#[test_only]
use std::unit_test;
#[test_only]
use scenario::acl;

#[test]
fun test_new() {
    let admin = @0x11111;
    let hero_owner = @0x22222;
    let health = 20;
    let stamina = 5;
    let admins = acl::new_admins_for_testing(admin);

    new(&admins, health, stamina, hero_owner, &mut tx_context::new_from_hint(admin, 0, 0, 0, 0));

    unit_test::destroy(admins);
}
