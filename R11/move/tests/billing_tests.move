#[test_only]
module depin_energy_monitor::billing_tests;

use depin_energy_monitor::billing::{Self, BillingSession};
use depin_energy_monitor::watt::{Self, RewardVault, WATT};
use sui::coin::Coin;
use sui::test_scenario as ts;

#[test]
fun test_open_and_settle_billing_session() {
    let admin = @0xA;
    let customer = @0xB;
    let operator = @0xC;
    let mut scenario = ts::begin(admin);

    {
        watt::init_for_testing(scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let mut vault = scenario.take_shared<RewardVault>();
        watt::reward_for_verified_kwh(&mut vault, customer, 5_000, scenario.ctx());
        ts::return_shared(vault);
    };

    scenario.next_tx(customer);
    {
        let deposit = scenario.take_from_sender<Coin<WATT>>();
        billing::open_session(
            operator,
            b"meter-lab-01".to_string(),
            1,
            deposit,
            scenario.ctx(),
        );
    };

    scenario.next_tx(operator);
    {
        let mut session = scenario.take_shared<BillingSession>();
        billing::settle_usage(&mut session, 2_000, scenario.ctx());
        assert!(billing::remaining_escrow(&session) == 3);
        assert!(billing::total_charged(&session) == 2);
        ts::return_shared(session);
    };

    scenario.next_tx(customer);
    {
        let session = scenario.take_shared<BillingSession>();
        billing::close_session(session, scenario.ctx());
    };

    scenario.end();
}
