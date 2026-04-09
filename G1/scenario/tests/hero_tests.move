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

    // Task: Mint `Hero`
    {

    };

    let mint_effects = scenario.next_tx(hero_owner);
    let mut transferred = mint_effects.transferred_to_account();
    assert!(transferred.length() == 1);
    let (hero_id, transferred_to) = transferred.pop();
    assert!(transferred_to == hero_owner);
    // Task: Check `Hero`'s fields
    {

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

    // Task: Mint `Hero` and `XPTome`
    {

    };

    let mint_effects = scenario.next_tx(hero_owner);
    let transferred = mint_effects.transferred_to_account();
    assert!(transferred.length() == 2);
    // Task: Apply `XPTome` to `Hero` and check updated stats.
    {

    };

    scenario.end();
}
