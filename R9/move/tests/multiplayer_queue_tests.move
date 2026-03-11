#[test_only]
module multiplayer_robot::multiplayer_queue_tests;

use multiplayer_robot::multiplayer_queue::{
    Self,
    MultiplayerQueue,
    create_queue,
    queue_action,
    queue_priority_action,
    process_action,
    pause_queue,
    unpause_queue,
    set_max_pending,
    set_cooldown
};
use sui::clock;
use sui::test_scenario as ts;

// ============================================
// EXISTING TESTS
// ============================================

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

// ============================================
// NEW TESTS — process_action
// ============================================

#[test]
/// Covers: process_action (lines 400-465), total_processed, peek_next,
/// user_total_queued, user_pending_count decrement path
fun test_process_action() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000);

    // User queues an action
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"sit".to_string(), &test_clock, scenario.ctx());
        assert!(multiplayer_queue::queue_length(&queue) == 1);
        // peek_next should return the action
        assert!(multiplayer_queue::peek_next(&queue).is_some());
        ts::return_shared(queue);
    };

    // Admin processes the action
    clock::set_for_testing(&mut test_clock, 5000);
    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        process_action(&mut queue, &test_clock, scenario.ctx());
        assert!(multiplayer_queue::queue_length(&queue) == 0);
        assert!(multiplayer_queue::total_processed(&queue) == 1);
        assert!(multiplayer_queue::user_pending_count(&queue, user) == 0);
        // peek_next on empty queue should return none
        assert!(multiplayer_queue::peek_next(&queue).is_none());
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

#[test]
/// Covers: process_action with multiple actions, FIFO ordering
fun test_process_multiple_actions() {
    let admin = @0xA;
    let user1 = @0xB;
    let user2 = @0xC;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000);

    // User1 queues
    scenario.next_tx(user1);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"sit".to_string(), &test_clock, scenario.ctx());
        ts::return_shared(queue);
    };

    // User2 queues
    clock::set_for_testing(&mut test_clock, 2000);
    scenario.next_tx(user2);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"jump".to_string(), &test_clock, scenario.ctx());
        assert!(multiplayer_queue::queue_length(&queue) == 2);
        assert!(multiplayer_queue::unique_users(&queue) == 2);
        ts::return_shared(queue);
    };

    // Admin processes first (user1's action)
    clock::set_for_testing(&mut test_clock, 50000);
    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        process_action(&mut queue, &test_clock, scenario.ctx());
        assert!(multiplayer_queue::queue_length(&queue) == 1);
        assert!(multiplayer_queue::user_pending_count(&queue, user1) == 0);
        assert!(multiplayer_queue::user_pending_count(&queue, user2) == 1);
        ts::return_shared(queue);
    };

    // Admin processes second (user2's action)
    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        process_action(&mut queue, &test_clock, scenario.ctx());
        assert!(multiplayer_queue::queue_length(&queue) == 0);
        assert!(multiplayer_queue::total_processed(&queue) == 2);
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

// ============================================
// NEW TESTS — queue_priority_action
// ============================================

#[test]
/// Covers: queue_priority_action (lines 276-283), priority insertion at front,
/// is_priority branch in queue_action_internal (lines 340-341, 352-354)
fun test_queue_priority_action() {
    let admin = @0xA;
    let user1 = @0xB;
    let user2 = @0xC;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000);

    // User1 queues a standard action
    scenario.next_tx(user1);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"sit".to_string(), &test_clock, scenario.ctx());
        ts::return_shared(queue);
    };

    // User2 queues a priority action — should go to front
    clock::set_for_testing(&mut test_clock, 2000);
    scenario.next_tx(user2);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_priority_action(&mut queue, b"jump".to_string(), &test_clock, scenario.ctx());
        assert!(multiplayer_queue::queue_length(&queue) == 2);
        ts::return_shared(queue);
    };

    // Admin processes — should get user2's priority action first
    clock::set_for_testing(&mut test_clock, 50000);
    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        process_action(&mut queue, &test_clock, scenario.ctx());
        // user2's priority action was processed
        assert!(multiplayer_queue::user_pending_count(&queue, user2) == 0);
        // user1's standard action still pending
        assert!(multiplayer_queue::user_pending_count(&queue, user1) == 1);
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

// ============================================
// NEW TESTS — pause_queue / unpause_queue
// ============================================

#[test]
/// Covers: pause_queue (lines 472-484), unpause_queue (lines 487-499)
fun test_pause_and_unpause_queue() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    // Admin pauses the queue
    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        pause_queue(&mut queue, scenario.ctx());
        assert!(multiplayer_queue::is_paused(&queue));
        ts::return_shared(queue);
    };

    // Admin unpauses the queue
    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        unpause_queue(&mut queue, scenario.ctx());
        assert!(!multiplayer_queue::is_paused(&queue));
        ts::return_shared(queue);
    };

    // User can queue after unpause
    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000);

    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"wave".to_string(), &test_clock, scenario.ctx());
        assert!(multiplayer_queue::queue_length(&queue) == 1);
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

