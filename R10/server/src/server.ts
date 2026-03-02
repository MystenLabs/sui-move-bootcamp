/**
 * Robot Rental WebSocket Server
 *
 * This server handles real-time robot control for Mode 2 (Rental Sessions).
 *
 * ## Architecture
 *
 * ```
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │                         RENTAL FLOW                                 │
 * │                                                                     │
 * │   1. User creates session on-chain (dApp)                           │
 * │      - Deposits TREAT tokens                                        │
 * │      - Registers Ed25519 public key                                 │
 * │                                                                     │
 * │   2. User connects to WebSocket server                              │
 * │      - Sends session ID for authentication                          │
 * │      - Server verifies session exists on-chain                      │
 * │                                                                     │
 * │   3. User sends signed commands                                     │
 * │      - Each command includes signature + sequence number            │
 * │      - Server verifies signature against user's public key          │
 * │      - Robot executes command                                       │
 * │                                                                     │
 * │   4. Session ends                                                   │
 * │      - User ends session on-chain (dApp)                            │
 * │      - Server detects inactive session, disconnects client          │
 * └─────────────────────────────────────────────────────────────────────┘
 * ```
 *
 * ## Security Model
 *
 * - Session verification: Server fetches session from blockchain
 * - Command authentication: Ed25519 signatures verified against on-chain public key
 * - Replay protection: Sequence numbers must increment
 * - Timeout protection: Sessions expire after prepaid time
 */

import { createServer } from "http";
import { WebSocket, WebSocketServer } from "ws";
import {
  fetchSessionData,
  getElapsedMinutes,
  getRemainingMinutes,
  isSessionExpired,
} from "./blockchain";
import { config, logConfig, validateConfig } from "./config";
import { verifyCommandSignature } from "./crypto";
import {
  closeRobot,
  executeAction,
  initializeRobot,
  isRobotBusy,
  isValidAction,
} from "./robot";
import type {
  AuthMessage,
  ClientMessage,
  CommandMessage,
  ConnectedClient,
  RobotAction,
  ServerMessage,
} from "./types";
import { ErrorCodes } from "./types";

// ============================================
// STATE
// ============================================

/** Map of WebSocket -> Client data */
const clients = new Map<WebSocket, ConnectedClient>();

/** Map of session ID -> WebSocket (for quick lookup) */
const sessionToClient = new Map<string, WebSocket>();

/** Local sequence tracking (to detect missed commands) */
const localSequences = new Map<string, number>();

// ============================================
// MESSAGE HANDLING
// ============================================

/**
 * Send a message to a client.
 */
function send(ws: WebSocket, message: ServerMessage): void {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
}

/**
 * Send an error message to a client.
 */
function sendError(ws: WebSocket, code: string, message: string): void {
  send(ws, { type: "error", code, message });
}

/**
 * Handle authentication message.
 *
 * 1. Fetch session from blockchain
 * 2. Verify session is active
 * 3. Associate WebSocket with session
 */
async function handleAuth(ws: WebSocket, msg: AuthMessage): Promise<void> {
  const { sessionId } = msg;

  if (config.debug) {
    console.log(`Auth request for session: ${sessionId}`);
  }

  // Check if already authenticated
  const existing = clients.get(ws);
  if (existing?.authenticated) {
    sendError(ws, ErrorCodes.INVALID_MESSAGE, "Already authenticated");
    return;
  }

  // Fetch session from blockchain
  const sessionData = await fetchSessionData(sessionId);

  if (!sessionData) {
    send(ws, {
      type: "auth_response",
      success: false,
      error: "Session not found on blockchain",
    });
    return;
  }

  if (!sessionData.isActive) {
    send(ws, {
      type: "auth_response",
      success: false,
      error: "Session is not active",
    });
    return;
  }

  if (isSessionExpired(sessionData)) {
    send(ws, {
      type: "auth_response",
      success: false,
      error: "Session has expired",
    });
    return;
  }

  // Check if another client is using this session
  const existingSocket = sessionToClient.get(sessionId);
  if (existingSocket && existingSocket !== ws) {
    // Disconnect old client
    existingSocket.close(1008, "Session taken by another client");
    sessionToClient.delete(sessionId);
  }

  // Register client
  const client: ConnectedClient = {
    sessionId,
    sessionData,
    lastPing: Date.now(),
    authenticated: true,
  };

  clients.set(ws, client);
  sessionToClient.set(sessionId, ws);
  localSequences.set(sessionId, sessionData.sequenceNumber);

  console.log(`Client authenticated for session ${sessionId}`);
  console.log(`  Robot: ${sessionData.robotName}`);
  console.log(`  Remaining: ${getRemainingMinutes(sessionData)} minutes`);

  send(ws, {
    type: "auth_response",
    success: true,
    session: {
      robotName: sessionData.robotName,
      prepaidMinutes: sessionData.prepaidMinutes,
      remainingMinutes: getRemainingMinutes(sessionData),
      sequenceNumber: sessionData.sequenceNumber,
    },
  });
}

