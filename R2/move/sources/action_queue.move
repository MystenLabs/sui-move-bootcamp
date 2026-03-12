/// # Action Queue - A Simple Blockchain Queue
///
/// This is the simplest possible Sui Move contract that demonstrates:
/// - Creating shared objects
/// - Storing data on-chain
/// - Emitting events
/// - Reading and modifying state
///
/// ## What This Contract Does
/// 1. Stores a queue of robot actions on the blockchain
/// 2. Anyone can add actions to the queue
/// 3. Anyone can read the queue
/// 4. A processor can pop actions from the queue
///
/// ## Key Concepts
/// - **Shared Object**: An object that anyone can access and modify
/// - **Events**: Notifications emitted when things happen on-chain
module action_queue::robot_queue;

use std::string::String;
use sui::clock::Clock;
use sui::event;

// ============================================
// ERROR CODES
// ============================================

/// Queue is empty, nothing to pop
const EQueueEmpty: u64 = 0;
/// Not authorized to perform admin actions
const ENotAuthorized: u64 = 1;

// ============================================
// DATA STRUCTURES
// ============================================

/// A single action in the queue.
/// `store` ability allows it to be stored inside other objects.
/// `copy` and `drop` allow it to be copied and discarded.
public struct Action has copy, drop, store {
    /// Name of the action (e.g., "sit", "walk_forward", "wave")
    name: String,
    /// Who added this action
    sender: address,
    /// When was this action added (epoch timestamp)
    timestamp: u64,
}

/// The main queue object - this is a "shared object" that anyone can access.
/// `key` ability means this is a Sui object with a unique ID.
public struct ActionQueue has key {
    /// Unique identifier for this object
    id: UID,
    /// List of pending actions (FIFO - first in, first out)
    actions: vector<Action>,
    /// Counter for total actions ever added (including cleared/processed).
    /// Note: In production, historical counters like this are better tracked
    /// off-chain via an indexer. Kept here as a teaching example of on-chain
    /// state counters. Do not use this to iterate `actions` — use
    /// `actions.length()` for the current pending count instead.
    total_actions_added: u64,
    /// Counter for total actions ever processed
    total_actions_processed: u64,
    /// Admin address (can pop actions)
    admin: address,
}

// ============================================
// EVENTS
// ============================================

/// Emitted when a new action is added to the queue
public struct ActionAdded has copy, drop {
    /// Name of the action
    action_name: String,
    /// Who added it
    sender: address,
    /// Current queue length after adding
    queue_length: u64,
}

/// Emitted when an action is removed from the queue
public struct ActionProcessed has copy, drop {
    /// Name of the action that was processed
    action_name: String,
    /// Who originally added this action
    original_sender: address,
    /// Remaining queue length
    queue_length: u64,
}

/// Emitted when the queue is created
public struct QueueCreated has copy, drop {
    /// ID of the new queue
    queue_id: address,
    /// Admin address
    admin: address,
}

// ============================================
// INITIALIZATION
// ============================================

/// Create a new action queue.
/// The queue is "shared" so anyone can interact with it.
public fun create_queue(ctx: &mut TxContext) {
    let queue = ActionQueue {
        id: object::new(ctx),
        actions: vector[],
        total_actions_added: 0,
        total_actions_processed: 0,
        admin: ctx.sender(),
    };

    // Emit event so we can track the queue ID
    event::emit(QueueCreated {
        queue_id: object::id_address(&queue),
        admin: ctx.sender(),
    });

    // Share the object so anyone can access it
    transfer::share_object(queue);
}

// ============================================
// ADDING ACTIONS
// ============================================

/// Add a new action to the queue.
/// Anyone can call this function.
///
/// # Arguments
/// * `queue` - The shared queue object (passed by mutable reference)
/// * `action_name` - Name of the action to add
/// * `clock` - Sui's Clock object for getting current timestamp
public fun add_action(
    queue: &mut ActionQueue,
    action_name: String,
    clock: &Clock,
    ctx: &TxContext,
) {
    let action = Action {
        name: action_name,
        sender: ctx.sender(),
        timestamp: clock.timestamp_ms(),
    };

    // Add to the end of the queue
    queue.actions.push_back(action);
    queue.total_actions_added = queue.total_actions_added + 1;

    // Emit event
    event::emit(ActionAdded {
        action_name: action.name,
        sender: action.sender,
        queue_length: queue.actions.length(),
    });
}

// ============================================
// PROCESSING ACTIONS
// ============================================

/// Pop the next action from the queue (FIFO order).
/// Only the admin can call this.
///
/// # Arguments
/// * `queue` - The shared queue object
///
/// # Returns
/// The action that was removed
public fun pop_action(queue: &mut ActionQueue, ctx: &TxContext) {
    // Only admin can pop actions
    assert!(ctx.sender() == queue.admin, ENotAuthorized);

    // Check queue is not empty
    assert!(!queue.actions.is_empty(), EQueueEmpty);

    // Remove from the front of the queue (FIFO)
    let action = queue.actions.remove(0);
    queue.total_actions_processed = queue.total_actions_processed + 1;

    // Emit event
    event::emit(ActionProcessed {
        action_name: action.name,
        original_sender: action.sender,
        queue_length: queue.actions.length(),
    });
}

/// Clear all actions from the queue.
/// Only the admin can call this.
public fun clear_queue(queue: &mut ActionQueue, ctx: &TxContext) {
    assert!(ctx.sender() == queue.admin, ENotAuthorized);

    // Action has `drop`, so we can replace the vector directly
    queue.actions = vector[];
}

// ============================================
// VIEW FUNCTIONS (Read-only)
// ============================================

/// Get the current number of pending actions.
public fun queue_length(queue: &ActionQueue): u64 {
    queue.actions.length()
}

/// Get total actions ever added.
public fun total_added(queue: &ActionQueue): u64 {
    queue.total_actions_added
}

/// Get total actions ever processed.
public fun total_processed(queue: &ActionQueue): u64 {
    queue.total_actions_processed
}

/// Get the admin address.
public fun admin(queue: &ActionQueue): address {
    queue.admin
}

/// Peek at the next action without removing it.
/// Returns the action name if queue is not empty.
public fun peek_next(queue: &ActionQueue): Option<String> {
    if (queue.actions.is_empty()) {
        option::none()
    } else {
        option::some(queue.actions[0].name)
    }
}

/// Get all pending actions (for off-chain reading).
public fun get_all_actions(queue: &ActionQueue): &vector<Action> {
    &queue.actions
}
