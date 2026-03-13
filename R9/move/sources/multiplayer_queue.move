/// # Multiplayer Queue - Fair Access for Everyone!
///
/// A shared robot queue with fairness mechanisms for multiple users.
/// Prevents any single user from hogging the robot.
///
/// ## What This Module Teaches
/// - Per-user limits and tracking
/// - Cooldown mechanisms
/// - Priority queue patterns
/// - Event-driven architecture for real-time updates
/// - Table storage for user statistics
///
/// ## Fairness Mechanisms
///
/// ### 1. Per-User Pending Limit
/// Each user can only have N actions pending at once.
/// Once their actions are processed, they can queue more.
///
/// ### 2. Cooldown Period
/// After queueing an action, users must wait before queueing another.
/// This prevents rapid-fire spamming.
///
/// ### 3. Priority Queue (Optional)
/// Users can pay extra to jump to the front of the queue.
/// This creates economic incentives while still being fair.
///
/// ## Events for Real-Time Updates
/// Every state change emits an event that off-chain systems can listen to.
/// This enables live dashboards showing queue state to all users.
#[allow(unused_const, unused_mut_parameter)]
module multiplayer_robot::multiplayer_queue;

use std::string::String;
use sui::clock::Clock;
use sui::event;
use sui::table::{Self, Table};

// ============================================
// CONSTANTS
// ============================================

/// Maximum pending actions per user
const MAX_PENDING_PER_USER: u64 = 3;

/// Cooldown between actions in milliseconds (30 seconds)
const COOLDOWN_MS: u64 = 30_000;

/// Priority fee multiplier (2x normal)
const PRIORITY_MULTIPLIER: u64 = 2;

// ============================================
// ERROR CODES
// ============================================

/// User has too many pending actions
const ETooManyPending: u64 = 300;

/// User is in cooldown period
const EInCooldown: u64 = 301;

/// Queue is empty
const EQueueEmpty: u64 = 302;

/// Only admin can perform this action
const ENotAdmin: u64 = 303;

/// Invalid action name
const EInvalidAction: u64 = 304;

/// Queue is paused, no new actions can be queued
const EQueuePaused: u64 = 305;

// ============================================
// SUPPORTED ACTIONS
// ============================================

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
    b"push_up",
];

// ============================================
// DATA STRUCTURES
// ============================================

/// Statistics for a single user.
/// Tracked in a Table keyed by address.
public struct UserStats has copy, drop, store {
    /// Number of actions currently in queue
    pending_count: u64,
    /// Total actions ever queued by this user
    total_queued: u64,
    /// Total actions processed for this user
    total_processed: u64,
    /// Timestamp of last action queued
    last_queue_time: u64,
    /// Number of priority actions used
    priority_uses: u64,
}

/// A queued action with priority support.
public struct QueuedAction has copy, drop, store {
    /// The action to perform
    action_name: String,
    /// Who queued this action
    sender: address,
    /// When it was queued
    timestamp: u64,
    /// Is this a priority action?
    is_priority: bool,
    /// Position when queued (for analytics)
    original_position: u64,
}

/// The shared multiplayer robot queue.
///
/// This is the main shared object that all users interact with.
/// It maintains the action queue and per-user statistics.
public struct MultiplayerQueue has key {
    id: UID,
    /// Name of this robot/queue
    name: String,
    /// The action queue (priority actions at front)
    actions: vector<QueuedAction>,
    /// Per-user statistics
    user_stats: Table<address, UserStats>,
    /// Total unique users
    unique_users: u64,
    /// Total actions ever queued
    total_queued: u64,
    /// Total actions processed
    total_processed: u64,
    /// Maximum pending per user (configurable)
    max_pending_per_user: u64,
    /// Cooldown in milliseconds (configurable)
    cooldown_ms: u64,
    /// Admin address
    admin: address,
    /// Is the queue paused?
    is_paused: bool,
}

// ============================================
// EVENTS
// ============================================

/// Emitted when the queue is created.
public struct QueueCreated has copy, drop {
    queue_id: ID,
    name: String,
    admin: address,
    max_pending_per_user: u64,
    cooldown_ms: u64,
}

/// Emitted when an action is queued.
/// Off-chain systems use this to update dashboards in real-time.
public struct ActionQueued has copy, drop {
    queue_id: ID,
    action_name: String,
    sender: address,
    position: u64,
    is_priority: bool,
    queue_length: u64,
    timestamp: u64,
}