/**
 * Handle robot command.
 *
 * 1. Verify client is authenticated
 * 2. Verify session hasn't expired
 * 3. Verify signature
 * 4. Verify sequence number
 * 5. Execute command
 */
async function handleCommand(
  ws: WebSocket,
  msg: CommandMessage,
): Promise<void> {
  const client = clients.get(ws);

  // Must be authenticated
  if (!client?.authenticated) {
    sendError(ws, ErrorCodes.NOT_AUTHENTICATED, "Not authenticated");
    return;
  }

  const { action, sequence, signature } = msg;
  const { sessionId, sessionData } = client;

  // Validate action
  if (!isValidAction(action)) {
    send(ws, {
      type: "ack",
      action,
      sequence,
      success: false,
      error: `Invalid action: ${action}`,
    });
    return;
  }

  // Check session hasn't expired
  if (isSessionExpired(sessionData)) {
    send(ws, {
      type: "session_ended",
      reason: "Session time expired",
    });
    ws.close(1000, "Session expired");
    return;
  }

  // Check robot isn't busy
  if (isRobotBusy()) {
    send(ws, {
      type: "ack",
      action,
      sequence,
      success: false,
      error: "Robot is busy",
    });
    return;
  }

  // Get expected sequence
  const expectedSequence = (localSequences.get(sessionId) || 0) + 1;

  // Verify sequence
  if (sequence !== expectedSequence) {
    send(ws, {
      type: "ack",
      action,
      sequence,
      success: false,
      error: `Invalid sequence. Expected ${expectedSequence}, got ${sequence}`,
    });
    return;
  }

  // Verify signature
  const isValid = await verifyCommandSignature(
    sessionId,
    sequence,
    action,
    signature,
    sessionData.userPublicKey,
  );

  if (!isValid) {
    send(ws, {
      type: "ack",
      action,
      sequence,
      success: false,
      error: "Invalid signature",
    });
    return;
  }

  // Update local sequence
  localSequences.set(sessionId, sequence);

  // Execute action
  try {
    if (config.debug) {
      console.log(`Executing ${action} for session ${sessionId}`);
    }

    await executeAction(action as RobotAction);

    send(ws, {
      type: "ack",
      action,
      sequence,
      success: true,
    });
  } catch (error) {
    send(ws, {
      type: "ack",
      action,
      sequence,
      success: false,
      error: error instanceof Error ? error.message : "Execution failed",
    });
  }
}

/**
 * Handle ping message.
 */
function handlePing(ws: WebSocket): void {
  const client = clients.get(ws);
  if (client) {
    client.lastPing = Date.now();
  }

  send(ws, {
    type: "pong",
    serverTime: Date.now(),
  });
}

/**
 * Handle status request.
 */
function handleStatus(ws: WebSocket): void {
  const client = clients.get(ws);

  if (!client?.authenticated) {
    sendError(ws, ErrorCodes.NOT_AUTHENTICATED, "Not authenticated");
    return;
  }

  const { sessionData } = client;

  send(ws, {
    type: "status_response",
    session: {
      robotName: sessionData.robotName,
      prepaidMinutes: sessionData.prepaidMinutes,
      remainingMinutes: getRemainingMinutes(sessionData),
      elapsedMinutes: getElapsedMinutes(sessionData),
      sequenceNumber: localSequences.get(client.sessionId) || 0,
      isActive: !isSessionExpired(sessionData),
    },
  });
}

/**
 * Handle incoming message from client.
 */
