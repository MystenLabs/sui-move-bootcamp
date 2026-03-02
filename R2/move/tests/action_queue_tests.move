#[test_only]
module action_queue::action_queue;

use action_queue::robot_queue::{
    ActionQueue,
    add_action,
    queue_length,
    total_added,
    pop_action,
    create_queue,
    total_processed,
    peek_next
};
use sui::test_scenario;

#[test]
fun test_create_and_add() {
    let admin = @0x1;
    let user = @0x2;

    let mut scenario = test_scenario::begin(admin);

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

        assert!(queue_length(&queue) == 1, 0);
        assert!(total_added(&queue) == 1, 1);

        clock.destroy_for_testing();
        test_scenario::return_shared(queue);
    };

    scenario.end();
}

#[test]
fun test_pop_action() {
    let admin = @0x1;

    let mut scenario = test_scenario::begin(admin);

    // Create queue and add action
    {
        create_queue(scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<ActionQueue>();
        let clock = sui::clock::create_for_testing(scenario.ctx());

        add_action(&mut queue, b"wave".to_string(), &clock, scenario.ctx());
        add_action(&mut queue, b"sit".to_string(), &clock, scenario.ctx());

        assert!(queue_length(&queue) == 2, 0);

        pop_action(&mut queue, scenario.ctx());

        assert!(queue_length(&queue) == 1, 1);
        assert!(total_processed(&queue) == 1, 2);

        // Next action should be "sit"
        let next = peek_next(&queue);
        assert!(next.is_some(), 3);

        clock.destroy_for_testing();
        test_scenario::return_shared(queue);
    };

    scenario.end();
}
