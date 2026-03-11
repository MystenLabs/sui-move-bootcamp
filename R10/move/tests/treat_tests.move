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

#[test, expected_failure(abort_code = ::robot_rental_platform::treat::EExceedsRequestLimit)]
fun test_request_zero_tokens() {
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

        // Try to request 0 tokens
        treat::request_tokens(&mut faucet, 0, &test_clock, scenario.ctx());

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

#[test, expected_failure(abort_code = ::robot_rental_platform::treat::EExceedsDailyLimit)]
fun test_daily_limit_enforcement() {
    let user = @0xB;
    let mut scenario = ts::begin(@0xA);

    {
        treat::init_for_testing(scenario.ctx());
    };

    // Request 10 tokens, 10 times = 100 (the daily limit)
    let mut i: u8 = 0;
    while (i < 10) {
        scenario.next_tx(user);
        {
            let mut faucet = scenario.take_shared<Faucet>();
            let mut test_clock = clock::create_for_testing(scenario.ctx());
            clock::set_for_testing(&mut test_clock, 1000);

            treat::request_tokens(&mut faucet, 10, &test_clock, scenario.ctx());

            clock::destroy_for_testing(test_clock);
            ts::return_shared(faucet);
        };
        i = i + 1;
    };

    // This 11th request should fail (daily limit = 100, already used 100)
    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 1000);

        treat::request_tokens(&mut faucet, 1, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    scenario.end();
}

#[test]
fun test_daily_limit_resets_next_day() {
    let user = @0xB;
    let mut scenario = ts::begin(@0xA);

    {
        treat::init_for_testing(scenario.ctx());
    };

    // Use up 10 tokens on day 0
    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 1000); // day 0

        treat::request_tokens(&mut faucet, 10, &test_clock, scenario.ctx());
        assert!(treat::remaining_daily_allowance(&faucet, user, &test_clock) == 90);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    // Advance clock to next day and verify allowance resets
    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        // DAY_IN_MS = 86_400_000, so set to just over 1 day
        clock::set_for_testing(&mut test_clock, 86_400_001);

        // Allowance should reset to 100 on new day
        assert!(treat::remaining_daily_allowance(&faucet, user, &test_clock) == 100);

        // Should be able to request again
        treat::request_tokens(&mut faucet, 10, &test_clock, scenario.ctx());
        assert!(faucet.total_supply() == 20); // 10 from day 0 + 10 from day 1

        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    scenario.end();
}

#[test]
fun test_multiple_users_independent_limits() {
    let user_a = @0xA;
    let user_b = @0xB;
    let mut scenario = ts::begin(@0xC);

    {
        treat::init_for_testing(scenario.ctx());
    };

    // User A requests tokens
    scenario.next_tx(user_a);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 1000);

        treat::request_tokens(&mut faucet, 10, &test_clock, scenario.ctx());
        assert!(treat::remaining_daily_allowance(&faucet, user_a, &test_clock) == 90);
        // User B still has full allowance
        assert!(treat::remaining_daily_allowance(&faucet, user_b, &test_clock) == 100);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    // User B requests tokens independently
    scenario.next_tx(user_b);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 1000);

        treat::request_tokens(&mut faucet, 5, &test_clock, scenario.ctx());
        assert!(treat::remaining_daily_allowance(&faucet, user_b, &test_clock) == 95);
        // User A still at 90
        assert!(treat::remaining_daily_allowance(&faucet, user_a, &test_clock) == 90);
        assert!(faucet.total_supply() == 15);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    scenario.end();
}

#[test]
fun test_max_per_request_and_max_per_day_constants() {
    assert!(treat::max_per_request() == 10);
    assert!(treat::max_per_day() == 100);
}
