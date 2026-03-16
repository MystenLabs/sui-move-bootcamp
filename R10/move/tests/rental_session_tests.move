/// Tests for the Rental Session module
#[test_only]
module robot_rental_platform::rental_session_tests;

use robot_rental_platform::rental_session::{Self, RentalSession, RentalReceipt};
use robot_rental_platform::robot_registry::{Self, RobotRegistry};
use robot_rental_platform::treat::{Self, TREAT, Faucet};
use sui::clock;
use sui::coin::Coin;
use sui::test_scenario as ts;

// ============================================
// HELPER: Common 32-byte Ed25519 public key
// ============================================
const TEST_PUB_KEY: vector<u8> =
    x"0102030405060708091011121314151617181920212223242526272829303132";
const TEST_USER_PUB_KEY: vector<u8> =
    x"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

// ============================================
// HELPER: Setup registry with a registered robot
// ============================================

/// Sets up treat faucet + registry + registers a robot named "Bittle-1" with operator.
/// After calling this, the caller should do next_tx(user) to mint tokens, then start session.
fun setup_registry_and_robot(scenario: &mut ts::Scenario, operator: address) {
    // Init treat token and create registry
    treat::init_for_testing(scenario.ctx());
    robot_registry::create_registry(scenario.ctx());

    // Register a robot as operator
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
            1, // 1 TREAT per minute
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };
}

/// Mint TREAT tokens for a user (must be called after setup_registry_and_robot)
fun mint_tokens_for_user(scenario: &mut ts::Scenario, user: address, amount: u64) {
    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        treat::request_tokens(&mut faucet, amount, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };
}

// ============================================
// BUILD COMMAND MESSAGE TESTS
// ============================================

#[test]
fun test_build_command_message() {
    let id_bytes = x"0102030405060708091011121314151617181920212223242526272829303132";
    let session_id = object::id_from_bytes(id_bytes);

    let sequence: u64 = 5;
    let command = b"walk_forward";

    let msg = rental_session::build_command_message(session_id, sequence, command);

    // Message should be: 32 bytes (id) + 8 bytes (sequence) + command length
    assert!(msg.length() == 32 + 8 + command.length());
}

#[test]
fun test_build_command_message_zero_sequence() {
    let id_bytes = x"0102030405060708091011121314151617181920212223242526272829303132";
    let session_id = object::id_from_bytes(id_bytes);

    let sequence: u64 = 0;
    let command = b"sit";

    let msg = rental_session::build_command_message(session_id, sequence, command);

    assert!(msg.length() == 32 + 8 + command.length());
}

#[test]
fun test_build_command_message_large_sequence() {
    let id_bytes = x"0102030405060708091011121314151617181920212223242526272829303132";
    let session_id = object::id_from_bytes(id_bytes);

    let sequence: u64 = 18446744073709551615; // max u64
    let command = b"wave";

    let msg = rental_session::build_command_message(session_id, sequence, command);

    assert!(msg.length() == 32 + 8 + command.length());
}

#[test]
fun test_session_timeout_constant() {
    assert!(rental_session::session_timeout_ms() == 600_000);
}

// ============================================
// START SESSION TESTS
// ============================================

#[test]
fun test_start_session() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 10);

    // Start a session
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000); // 1 min

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            5, // 5 minutes
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Verify session was created as shared object
    scenario.next_tx(user);
    {
        let session = scenario.take_shared<RentalSession>();

        assert!(rental_session::robot_name(&session) == b"Bittle-1".to_string());
        assert!(rental_session::user(&session) == user);
        assert!(rental_session::operator(&session) == operator);
        assert!(rental_session::prepaid_minutes(&session) == 5);
        assert!(rental_session::price_per_minute(&session) == 1);
        assert!(rental_session::escrowed_amount(&session) == 10);
        assert!(rental_session::sequence_number(&session) == 0);
        assert!(rental_session::is_active(&session));
        assert!(rental_session::start_time(&session) == 60_000);
        assert!(rental_session::last_activity(&session) == 60_000);
        assert!(rental_session::user_public_key(&session) == TEST_USER_PUB_KEY);
        assert!(rental_session::operator_public_key(&session) == TEST_PUB_KEY);

        ts::return_shared(session);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::rental_session::ERobotNotAvailable)]