/// Emitted when an action is processed.
public struct ActionProcessed has copy, drop {
    queue_id: ID,
    action_name: String,
    original_sender: address,
    was_priority: bool,
    wait_time_ms: u64,
    timestamp: u64,
    remaining_in_queue: u64,
}

/// Emitted when user stats change (for dashboard updates).
public struct UserStatsUpdated has copy, drop {
    queue_id: ID,
    user: address,
    pending_count: u64,
    total_queued: u64,
    total_processed: u64,
    cooldown_remaining_ms: u64,
}

/// Emitted for queue state broadcasts.
public struct QueueStateChanged has copy, drop {
    queue_id: ID,
    queue_length: u64,
    unique_users: u64,
    total_queued: u64,
    total_processed: u64,
    is_paused: bool,
}

// ============================================
// INITIALIZATION
// ============================================

/// Create a new multiplayer queue.
///
/// The creator becomes the admin and can:
/// - Process actions (pop from queue)
/// - Pause/unpause the queue
/// - Adjust settings
public fun create_queue(name: String, ctx: &mut TxContext) {
    let queue = MultiplayerQueue {
        id: object::new(ctx),
        name,
        actions: vector::empty(),
        user_stats: table::new(ctx),
        unique_users: 0,
        total_queued: 0,
        total_processed: 0,
        max_pending_per_user: MAX_PENDING_PER_USER,
        cooldown_ms: COOLDOWN_MS,
        admin: ctx.sender(),
        is_paused: false,
    };

    event::emit(QueueCreated {
        queue_id: object::id(&queue),
        name: queue.name,
        admin: queue.admin,
        max_pending_per_user: queue.max_pending_per_user,
        cooldown_ms: queue.cooldown_ms,
    });

    transfer::share_object(queue);
}

// ============================================
// PUBLIC FUNCTIONS - Queueing Actions
// ============================================

/// Queue an action (standard, goes to back of queue).
///
/// ## Fairness Rules
/// 1. Cannot exceed max pending actions per user
/// 2. Must wait for cooldown after last action
/// 3. Queue must not be paused
///
/// ## Parameters
/// - queue: The shared MultiplayerQueue
/// - action_name: The action to queue (must be valid)
/// - clock: Sui system clock
/// - ctx: Transaction context
public fun queue_action(
    queue: &mut MultiplayerQueue,
    action_name: String,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    queue_action_internal(queue, action_name, false, clock, ctx);
}

/// Queue a priority action (goes to front of queue).
///
/// Priority actions skip the regular queue but:
/// - Still count toward pending limit
/// - Still respect cooldown
/// - Are tracked separately in stats
///
/// In a real system, this would require extra payment.
public fun queue_priority_action(
    queue: &mut MultiplayerQueue,
    action_name: String,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    queue_action_internal(queue, action_name, true, clock, ctx);
}

