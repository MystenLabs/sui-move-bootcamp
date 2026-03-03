/// Tests for the TREAT token module
#[test_only]
module robot_rental_platform::treat_tests;

use robot_rental_platform::treat::{Self, Faucet};
use sui::clock;
use sui::test_scenario as ts;

#[test]
fun test_init_creates_faucet() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    {
        treat::init_for_testing(scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let faucet = scenario.take_shared<Faucet>();
        assert!(faucet.total_supply() == 0);
        ts::return_shared(faucet);
    };

    scenario.end();
}

#[test]
fun test_request_tokens() {
    let user = @0xB;
    let mut scenario = ts::begin(@0xA);

    {
        treat::init_for_testing(scenario.ctx());
    };

    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 1000);

        treat::request_tokens(&mut faucet, 5, &test_clock, scenario.ctx());

        assert!(faucet.total_supply() == 5);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    scenario.end();
}

#[test]
fun test_request_max_per_request() {
    let user = @0xB;
    let mut scenario = ts::begin(@0xA);

    {
        treat::init_for_testing(scenario.ctx());
    };

    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 1000);

        // Request max per request (10)
        treat::request_tokens(&mut faucet, 10, &test_clock, scenario.ctx());

        assert!(faucet.total_supply() == 10);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::treat::EExceedsRequestLimit)]
fun test_request_exceeds_limit() {
    let user = @0xB;
    let mut scenario = ts::begin(@0xA);

    {
        treat::init_for_testing(scenario.ctx());
    };

    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 1000);

        // Try to request more than max (11 > 10)
        treat::request_tokens(&mut faucet, 11, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    scenario.end();
}

#[test]
fun test_remaining_daily_allowance() {
    let user = @0xB;
    let mut scenario = ts::begin(@0xA);

    {
        treat::init_for_testing(scenario.ctx());
    };

    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 1000);

        // Before any requests, should have full allowance
        assert!(treat::remaining_daily_allowance(&faucet, user, &test_clock) == 100);

        // Request some tokens
        treat::request_tokens(&mut faucet, 5, &test_clock, scenario.ctx());

        // Should have 95 remaining
        assert!(treat::remaining_daily_allowance(&faucet, user, &test_clock) == 95);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    scenario.end();
}
