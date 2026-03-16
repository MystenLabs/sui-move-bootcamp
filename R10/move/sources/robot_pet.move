/// # Robot Pet - Feed Your Robot Dog!
///
/// Queue robot actions by spending TREAT tokens.
/// This is Mode 1 of the platform: 1 TREAT = 1 robot action.
///
/// ## What This Module Teaches
/// - Receiving and handling Coin objects
/// - The Coin vs Balance distinction
/// - Destroying tokens (burning)
/// - FIFO queue implementation
/// - Events for off-chain tracking
///
/// ## Two Modes of Robot Control
///
/// This module implements **Mode 1: Pay-Per-Action**
/// - User pays 1 TREAT per action
/// - Action goes into a queue
/// - Processor pops actions and executes them
/// - Good for simple, casual interactions
///
/// For **Mode 2: Real-Time Rental**, see rental_session.move
/// - User rents robot for a time period
/// - Control via WebSocket with Ed25519 signatures
/// - No per-action cost (prepaid)
/// - Good for extended, real-time control
///
/// ## Architecture
///
/// ```
/// ┌─────────────────────────────────────────────────────────────────┐
/// │                    MODE 1: PAY-PER-ACTION                       │
/// │                                                                 │
/// │   User          Smart Contract           Processor              │
/// │    │                 │                      │                   │
/// │    │  feed(TREAT)    │                      │                   │
/// │    │────────────────>│                      │                   │
/// │    │                 │   ActionQueued       │                   │
/// │    │                 │   event              │                   │
/// │    │                 │─────────────────────>│                   │
/// │    │                 │                      │  pop_action()     │
/// │    │                 │<─────────────────────│                   │
/// │    │                 │   ActionProcessed    │                   │
/// │    │                 │   event              │                   │
/// │    │                 │─────────────────────>│ Execute on robot  │
/// └─────────────────────────────────────────────────────────────────┘
/// ```
module robot_rental_platform::robot_pet;

use robot_rental_platform::treat::TREAT;
use std::string::String;
use sui::clock::Clock;
use sui::coin::Coin;
use sui::event;

// ============================================
// CONSTANTS
// ============================================

/// Cost to queue one action (1 TREAT)
const ACTION_COST: u64 = 1;

// ============================================
// ERROR CODES
// ============================================

/// Payment amount doesn't match required cost
const EInsufficientPayment: u64 = 100;

/// Tried to pop from an empty queue
const EQueueEmpty: u64 = 101;

/// Only the admin can pop actions
const ENotAdmin: u64 = 102;

/// The action name is not supported
const EUnsupportedAction: u64 = 103;

// ============================================
// SUPPORTED ACTIONS
// ============================================

/// List of valid action names for Petoi Bittle robot
const VALID_ACTIONS: vector<vector<u8>> = vector[
    b"sit",
    b"stand",
    b"wave",
    b"walk_forward",
    b"walk_backward",
    b"turn_left",
    b"turn_right",
    b"jump",
    b"balance",
    b"rest",
    b"push_up",
    b"play_dead",
    b"stretch",
    b"greeting",
    b"sniff",
    b"pee",
];

// ============================================
// DATA STRUCTURES
// ============================================

/// A queued action with metadata.
///
/// We track who submitted it and when for:
/// - Fair processing (FIFO)
/// - Analytics and history
/// - Potential refunds or disputes
public struct QueuedAction has copy, drop, store {
    /// The action to perform (e.g., "sit", "wave")
    action_name: String,
    /// Who submitted this action
    sender: address,
    /// When it was submitted (milliseconds)
    timestamp: u64,
}

/// The shared robot pet that everyone can feed.
///
/// This is a shared object so anyone can:
/// - View the queue
/// - Add actions (with payment)
/// Only the admin can pop/process actions.
public struct RobotPet has key {
    id: UID,
    /// Name of this robot
    name: String,
    /// FIFO queue of pending actions
    action_queue: vector<QueuedAction>,
    /// Total actions ever queued
    total_actions_queued: u64,
    /// Total actions processed
    total_actions_processed: u64,
    /// Total TREAT tokens collected (burned)
    total_treats_collected: u64,
    /// Admin who can process the queue
    admin: address,
}

// ============================================
// EVENTS
// ============================================

/// Emitted when the robot pet is created.
public struct RobotPetCreated has copy, drop {
    robot_id: ID,
    name: String,
    admin: address,
}

/// Emitted when someone feeds the robot (queues an action).
///
/// Off-chain systems can listen for this to:
/// - Update UI showing queue length
/// - Notify users their action was accepted
/// - Trigger analytics
public struct ActionQueued has copy, drop {
    robot_id: ID,
    action_name: String,
    sender: address,
    queue_position: u64,
    timestamp: u64,
}

/// Emitted when an action is processed (popped from queue).
///
/// The processor service listens for this to:
/// - Send commands to the physical robot
/// - Update UI showing current action
public struct ActionProcessed has copy, drop {
    robot_id: ID,
    action_name: String,
    original_sender: address,
    timestamp: u64,
}

// ============================================
// INITIALIZATION / CREATION
// ============================================

