/**
 * WebSocket Robot Server
 *
 * A simple WebSocket server that:
 * 1. Accepts connections from browsers
 * 2. Receives robot commands
 * 3. Simulates robot state
 * 4. Broadcasts state updates to all clients
 *
 * This demonstrates bidirectional real-time communication.
 */

import { readFileSync } from "fs";
import { createServer } from "http";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { WebSocket, WebSocketServer } from "ws";

// Get directory path for ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// ============================================
// CONFIGURATION
// ============================================

const PORT = 8080;

// ============================================
// ROBOT STATE
// ============================================

// The virtual robot's current state
interface RobotState {
  x: number; // Position X (0-100)
  y: number; // Position Y (0-100)
  rotation: number; // Rotation in degrees (0-360)
  posture: "standing" | "sitting" | "lying";
  isMoving: boolean;
  currentAction: string | null;
  mood: "happy" | "neutral" | "sleepy";
}

let robotState: RobotState = {
  x: 50,
  y: 50,
  rotation: 0,
  posture: "standing",
  isMoving: false,
  currentAction: null,
  mood: "neutral",
};

// ============================================
// MESSAGE TYPES
// ============================================

// Messages FROM the client
interface ClientMessage {
  type: "command" | "ping";
  command?: string;
}

// Messages TO the client
interface ServerMessage {
  type: "state" | "action_started" | "action_completed" | "pong" | "welcome";
  state?: RobotState;
  action?: string;
  message?: string;
  clientCount?: number;
}

// ============================================
// COMMAND HANDLERS
// ============================================

// How much to move per step
const MOVE_STEP = 5;
const ROTATION_STEP = 15;

// Command definitions with their effects
const COMMANDS: Record<
  string,
  { duration: number; handler: () => void; description: string }
> = {
  // Movement
  forward: {
    duration: 500,
    description: "Move forward",
    handler: () => {
      const rad = (robotState.rotation * Math.PI) / 180;
      robotState.x = Math.max(
        5,
        Math.min(95, robotState.x + Math.sin(rad) * MOVE_STEP),
      );
      robotState.y = Math.max(
        5,
        Math.min(95, robotState.y - Math.cos(rad) * MOVE_STEP),
      );
    },
  },
  backward: {
    duration: 500,
    description: "Move backward",
    handler: () => {
      const rad = (robotState.rotation * Math.PI) / 180;
      robotState.x = Math.max(
        5,
        Math.min(95, robotState.x - Math.sin(rad) * MOVE_STEP),
      );
      robotState.y = Math.max(
        5,
        Math.min(95, robotState.y + Math.cos(rad) * MOVE_STEP),
      );
    },
  },
  left: {
    duration: 300,
    description: "Turn left",
    handler: () => {
      robotState.rotation = (robotState.rotation - ROTATION_STEP + 360) % 360;
    },
  },
  right: {
    duration: 300,
    description: "Turn right",
    handler: () => {
      robotState.rotation = (robotState.rotation + ROTATION_STEP) % 360;
    },
  },

  // Postures
  sit: {
    duration: 1000,
    description: "Sit down",
    handler: () => {
      robotState.posture = "sitting";
    },
  },
  stand: {
    duration: 1000,
    description: "Stand up",
    handler: () => {
      robotState.posture = "standing";
    },
  },
  lie: {
    duration: 1500,
    description: "Lie down",
    handler: () => {
      robotState.posture = "lying";
    },
  },

  // Actions
  wave: {
    duration: 2000,
    description: "Wave hello",
    handler: () => {
      robotState.mood = "happy";
    },
  },
  sleep: {
    duration: 2000,
    description: "Go to sleep",
    handler: () => {
      robotState.posture = "lying";
      robotState.mood = "sleepy";
    },
  },
  wake: {
    duration: 1000,
    description: "Wake up",
    handler: () => {
      robotState.posture = "standing";
      robotState.mood = "neutral";
    },
  },

  // Special
  reset: {
    duration: 500,
    description: "Reset to center",
    handler: () => {
      robotState.x = 50;
      robotState.y = 50;
      robotState.rotation = 0;
      robotState.posture = "standing";
      robotState.mood = "neutral";
    },
  },
};

