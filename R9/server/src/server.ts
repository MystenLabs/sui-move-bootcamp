/**
 * Multiplayer Robot Queue WebSocket Server
 *
 * Broadcasts real-time queue updates to all connected clients.
 * Listens to blockchain events and forwards them to subscribers.
 *
 * ## Architecture
 *
 * ```
 * ┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
 * │   Sui Network   │────▶│  Event Listener  │────▶│  WebSocket Server│
 * └─────────────────┘     └──────────────────┘     └──────────────────┘
 *                                                          │
 *                                                          ▼
 *                              ┌──────────────────────────────────────┐
 *                              │           Connected Clients          │
 *                              │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐  │
 *                              │  │ C1 │ │ C2 │ │ C3 │ │ C4 │ │ C5 │  │
 *                              │  └────┘ └────┘ └────┘ └────┘ └────┘  │
 *                              └──────────────────────────────────────┘
 * ```
 *
 * ## Usage
 *
 * ```bash
 * # Set environment variables
 * export PACKAGE_ADDRESS=0x...
 * export QUEUE_ID=0x...
 * export SUI_RPC_URL=https://fullnode.testnet.sui.io
 * export WEBSOCKET_PORT=8080
 *
 * # Start server
 * pnpm dev
 * ```
 */

import { WebSocket, WebSocketServer } from "ws";
import { BlockchainEventListener } from "./blockchain.js";
import type {
  ActionProcessedEvent,
  ActionQueuedEvent,
  ClientMessage,
  QueueStateChangedEvent,
  ServerMessage,
  UserStatsUpdatedEvent,
} from "./types.js";

// ============================================
// Configuration
// ============================================

const PACKAGE_ADDRESS = process.env.PACKAGE_ADDRESS || "";
const QUEUE_ID = process.env.QUEUE_ID || "";
const SUI_RPC_URL =
  process.env.SUI_RPC_URL || "https://fullnode.testnet.sui.io";
const WEBSOCKET_PORT = parseInt(process.env.WEBSOCKET_PORT || "8080");
const POLL_INTERVAL_MS = parseInt(process.env.POLL_INTERVAL_MS || "2000");

// Validate required configuration at startup
if (!PACKAGE_ADDRESS || !QUEUE_ID) {
  console.error("Missing required environment variables:");
  if (!PACKAGE_ADDRESS) console.error("  - PACKAGE_ADDRESS");
  if (!QUEUE_ID) console.error("  - QUEUE_ID");
  console.error(
    "\nSet them in .env or export them before starting the server.",
  );
  process.exit(1);
}

if (isNaN(WEBSOCKET_PORT) || isNaN(POLL_INTERVAL_MS)) {
  console.error("WEBSOCKET_PORT and POLL_INTERVAL_MS must be valid numbers.");
  process.exit(1);
}

// Server version
const SERVER_VERSION = "1.0.0";

// ============================================
// State
// ============================================

// Connected clients
const clients = new Set<WebSocket>();

// Current queue state (cached)
let queueState = {
  queueLength: 0,
  uniqueUsers: 0,
  totalQueued: 0,
  totalProcessed: 0,
  isPaused: false,
};

// ============================================
// WebSocket Server
// ============================================

/**
 * Broadcast a message to all connected clients.
 */
function broadcast(message: ServerMessage): void {
  const data = JSON.stringify(message);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

/**
 * Send a message to a specific client.
 */
function sendToClient(client: WebSocket, message: ServerMessage): void {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(message));
  }
}

/**
 * Handle client messages.
 */
function handleClientMessage(client: WebSocket, raw: string): void {
  try {
    const message = JSON.parse(raw) as ClientMessage;

    switch (message.type) {
      case "get_state":
        sendToClient(client, {
          type: "queue_state",
          timestamp: Date.now(),
          data: {
            queueId: QUEUE_ID,
            ...queueState,
            pendingActions: [], // Would need to fetch from chain
          },
        });
        break;

      case "subscribe":
        console.log(
          `[WebSocket] Client subscribed to queue: ${message.queueId}`,
        );
        break;

      case "unsubscribe":
        console.log(
          `[WebSocket] Client unsubscribed from queue: ${message.queueId}`,
        );
        break;

      default:
        sendToClient(client, {
          type: "error",
          timestamp: Date.now(),
          data: {
            code: "UNKNOWN_MESSAGE_TYPE",
            message: `Unknown message type: ${
              (message as { type: string }).type
            }`,
          },
        });
    }
  } catch (error) {
    sendToClient(client, {
      type: "error",
      timestamp: Date.now(),
      data: {
        code: "INVALID_JSON",
        message: "Failed to parse message as JSON",
      },
    });
  }
}

/**
 * Start the WebSocket server.
 */
function startWebSocketServer(): WebSocketServer {
  const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

  wss.on("connection", (ws) => {
    console.log(`[WebSocket] Client connected (total: ${clients.size + 1})`);
    clients.add(ws);

    // Send welcome message
    sendToClient(ws, {
      type: "welcome",
      timestamp: Date.now(),
      data: {
        serverVersion: SERVER_VERSION,
        queueId: QUEUE_ID || null,
      },
    });

    // Send current state
    sendToClient(ws, {
      type: "queue_state",
      timestamp: Date.now(),
      data: {
        queueId: QUEUE_ID,
        ...queueState,
        pendingActions: [],
      },
    });

    ws.on("message", (data) => {
      handleClientMessage(ws, data.toString());
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log(`[WebSocket] Client disconnected (total: ${clients.size})`);
    });

    ws.on("error", (error) => {
      console.error("[WebSocket] Client error:", error);
      clients.delete(ws);
    });
  });

  console.log(`[WebSocket] Server listening on port ${WEBSOCKET_PORT}`);
  return wss;
}

