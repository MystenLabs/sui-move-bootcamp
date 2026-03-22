#[test_only]
module depin_energy_monitor::watt_tests;

use depin_energy_monitor::watt::{Self, RewardVault};
use sui::clock;
use sui::test_scenario as ts;

#[test]
fun test_init_creates_shared_reward_vault() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    {
        watt::init_for_testing(scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let vault = scenario.take_shared<RewardVault>();
        assert!(watt::total_supply(&vault) == 0);
        assert!(watt::max_reward_per_reading(&vault) == 100);
        ts::return_shared(vault);
    };

    scenario.end();
}

#[test]
fun test_reward_for_verified_kwh_mints_whole_watt() {
    let admin = @0xA;
    let recipient = @0xB;
    let mut scenario = ts::begin(admin);

    {
        watt::init_for_testing(scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let mut vault = scenario.take_shared<RewardVault>();
        watt::reward_for_verified_kwh(&mut vault, recipient, 2_000, scenario.ctx());
        assert!(watt::total_supply(&vault) == 2);
        ts::return_shared(vault);
    };

    scenario.end();
}

#[test]
fun test_demo_faucet_tracks_allowance() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    {
        watt::init_for_testing(scenario.ctx());
    };

    scenario.next_tx(user);
    {
        let mut vault = scenario.take_shared<RewardVault>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 1_000);

        watt::request_demo_tokens(&mut vault, 10, &test_clock, scenario.ctx());
        assert!(watt::total_supply(&vault) == 10);
        assert!(watt::remaining_daily_allowance(&vault, user, &test_clock) == 40);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(vault);
    };

    scenario.end();
}