fun test_start_session_robot_not_available() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);

    // Set robot unavailable
    scenario.next_tx(operator);
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

    mint_tokens_for_user(&mut scenario, user, 10);

    // Try to start session with unavailable robot
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            5,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::rental_session::EInvalidPublicKey)]
fun test_start_session_invalid_pubkey() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 10);

    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        // Invalid key: only 16 bytes
        let bad_key = x"01020304050607080910111213141516";

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            bad_key,
            payment,
            5,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::rental_session::EInvalidDuration)]
fun test_start_session_zero_minutes() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 10);

    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            0, // invalid: min is 1
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::rental_session::EInvalidDuration)]
fun test_start_session_exceeds_max_duration() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 10);

    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            61, // invalid: max is 60
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

#[
    test,
    expected_failure(
        abort_code = ::robot_rental_platform::rental_session::EInsufficientPayment,
    ),
]
fun test_start_session_insufficient_payment() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 3);

    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        // 5 minutes at 1 TREAT/min = 5 TREAT needed, but only have 3
        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            5,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

// ============================================
// END SESSION TESTS
// ============================================

#[test]
fun test_end_session_by_user() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 10);

    // Start session
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            10, // 10 minutes
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // End session after 3 minutes (user ends)
    scenario.next_tx(user);
    {
        let session = scenario.take_shared<RentalSession>();
        let mut registry = scenario.take_shared<RobotRegistry>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        // Start was at 60_000, advance 3 minutes = 180_000ms
        clock::set_for_testing(&mut test_clock, 60_000 + 180_000);

        rental_session::end_session(session, &mut registry, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Verify receipt was created for user
    scenario.next_tx(user);
    {
        let receipt = scenario.take_from_sender<RentalReceipt>();
        assert!(rental_session::receipt_robot_name(&receipt) == b"Bittle-1".to_string());
        assert!(rental_session::receipt_user(&receipt) == user);
        assert!(rental_session::receipt_operator(&receipt) == operator);
        assert!(rental_session::receipt_prepaid_minutes(&receipt) == 10);
        // 3 minutes of usage
        assert!(rental_session::receipt_actual_minutes(&receipt) == 3);
        // 3 TREAT paid
        assert!(rental_session::receipt_amount_paid(&receipt) == 3);
        // 7 TREAT refunded
        assert!(rental_session::receipt_amount_refunded(&receipt) == 7);

        ts::return_to_sender(&scenario, receipt);
    };

    scenario.end();
}

#[test]
fun test_end_session_by_operator() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 10);

    // Start session
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            5,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Operator ends session after 2 minutes
    scenario.next_tx(operator);
    {
        let session = scenario.take_shared<RentalSession>();
        let mut registry = scenario.take_shared<RobotRegistry>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000 + 120_000);

        rental_session::end_session(session, &mut registry, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

#[test]
fun test_end_session_full_usage() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 5);

    // Start session for 5 minutes
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            5,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // End session after using all 5+ minutes (use more to confirm cap)
    scenario.next_tx(user);
    {
        let session = scenario.take_shared<RentalSession>();
        let mut registry = scenario.take_shared<RobotRegistry>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        // 10 minutes elapsed, but only 5 prepaid
        clock::set_for_testing(&mut test_clock, 60_000 + 600_000);

        rental_session::end_session(session, &mut registry, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Verify receipt — should have full usage, no refund
    scenario.next_tx(user);
    {
        let receipt = scenario.take_from_sender<RentalReceipt>();
        assert!(rental_session::receipt_actual_minutes(&receipt) == 5);
        assert!(rental_session::receipt_amount_paid(&receipt) == 5);
        assert!(rental_session::receipt_amount_refunded(&receipt) == 0);

        ts::return_to_sender(&scenario, receipt);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::rental_session::ENotAuthorized)]
fun test_end_session_unauthorized() {
    let operator = @0xA;
    let user = @0xB;
    let stranger = @0xD;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 5);

    // Start session
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            5,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Stranger tries to end session
    scenario.next_tx(stranger);
    {
        let session = scenario.take_shared<RentalSession>();
        let mut registry = scenario.take_shared<RobotRegistry>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000 + 120_000);

        rental_session::end_session(session, &mut registry, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

// ============================================
// END TIMED OUT SESSION TESTS
// ============================================

#[test]
fun test_end_timed_out_session() {
    let operator = @0xA;
    let user = @0xB;
    let anyone = @0xD;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 10);

    // Start session
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            10,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Anyone can end session after timeout (600_000ms = 10 min timeout)
    // Start was at 60_000, last_activity also 60_000
    // Timeout at 60_000 + 600_000 = 660_000
    scenario.next_tx(anyone);
    {
        let session = scenario.take_shared<RentalSession>();
        let mut registry = scenario.take_shared<RobotRegistry>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 660_000); // exactly at timeout

        rental_session::end_timed_out_session(
            session,
            &mut registry,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Receipt goes to user
    scenario.next_tx(user);
    {
        let receipt = scenario.take_from_sender<RentalReceipt>();
        // last_activity == start_time == 60_000, so active_ms = 0
        // actual_minutes should be 0 (or 1 with rounding up of 0 → well, (0 + 59999)/60000 = 0)
        assert!(rental_session::receipt_actual_minutes(&receipt) == 0);
        // All escrowed amount refunded
        assert!(rental_session::receipt_amount_paid(&receipt) == 0);
        assert!(rental_session::receipt_amount_refunded(&receipt) == 10);

        ts::return_to_sender(&scenario, receipt);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::rental_session::ESessionTimedOut)]
fun test_end_timed_out_session_not_yet_timed_out() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 5);

    // Start session
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            5,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Try to end as timed out before timeout period
    scenario.next_tx(user);
    {
        let session = scenario.take_shared<RentalSession>();
        let mut registry = scenario.take_shared<RobotRegistry>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        // Only 5 minutes, not 10 minute timeout
        clock::set_for_testing(&mut test_clock, 60_000 + 300_000);

        rental_session::end_timed_out_session(
            session,
            &mut registry,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.end();
}

// ============================================
// RECORD ACTIVITY TESTS
// ============================================

#[test]
fun test_record_activity() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 5);

    // Start session
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            5,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Operator records activity
    scenario.next_tx(operator);
    {
        let mut session = scenario.take_shared<RentalSession>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 90_000);

        rental_session::record_activity(&mut session, 1, &test_clock, scenario.ctx());

        assert!(rental_session::sequence_number(&session) == 1);
        assert!(rental_session::last_activity(&session) == 90_000);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(session);
    };

    // Record more activity
    scenario.next_tx(operator);
    {
        let mut session = scenario.take_shared<RentalSession>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 120_000);

        rental_session::record_activity(&mut session, 2, &test_clock, scenario.ctx());

        assert!(rental_session::sequence_number(&session) == 2);
        assert!(rental_session::last_activity(&session) == 120_000);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(session);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::rental_session::ENotAuthorized)]