// ============================================
// NEW TESTS — set_cooldown
// ============================================

#[test]
/// Covers: set_cooldown (lines 508-511), cooldown_ms view function
fun test_set_cooldown() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        // Default cooldown is 30_000
        assert!(multiplayer_queue::cooldown_ms(&queue) == 30_000);
        set_cooldown(&mut queue, 5_000, scenario.ctx());
        assert!(multiplayer_queue::cooldown_ms(&queue) == 5_000);
        ts::return_shared(queue);
    };

    scenario.end();
}

// ============================================
// NEW TESTS — can_user_queue / remaining_cooldown
// ============================================

#[test]
/// Covers: can_user_queue (lines 597-622) — all branches,
/// remaining_cooldown (lines 625-643) — all branches
fun test_can_user_queue_and_remaining_cooldown() {
    let admin = @0xA;
    let user = @0xB;
    let unknown_user = @0xC;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000);

    // Unknown user (no stats): can_user_queue = true, remaining_cooldown = 0
    scenario.next_tx(admin);
    {
        let queue = scenario.take_shared<MultiplayerQueue>();
        assert!(multiplayer_queue::can_user_queue(&queue, unknown_user, &test_clock));
        assert!(multiplayer_queue::remaining_cooldown(&queue, unknown_user, &test_clock) == 0);
        ts::return_shared(queue);
    };

    // User queues an action
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"sit".to_string(), &test_clock, scenario.ctx());
        ts::return_shared(queue);
    };

    // Right after queueing (still in cooldown): can_user_queue = false
    clock::set_for_testing(&mut test_clock, 2000);
    scenario.next_tx(admin);
    {
        let queue = scenario.take_shared<MultiplayerQueue>();
        assert!(!multiplayer_queue::can_user_queue(&queue, user, &test_clock));
        // Cooldown remaining: last_queue_time=1000, cooldown=30000, current=2000
        // cooldown_end = 31000, remaining = 31000 - 2000 = 29000
        assert!(multiplayer_queue::remaining_cooldown(&queue, user, &test_clock) == 29_000);
        ts::return_shared(queue);
    };

    // After cooldown expires: can_user_queue = true, remaining = 0
    clock::set_for_testing(&mut test_clock, 100_000);
    scenario.next_tx(admin);
    {
        let queue = scenario.take_shared<MultiplayerQueue>();
        assert!(multiplayer_queue::can_user_queue(&queue, user, &test_clock));
        assert!(multiplayer_queue::remaining_cooldown(&queue, user, &test_clock) == 0);
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

#[test]
/// Covers: can_user_queue when paused (line 598-599),
/// can_user_queue when at max pending (lines 609-611)
fun test_can_user_queue_paused_and_at_limit() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000);

    // Paused queue: can_user_queue = false for any user
    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        pause_queue(&mut queue, scenario.ctx());
        assert!(!multiplayer_queue::can_user_queue(&queue, user, &test_clock));
        unpause_queue(&mut queue, scenario.ctx());
        ts::return_shared(queue);
    };

    // Set max pending to 1 and fill it
    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        set_max_pending(&mut queue, 1, scenario.ctx());
        set_cooldown(&mut queue, 0, scenario.ctx()); // No cooldown for easy testing
        ts::return_shared(queue);
    };

    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"wave".to_string(), &test_clock, scenario.ctx());
        // At max pending: can_user_queue = false
        assert!(!multiplayer_queue::can_user_queue(&queue, user, &test_clock));
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

// ============================================
// NEW TESTS — view functions
// ============================================

#[test]
/// Covers: name, unique_users, total_queued, total_processed,
/// max_pending_per_user, cooldown_ms, admin, user_total_queued
fun test_view_functions() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    { create_queue(b"RobotQ".to_string(), scenario.ctx()); };

    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000);

    scenario.next_tx(admin);
    {
        let queue = scenario.take_shared<MultiplayerQueue>();
        assert!(multiplayer_queue::name(&queue) == b"RobotQ".to_string());
        assert!(multiplayer_queue::admin(&queue) == admin);
        assert!(multiplayer_queue::unique_users(&queue) == 0);
        assert!(multiplayer_queue::total_queued(&queue) == 0);
        assert!(multiplayer_queue::total_processed(&queue) == 0);
        assert!(multiplayer_queue::max_pending_per_user(&queue) == 3);
        assert!(multiplayer_queue::cooldown_ms(&queue) == 30_000);
        // user_total_queued for unknown user = 0
        assert!(multiplayer_queue::user_total_queued(&queue, user) == 0);
        // user_pending_count for unknown user = 0
        assert!(multiplayer_queue::user_pending_count(&queue, user) == 0);
        ts::return_shared(queue);
    };

    // Queue an action and check updated stats
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"balance".to_string(), &test_clock, scenario.ctx());
        assert!(multiplayer_queue::unique_users(&queue) == 1);
        assert!(multiplayer_queue::total_queued(&queue) == 1);
        assert!(multiplayer_queue::user_total_queued(&queue, user) == 1);
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

