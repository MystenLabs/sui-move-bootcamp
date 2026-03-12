#[test_only]
module robot_tokenomics::cookie_tests;

use robot_tokenomics::cookie::{Self, MintCap};
use sui::test_scenario as ts;

const MAX_SUPPLY: u64 = 10_000;

#[test]
fun test_init_creates_shared_mint_cap() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    // init is called automatically, but in tests we simulate it
    {
        cookie::init_for_testing(scenario.ctx());
    };

    // Check MintCap was shared
    scenario.next_tx(admin);
    {
        let mint_cap = scenario.take_shared<MintCap>();
        assert!(mint_cap.total_supply() == 0);
        assert!(mint_cap.max_supply() == MAX_SUPPLY);
        ts::return_shared(mint_cap);
    };

    scenario.end();
}
