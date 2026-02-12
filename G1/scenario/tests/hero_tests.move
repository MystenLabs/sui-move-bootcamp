#[test_only]
module scenario::hero_tests;

use sui::test_scenario;

use scenario::acl::{Self, Admins};
use scenario::hero::{Self, Hero};
use scenario::xp_tome::{Self, XPTome};

#[test]
fun test_mint() {
    let admin = @0x11111;
    let hero_owner = @0x22222;
    let health = 100;
    let stamina = 10;

    // Initialize package
    let mut scenario = test_scenario::begin(admin);
    acl::init_for_testing(scenario.ctx());

    // Mint `Hero`
    scenario.next_tx(admin);
    {
        let admins = scenario.take_shared<Admins>();
        hero::mint(&admins, health, stamina, hero_owner, scenario.ctx());
        test_scenario::return_shared(admins);
    };

    let mint_effects = scenario.next_tx(hero_owner);
    let mut transferred = mint_effects.transferred_to_account();
    assert!(transferred.size() == 1);
    let (hero_id, transferred_to) = transferred.pop();
    assert!(transferred_to == hero_owner);
    // Check `Hero`'s fields
    {
        let hero = scenario.take_from_sender<Hero>();
        assert!(hero_id == object::id(&hero));
        assert!(hero.health() == health);
        assert!(hero.stamina() == stamina);
        scenario.return_to_sender(hero);
    };

    scenario.end();
}

#[test]
fun test_level_up() {
    let admin = @0x11111;
    let hero_owner = @0x22222;
    let health = 100;
    let xp_health = 10;
    let stamina = 10;
    let xp_stamina = 2;

    // Initialize package
    let mut scenario = test_scenario::begin(admin);
    acl::init_for_testing(scenario.ctx());

    // Mint `Hero` and `XPTome`
    scenario.next_tx(admin);
    {
        let admins = scenario.take_shared<Admins>();
        hero::mint(&admins, health, stamina, hero_owner, scenario.ctx());
        xp_tome::new(&admins, xp_health, xp_stamina, hero_owner, scenario.ctx());
        test_scenario::return_shared(admins);
    };

    let mint_effects = scenario.next_tx(hero_owner);
    let transferred = mint_effects.transferred_to_account();
    assert!(transferred.size() == 2);
    // Apply `XPTome` to `Hero` and check updated stats.
    {
        let mut hero = scenario.take_from_sender<Hero>();
        let xp_tome = scenario.take_from_sender<XPTome>();
        assert!(transferred.get(&object::id(&hero)) == hero_owner);
        assert!(transferred.get(&object::id(&xp_tome)) == hero_owner);
        assert!(hero.health() == health);
        assert!(hero.stamina() == stamina);
        hero.level_up(xp_tome);
        assert!(hero.health() == health + xp_health);
        assert!(hero.stamina() == stamina + xp_stamina);
        scenario.return_to_sender(hero);
    };

    scenario.end();
}
