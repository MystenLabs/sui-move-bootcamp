/// # Robot Registry - Discover Available Robots
///
/// A central registry where robot operators can list their robots for rental.
/// Users browse the registry to find available robots.
///
/// ## What This Module Teaches
/// - Using Table for efficient key-value storage
/// - Unique name validation
/// - Operator authorization patterns
/// - Event-driven discovery
///
/// ## Key Concepts
///
/// ### Registry Pattern
/// The registry is a shared object that maintains a list of all registered robots.
/// Operators can register/unregister their robots.
/// Users can query available robots.
///
/// ### Ed25519 Public Keys
/// Each robot has an operator public key (32 bytes) for authentication.
/// This key is used in the rental session to verify control commands.
module robot_rental_platform::robot_registry;

use std::string::String;
use sui::event;
use sui::table::{Self, Table};

// ============================================
// CONSTANTS
// ============================================

/// Minimum rental price per minute (in TREAT tokens)
const MIN_PRICE_PER_MINUTE: u64 = 1;

// ============================================
// ERROR CODES
// ============================================

/// Robot name already exists
const ERobotNameExists: u64 = 0;

/// Robot not found in registry
const ERobotNotFound: u64 = 1;

/// Not the robot operator
const ENotOperator: u64 = 2;

/// Invalid public key length (must be 32 bytes)
const EInvalidPublicKey: u64 = 3;

/// Price too low
const EPriceTooLow: u64 = 4;

/// Robot is not available for rent
const ERobotNotAvailable: u64 = 5;

// ============================================
// DATA STRUCTURES
// ============================================

/// Information about a registered robot
public struct RobotInfo has copy, drop, store {
    /// Unique name for this robot
    name: String,
    /// Description of the robot
    description: String,
    /// Robot type (e.g., "Petoi Bittle X", "Unitree Go2")
    robot_type: String,
    /// Operator's wallet address (receives payments)
    operator: address,
    /// Operator's Ed25519 public key (32 bytes) for session authentication
    operator_public_key: vector<u8>,
    /// Price per minute in TREAT tokens
    price_per_minute: u64,
    /// Is the robot currently available for rent?
    is_available: bool,
    /// When the robot was registered (timestamp ms)
    registered_at: u64,
    /// Total rental sessions completed
    total_sessions: u64,
    /// Total minutes rented
    total_minutes: u64,
}

/// The shared robot registry
public struct RobotRegistry has key {
    id: UID,
    /// Map of robot name -> RobotInfo
    robots: Table<String, RobotInfo>,
    /// List of all robot names (for iteration)
    robot_names: vector<String>,
    /// Total robots ever registered
    total_registered: u64,
    /// Currently active robots
    active_count: u64,
}

// ============================================
// EVENTS
// ============================================

/// Emitted when a robot is registered
public struct RobotRegistered has copy, drop {
    registry_id: ID,
    name: String,
    robot_type: String,
    operator: address,
    price_per_minute: u64,
}

/// Emitted when a robot is unregistered
public struct RobotUnregistered has copy, drop {
    registry_id: ID,
    name: String,
    operator: address,
}

/// Emitted when robot availability changes
public struct AvailabilityChanged has copy, drop {
    registry_id: ID,
    name: String,
    is_available: bool,
}

/// Emitted when robot info is updated
public struct RobotUpdated has copy, drop {
    registry_id: ID,
    name: String,
    new_price: u64,
}

// ============================================
// INITIALIZATION
// ============================================

/// Create the shared registry (call once during deployment)
public fun create_registry(ctx: &mut TxContext) {
    let registry = RobotRegistry {
        id: object::new(ctx),
        robots: table::new(ctx),
        robot_names: vector::empty(),
        total_registered: 0,
        active_count: 0,
    };

    transfer::share_object(registry);
}

// ============================================
// REGISTRATION FUNCTIONS
// ============================================

/// Register a new robot in the registry.
///
/// The caller becomes the operator and receives rental payments.
///
/// ## Parameters
/// - `registry`: The shared registry
/// - `name`: Unique name for the robot
/// - `description`: Description of the robot
/// - `robot_type`: Type of robot (e.g., "Petoi Bittle X")
/// - `operator_public_key`: Ed25519 public key (32 bytes) for command signing
/// - `price_per_minute`: Rental price in TREAT tokens per minute
/// - `clock`: Sui system clock
/// - `ctx`: Transaction context
public fun register_robot(
    registry: &mut RobotRegistry,
    name: String,
    description: String,
    robot_type: String,
    operator_public_key: vector<u8>,
    price_per_minute: u64,
    clock: &sui::clock::Clock,
    ctx: &mut TxContext,
) {
    // Validate name is unique
    assert!(!registry.robots.contains(name), ERobotNameExists);

    // Validate public key is 32 bytes (Ed25519)
    assert!(operator_public_key.length() == 32, EInvalidPublicKey);

    // Validate price
    assert!(price_per_minute >= MIN_PRICE_PER_MINUTE, EPriceTooLow);

    let operator = ctx.sender();

    let robot_info = RobotInfo {
        name,
        description,
        robot_type,
        operator,
        operator_public_key,
        price_per_minute,
        is_available: true,
        registered_at: clock.timestamp_ms(),
        total_sessions: 0,
        total_minutes: 0,
    };

    // Add to registry
    registry.robots.add(name, robot_info);
    registry.robot_names.push_back(name);
    registry.total_registered = registry.total_registered + 1;
    registry.active_count = registry.active_count + 1;

    // Emit event
    event::emit(RobotRegistered {
        registry_id: object::id(registry),
        name,
        robot_type,
        operator,
        price_per_minute,
    });
}

