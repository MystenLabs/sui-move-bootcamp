#[test_only]
module package_upgrade::hero_tests;

use sui::test_scenario;

use package_upgrade::blacksmith;
use package_upgrade::hero;
use package_upgrade::version::{Self, Version};

const SENDER: address = @0x01;

#[test]
fun mint_hero_succeeds() {
    let mut scenario = test_scenario::begin(SENDER);
    hero::init_for_testing(scenario.ctx());
    version::init_for_testing(scenario.ctx());

    scenario.next_tx(SENDER);
    let version = scenario.take_shared<Version>();
    let hero = hero::mint_hero(&version, scenario.ctx());

    std::unit_test::assert_eq!(hero.health(), 100);
    std::unit_test::assert_eq!(hero.stamina(), 10);

    std::unit_test::destroy(hero);
    test_scenario::return_shared(version);
    scenario.end();
}

#[test]
fun hero_equips_sword() {
    let mut scenario = test_scenario::begin(SENDER);
    hero::init_for_testing(scenario.ctx());
    version::init_for_testing(scenario.ctx());

    scenario.next_tx(SENDER);
    let version = scenario.take_shared<Version>();
    let publisher = scenario.take_from_sender<sui::package::Publisher>();

    let mut hero = hero::mint_hero(&version, scenario.ctx());
    let blacksmith = blacksmith::new_blacksmith(&publisher, 50, scenario.ctx());
    let sword = blacksmith.new_sword(30, scenario.ctx());

    hero.equip_sword(&version, sword);
    std::unit_test::assert_eq!(hero.sword().attack(), 30);

    std::unit_test::destroy(blacksmith);
    std::unit_test::destroy(hero);
    test_scenario::return_to_sender(&scenario, publisher);
    test_scenario::return_shared(version);
    scenario.end();
}

#[test]
fun hero_equips_shield() {
    let mut scenario = test_scenario::begin(SENDER);
    hero::init_for_testing(scenario.ctx());
    version::init_for_testing(scenario.ctx());

    scenario.next_tx(SENDER);
    let version = scenario.take_shared<Version>();
    let publisher = scenario.take_from_sender<sui::package::Publisher>();

    let mut hero = hero::mint_hero(&version, scenario.ctx());
    let blacksmith = blacksmith::new_blacksmith(&publisher, 50, scenario.ctx());
    let shield = blacksmith.new_shield(40, scenario.ctx());

    hero.equip_shield(&version, shield);
    std::unit_test::assert_eq!(hero.shield().defence(), 40);

    std::unit_test::destroy(blacksmith);
    std::unit_test::destroy(hero);
    test_scenario::return_to_sender(&scenario, publisher);
    test_scenario::return_shared(version);
    scenario.end();
}
