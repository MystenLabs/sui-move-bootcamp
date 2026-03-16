/**
 * Types for the Robot Rental WebSocket Server
 *
 * This file defines all the message types and data structures used
 * for communication between clients and the server.
 */

// ============================================
// SESSION TYPES
// ============================================

/**
 * Session data fetched from the blockchain
 */
export interface SessionData {
  sessionId: string;
  robotName: string;
  user: string;
  userPublicKey: Uint8Array;
  operator: string;
  operatorPublicKey: Uint8Array;
  pricePerMinute: number;
  escrowedAmount: number;
  prepaidMinutes: number;
  startTime: number;
  lastActivity: number;
  sequenceNumber: number;
  isActive: boolean;
}

/**
 * Connected client with their session info
 */
export interface ConnectedClient {
  sessionId: string;
  sessionData: SessionData;
  lastPing: number;
  authenticated: boolean;
}

// ============================================
// MESSAGE TYPES (Client -> Server)
// ============================================

/**
 * Authentication message - sent when client connects
 */
export interface AuthMessage {
  type: "auth";
  sessionId: string;
}

/**
 * Robot command message - must be signed
 */
export interface CommandMessage {
  type: "command";
  action: string;
  sequence: number;
  signature: string; // hex-encoded Ed25519 signature
  timestamp: number;
}

/**
 * Ping message for keep-alive
 */
export interface PingMessage {
  type: "ping";
}

/**
 * Request current session status
 */
export interface StatusMessage {
  type: "status";
}

/**
 * Union of all client message types
 */
export type ClientMessage =
  | AuthMessage
  | CommandMessage
  | PingMessage
  | StatusMessage;

// ============================================
// MESSAGE TYPES (Server -> Client)
// ============================================

/**
 * Authentication response
 */
export interface AuthResponseMessage {
  type: "auth_response";
  success: boolean;
  error?: string;
  session?: {
    robotName: string;
    prepaidMinutes: number;
    remainingMinutes: number;
    sequenceNumber: number;
  };
}

/**
 * Command acknowledgment
 */
export interface CommandAckMessage {
  type: "ack";
  action: string;
  sequence: number;
  success: boolean;
  error?: string;
}

/**
 * Pong response
 */
export interface PongMessage {
  type: "pong";
  serverTime: number;
}

/**
 * Session status update
 */
export interface StatusResponseMessage {
  type: "status_response";
  session: {
    robotName: string;
    prepaidMinutes: number;
    remainingMinutes: number;
    elapsedMinutes: number;
    sequenceNumber: number;
    isActive: boolean;
  };
}

/**
 * Error message
 */
export interface ErrorMessage {
  type: "error";
  code: string;
  message: string;
}

/**
 * Session ended notification
 */
export interface SessionEndedMessage {
  type: "session_ended";
  reason: string;
}

/**
 * Union of all server message types
 */
export type ServerMessage =
  | AuthResponseMessage
  | CommandAckMessage
  | PongMessage
  | StatusResponseMessage
  | ErrorMessage
  | SessionEndedMessage;

// ============================================
// ROBOT ACTIONS
// ============================================

/**
 * Valid robot actions (must match robot_pet.move VALID_ACTIONS)
 */
export const VALID_ACTIONS = [
  "sit",
  "stand",
  "wave",
  "walk_forward",
  "walk_backward",
  "turn_left",
  "turn_right",
  "jump",
  "balance",
  "rest",
  "push_up",
  "play_dead",
  "stretch",
  "greeting",
  "sniff",
  "pee",
] as const;

export type RobotAction = (typeof VALID_ACTIONS)[number];

/**
 * Action to Bittle serial command mapping
 */
export const ACTION_TO_SERIAL: Record<RobotAction, string> = {
  sit: "ksit",
  stand: "kup",
  wave: "khi",
  walk_forward: "kwkF",
  walk_backward: "kbk",
  turn_left: "kwkL",
  turn_right: "kwkR",
  jump: "kjmp",
  balance: "kbalance",
  rest: "krest",
  push_up: "kpu",
  play_dead: "kpd",
  stretch: "kstr",
  greeting: "kgreeting",
  sniff: "ksnf",
  pee: "kpee",
};

/**
 * Action durations in milliseconds
 */
export const ACTION_DURATIONS: Record<RobotAction, number> = {
  sit: 2000,
  stand: 2000,
  wave: 3000,
  walk_forward: 4000,
  walk_backward: 4000,
  turn_left: 3000,
  turn_right: 3000,
  jump: 2000,
  balance: 2000,
  rest: 2000,
  push_up: 4000,
  play_dead: 3000,
  stretch: 3000,
  greeting: 3000,
  sniff: 2000,
  pee: 3000,
};

// ============================================
// ERROR CODES
// ============================================

export const ErrorCodes = {
  INVALID_MESSAGE: "INVALID_MESSAGE",
  NOT_AUTHENTICATED: "NOT_AUTHENTICATED",
  SESSION_NOT_FOUND: "SESSION_NOT_FOUND",
  SESSION_EXPIRED: "SESSION_EXPIRED",
  INVALID_SIGNATURE: "INVALID_SIGNATURE",
  INVALID_SEQUENCE: "INVALID_SEQUENCE",
  INVALID_ACTION: "INVALID_ACTION",
  ROBOT_BUSY: "ROBOT_BUSY",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