fun test_record_activity_not_operator() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 5);

    // Start session
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            5,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // User (not operator) tries to record activity
    scenario.next_tx(user);
    {
        let mut session = scenario.take_shared<RentalSession>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 90_000);

        rental_session::record_activity(&mut session, 1, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(session);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::rental_session::EInvalidSequence)]
fun test_record_activity_invalid_sequence() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 5);

    // Start session
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            5,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Operator tries sequence 5 (should be 1)
    scenario.next_tx(operator);
    {
        let mut session = scenario.take_shared<RentalSession>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 90_000);

        rental_session::record_activity(&mut session, 5, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(session);
    };

    scenario.end();
}

// ============================================
// VIEW FUNCTION TESTS
// ============================================

#[test]
fun test_is_timed_out() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 5);

    // Start session
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            5,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Check not timed out initially
    scenario.next_tx(user);
    {
        let session = scenario.take_shared<RentalSession>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());

        // 5 min after start — not timed out
        clock::set_for_testing(&mut test_clock, 60_000 + 300_000);
        assert!(!rental_session::is_timed_out(&session, &test_clock));

        // Exactly at timeout boundary
        clock::set_for_testing(&mut test_clock, 60_000 + 600_000);
        assert!(rental_session::is_timed_out(&session, &test_clock));

        // Well past timeout
        clock::set_for_testing(&mut test_clock, 60_000 + 1_000_000);
        assert!(rental_session::is_timed_out(&session, &test_clock));

        clock::destroy_for_testing(test_clock);
        ts::return_shared(session);
    };

    scenario.end();
}