// ============================================
// NEW TESTS — error paths
// ============================================

#[test, expected_failure(abort_code = multiplayer_queue::EQueuePaused)]
/// Covers: EQueuePaused error path (line 294)
fun test_queue_action_while_paused() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000);

    // Pause the queue
    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        pause_queue(&mut queue, scenario.ctx());
        ts::return_shared(queue);
    };

    // User tries to queue — should abort
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"sit".to_string(), &test_clock, scenario.ctx());
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

#[test, expected_failure(abort_code = multiplayer_queue::EInvalidAction)]
/// Covers: EInvalidAction error path (line 300), is_valid_action returning false (line 531)
fun test_invalid_action_name() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000);

    // User tries invalid action
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"fly".to_string(), &test_clock, scenario.ctx());
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

#[test, expected_failure(abort_code = multiplayer_queue::ETooManyPending)]
/// Covers: ETooManyPending abort (line 322)
fun test_too_many_pending_aborts() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());

    // Set max pending to 1, cooldown to 0
    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        set_max_pending(&mut queue, 1, scenario.ctx());
        set_cooldown(&mut queue, 0, scenario.ctx());
        ts::return_shared(queue);
    };

    // Queue one action (OK)
    clock::set_for_testing(&mut test_clock, 1000);
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"sit".to_string(), &test_clock, scenario.ctx());
        ts::return_shared(queue);
    };

    // Queue second action — should abort with ETooManyPending
    clock::set_for_testing(&mut test_clock, 2000);
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"stand".to_string(), &test_clock, scenario.ctx());
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

#[test, expected_failure(abort_code = multiplayer_queue::EInCooldown)]
/// Covers: EInCooldown abort (line 325)
fun test_cooldown_aborts() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000);

    // Queue first action
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"sit".to_string(), &test_clock, scenario.ctx());
        ts::return_shared(queue);
    };

    // Try to queue again immediately (within 30s cooldown) — should abort
    clock::set_for_testing(&mut test_clock, 2000);
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"stand".to_string(), &test_clock, scenario.ctx());
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

#[test, expected_failure(abort_code = multiplayer_queue::ENotAdmin)]
/// Covers: ENotAdmin on process_action (line 401)
fun test_process_action_not_admin() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000);

    // Queue an action
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        queue_action(&mut queue, b"sit".to_string(), &test_clock, scenario.ctx());
        ts::return_shared(queue);
    };

    // Non-admin tries to process — should abort
    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        process_action(&mut queue, &test_clock, scenario.ctx());
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

#[test, expected_failure(abort_code = multiplayer_queue::EQueueEmpty)]
/// Covers: EQueueEmpty abort (line 402)
fun test_process_empty_queue() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(admin);
    let mut test_clock = clock::create_for_testing(scenario.ctx());
    clock::set_for_testing(&mut test_clock, 1000);

    // Admin tries to process empty queue — should abort
    scenario.next_tx(admin);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        process_action(&mut queue, &test_clock, scenario.ctx());
        ts::return_shared(queue);
    };

    clock::destroy_for_testing(test_clock);
    scenario.end();
}

#[test, expected_failure(abort_code = multiplayer_queue::ENotAdmin)]
/// Covers: ENotAdmin on pause_queue (line 473)
fun test_pause_not_admin() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        pause_queue(&mut queue, scenario.ctx());
        ts::return_shared(queue);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = multiplayer_queue::ENotAdmin)]
/// Covers: ENotAdmin on unpause_queue (line 488)
fun test_unpause_not_admin() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        unpause_queue(&mut queue, scenario.ctx());
        ts::return_shared(queue);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = multiplayer_queue::ENotAdmin)]
/// Covers: ENotAdmin on set_max_pending (line 503)
fun test_set_max_pending_not_admin() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        set_max_pending(&mut queue, 10, scenario.ctx());
        ts::return_shared(queue);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = multiplayer_queue::ENotAdmin)]
/// Covers: ENotAdmin on set_cooldown (line 509)
fun test_set_cooldown_not_admin() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    { create_queue(b"TestQueue".to_string(), scenario.ctx()); };

    scenario.next_tx(user);
    {
        let mut queue = scenario.take_shared<MultiplayerQueue>();
        set_cooldown(&mut queue, 0, scenario.ctx());
        ts::return_shared(queue);
    };

    scenario.end();
}
