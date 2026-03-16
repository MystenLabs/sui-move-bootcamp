/// # Rental Session - Secure Robot Control with Escrow
///
/// This module manages rental sessions with:
/// - Ed25519 authentication (from R7)
/// - Time-based billing with escrow
/// - Automatic refunds for unused time
///
/// ## What This Module Teaches
/// - State channels for real-time control
/// - Escrow pattern for deposits
/// - Ed25519 signature verification
/// - Time-based billing calculations
///
/// ## Architecture (Building on R7)
///
/// ```
/// ┌─────────────────────────────────────────────────────────────────┐
/// │                    RENTAL SESSION LIFECYCLE                     │
/// │                                                                 │
/// │   1. START SESSION (on-chain)                                   │
/// │      - User deposits TREAT tokens (prepaid minutes)             │
/// │      - User registers Ed25519 public key                        │
/// │      - Session is now ACTIVE                                    │
/// │                                                                 │
/// │   2. CONTROL ROBOT (off-chain via WebSocket)                    │
/// │      - Commands signed with user's private key                  │
/// │      - Server verifies signature against session public key     │
/// │      - Robot executes commands                                  │
/// │      - No blockchain transactions needed!                       │
/// │                                                                 │
/// │   3. END SESSION (on-chain)                                     │
/// │      - Calculate actual usage                                   │
/// │      - Pay operator for used time                               │
/// │      - Refund user for unused time                              │
/// │      - Session destroyed                                        │
/// └─────────────────────────────────────────────────────────────────┘
/// ```
///
/// ## Key Difference from R7
/// R7's tunnel is for generic state channels.
/// This module is specialized for robot rental with:
/// - TREAT token payments (not SUI deposits)
/// - Time-based billing (not penalty-based)
/// - Integration with Robot Registry
module robot_rental_platform::rental_session;

use robot_rental_platform::robot_registry::{Self, RobotRegistry};
use robot_rental_platform::treat::TREAT;
use std::string::String;
use sui::balance::Balance;
use sui::clock::Clock;
use sui::coin::{Self, Coin};
use sui::ed25519;
use sui::event;

// ============================================
// CONSTANTS
// ============================================

/// Session timeout: 10 minutes without activity
const SESSION_TIMEOUT_MS: u64 = 600_000;

/// Minimum rental duration: 1 minute
const MIN_RENTAL_MINUTES: u64 = 1;

/// Maximum rental duration: 60 minutes
const MAX_RENTAL_MINUTES: u64 = 60;

// ============================================
// ERROR CODES
// ============================================

/// Robot not found or not available
const ERobotNotAvailable: u64 = 0;

/// Insufficient TREAT tokens for rental
const EInsufficientPayment: u64 = 1;

/// Invalid Ed25519 public key (must be 32 bytes)
const EInvalidPublicKey: u64 = 2;

/// Session is not active
const ESessionNotActive: u64 = 3;

/// Not authorized to perform this action
const ENotAuthorized: u64 = 4;

/// Session has timed out
const ESessionTimedOut: u64 = 5;

/// Invalid signature
const EInvalidSignature: u64 = 6;

/// Rental duration out of bounds
const EInvalidDuration: u64 = 7;

/// Command sequence number invalid (replay protection)
const EInvalidSequence: u64 = 8;

// ============================================
// DATA STRUCTURES
// ============================================

/// A rental session between a user and a robot.
///
/// This is a SHARED OBJECT so both user and operator can interact.
public struct RentalSession has key {
    id: UID,
    /// The robot being rented
    robot_name: String,
    /// User's wallet address
    user: address,
    /// User's Ed25519 public key (32 bytes) for command signing
    user_public_key: vector<u8>,
    /// Operator's wallet address (receives payment)
    operator: address,
    /// Operator's Ed25519 public key (for mutual auth)
    operator_public_key: vector<u8>,
    /// Price per minute (from robot registry)
    price_per_minute: u64,
    /// Prepaid TREAT tokens held in escrow
    escrow: Balance<TREAT>,
    /// Prepaid minutes
    prepaid_minutes: u64,
    /// Session start time (ms)
    start_time: u64,
    /// Last activity time (for timeout)
    last_activity: u64,
    /// Command sequence number (replay protection)
    sequence_number: u64,
    /// Is session active?
    is_active: bool,
}

/// Receipt generated when session ends
public struct RentalReceipt has key, store {
    id: UID,
    /// The robot that was rented
    robot_name: String,
    /// User who rented
    user: address,
    /// Operator who provided the robot
    operator: address,
    /// Session start time
    start_time: u64,
    /// Session end time
    end_time: u64,
    /// Total minutes prepaid
    prepaid_minutes: u64,
    /// Actual minutes used
    actual_minutes: u64,
    /// Amount paid to operator
    amount_paid: u64,
    /// Amount refunded to user
    amount_refunded: u64,
}

