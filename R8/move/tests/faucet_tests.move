#[test_only]
module robot_tokenomics::faucet_tests;

use robot_tokenomics::cookie::{Self, MintCap};
use robot_tokenomics::faucet::{Self, FaucetManager, remaining_allowance, request};
use sui::clock;
use sui::test_scenario as ts;

#[test]
fun test_faucet_request() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    // Initialize both modules
    {
        cookie::init_for_testing(scenario.ctx());
        faucet::init_for_testing(scenario.ctx());
    };

    // Create a test clock
    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000); // Set time to 1 second

    // User requests from faucet
    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<FaucetManager>();
        let mut mint_cap = scenario.take_shared<MintCap>();

        request(&mut faucet, &mut mint_cap, &test_clock, scenario.ctx());

        // Check user got 10 tokens (FAUCET_AMOUNT)
        assert!(remaining_allowance(&faucet, user, &test_clock) == 90);

        ts::return_shared(faucet);
        ts::return_shared(mint_cap);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}
