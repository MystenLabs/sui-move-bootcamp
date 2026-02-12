#[test_only]
module package_upgrade::hero_tests;

use sui::dynamic_object_field as dof;

use sui::coin;
use sui::package::Publisher;
use sui::sui::SUI;
use sui::test_scenario;

use package_upgrade::blacksmith;
use package_upgrade::hero;
use package_upgrade::version::{Self, Version};

const EShouldHaveFailed: u64 = 0x100;

#[test]
#[expected_failure(abort_code=hero::EUseMintHeroV2Instead)]
fun hero_mint_should_fail() {
    let sender = @0x11111;
    let mut scenario = test_scenario::begin(sender);
    hero::init_for_testing(scenario.ctx());
    version::init_for_testing(scenario.ctx());

    scenario.next_tx(sender);
    let version = scenario.take_shared<Version>();
    let _hero = hero::mint_hero(&version, scenario.ctx());
    abort(EShouldHaveFailed)
}