// ============================================
// EVENTS
// ============================================

/// Emitted when a session starts
public struct SessionStarted has copy, drop {
    session_id: ID,
    robot_name: String,
    user: address,
    user_public_key: vector<u8>,
    operator: address,
    prepaid_minutes: u64,
    start_time: u64,
}

/// Emitted when a session ends
public struct SessionEnded has copy, drop {
    session_id: ID,
    robot_name: String,
    actual_minutes: u64,
    amount_paid: u64,
    amount_refunded: u64,
}

/// Emitted when activity is recorded (for timeout tracking)
public struct ActivityRecorded has copy, drop {
    session_id: ID,
    sequence_number: u64,
    timestamp: u64,
}

// ============================================
// SESSION LIFECYCLE
// ============================================

/// Start a rental session.
///
/// The user prepays for rental time by depositing TREAT tokens.
/// These tokens are held in escrow until the session ends.
///
/// ## Parameters
/// - `registry`: The robot registry (to verify robot and get operator info)
/// - `robot_name`: Name of the robot to rent
/// - `user_public_key`: User's Ed25519 public key (32 bytes) for signing commands
/// - `payment`: TREAT tokens for prepaid rental time
/// - `minutes`: Number of minutes to rent (1-60)
/// - `clock`: Sui system clock
/// - `ctx`: Transaction context
public fun start_session(
    registry: &RobotRegistry,
    robot_name: String,
    user_public_key: vector<u8>,
    payment: Coin<TREAT>,
    minutes: u64,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    // Validate robot is available
    assert!(robot_registry::is_robot_available(registry, robot_name), ERobotNotAvailable);

    // Validate public key
    assert!(user_public_key.length() == 32, EInvalidPublicKey);

    // Validate duration
    assert!(minutes >= MIN_RENTAL_MINUTES && minutes <= MAX_RENTAL_MINUTES, EInvalidDuration);

    // Get robot info
    let robot_info = robot_registry::get_robot_info(registry, robot_name);
    let price_per_minute = robot_registry::robot_price(&robot_info);
    let operator = robot_registry::robot_operator(&robot_info);
    let operator_public_key = robot_registry::robot_operator_public_key(&robot_info);

    // Validate payment
    let required_amount = price_per_minute * minutes;
    assert!(payment.value() >= required_amount, EInsufficientPayment);

    let current_time = clock.timestamp_ms();
    let user = ctx.sender();

    // Create session with escrow
    let session = RentalSession {
        id: object::new(ctx),
        robot_name,
        user,
        user_public_key,
        operator,
        operator_public_key,
        price_per_minute,
        escrow: coin::into_balance(payment),
        prepaid_minutes: minutes,
        start_time: current_time,
        last_activity: current_time,
        sequence_number: 0,
        is_active: true,
    };

    let session_id = object::id(&session);

    // Emit event
    event::emit(SessionStarted {
        session_id,
        robot_name: session.robot_name,
        user,
        user_public_key: session.user_public_key,
        operator,
        prepaid_minutes: minutes,
        start_time: current_time,
    });

    // Share session so both parties can interact
    transfer::share_object(session);
}

/// End a rental session and settle payments.
///
/// Can be called by user or operator.
/// Calculates actual usage and distributes funds.
///
/// ## Settlement Logic
/// 1. Calculate elapsed minutes since start
/// 2. Cap at prepaid minutes (can't charge more than paid)
/// 3. Pay operator for actual usage
/// 4. Refund user for unused time
public fun end_session(
    session: RentalSession,
    registry: &mut RobotRegistry,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    assert!(session.is_active, ESessionNotActive);

    // Only user or operator can end session
    let sender = ctx.sender();
    assert!(sender == session.user || sender == session.operator, ENotAuthorized);

    let current_time = clock.timestamp_ms();

    // Calculate actual minutes used (rounded up)
    let elapsed_ms = current_time - session.start_time;
    let mut actual_minutes = (elapsed_ms + 59_999) / 60_000; // Round up

    // Cap at prepaid minutes
    if (actual_minutes > session.prepaid_minutes) {
        actual_minutes = session.prepaid_minutes;
    };

    // Calculate amounts
    let amount_paid = actual_minutes * session.price_per_minute;
    let total_escrowed = session.escrow.value();
    let amount_refunded = if (total_escrowed > amount_paid) {
        total_escrowed - amount_paid
    } else {
        0
    };

    // Update registry stats
    robot_registry::record_session_complete(registry, session.robot_name, actual_minutes);

    // Emit event before destroying
    event::emit(SessionEnded {
        session_id: object::id(&session),
        robot_name: session.robot_name,
        actual_minutes,
        amount_paid,
        amount_refunded,
    });

    // Destroy session and distribute funds
    let RentalSession {
        id,
        robot_name,
        user,
        user_public_key: _,
        operator,
        operator_public_key: _,
        price_per_minute: _,
        mut escrow,
        prepaid_minutes,
        start_time,
        last_activity: _,
        sequence_number: _,
        is_active: _,
    } = session;

    // Create receipt
    let receipt = RentalReceipt {
        id: object::new(ctx),
        robot_name,
        user,
        operator,
        start_time,
        end_time: current_time,
        prepaid_minutes,
        actual_minutes,
        amount_paid,
        amount_refunded,
    };

    // Transfer receipt to user
    transfer::transfer(receipt, user);

    // Pay operator
    if (amount_paid > 0) {
        let operator_payment = coin::from_balance(escrow.split(amount_paid), ctx);
        transfer::public_transfer(operator_payment, operator);
    };

    // Refund user
    if (escrow.value() > 0) {
        let user_refund = coin::from_balance(escrow, ctx);
        transfer::public_transfer(user_refund, user);
    } else {
        escrow.destroy_zero();
    };

    id.delete();
}