/// Create a new RobotPet. The creator becomes the admin.
///
/// The robot is shared so anyone can interact with it.
///
/// ## Parameters
/// - `name`: A friendly name for this robot
/// - `ctx`: Transaction context (provides sender address)
public fun create_robot(name: String, ctx: &mut TxContext) {
    let robot = RobotPet {
        id: object::new(ctx),
        name,
        action_queue: vector::empty(),
        total_actions_queued: 0,
        total_actions_processed: 0,
        total_treats_collected: 0,
        admin: ctx.sender(),
    };

    let robot_id = object::id(&robot);

    event::emit(RobotPetCreated {
        robot_id,
        name: robot.name,
        admin: robot.admin,
    });

    transfer::share_object(robot);
}

// ============================================
// PUBLIC FUNCTIONS
// ============================================

/// Feed the robot to queue an action.
///
/// This is the main user-facing function:
/// 1. User sends 1 TREAT token
/// 2. Token is burned (sent to zero address)
/// 3. Action is added to the queue
/// 4. Event is emitted for off-chain systems
///
/// ## Parameters
/// - `robot`: The shared RobotPet
/// - `payment`: Exactly 1 TREAT token
/// - `action_name`: What action to queue (must be in VALID_ACTIONS)
/// - `clock`: Sui system clock for timestamp
/// - `ctx`: Transaction context
///
/// ## Errors
/// - `EInsufficientPayment`: Payment isn't at least 1 TREAT
/// - `EUnsupportedAction`: Action name not recognized
public fun feed(
    robot: &mut RobotPet,
    payment: Coin<TREAT>,
    action_name: String,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    // Verify payment amount
    let payment_amount = payment.value();
    assert!(payment_amount >= ACTION_COST, EInsufficientPayment);

    // Verify action is supported
    assert!(is_valid_action(&action_name), EUnsupportedAction);

    // Burn the token (send to zero address)
    // This reduces circulating supply
    transfer::public_transfer(payment, @0x0);

    // Create the queued action
    let action = QueuedAction {
        action_name,
        sender: ctx.sender(),
        timestamp: clock.timestamp_ms(),
    };

    // Add to queue
    let queue_position = robot.action_queue.length();
    robot.action_queue.push_back(action);
    robot.total_actions_queued = robot.total_actions_queued + 1;
    robot.total_treats_collected = robot.total_treats_collected + payment_amount;

    // Emit event for off-chain systems
    event::emit(ActionQueued {
        robot_id: object::id(robot),
        action_name: action.action_name,
        sender: action.sender,
        queue_position,
        timestamp: action.timestamp,
    });
}

/// Process the next action in the queue (admin only).
///
/// Called by the processor service when it's ready to execute.
/// Removes the first action (FIFO) and emits an event.
///
/// ## Parameters
/// - `robot`: The shared RobotPet
/// - `clock`: Sui system clock for timestamp
/// - `ctx`: Transaction context (must be admin)
public fun pop_action(robot: &mut RobotPet, clock: &Clock, ctx: &mut TxContext) {
    // Only admin can pop
    assert!(ctx.sender() == robot.admin, ENotAdmin);

    // Must have actions to pop
    assert!(!robot.action_queue.is_empty(), EQueueEmpty);

    // Remove first action (FIFO)
    let action = robot.action_queue.remove(0);
    robot.total_actions_processed = robot.total_actions_processed + 1;

    // Emit event for processor
    event::emit(ActionProcessed {
        robot_id: object::id(robot),
        action_name: action.action_name,
        original_sender: action.sender,
        timestamp: clock.timestamp_ms(),
    });
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/// Check if an action name is in our list of valid actions.
fun is_valid_action(action_name: &String): bool {
    let action_bytes = action_name.as_bytes();
    let valid = VALID_ACTIONS;
    let mut i = 0;
    let len = valid.length();

    while (i < len) {
        if (*action_bytes == valid[i]) {
            return true
        };
        i = i + 1;
    };

    false
}

// ============================================
// VIEW FUNCTIONS
// ============================================

/// Get the robot's ID.
public fun id(robot: &RobotPet): ID {
    object::id(robot)
}

/// Get the number of pending actions.
public fun queue_length(robot: &RobotPet): u64 {
    robot.action_queue.length()
}

/// Get the next action in the queue (without removing it).
///
/// Returns option::none() if queue is empty.
public fun peek_next_action(robot: &RobotPet): Option<QueuedAction> {
    if (robot.action_queue.is_empty()) {
        option::none()
    } else {
        option::some(robot.action_queue[0])
    }
}

/// Get the robot's name.
public fun name(robot: &RobotPet): String {
    robot.name
}

/// Get total actions ever queued.
public fun total_queued(robot: &RobotPet): u64 {
    robot.total_actions_queued
}

/// Get total actions processed.
public fun total_processed(robot: &RobotPet): u64 {
    robot.total_actions_processed
}

/// Get total TREAT tokens collected.
public fun total_treats(robot: &RobotPet): u64 {
    robot.total_treats_collected
}

/// Get the admin address.
public fun admin(robot: &RobotPet): address {
    robot.admin
}

/// Check if an address is the admin.
public fun is_admin(robot: &RobotPet, addr: address): bool {
    robot.admin == addr
}

/// Get the cost per action.
public fun action_cost(): u64 {
    ACTION_COST
}

/// Get the list of valid actions.
public fun valid_actions(): vector<vector<u8>> {
    VALID_ACTIONS
}

// Accessors for QueuedAction
public fun action_name(action: &QueuedAction): String { action.action_name }

public fun action_sender(action: &QueuedAction): address { action.sender }

public fun action_timestamp(action: &QueuedAction): u64 { action.timestamp }