/// Unregister a robot from the registry.
/// Only the operator can unregister their robot.
public fun unregister_robot(registry: &mut RobotRegistry, name: String, ctx: &mut TxContext) {
    assert!(registry.robots.contains(name), ERobotNotFound);

    let robot = registry.robots.borrow(name);
    assert!(robot.operator == ctx.sender(), ENotOperator);

    // Remove from registry
    let _removed = registry.robots.remove(name);

    // Remove from names list
    let (found, index) = registry.robot_names.index_of(&name);
    if (found) {
        registry.robot_names.remove(index);
    };

    registry.active_count = registry.active_count - 1;

    // Emit event
    event::emit(RobotUnregistered {
        registry_id: object::id(registry),
        name,
        operator: ctx.sender(),
    });
}

/// Set robot availability (operator only).
///
/// Use this to mark a robot as unavailable when:
/// - Robot needs maintenance
/// - Robot is offline
/// - Operator is away
public fun set_availability(
    registry: &mut RobotRegistry,
    name: String,
    is_available: bool,
    ctx: &mut TxContext,
) {
    assert!(registry.robots.contains(name), ERobotNotFound);

    let robot = registry.robots.borrow_mut(name);
    assert!(robot.operator == ctx.sender(), ENotOperator);

    robot.is_available = is_available;

    event::emit(AvailabilityChanged {
        registry_id: object::id(registry),
        name,
        is_available,
    });
}

/// Update robot price (operator only).
public fun update_price(
    registry: &mut RobotRegistry,
    name: String,
    new_price: u64,
    ctx: &mut TxContext,
) {
    assert!(registry.robots.contains(name), ERobotNotFound);
    assert!(new_price >= MIN_PRICE_PER_MINUTE, EPriceTooLow);

    let robot = registry.robots.borrow_mut(name);
    assert!(robot.operator == ctx.sender(), ENotOperator);

    robot.price_per_minute = new_price;

    event::emit(RobotUpdated {
        registry_id: object::id(registry),
        name,
        new_price,
    });
}

/// Update operator public key (operator only).
/// Use when rotating keys for security.
public fun update_public_key(
    registry: &mut RobotRegistry,
    name: String,
    new_public_key: vector<u8>,
    ctx: &mut TxContext,
) {
    assert!(registry.robots.contains(name), ERobotNotFound);
    assert!(new_public_key.length() == 32, EInvalidPublicKey);

    let robot = registry.robots.borrow_mut(name);
    assert!(robot.operator == ctx.sender(), ENotOperator);

    robot.operator_public_key = new_public_key;
}

// ============================================
// INTERNAL FUNCTIONS (used by rental_session)
// ============================================

/// Increment session stats for a robot (package-only)
public(package) fun record_session_complete(
    registry: &mut RobotRegistry,
    name: String,
    duration_minutes: u64,
) {
    if (registry.robots.contains(name)) {
        let robot = registry.robots.borrow_mut(name);
        robot.total_sessions = robot.total_sessions + 1;
        robot.total_minutes = robot.total_minutes + duration_minutes;
    };
}

/// Get robot info (package-only)
public(package) fun get_robot_info(registry: &RobotRegistry, name: String): RobotInfo {
    assert!(registry.robots.contains(name), ERobotNotFound);
    *registry.robots.borrow(name)
}

/// Check if robot exists and is available (package-only)
public(package) fun is_robot_available(registry: &RobotRegistry, name: String): bool {
    if (!registry.robots.contains(name)) {
        return false
    };
    registry.robots.borrow(name).is_available
}

/// Assert that a robot exists and is available.
/// Aborts with ERobotNotAvailable if robot doesn't exist or is unavailable.
public(package) fun assert_robot_available(registry: &RobotRegistry, name: String) {
    assert!(is_robot_available(registry, name), ERobotNotAvailable);
}

// ============================================
// VIEW FUNCTIONS
// ============================================

/// Get robot info by name
public fun get_robot(registry: &RobotRegistry, name: String): Option<RobotInfo> {
    if (registry.robots.contains(name)) {
        option::some(*registry.robots.borrow(name))
    } else {
        option::none()
    }
}

/// Get all robot names
public fun get_robot_names(registry: &RobotRegistry): vector<String> {
    registry.robot_names
}

/// Get count of active robots
public fun active_robot_count(registry: &RobotRegistry): u64 {
    registry.active_count
}

/// Get total robots ever registered
public fun total_registered(registry: &RobotRegistry): u64 {
    registry.total_registered
}

/// Check if a robot name exists
public fun robot_exists(registry: &RobotRegistry, name: String): bool {
    registry.robots.contains(name)
}

// Accessor functions for RobotInfo
public fun robot_name(info: &RobotInfo): String { info.name }

public fun robot_description(info: &RobotInfo): String { info.description }

public fun robot_type(info: &RobotInfo): String { info.robot_type }

public fun robot_operator(info: &RobotInfo): address { info.operator }

public fun robot_operator_public_key(info: &RobotInfo): vector<u8> { info.operator_public_key }

public fun robot_price(info: &RobotInfo): u64 { info.price_per_minute }

public fun robot_is_available(info: &RobotInfo): bool { info.is_available }

public fun robot_total_sessions(info: &RobotInfo): u64 { info.total_sessions }

public fun robot_total_minutes(info: &RobotInfo): u64 { info.total_minutes }
