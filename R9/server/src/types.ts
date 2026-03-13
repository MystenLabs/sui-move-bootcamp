/**
 * Type definitions for the multiplayer robot queue system.
 *
 * These types mirror the Move contract events and provide
 * type-safe communication between server and clients.
 */

// ============================================
// Blockchain Event Types
// ============================================

/**
 * Emitted when the queue is created.
 */
export interface QueueCreatedEvent {
  queue_id: string;
  name: string;
  admin: string;
  max_pending_per_user: string;
  cooldown_ms: string;
}

/**
 * Emitted when an action is queued.
 */
export interface ActionQueuedEvent {
  queue_id: string;
  action_name: string;
  sender: string;
  position: string;
  is_priority: boolean;
  queue_length: string;
  timestamp: string;
}

/**
 * Emitted when an action is processed.
 */
export interface ActionProcessedEvent {
  queue_id: string;
  action_name: string;
  original_sender: string;
  was_priority: boolean;
  wait_time_ms: string;
  timestamp: string;
  remaining_in_queue: string;
}

/**
 * Emitted when user stats change.
 */
export interface UserStatsUpdatedEvent {
  queue_id: string;
  user: string;
  pending_count: string;
  total_queued: string;
  total_processed: string;
  cooldown_remaining_ms: string;
}

/**
 * Emitted when queue state changes.
 */
export interface QueueStateChangedEvent {
  queue_id: string;
  queue_length: string;
  unique_users: string;
  total_queued: string;
  total_processed: string;
  is_paused: boolean;
}

// ============================================
// WebSocket Message Types
// ============================================

/**
 * Message types sent from server to clients.
 */
export type ServerMessageType =
  | "queue_state" // Full queue state snapshot
  | "action_queued" // New action added
  | "action_processed" // Action completed
  | "user_stats" // User statistics update
  | "error" // Error message
  | "welcome"; // Connection welcome

/**
 * Base server message structure.
 */
export interface ServerMessage {
  type: ServerMessageType;
  timestamp: number;
  data: unknown;
}

/**
 * Full queue state snapshot.
 */
export interface QueueStateMessage extends ServerMessage {
  type: "queue_state";
  data: {
    queueId: string;
    queueLength: number;
    uniqueUsers: number;
    totalQueued: number;
    totalProcessed: number;
    isPaused: boolean;
    pendingActions: PendingAction[];
  };
}

/**
 * Action queued notification.
 */
export interface ActionQueuedMessage extends ServerMessage {
  type: "action_queued";
  data: {
    queueId: string;
    actionName: string;
    sender: string;
    position: number;
    isPriority: boolean;
    queueLength: number;
  };
}

/**
 * Action processed notification.
 */
export interface ActionProcessedMessage extends ServerMessage {
  type: "action_processed";
  data: {
    queueId: string;
    actionName: string;
    originalSender: string;
    wasPriority: boolean;
    waitTimeMs: number;
    remainingInQueue: number;
  };
}

/**
 * User statistics update.
 */
export interface UserStatsMessage extends ServerMessage {
  type: "user_stats";
  data: {
    queueId: string;
    user: string;
    pendingCount: number;
    totalQueued: number;
    totalProcessed: number;
    cooldownRemainingMs: number;
  };
}

/**
 * Welcome message on connection.
 */
export interface WelcomeMessage extends ServerMessage {
  type: "welcome";
  data: {
    serverVersion: string;
    queueId: string | null;
  };
}

/**
 * Error message.
 */
export interface ErrorMessage extends ServerMessage {
  type: "error";
  data: {
    code: string;
    message: string;
  };
}

// ============================================
// Internal Types
// ============================================

/**
 * A pending action in the queue.
 */
export interface PendingAction {
  actionName: string;
  sender: string;
  timestamp: number;
  isPriority: boolean;
  position: number;
}

/**
 * Client message types.
 */
export type ClientMessageType = "subscribe" | "unsubscribe" | "get_state";

/**
 * Client message structure.
 */
export interface ClientMessage {
  type: ClientMessageType;
  queueId?: string;
}
