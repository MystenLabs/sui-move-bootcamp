/// Tests for the Rental Session module
#[test_only]
module robot_rental_platform::rental_session_tests;

use robot_rental_platform::rental_session;

#[test]
fun test_build_command_message() {
    // Create a test session ID
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
    // Verify the session timeout is 10 minutes (600,000 ms)
    assert!(rental_session::session_timeout_ms() == 600_000);
}