#[test]
fun test_remaining_minutes() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 5);

    // Start session for 5 minutes
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            5,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.next_tx(user);
    {
        let session = scenario.take_shared<RentalSession>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());

        // At start time, 5 remaining
        clock::set_for_testing(&mut test_clock, 60_000);
        assert!(rental_session::remaining_minutes(&session, &test_clock) == 5);

        // 2 minutes later, 3 remaining
        clock::set_for_testing(&mut test_clock, 60_000 + 120_000);
        assert!(rental_session::remaining_minutes(&session, &test_clock) == 3);

        // 5+ minutes later, 0 remaining
        clock::set_for_testing(&mut test_clock, 60_000 + 500_000);
        assert!(rental_session::remaining_minutes(&session, &test_clock) == 0);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(session);
    };

    scenario.end();
}

#[test]
fun test_session_id_accessor() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 5);

    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            5,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    scenario.next_tx(user);
    {
        let session = scenario.take_shared<RentalSession>();

        // session_id should return a valid ID
        let sid = rental_session::session_id(&session);
        // Just verify it matches object::id
        assert!(sid == object::id(&session));

        ts::return_shared(session);
    };

    scenario.end();
}

// ============================================
// RECORD ACTIVITY THEN END SESSION TEST
// ============================================

#[test]
fun test_record_activity_then_end_session() {
    let operator = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(@0xC);

    setup_registry_and_robot(&mut scenario, operator);
    mint_tokens_for_user(&mut scenario, user, 10);

    // Start session at t=60_000
    scenario.next_tx(user);
    {
        let registry = scenario.take_shared<RobotRegistry>();
        let payment = scenario.take_from_sender<Coin<TREAT>>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000);

        rental_session::start_session(
            &registry,
            b"Bittle-1".to_string(),
            TEST_USER_PUB_KEY,
            payment,
            10,
            &test_clock,
            scenario.ctx(),
        );

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Record activity at sequence 1
    scenario.next_tx(operator);
    {
        let mut session = scenario.take_shared<RentalSession>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 120_000); // 1 min later

        rental_session::record_activity(&mut session, 1, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(session);
    };

    // Record activity at sequence 2
    scenario.next_tx(operator);
    {
        let mut session = scenario.take_shared<RentalSession>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 180_000); // 2 min later

        rental_session::record_activity(&mut session, 2, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(session);
    };

    // End session at 5 minutes
    scenario.next_tx(user);
    {
        let session = scenario.take_shared<RentalSession>();
        let mut registry = scenario.take_shared<RobotRegistry>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 60_000 + 300_000); // 5 minutes

        rental_session::end_session(session, &mut registry, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(registry);
    };

    // Check receipt
    scenario.next_tx(user);
    {
        let receipt = scenario.take_from_sender<RentalReceipt>();
        assert!(rental_session::receipt_actual_minutes(&receipt) == 5);
        assert!(rental_session::receipt_amount_paid(&receipt) == 5);
        assert!(rental_session::receipt_amount_refunded(&receipt) == 5);
        assert!(rental_session::receipt_start_time(&receipt) == 60_000);
        assert!(rental_session::receipt_end_time(&receipt) == 360_000);

        ts::return_to_sender(&scenario, receipt);
    };

    scenario.end();
}
