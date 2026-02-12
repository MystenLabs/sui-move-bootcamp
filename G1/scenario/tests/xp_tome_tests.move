#[test_only]
module scenario::xp_tome_tests;

use sui::test_scenario;

use scenario::acl::{Self, Admins};
use scenario::xp_tome::{Self, XPTome};

#[test]
fun test_new_xp_tome() {
    let admin = @0x11111;
    let hero_owner = @0x22222;
    let health = 20;
    let stamina = 5;

    // Initialize package
    let mut scenario = test_scenario::begin(admin);
    acl::init_for_testing(scenario.ctx());

    // Create new `XPTome`
    scenario.next_tx(admin);
    {
        let admins = scenario.take_shared<Admins>();
        xp_tome::new(&admins, health, stamina, hero_owner, scenario.ctx());
        test_scenario::return_shared(admins);
    };

    // Check `XPTome`'s field values
    let new_tome_effects = scenario.next_tx(hero_owner);
    assert!(new_tome_effects.transferred_to_account().size() == 1);
    {
        let tome = scenario.take_from_sender<XPTome>();
        assert!(tome.health() == health);
        assert!(tome.stamina() == stamina);
        scenario.return_to_sender(tome);
    };

    scenario.end();
}