/// Internal function to queue an action.
fun queue_action_internal(
    queue: &mut MultiplayerQueue,
    action_name: String,
    is_priority: bool,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    // Reject new actions while paused
    assert!(!queue.is_paused, EQueuePaused);

    let sender = ctx.sender();
    let current_time = clock.timestamp_ms();

    // Validate action name
    assert!(is_valid_action(&action_name), EInvalidAction);

    // Get or create user stats
    if (!queue.user_stats.contains(sender)) {
        queue
            .user_stats
            .add(
                sender,
                UserStats {
                    pending_count: 0,
                    total_queued: 0,
                    total_processed: 0,
                    last_queue_time: 0,
                    priority_uses: 0,
                },
            );
        queue.unique_users = queue.unique_users + 1;
    };

    // Check limits and cooldown (read-only)
    {
        let stats = queue.user_stats.borrow(sender);
        assert!(stats.pending_count < queue.max_pending_per_user, ETooManyPending);
        if (stats.last_queue_time > 0) {
            let time_since_last = current_time - stats.last_queue_time;
            assert!(time_since_last >= queue.cooldown_ms, EInCooldown);
        };
    };

    // Create the action
    let position = queue.actions.length();
    let action = QueuedAction {
        action_name,
        sender,
        timestamp: current_time,
        is_priority,
        original_position: position,
    };

    // Add to queue (priority goes to front, regular to back)
    if (is_priority) {
        queue.actions.insert(action, 0);
    } else {
        queue.actions.push_back(action);
    };

    // Update stats (mutable borrow)
    let (new_pending, new_total_queued, new_total_processed) = {
        let stats = queue.user_stats.borrow_mut(sender);
        stats.pending_count = stats.pending_count + 1;
        stats.total_queued = stats.total_queued + 1;
        stats.last_queue_time = current_time;
        if (is_priority) {
            stats.priority_uses = stats.priority_uses + 1;
        };
        (stats.pending_count, stats.total_queued, stats.total_processed)
    };

    queue.total_queued = queue.total_queued + 1;
    let queue_length = queue.actions.length();
    let queue_id = object::id(queue);

    // Emit events for real-time updates
    event::emit(ActionQueued {
        queue_id,
        action_name: action.action_name,
        sender,
        position: if (is_priority) { 0 } else { position },
        is_priority,
        queue_length,
        timestamp: current_time,
    });

    // Emit user stats update (cooldown just started, so full cooldown remaining)
    event::emit(UserStatsUpdated {
        queue_id,
        user: sender,
        pending_count: new_pending,
        total_queued: new_total_queued,
        total_processed: new_total_processed,
        cooldown_remaining_ms: queue.cooldown_ms,
    });

    // Emit queue state change
    event::emit(QueueStateChanged {
        queue_id,
        queue_length,
        unique_users: queue.unique_users,
        total_queued: queue.total_queued,
        total_processed: queue.total_processed,
        is_paused: queue.is_paused,
    });
}

// ============================================
// PUBLIC FUNCTIONS - Processing Actions
// ============================================