// ============================================
// Blockchain Event Handlers
// ============================================

/**
 * Handle ActionQueued event.
 */
function onActionQueued(event: ActionQueuedEvent): void {
  console.log(
    `[Event] Action queued: ${event.action_name} by ${event.sender.slice(
      0,
      10,
    )}...`,
  );

  queueState.queueLength = parseInt(event.queue_length);
  queueState.totalQueued++;

  broadcast({
    type: "action_queued",
    timestamp: Date.now(),
    data: {
      queueId: event.queue_id,
      actionName: event.action_name,
      sender: event.sender,
      position: parseInt(event.position),
      isPriority: event.is_priority,
      queueLength: parseInt(event.queue_length),
    },
  });
}

/**
 * Handle ActionProcessed event.
 */
function onActionProcessed(event: ActionProcessedEvent): void {
  console.log(
    `[Event] Action processed: ${
      event.action_name
    } for ${event.original_sender.slice(0, 10)}...`,
  );

  queueState.queueLength = parseInt(event.remaining_in_queue);
  queueState.totalProcessed++;

  broadcast({
    type: "action_processed",
    timestamp: Date.now(),
    data: {
      queueId: event.queue_id,
      actionName: event.action_name,
      originalSender: event.original_sender,
      wasPriority: event.was_priority,
      waitTimeMs: parseInt(event.wait_time_ms),
      remainingInQueue: parseInt(event.remaining_in_queue),
    },
  });
}

/**
 * Handle UserStatsUpdated event.
 */
function onUserStatsUpdated(event: UserStatsUpdatedEvent): void {
  console.log(
    `[Event] User stats updated: ${event.user.slice(0, 10)}... pending=${
      event.pending_count
    }`,
  );

  broadcast({
    type: "user_stats",
    timestamp: Date.now(),
    data: {
      queueId: event.queue_id,
      user: event.user,
      pendingCount: parseInt(event.pending_count),
      totalQueued: parseInt(event.total_queued),
      totalProcessed: parseInt(event.total_processed),
      cooldownRemainingMs: parseInt(event.cooldown_remaining_ms),
    },
  });
}

/**
 * Handle QueueStateChanged event.
 */
function onQueueStateChanged(event: QueueStateChangedEvent): void {
  console.log(
    `[Event] Queue state changed: length=${event.queue_length}, users=${event.unique_users}`,
  );

  queueState = {
    queueLength: parseInt(event.queue_length),
    uniqueUsers: parseInt(event.unique_users),
    totalQueued: parseInt(event.total_queued),
    totalProcessed: parseInt(event.total_processed),
    isPaused: event.is_paused,
  };

  broadcast({
    type: "queue_state",
    timestamp: Date.now(),
    data: {
      queueId: event.queue_id,
      ...queueState,
      pendingActions: [],
    },
  });
}

// ============================================
// Main
// ============================================

async function main(): Promise<void> {
  console.log("=".repeat(50));
  console.log("MULTIPLAYER ROBOT QUEUE SERVER");
  console.log("=".repeat(50));
  console.log("");
  console.log("Configuration:");
  console.log(`  Package: ${PACKAGE_ADDRESS || "(not set)"}`);
  console.log(`  Queue ID: ${QUEUE_ID || "(not set)"}`);
  console.log(`  RPC URL: ${SUI_RPC_URL}`);
  console.log(`  WebSocket Port: ${WEBSOCKET_PORT}`);
  console.log(`  Poll Interval: ${POLL_INTERVAL_MS}ms`);
  console.log("");

  // Start WebSocket server
  const wss = startWebSocketServer();

  // Start blockchain listener if configured
  if (PACKAGE_ADDRESS) {
    const listener = new BlockchainEventListener(SUI_RPC_URL, PACKAGE_ADDRESS, {
      onActionQueued,
      onActionProcessed,
      onUserStatsUpdated,
      onQueueStateChanged,
      onError: (error) => {
        console.error("[Blockchain] Error:", error);
      },
    });

    await listener.start(POLL_INTERVAL_MS);

    // Fetch initial state if queue ID provided
    if (QUEUE_ID) {
      const state = await listener.getQueueState(QUEUE_ID);
      if (state) {
        queueState = {
          queueLength: state.queueLength,
          uniqueUsers: state.uniqueUsers,
          totalQueued: state.totalQueued,
          totalProcessed: state.totalProcessed,
          isPaused: state.isPaused,
        };
        console.log(
          `[Blockchain] Initial queue state loaded: ${state.queueLength} actions pending`,
        );
      }
    }
  } else {
    console.log("[Warning] PACKAGE_ADDRESS not set - running in demo mode");
    console.log("[Warning] Set PACKAGE_ADDRESS to enable blockchain events");
  }

  // Handle shutdown
  process.on("SIGINT", () => {
    console.log("\n[Server] Shutting down...");
    wss.close();
    process.exit(0);
  });

  console.log("");
  console.log("Server is ready!");
  console.log(`Connect via: ws://localhost:${WEBSOCKET_PORT}`);
  console.log("");
}

main().catch(console.error);