/// Force end a timed-out session.
///
/// If no activity for SESSION_TIMEOUT_MS, anyone can end the session.
/// This prevents stuck sessions.
public fun end_timed_out_session(
    session: RentalSession,
    registry: &mut RobotRegistry,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    assert!(session.is_active, ESessionNotActive);

    let current_time = clock.timestamp_ms();
    let time_since_activity = current_time - session.last_activity;

    // Must be timed out - use specific timeout error
    assert!(time_since_activity >= SESSION_TIMEOUT_MS, ESessionTimedOut);

    // Calculate actual minutes (from start to last activity)
    let active_ms = session.last_activity - session.start_time;
    let mut actual_minutes = (active_ms + 59_999) / 60_000;

    if (actual_minutes > session.prepaid_minutes) {
        actual_minutes = session.prepaid_minutes;
    };

    let amount_paid = actual_minutes * session.price_per_minute;
    let total_escrowed = session.escrow.value();
    let amount_refunded = if (total_escrowed > amount_paid) {
        total_escrowed - amount_paid
    } else {
        0
    };

    robot_registry::record_session_complete(registry, session.robot_name, actual_minutes);

    event::emit(SessionEnded {
        session_id: object::id(&session),
        robot_name: session.robot_name,
        actual_minutes,
        amount_paid,
        amount_refunded,
    });

    let RentalSession {
        id,
        robot_name,
        user,
        user_public_key: _,
        operator,
        operator_public_key: _,
        price_per_minute: _,
        mut escrow,
        prepaid_minutes,
        start_time,
        last_activity,
        sequence_number: _,
        is_active: _,
    } = session;

    let receipt = RentalReceipt {
        id: object::new(ctx),
        robot_name,
        user,
        operator,
        start_time,
        end_time: last_activity,
        prepaid_minutes,
        actual_minutes,
        amount_paid,
        amount_refunded,
    };

    transfer::transfer(receipt, user);

    if (amount_paid > 0) {
        let operator_payment = coin::from_balance(escrow.split(amount_paid), ctx);
        transfer::public_transfer(operator_payment, operator);
    };

    if (escrow.value() > 0) {
        let user_refund = coin::from_balance(escrow, ctx);
        transfer::public_transfer(user_refund, user);
    } else {
        escrow.destroy_zero();
    };

    id.delete();
}

// ============================================
// SIGNATURE VERIFICATION (From Module R7)
// ============================================

/// Verify a user's Ed25519 signature.
///
/// This is used off-chain by the WebSocket server to verify commands.
/// The function is public so the server can call it.
///
/// ## Message Format for Commands
/// ```
/// message = session_id (32 bytes) || sequence_number (8 bytes) || command (variable)
/// ```
public fun verify_user_signature(
    session: &RentalSession,
    signature: &vector<u8>,
    message: &vector<u8>,
): bool {
    ed25519::ed25519_verify(signature, &session.user_public_key, message)
}

/// Verify user's signature and abort if invalid.
/// Use this when you need to enforce valid signatures on-chain.
public fun verify_user_signature_or_abort(
    session: &RentalSession,
    signature: &vector<u8>,
    message: &vector<u8>,
) {
    assert!(verify_user_signature(session, signature, message), EInvalidSignature);
}

/// Verify operator's signature (for mutual authentication)
public fun verify_operator_signature(
    session: &RentalSession,
    signature: &vector<u8>,
    message: &vector<u8>,
): bool {
    ed25519::ed25519_verify(signature, &session.operator_public_key, message)
}

/// Verify operator's signature and abort if invalid.
/// Use this when you need to enforce valid signatures on-chain.
public fun verify_operator_signature_or_abort(
    session: &RentalSession,
    signature: &vector<u8>,
    message: &vector<u8>,
) {
    assert!(verify_operator_signature(session, signature, message), EInvalidSignature);
}