async function handleMessage(ws: WebSocket, data: string): Promise<void> {
  let msg: ClientMessage;

  try {
    msg = JSON.parse(data);
  } catch {
    sendError(ws, ErrorCodes.INVALID_MESSAGE, "Invalid JSON");
    return;
  }

  switch (msg.type) {
    case "auth":
      await handleAuth(ws, msg);
      break;

    case "command":
      await handleCommand(ws, msg);
      break;

    case "ping":
      handlePing(ws);
      break;

    case "status":
      handleStatus(ws);
      break;

    default:
      sendError(
        ws,
        ErrorCodes.INVALID_MESSAGE,
        `Unknown message type: ${(msg as { type: string }).type}`,
      );
  }
}

// ============================================
// CONNECTION HANDLING
// ============================================

/**
 * Handle new WebSocket connection.
 */
function handleConnection(ws: WebSocket): void {
  console.log("New client connected");

  ws.on("message", async (data) => {
    try {
      await handleMessage(ws, data.toString());
    } catch (error) {
      console.error("Error handling message:", error);
      sendError(ws, ErrorCodes.INTERNAL_ERROR, "Internal server error");
    }
  });

  ws.on("close", () => {
    const client = clients.get(ws);
    if (client) {
      console.log(`Client disconnected: session ${client.sessionId}`);
      sessionToClient.delete(client.sessionId);
      localSequences.delete(client.sessionId);
    } else {
      console.log("Unauthenticated client disconnected");
    }
    clients.delete(ws);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    ws.close();
  });
}

// ============================================
// MAINTENANCE TASKS
// ============================================

/**
 * Check for expired sessions and disconnect clients.
 */
async function checkSessions(): Promise<void> {
  for (const [ws, client] of clients) {
    if (!client.authenticated) continue;

    // Refresh session data from blockchain
    const freshData = await fetchSessionData(client.sessionId);

    if (!freshData || !freshData.isActive) {
      send(ws, {
        type: "session_ended",
        reason: "Session ended on blockchain",
      });
      ws.close(1000, "Session ended");
      continue;
    }

    // Update local data
    client.sessionData = freshData;

    // Check expiration
    if (isSessionExpired(freshData)) {
      send(ws, {
        type: "session_ended",
        reason: "Session time expired",
      });
      ws.close(1000, "Session expired");
    }
  }
}

/**
 * Check for inactive clients (no ping for too long).
 */
function checkClientActivity(): void {
  const now = Date.now();

  for (const [ws, client] of clients) {
    if (now - client.lastPing > config.clientTimeout) {
      console.log(`Client timed out: ${client.sessionId || "unauthenticated"}`);
      ws.close(1000, "Connection timeout");
    }
  }
}

// ============================================
// SERVER STARTUP
// ============================================

/**
 * Start the WebSocket server.
 */
async function startServer(): Promise<void> {
  // Validate configuration
  validateConfig();
  logConfig();

  // Initialize robot
  await initializeRobot();

  // Create HTTP server (required for WebSocket)
  const httpServer = createServer((req, res) => {
    // Health check endpoint
    if (req.url === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", clients: clients.size }));
      return;
    }

    // Info endpoint
    if (req.url === "/info") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          name: "Robot Rental Server",
          version: "1.0.0",
          network: config.network,
          packageId: config.packageId,
          simulateRobot: config.simulateRobot,
        }),
      );
      return;
    }

    res.writeHead(404);
    res.end("Not found");
  });

  // Create WebSocket server
  const wss = new WebSocketServer({ server: httpServer });

  wss.on("connection", handleConnection);

  // Start maintenance intervals
  setInterval(checkSessions, config.sessionCheckInterval);
  setInterval(checkClientActivity, config.pingInterval);

  // Start listening
  httpServer.listen(config.port, () => {
    console.log("");
    console.log("═══════════════════════════════════════════════════════════");
    console.log("  Robot Rental WebSocket Server");
    console.log("═══════════════════════════════════════════════════════════");
    console.log(`  WebSocket: ws://localhost:${config.port}`);
    console.log(`  Health:    http://localhost:${config.port}/health`);
    console.log(`  Info:      http://localhost:${config.port}/info`);
    console.log("");
    console.log("  For public access via tunnel:");
    console.log("    ./scripts/start-tunnel.sh");
    console.log("═══════════════════════════════════════════════════════════");
    console.log("");
  });

  // Graceful shutdown
  process.on("SIGINT", async () => {
    console.log("\nShutting down...");

    // Close all client connections
    for (const [ws] of clients) {
      ws.close(1001, "Server shutting down");
    }

    // Close robot connection
    await closeRobot();

    // Close servers
    wss.close();
    httpServer.close();

    process.exit(0);
  });
}

// Start server
startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
