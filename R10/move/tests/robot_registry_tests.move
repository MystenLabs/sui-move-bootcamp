/// Tests for the Robot Registry module
#[test_only]
module robot_rental_platform::robot_registry_tests;

use robot_rental_platform::robot_registry::{Self, RobotRegistry};
use sui::clock;
use sui::test_scenario as ts;

#[test]
fun test_create_registry() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        assert!(registry.active_robot_count() == 0);
        assert!(registry.total_registered() == 0);
        ts::return_shared(registry);
    };

    scenario.end();
}

#[test]
fun test_register_robot() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    // Create registry
    {
        robot_registry::create_registry(scenario.ctx());
    };

    // Register robot
    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        // Generate a 32-byte public key
        let pub_key = x"0102030405060708091011121314151617181920212223242526272829303132";

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            pub_key,
            2, // 2 TREAT per minute
            &test_clock,
            scenario.ctx(),
        );

        assert!(registry.active_robot_count() == 1);
        assert!(registry.robot_exists(b"Bittle-1".to_string()));

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

#[test]
fun test_unregister_robot() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    // Create registry
    {
        robot_registry::create_registry(scenario.ctx());
    };

    // Register robot
    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        let pub_key = x"0102030405060708091011121314151617181920212223242526272829303132";

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            pub_key,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Unregister robot
    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();

        robot_registry::unregister_robot(&mut registry, b"Bittle-1".to_string(), scenario.ctx());

        assert!(registry.active_robot_count() == 0);
        assert!(!registry.robot_exists(b"Bittle-1".to_string()));

        ts::return_shared(registry);
    };

    scenario.end();
}

#[test]
fun test_set_availability() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    // Create registry and register robot
    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        let pub_key = x"0102030405060708091011121314151617181920212223242526272829303132";

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            pub_key,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Set availability to false
    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();

        robot_registry::set_availability(
            &mut registry,
            b"Bittle-1".to_string(),
            false,
            scenario.ctx(),
        );

        let robot_opt = registry.get_robot(b"Bittle-1".to_string());
        assert!(robot_opt.is_some());
        let robot = robot_opt.borrow();
        assert!(!robot_registry::robot_is_available(robot));

        ts::return_shared(registry);
    };

    scenario.end();
}

#[test]
fun test_update_price() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    // Create registry and register robot
    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        let pub_key = x"0102030405060708091011121314151617181920212223242526272829303132";

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            pub_key,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Update price
    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();

        robot_registry::update_price(&mut registry, b"Bittle-1".to_string(), 5, scenario.ctx());

        let robot_opt = registry.get_robot(b"Bittle-1".to_string());
        assert!(robot_opt.is_some());
        let robot = robot_opt.borrow();
        assert!(robot_registry::robot_price(robot) == 5);

        ts::return_shared(registry);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_registry::ERobotNameExists)]
fun test_duplicate_robot_name() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        let pub_key = x"0102030405060708091011121314151617181920212223242526272829303132";

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"First robot".to_string(),
            b"Petoi Bittle X".to_string(),
            pub_key,
            2,
            &test_clock,
            scenario.ctx(),
        );

        // Try to register another robot with the same name
        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"Second robot".to_string(),
            b"Petoi Bittle X".to_string(),
            pub_key,
            3,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}
