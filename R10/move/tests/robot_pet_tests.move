/// Tests for the Robot Pet module
#[test_only]
module robot_rental_platform::robot_pet_tests;

use robot_rental_platform::robot_pet::{Self, RobotPet};
use robot_rental_platform::treat::{Self, TREAT, Faucet};
use sui::clock;
use sui::coin::Coin;
use sui::test_scenario as ts;

#[test]
fun test_create_robot() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    {
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let robot = scenario.take_shared<RobotPet>();
        assert!(robot_pet::name(&robot) == b"Bittle".to_string());
        assert!(robot_pet::queue_length(&robot) == 0);
        assert!(robot_pet::admin(&robot) == admin);
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test]
fun test_feed_robot() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    // Create faucet and robot
    {
        treat::init_for_testing(scenario.ctx());
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    // User requests tokens from faucet
    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        treat::request_tokens(&mut faucet, 5, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    // User feeds robot
    scenario.next_tx(user);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        // Get the coin that was transferred to user
        let mut payment = scenario.take_from_sender<Coin<TREAT>>();

        // Split 1 TREAT for the action
        let payment_coin = payment.split(1, scenario.ctx());

        robot_pet::feed(&mut robot, payment_coin, b"wave".to_string(), &test_clock, scenario.ctx());

        assert!(robot_pet::queue_length(&robot) == 1);
        assert!(robot_pet::total_queued(&robot) == 1);

        // Clean up - return remaining coins to user
        transfer::public_transfer(payment, user);
        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test]
fun test_pop_action() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    // Create faucet and robot
    {
        treat::init_for_testing(scenario.ctx());
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    // User requests tokens
    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        treat::request_tokens(&mut faucet, 5, &test_clock, scenario.ctx());
        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    // User feeds robot
    scenario.next_tx(user);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        let mut payment = scenario.take_from_sender<Coin<TREAT>>();
        let payment_coin = payment.split(1, scenario.ctx());

        robot_pet::feed(&mut robot, payment_coin, b"sit".to_string(), &test_clock, scenario.ctx());

        transfer::public_transfer(payment, user);
        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    // Admin pops action
    scenario.next_tx(admin);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_pet::pop_action(&mut robot, &test_clock, scenario.ctx());

        assert!(robot_pet::queue_length(&robot) == 0);
        assert!(robot_pet::total_processed(&robot) == 1);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_pet::ENotAdmin)]
fun test_pop_not_admin() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    // Create faucet and robot
    {
        treat::init_for_testing(scenario.ctx());
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    // User requests tokens
    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        treat::request_tokens(&mut faucet, 5, &test_clock, scenario.ctx());
        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    // User feeds robot
    scenario.next_tx(user);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        let mut payment = scenario.take_from_sender<Coin<TREAT>>();
        let payment_coin = payment.split(1, scenario.ctx());

        robot_pet::feed(&mut robot, payment_coin, b"sit".to_string(), &test_clock, scenario.ctx());

        transfer::public_transfer(payment, user);
        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    // Non-admin tries to pop (should fail)
    scenario.next_tx(user);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_pet::pop_action(&mut robot, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_pet::EQueueEmpty)]
fun test_pop_empty_queue() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    {
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        // Try to pop from empty queue
        robot_pet::pop_action(&mut robot, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test]
fun test_action_cost() {
    assert!(robot_pet::action_cost() == 1);
}

#[test]
fun test_valid_actions() {
    let actions = robot_pet::valid_actions();
    assert!(actions.length() > 0);
    // Check that common actions are included
    assert!(actions.contains(&b"sit"));
    assert!(actions.contains(&b"wave"));
    assert!(actions.contains(&b"stand"));
}
