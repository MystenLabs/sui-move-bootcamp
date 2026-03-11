/// Tests for the Robot Registry module
#[test_only]
module robot_rental_platform::robot_registry_tests;

use robot_rental_platform::robot_registry::{Self, RobotRegistry};
use sui::clock;
use sui::test_scenario as ts;

const TEST_PUB_KEY: vector<u8> =
    x"0102030405060708091011121314151617181920212223242526272829303132";

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
        assert!(registry.get_robot_names().length() == 0);
        ts::return_shared(registry);
    };

    scenario.end();
}

#[test]
fun test_register_robot() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            2,
            &test_clock,
            scenario.ctx(),
        );

        assert!(registry.active_robot_count() == 1);
        assert!(registry.total_registered() == 1);
        assert!(registry.robot_exists(b"Bittle-1".to_string()));

        // Verify robot info via get_robot
        let robot_opt = registry.get_robot(b"Bittle-1".to_string());
        assert!(robot_opt.is_some());
        let robot = robot_opt.borrow();
        assert!(robot_registry::robot_name(robot) == b"Bittle-1".to_string());
        assert!(robot_registry::robot_description(robot) == b"A friendly robot dog".to_string());
        assert!(robot_registry::robot_type(robot) == b"Petoi Bittle X".to_string());
        assert!(robot_registry::robot_operator(robot) == operator);
        assert!(robot_registry::robot_operator_public_key(robot) == TEST_PUB_KEY);
        assert!(robot_registry::robot_price(robot) == 2);
        assert!(robot_registry::robot_is_available(robot));
        assert!(robot_registry::robot_total_sessions(robot) == 0);
        assert!(robot_registry::robot_total_minutes(robot) == 0);

        // Verify robot names list
        let names = registry.get_robot_names();
        assert!(names.length() == 1);
        assert!(names[0] == b"Bittle-1".to_string());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

#[test]
fun test_unregister_robot() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();

        robot_registry::unregister_robot(&mut registry, b"Bittle-1".to_string(), scenario.ctx());

        assert!(registry.active_robot_count() == 0);
        assert!(registry.total_registered() == 1); // total_registered doesn't decrease
        assert!(!registry.robot_exists(b"Bittle-1".to_string()));
        assert!(registry.get_robot_names().length() == 0);

        // get_robot should return none
        let robot_opt = registry.get_robot(b"Bittle-1".to_string());
        assert!(robot_opt.is_none());

        ts::return_shared(registry);
    };

    scenario.end();
}

#[test]
fun test_set_availability() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Set to unavailable
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

    // Set back to available
    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();

        robot_registry::set_availability(
            &mut registry,
            b"Bittle-1".to_string(),
            true,
            scenario.ctx(),
        );

        let robot_opt = registry.get_robot(b"Bittle-1".to_string());
        let robot = robot_opt.borrow();
        assert!(robot_registry::robot_is_available(robot));

        ts::return_shared(registry);
    };

    scenario.end();
}

#[test]
fun test_update_price() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

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

#[test]
fun test_update_public_key() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Update public key
    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let new_key = x"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

        robot_registry::update_public_key(
            &mut registry,
            b"Bittle-1".to_string(),
            new_key,
            scenario.ctx(),
        );

        let robot_opt = registry.get_robot(b"Bittle-1".to_string());
        let robot = robot_opt.borrow();
        assert!(robot_registry::robot_operator_public_key(robot) == new_key);

        ts::return_shared(registry);
    };

    scenario.end();
}

// ============================================
// ERROR CASE TESTS
// ============================================

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

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"First robot".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            2,
            &test_clock,
            scenario.ctx(),
        );

        // Try to register another with the same name
        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"Second robot".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            3,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_registry::EInvalidPublicKey)]
