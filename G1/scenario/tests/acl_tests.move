#[test_only]
module scenario::acl_tests;

use sui::test_scenario;

use scenario::acl::{Self, Admins, AdminCap};

#[test]
fun test_add_admin() {
    let initial_admin = @0x11111;
    let new_admin = @0x22222;

    // Initialize package
    let mut scenario = test_scenario::begin(initial_admin);
    acl::init_for_testing(scenario.ctx());

    let begin_effects = scenario.next_tx(initial_admin);
    let created = begin_effects.created();
    let shared = begin_effects.shared();
    let transferred = begin_effects.transferred_to_account();
    assert!(created.length() == 3);
    assert!(shared.length() == 1);
    assert!(transferred.size() == 2);

    // Add admin `new_admin`
    {
        let admin_cap = scenario.take_from_sender<AdminCap>();
        let mut admins = scenario.take_shared<Admins>();
        assert!(created.contains(&object::id(&admin_cap)));
        assert!(created.contains(&object::id(&admins)));
        assert!(shared.contains(&object::id(&admins)));
        assert!(transferred.get(&object::id(&admin_cap)) == initial_admin);
        admins.add_admin(&admin_cap, new_admin);

        scenario.return_to_sender(admin_cap);
        test_scenario::return_shared(admins);
    };

    // Authorize admin `new_admin`
    scenario.next_tx(new_admin);
    {
        let admins = scenario.take_shared<Admins>();
        admins.authorize(scenario.ctx());
        test_scenario::return_shared(admins);
    };

    scenario.end();
}
