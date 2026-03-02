#[test_only]
module multiplayer_robot::multiplayer_queue_tests;

use multiplayer_robot::multiplayer_queue::{
    Self,
    MultiplayerQueue,
    create_queue,
    queue_action,
    set_max_pending
};
use sui::clock;
use sui::test_scenario as ts;

#[test]
fun test_create_queue() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    {
        create_queue(b"TestQueue".to_string(), scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let queue = scenario.take_shared<MultiplayerQueue>();
        assert!(multiplayer_queue::queue_length(&queue) == 0);
        assert!(multiplayer_queue::is_admin(&queue, admin));
        assert!(!multiplayer_queue::is_paused(&queue));
        ts::return_shared(queue);
    };

    scenario.end();
}

#[test]
fun test_queue_action() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    // Create queue
    {
        create_queue(b"TestQueue".to_string(), scenario.ctx());
    };

    // Create clock
    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000);

    // User queues action
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"wave".to_string(), &test_clock, scenario.ctx());
        assert!(multiplayer_queue::queue_length(&queue) == 1);
        assert!(multiplayer_queue::user_pending_count(&queue, user) == 1);
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

#[test]
fun test_pending_limit() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    // Create queue with max 2 pending
    {
        create_queue(b"TestQueue".to_string(), scenario.ctx());
    };

    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());

    // Set low pending limit
    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        set_max_pending(&mut queue, 2, scenario.ctx());
        ts::return_shared(queue);
    };

    // Queue 2 actions (should work)
    clock::set_for_testing(&mut test_clock, 1000);
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"sit".to_string(), &test_clock, scenario.ctx());
        ts::return_shared(queue);
    };

    clock::set_for_testing(&mut test_clock, 100000); // Past cooldown
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"stand".to_string(), &test_clock, scenario.ctx());
        assert!(multiplayer_queue::user_pending_count(&queue, user) == 2);
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}
