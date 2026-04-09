#[test_only]
module scenario::acl_tests;

use sui::test_scenario;

use scenario::acl;

#[test]
fun test_add_admin() {
    let initial_admin = @0x11111;
    let new_admin = @0x22222;

    // Initialize package
    let mut scenario = test_scenario::begin(initial_admin);
    acl::init(sui::test_utils::create_one_time_witness<acl::ACL>(), scenario.ctx());

    let begin_effects = scenario.next_tx(initial_admin);
    let created = begin_effects.created();
    let shared = begin_effects.shared();
    let transferred = begin_effects.transferred_to_account();
    assert!(created.length() == 3);
    assert!(shared.length() == 1);
    assert!(transferred.length() == 2);

    // Task: Add admin `new_admin`
    {

    };

    // Task: Authorize admin `new_admin`
    {

    };

    scenario.end();
}
