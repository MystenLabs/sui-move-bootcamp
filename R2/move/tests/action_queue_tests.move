#[test_only]
module action_queue::action_queue;

use action_queue::robot_queue::{
    ActionQueue,
    add_action,
    admin,
    clear_queue,
    create_queue,
    get_all_actions,
    peek_next,
    pop_action,
    queue_length,
    total_added,
    total_processed
};
use sui::test_scenario;

#[test]
fun test_create_and_add() {
    let admin_addr = @0x1;
    let user = @0x2;

    let mut scenario = test_scenario::begin(admin_addr);

    // Create the queue
    {
        create_queue(scenario.ctx());
    };

    // Add an action as a different user
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<ActionQueue>();
        let clock = sui::clock::create_for_testing(scenario.ctx());

        add_action(
            &mut queue,
            b"sit".to_string(),
            &clock,
            scenario.ctx(),
        );

        assert!(queue_length(&queue) == 1);
        assert!(total_added(&queue) == 1);

        clock.destroy_for_testing();
        test_scenario::return_shared(queue);
    };

    scenario.end();
}

#[test]
fun test_pop_action() {
    let admin_addr = @0x1;

    let mut scenario = test_scenario::begin(admin_addr);

    // Create queue and add action
    {
        create_queue(scenario.ctx());
    };

    scenario.next_tx(admin_addr);
    {
        let mut queue = scenario.take_shared<ActionQueue>();
        let clock = sui::clock::create_for_testing(scenario.ctx());

        add_action(&mut queue, b"wave".to_string(), &clock, scenario.ctx());
        add_action(&mut queue, b"sit".to_string(), &clock, scenario.ctx());

        assert!(queue_length(&queue) == 2);

        pop_action(&mut queue, scenario.ctx());

        assert!(queue_length(&queue) == 1);
        assert!(total_processed(&queue) == 1);

        // Next action should be "sit"
        let next = peek_next(&queue);
        assert!(next.is_some());

        clock.destroy_for_testing();
        test_scenario::return_shared(queue);
    };

    scenario.end();
}

#[test]
fun test_clear_queue() {
    let admin_addr = @0x1;

    let mut scenario = test_scenario::begin(admin_addr);

    { create_queue(scenario.ctx()); };

    scenario.next_tx(admin_addr);
    {
        let mut queue = scenario.take_shared<ActionQueue>();
        let clock = sui::clock::create_for_testing(scenario.ctx());

        add_action(&mut queue, b"sit".to_string(), &clock, scenario.ctx());
        add_action(&mut queue, b"wave".to_string(), &clock, scenario.ctx());
        add_action(&mut queue, b"jump".to_string(), &clock, scenario.ctx());
        assert!(queue_length(&queue) == 3);

        clear_queue(&mut queue, scenario.ctx());
        assert!(queue_length(&queue) == 0);

        clock.destroy_for_testing();
        test_scenario::return_shared(queue);
    };

    scenario.end();
}

#[test]
fun test_peek_next_empty() {
    let admin_addr = @0x1;

    let mut scenario = test_scenario::begin(admin_addr);

    { create_queue(scenario.ctx()); };

    scenario.next_tx(admin_addr);
    {
        let queue = scenario.take_shared<ActionQueue>();
        assert!(peek_next(&queue).is_none());
        test_scenario::return_shared(queue);
    };

    scenario.end();
}

#[test]
fun test_view_functions() {
    let admin_addr = @0x1;

    let mut scenario = test_scenario::begin(admin_addr);

    { create_queue(scenario.ctx()); };

    scenario.next_tx(admin_addr);
    {
        let mut queue = scenario.take_shared<ActionQueue>();
        let clock = sui::clock::create_for_testing(scenario.ctx());

        // Check initial state
        assert!(admin(&queue) == admin_addr);
        assert!(queue_length(&queue) == 0);
        assert!(total_added(&queue) == 0);
        assert!(total_processed(&queue) == 0);
        assert!(get_all_actions(&queue).length() == 0);

        // Add actions and verify
        add_action(&mut queue, b"sit".to_string(), &clock, scenario.ctx());
        add_action(&mut queue, b"wave".to_string(), &clock, scenario.ctx());

        assert!(get_all_actions(&queue).length() == 2);
        assert!(total_added(&queue) == 2);

        clock.destroy_for_testing();
        test_scenario::return_shared(queue);
    };

    scenario.end();
}

// ============================================
// Error path tests
// ============================================

#[test, expected_failure(abort_code = action_queue::robot_queue::ENotAuthorized)]
fun test_pop_action_not_admin() {
    let admin_addr = @0x1;
    let user = @0x2;

    let mut scenario = test_scenario::begin(admin_addr);

    { create_queue(scenario.ctx()); };

    // Admin adds an action
    scenario.next_tx(admin_addr);
    {
        let mut queue = scenario.take_shared<ActionQueue>();
        let clock = sui::clock::create_for_testing(scenario.ctx());
        add_action(&mut queue, b"sit".to_string(), &clock, scenario.ctx());
        clock.destroy_for_testing();
        test_scenario::return_shared(queue);
    };

    // Non-admin tries to pop — should abort
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<ActionQueue>();
        pop_action(&mut queue, scenario.ctx());
        test_scenario::return_shared(queue);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = action_queue::robot_queue::EQueueEmpty)]
fun test_pop_empty_queue() {
    let admin_addr = @0x1;

    let mut scenario = test_scenario::begin(admin_addr);

    { create_queue(scenario.ctx()); };

    // Admin tries to pop from empty queue — should abort
    scenario.next_tx(admin_addr);
    {
        let mut queue = scenario.take_shared<ActionQueue>();
        pop_action(&mut queue, scenario.ctx());
        test_scenario::return_shared(queue);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = action_queue::robot_queue::ENotAuthorized)]
fun test_clear_queue_not_admin() {
    let admin_addr = @0x1;
    let user = @0x2;

    let mut scenario = test_scenario::begin(admin_addr);

    { create_queue(scenario.ctx()); };

    // Non-admin tries to clear — should abort
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<ActionQueue>();
        clear_queue(&mut queue, scenario.ctx());
        test_scenario::return_shared(queue);
    };

    scenario.end();
}