// ============================================
// HTTP SERVER (serves the HTML page)
// ============================================

const httpServer = createServer((req, res) => {
  // Serve the HTML file
  if (req.url === "/" || req.url === "/index.html") {
    try {
      const htmlPath = join(__dirname, "../../public/index.html");
      const html = readFileSync(htmlPath, "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } catch (err) {
      res.writeHead(500);
      res.end("Error loading page");
    }
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

// ============================================
// WEBSOCKET SERVER
// ============================================

// Create WebSocket server attached to HTTP server
const wss = new WebSocketServer({ server: httpServer });

// Track connected clients
const clients = new Set<WebSocket>();

// Broadcast message to all connected clients
function broadcast(message: ServerMessage) {
  const data = JSON.stringify(message);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Send message to a specific client
function send(ws: WebSocket, message: ServerMessage) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
}

// Execute a command
async function executeCommand(command: string) {
  const cmd = COMMANDS[command];
  if (!cmd) {
    console.log(`Unknown command: ${command}`);
    return;
  }

  // Mark as moving
  robotState.isMoving = true;
  robotState.currentAction = command;

  // Notify clients that action started
  broadcast({
    type: "action_started",
    action: command,
    state: { ...robotState },
  });

  console.log(`> Executing: ${command} (${cmd.description})`);

  // Wait for action duration
  await new Promise((resolve) => setTimeout(resolve, cmd.duration));

  // Execute the state change
  cmd.handler();

  // Mark as done
  robotState.isMoving = false;
  robotState.currentAction = null;

  // Notify clients that action completed
  broadcast({
    type: "action_completed",
    action: command,
    state: { ...robotState },
  });

  console.log(`  Completed: ${command}`);
}

// Handle new WebSocket connection
wss.on("connection", (ws: WebSocket) => {
  clients.add(ws);
  console.log(`Client connected (${clients.size} total)`);

  // Send welcome message with current state
  send(ws, {
    type: "welcome",
    message: "Connected to Robot Server",
    state: { ...robotState },
    clientCount: clients.size,
  });

  // Notify all clients of new connection count
  broadcast({
    type: "state",
    state: { ...robotState },
    clientCount: clients.size,
  });

  // Handle messages from this client
  ws.on("message", async (data: Buffer) => {
    try {
      const message: ClientMessage = JSON.parse(data.toString());
      console.log(`Received: ${JSON.stringify(message)}`);

      switch (message.type) {
        case "command":
          if (message.command && !robotState.isMoving) {
            await executeCommand(message.command);
          } else if (robotState.isMoving) {
            console.log("  Ignored: robot is busy");
          }
          break;

        case "ping":
          send(ws, { type: "pong" });
          break;
      }
    } catch (err) {
      console.error("Error parsing message:", err);
    }
  });

  // Handle client disconnect
  ws.on("close", () => {
    clients.delete(ws);
    console.log(`Client disconnected (${clients.size} remaining)`);

    // Notify remaining clients
    broadcast({
      type: "state",
      state: { ...robotState },
      clientCount: clients.size,
    });
  });

  // Handle errors
  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
    clients.delete(ws);
  });
});

// ============================================
// START SERVER
// ============================================

httpServer.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log("WebSocket Robot Server");
  console.log("=".repeat(50));
  console.log(`\nServer running at:`);
  console.log(`  http://localhost:${PORT}`);
  console.log(`  ws://localhost:${PORT}`);
  console.log(`\nOpen the URL in your browser to control the robot!`);
  console.log("\nAvailable commands:");
  Object.entries(COMMANDS).forEach(([name, cmd]) => {
    console.log(`  ${name.padEnd(10)} - ${cmd.description}`);
  });
  console.log("\n" + "=".repeat(50));
});