fun test_invalid_public_key_length() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        // Only 16 bytes, not 32
        let bad_key = x"01020304050607080910111213141516";

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            bad_key,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_registry::EPriceTooLow)]
fun test_price_too_low() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            0, // Price 0 is below MIN_PRICE_PER_MINUTE (1)
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_registry::ENotOperator)]
fun test_unregister_not_operator() {
    let operator = @0xA;
    let stranger = @0xB;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Stranger tries to unregister
    scenario.next_tx(stranger);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();

        robot_registry::unregister_robot(&mut registry, b"Bittle-1".to_string(), scenario.ctx());

        ts::return_shared(registry);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_registry::ENotOperator)]
fun test_set_availability_not_operator() {
    let operator = @0xA;
    let stranger = @0xB;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.next_tx(stranger);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();

        robot_registry::set_availability(
            &mut registry,
            b"Bittle-1".to_string(),
            false,
            scenario.ctx(),
        );

        ts::return_shared(registry);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_registry::ENotOperator)]
fun test_update_price_not_operator() {
    let operator = @0xA;
    let stranger = @0xB;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.next_tx(stranger);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();

        robot_registry::update_price(&mut registry, b"Bittle-1".to_string(), 5, scenario.ctx());

        ts::return_shared(registry);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_registry::ENotOperator)]
fun test_update_public_key_not_operator() {
    let operator = @0xA;
    let stranger = @0xB;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.next_tx(stranger);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let new_key = x"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

        robot_registry::update_public_key(
            &mut registry,
            b"Bittle-1".to_string(),
            new_key,
            scenario.ctx(),
        );

        ts::return_shared(registry);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_registry::EInvalidPublicKey)]
fun test_update_public_key_invalid_length() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let bad_key = x"0102030405"; // only 5 bytes

        robot_registry::update_public_key(
            &mut registry,
            b"Bittle-1".to_string(),
            bad_key,
            scenario.ctx(),
        );

        ts::return_shared(registry);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_registry::EPriceTooLow)]
fun test_update_price_too_low() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"A friendly robot dog".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();

        robot_registry::update_price(&mut registry, b"Bittle-1".to_string(), 0, scenario.ctx());

        ts::return_shared(registry);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_registry::ERobotNotFound)]
fun test_unregister_nonexistent_robot() {
    let operator = @0xA;
    let mut scenario = ts::begin(operator);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(operator);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();

        robot_registry::unregister_robot(&mut registry, b"NoSuchBot".to_string(), scenario.ctx());

        ts::return_shared(registry);
    };

    scenario.end();
}

// ============================================
// MULTIPLE ROBOTS TEST
// ============================================

#[test]
fun test_register_multiple_robots() {
    let operator_a = @0xA;
    let operator_b = @0xB;
    let mut scenario = ts::begin(@0xC);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    // Register first robot
    scenario.next_tx(operator_a);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-1".to_string(),
            b"First robot".to_string(),
            b"Petoi Bittle X".to_string(),
            TEST_PUB_KEY,
            2,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Register second robot (different operator)
    scenario.next_tx(operator_b);
    {
        let mut registry = scenario.take_shared<RobotRegistry>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        let key_b = x"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";

        robot_registry::register_robot(
            &mut registry,
            b"Bittle-2".to_string(),
            b"Second robot".to_string(),
            b"Unitree Go2".to_string(),
            key_b,
            5,
            &test_clock,
            scenario.ctx(),
        );

        assert!(registry.active_robot_count() == 2);
        assert!(registry.total_registered() == 2);
        assert!(registry.get_robot_names().length() == 2);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

// ============================================
// VIEW FUNCTION TESTS
// ============================================

#[test]
fun test_get_robot_nonexistent() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    {
        robot_registry::create_registry(scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let registry = scenario.take_shared<RobotRegistry>();

        let robot_opt = registry.get_robot(b"NoSuchBot".to_string());
        assert!(robot_opt.is_none());
        assert!(!registry.robot_exists(b"NoSuchBot".to_string()));

        ts::return_shared(registry);
    };

    scenario.end();
}
