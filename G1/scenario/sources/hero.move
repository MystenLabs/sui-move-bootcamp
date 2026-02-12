module scenario::hero;

use scenario::acl::Admins;
use scenario::xp_tome::XPTome;

public struct HERO() has drop;

/// Hero NFT
public struct Hero has key {
    id: UID,
    health: u64,
    stamina: u64,
}

/// Admins can mint a hero.
public fun mint(
    admins: &Admins,
    health: u64,
    stamina: u64,
    recipient: address,
    ctx: &mut TxContext
) {
    admins.authorize(ctx);
    transfer::transfer(Hero {
        id: object::new(ctx),
        health,
        stamina
    }, recipient);
}

public fun health(self: &Hero): u64 {
    self.health
}

public fun stamina(self: &Hero): u64 {
    self.stamina
}

/// `Hero` can increase its stats by using an `XPTome`.
public fun level_up(self: &mut Hero, tome: XPTome) {
    let (health, stamina) = tome.destroy();
    self.health = self.health + health;
    self.stamina = self.stamina + stamina;
}

#[test]
fun test_mint() {
    use sui::test_utils;
    use scenario::acl;

    let admin = @0x11111;
    let hero_owner = @0x22222;
    let health = 100;
    let stamina = 10;

    let admins = acl::new_admins_for_testing(admin);
    mint(&admins, health, stamina, hero_owner, &mut tx_context::new_from_hint(admin, 0, 0, 0, 0));
    test_utils::destroy(admins);
}

#[test]
fun test_level_up() {
    use scenario::xp_tome;
    let health = 100;
    let xp_health = 10;
    let stamina = 10;
    let xp_stamina = 2;
    let mut hero = Hero {
        id: object::new(&mut tx_context::dummy()),
        health,
        stamina
    };
    let xp_tome = xp_tome::new_for_testing(xp_health, xp_stamina);

    hero.level_up(xp_tome);
    assert!(hero.health() == health + xp_health);
    assert!(hero.stamina() == stamina + xp_stamina);
    
    let Hero { id, health: _, stamina: _ } = hero;
    id.delete();
}