/// Process (pop) the next action from the queue.
/// Admin only.
public fun process_action(queue: &mut MultiplayerQueue, clock: &Clock, ctx: &mut TxContext) {
    assert!(ctx.sender() == queue.admin, ENotAdmin);
    assert!(!queue.actions.is_empty(), EQueueEmpty);

    let current_time = clock.timestamp_ms();

    // Remove first action (FIFO)
    let action = queue.actions.remove(0);

    // Update user stats and capture values for events
    let mut user_pending = 0u64;
    let mut user_total_q = 0u64;
    let mut user_total_p = 0u64;
    let has_stats = queue.user_stats.contains(action.sender);

    if (has_stats) {
        let stats = queue.user_stats.borrow_mut(action.sender);
        stats.pending_count = stats.pending_count - 1;
        stats.total_processed = stats.total_processed + 1;
        user_pending = stats.pending_count;
        user_total_q = stats.total_queued;
        user_total_p = stats.total_processed;
    };

    queue.total_processed = queue.total_processed + 1;

    // Calculate wait time
    let wait_time = current_time - action.timestamp;

    // Get queue state for events (after releasing mutable borrow)
    let queue_id = object::id(queue);
    let remaining = queue.actions.length();

    // Emit user stats update if we had stats
    if (has_stats) {
        event::emit(UserStatsUpdated {
            queue_id,
            user: action.sender,
            pending_count: user_pending,
            total_queued: user_total_q,
            total_processed: user_total_p,
            cooldown_remaining_ms: 0, // They can queue again after processing
        });
    };

    // Emit processed event
    event::emit(ActionProcessed {
        queue_id,
        action_name: action.action_name,
        original_sender: action.sender,
        was_priority: action.is_priority,
        wait_time_ms: wait_time,
        timestamp: current_time,
        remaining_in_queue: remaining,
    });

    // Emit queue state change
    event::emit(QueueStateChanged {
        queue_id,
        queue_length: remaining,
        unique_users: queue.unique_users,
        total_queued: queue.total_queued,
        total_processed: queue.total_processed,
        is_paused: queue.is_paused,
    });
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

/// Pause the queue (no new actions can be queued).
public fun pause_queue(queue: &mut MultiplayerQueue, ctx: &mut TxContext) {
    assert!(ctx.sender() == queue.admin, ENotAdmin);
    queue.is_paused = true;

    event::emit(QueueStateChanged {
        queue_id: object::id(queue),
        queue_length: queue.actions.length(),
        unique_users: queue.unique_users,
        total_queued: queue.total_queued,
        total_processed: queue.total_processed,
        is_paused: true,
    });
}

/// Unpause the queue.
public fun unpause_queue(queue: &mut MultiplayerQueue, ctx: &mut TxContext) {
    assert!(ctx.sender() == queue.admin, ENotAdmin);
    queue.is_paused = false;

    event::emit(QueueStateChanged {
        queue_id: object::id(queue),
        queue_length: queue.actions.length(),
        unique_users: queue.unique_users,
        total_queued: queue.total_queued,
        total_processed: queue.total_processed,
        is_paused: false,
    });
}

/// Update max pending per user (admin only).
public fun set_max_pending(queue: &mut MultiplayerQueue, new_max: u64, ctx: &mut TxContext) {
    assert!(ctx.sender() == queue.admin, ENotAdmin);
    queue.max_pending_per_user = new_max;
}

/// Update cooldown period (admin only).
public fun set_cooldown(queue: &mut MultiplayerQueue, new_cooldown_ms: u64, ctx: &mut TxContext) {
    assert!(ctx.sender() == queue.admin, ENotAdmin);
    queue.cooldown_ms = new_cooldown_ms;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/// Check if an action name is valid.
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

/// Get the number of pending actions.
public fun queue_length(queue: &MultiplayerQueue): u64 {
    queue.actions.length()
}

/// Get the queue name.
public fun name(queue: &MultiplayerQueue): String {
    queue.name
}

/// Check if queue is paused.
public fun is_paused(queue: &MultiplayerQueue): bool {
    queue.is_paused
}

/// Get total unique users.
public fun unique_users(queue: &MultiplayerQueue): u64 {
    queue.unique_users
}

/// Get total actions queued.
public fun total_queued(queue: &MultiplayerQueue): u64 {
    queue.total_queued
}

/// Get total actions processed.
public fun total_processed(queue: &MultiplayerQueue): u64 {
    queue.total_processed
}

/// Get max pending per user.
public fun max_pending_per_user(queue: &MultiplayerQueue): u64 {
    queue.max_pending_per_user
}

/// Get cooldown in milliseconds.
public fun cooldown_ms(queue: &MultiplayerQueue): u64 {
    queue.cooldown_ms
}

/// Get user's pending count.
public fun user_pending_count(queue: &MultiplayerQueue, user: address): u64 {
    if (queue.user_stats.contains(user)) {
        queue.user_stats.borrow(user).pending_count
    } else {
        0
    }
}

/// Get user's total queued.
public fun user_total_queued(queue: &MultiplayerQueue, user: address): u64 {
    if (queue.user_stats.contains(user)) {
        queue.user_stats.borrow(user).total_queued
    } else {
        0
    }
}

/// Check if user can queue now (respects limits and cooldown).
public fun can_user_queue(queue: &MultiplayerQueue, user: address, clock: &Clock): bool {
    if (queue.is_paused) {
        return false
    };

    if (!queue.user_stats.contains(user)) {
        return true
    };

    let stats = queue.user_stats.borrow(user);

    // Check pending limit
    if (stats.pending_count >= queue.max_pending_per_user) {
        return false
    };

    // Check cooldown
    if (stats.last_queue_time > 0) {
        let current_time = clock.timestamp_ms();
        if (current_time - stats.last_queue_time < queue.cooldown_ms) {
            return false
        };
    };

    true
}

/// Get remaining cooldown for a user in milliseconds.
public fun remaining_cooldown(queue: &MultiplayerQueue, user: address, clock: &Clock): u64 {
    if (!queue.user_stats.contains(user)) {
        return 0
    };

    let stats = queue.user_stats.borrow(user);
    let current_time = clock.timestamp_ms();

    if (stats.last_queue_time == 0) {
        return 0
    };

    let cooldown_end = stats.last_queue_time + queue.cooldown_ms;
    if (current_time >= cooldown_end) {
        0
    } else {
        cooldown_end - current_time
    }
}

/// Get the admin address.
public fun admin(queue: &MultiplayerQueue): address {
    queue.admin
}

/// Check if address is admin.
public fun is_admin(queue: &MultiplayerQueue, addr: address): bool {
    queue.admin == addr
}

/// Get the next action in queue (without removing).
public fun peek_next(queue: &MultiplayerQueue): Option<QueuedAction> {
    if (queue.actions.is_empty()) {
        option::none()
    } else {
        option::some(queue.actions[0])
    }
}