/// Record activity and update sequence number.
///
/// Called by the server after verifying a command signature.
/// This updates the last_activity timestamp for timeout tracking.
///
/// ## Parameters
/// - `session`: The rental session
/// - `new_sequence`: Must be exactly current sequence + 1
/// - `clock`: Sui system clock
public fun record_activity(
    session: &mut RentalSession,
    new_sequence: u64,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    assert!(session.is_active, ESessionNotActive);

    // Only operator can record activity (they run the server)
    assert!(ctx.sender() == session.operator, ENotAuthorized);

    // Sequence must increment by exactly 1
    assert!(new_sequence == session.sequence_number + 1, EInvalidSequence);

    session.sequence_number = new_sequence;
    session.last_activity = clock.timestamp_ms();

    event::emit(ActivityRecorded {
        session_id: object::id(session),
        sequence_number: new_sequence,
        timestamp: session.last_activity,
    });
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/// Build a command message for signing.
///
/// ## Format
/// session_id (32 bytes) || sequence_number (8 bytes, big-endian) || command
public fun build_command_message(session_id: ID, sequence: u64, command: vector<u8>): vector<u8> {
    let mut msg = object::id_to_bytes(&session_id);

    // Append sequence as big-endian bytes
    let mut i = 8;
    while (i > 0) {
        i = i - 1;
        let byte = ((sequence >> (i * 8)) & 0xFF as u8);
        msg.push_back(byte);
    };

    // Append command
    vector::append(&mut msg, command);

    msg
}

// ============================================
// VIEW FUNCTIONS
// ============================================

/// Get session ID
public fun session_id(session: &RentalSession): ID {
    object::id(session)
}

/// Get robot name
public fun robot_name(session: &RentalSession): String {
    session.robot_name
}

/// Get user address
public fun user(session: &RentalSession): address {
    session.user
}

/// Get user's public key
public fun user_public_key(session: &RentalSession): vector<u8> {
    session.user_public_key
}

/// Get operator address
public fun operator(session: &RentalSession): address {
    session.operator
}

/// Get operator's public key
public fun operator_public_key(session: &RentalSession): vector<u8> {
    session.operator_public_key
}

/// Get price per minute
public fun price_per_minute(session: &RentalSession): u64 {
    session.price_per_minute
}

/// Get escrowed amount
public fun escrowed_amount(session: &RentalSession): u64 {
    session.escrow.value()
}

/// Get prepaid minutes
public fun prepaid_minutes(session: &RentalSession): u64 {
    session.prepaid_minutes
}

/// Get start time
public fun start_time(session: &RentalSession): u64 {
    session.start_time
}

/// Get last activity time
public fun last_activity(session: &RentalSession): u64 {
    session.last_activity
}

/// Get current sequence number
public fun sequence_number(session: &RentalSession): u64 {
    session.sequence_number
}

/// Check if session is active
public fun is_active(session: &RentalSession): bool {
    session.is_active
}

/// Check if session has timed out
public fun is_timed_out(session: &RentalSession, clock: &Clock): bool {
    let current_time = clock.timestamp_ms();
    current_time - session.last_activity >= SESSION_TIMEOUT_MS
}

/// Get remaining prepaid time (in minutes)
public fun remaining_minutes(session: &RentalSession, clock: &Clock): u64 {
    let current_time = clock.timestamp_ms();
    let elapsed_ms = current_time - session.start_time;
    let elapsed_minutes = elapsed_ms / 60_000;

    if (elapsed_minutes >= session.prepaid_minutes) {
        0
    } else {
        session.prepaid_minutes - elapsed_minutes
    }
}

/// Get session timeout constant
public fun session_timeout_ms(): u64 {
    SESSION_TIMEOUT_MS
}

// Receipt accessors
public fun receipt_robot_name(receipt: &RentalReceipt): String { receipt.robot_name }

public fun receipt_user(receipt: &RentalReceipt): address { receipt.user }

public fun receipt_operator(receipt: &RentalReceipt): address { receipt.operator }

public fun receipt_start_time(receipt: &RentalReceipt): u64 { receipt.start_time }

public fun receipt_end_time(receipt: &RentalReceipt): u64 { receipt.end_time }

public fun receipt_prepaid_minutes(receipt: &RentalReceipt): u64 { receipt.prepaid_minutes }

public fun receipt_actual_minutes(receipt: &RentalReceipt): u64 { receipt.actual_minutes }

public fun receipt_amount_paid(receipt: &RentalReceipt): u64 { receipt.amount_paid }

public fun receipt_amount_refunded(receipt: &RentalReceipt): u64 { receipt.amount_refunded }
