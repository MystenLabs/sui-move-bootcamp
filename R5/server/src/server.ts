/**
 * Real-time Robot Control Server
 *
 * Combines WebSocket (browser) + Serial (robot) for instant control:
 * 1. Browser connects via WebSocket
 * 2. User sends commands (click/keyboard)
 * 3. Server forwards to robot via serial
 * 4. Robot executes immediately
 * 5. Server broadcasts status to all clients
 *
 * This is TRUE real-time control - no blockchain delays!
 */

import dotenv from "dotenv";
import { readFileSync } from "fs";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { dirname, join } from "path";
import { SerialPort } from "serialport";
import { fileURLToPath } from "url";
import { WebSocket, WebSocketServer } from "ws";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// ============================================
// CONFIGURATION
// ============================================

const PORT = parseInt(process.env.PORT || "8080");
const SERIAL_PORT = process.env.SERIAL_PORT || "/dev/ttyACM0";
const BAUD_RATE = parseInt(process.env.BAUD_RATE || "115200");
const QUEUE_COMMANDS = process.env.QUEUE_COMMANDS !== "false";
const MAX_QUEUE_SIZE = parseInt(process.env.MAX_QUEUE_SIZE || "10");
const DEBUG = process.env.DEBUG === "true";

// ============================================
// ROBOT STATE
// ============================================

interface RobotState {
  connected: boolean;
  busy: boolean;
  currentAction: string | null;
  queueLength: number;
  lastCommand: string | null;
  lastCommandTime: number | null;
}

let robotState: RobotState = {
  connected: false,
  busy: false,
  currentAction: null,
  queueLength: 0,
  lastCommand: null,
  lastCommandTime: null,
};

// ============================================
// BITTLE COMMANDS
// ============================================

interface BittleCommand {
  code: string;
  duration: number;
  description: string;
}

const COMMANDS: Record<string, BittleCommand> = {
  // Postures
  sit: { code: "ksit", duration: 2000, description: "Sit down" },
  stand: { code: "kup", duration: 2000, description: "Stand up" },
  balance: { code: "kbalance", duration: 2000, description: "Balance" },
  rest: { code: "krest", duration: 3000, description: "Lie down" },

  // Movement
  forward: { code: "kwkF", duration: 3000, description: "Walk forward" },
  backward: { code: "kbk", duration: 3000, description: "Walk backward" },
  left: { code: "kwkL", duration: 2000, description: "Turn left" },
  right: { code: "kwkR", duration: 2000, description: "Turn right" },

  // Trot (faster)
  trot_forward: { code: "ktrF", duration: 2000, description: "Trot forward" },
  trot_left: { code: "ktrL", duration: 1500, description: "Trot left" },
  trot_right: { code: "ktrR", duration: 1500, description: "Trot right" },

  // Actions
  wave: { code: "khi", duration: 3000, description: "Wave hello" },
  jump: { code: "kjmp", duration: 2000, description: "Jump" },
  push_up: { code: "kpu", duration: 5000, description: "Push up" },
  play_dead: { code: "kpd", duration: 3000, description: "Play dead" },
  stretch: { code: "kstr", duration: 3000, description: "Stretch" },

  // Quick movements (for responsive control)
  step_forward: { code: "kwkF", duration: 1000, description: "Step forward" },
  step_back: { code: "kbk", duration: 1000, description: "Step back" },
  turn_left: { code: "kwkL", duration: 800, description: "Quick turn left" },
  turn_right: { code: "kwkR", duration: 800, description: "Quick turn right" },

  // System
  calibrate: { code: "kcalib", duration: 5000, description: "Calibrate" },
  stop: { code: "kbalance", duration: 500, description: "Stop/Balance" },
};

// ============================================
// COMMAND QUEUE
// ============================================

const commandQueue: string[] = [];

function enqueueCommand(commandName: string): boolean {
  if (commandQueue.length >= MAX_QUEUE_SIZE) {
    return false; // Queue full
  }
  commandQueue.push(commandName);
  robotState.queueLength = commandQueue.length;
  broadcastState();
  return true;
}

function dequeueCommand(): string | null {
  const cmd = commandQueue.shift() || null;
  robotState.queueLength = commandQueue.length;
  broadcastState();
  return cmd;
}

// ============================================
// SERIAL CONNECTION
// ============================================

let serialPort: SerialPort | null = null;

function connectSerial(): Promise<boolean> {
  return new Promise((resolve) => {
    console.log(`Connecting to robot on ${SERIAL_PORT}...`);

    serialPort = new SerialPort({
      path: SERIAL_PORT,
      baudRate: BAUD_RATE,
    });

    serialPort.on("open", () => {
      console.log("Robot connected!");
      robotState.connected = true;
      broadcastState();
      resolve(true);
    });

    serialPort.on("error", (err) => {
      console.error("Serial error:", err.message);
      robotState.connected = false;
      serialPort = null;
      broadcastState();
      resolve(false);
    });

    serialPort.on("close", () => {
      console.log("Serial port closed");
      robotState.connected = false;
      serialPort = null;
      broadcastState();
    });

    if (DEBUG) {
      serialPort.on("data", (data) => {
        console.log("Robot:", data.toString().trim());
      });
    }
  });
}

async function sendToRobot(command: BittleCommand): Promise<void> {
  if (!serialPort || !serialPort.isOpen) {
    throw new Error("Robot not connected");
  }

  return new Promise((resolve, reject) => {
    serialPort!.write(command.code + "\n", (err) => {
      if (err) {
        reject(err);
        return;
      }

      if (DEBUG) {
        console.log(`Sent: ${command.code}`);
      }

      // Wait for action to complete
      setTimeout(resolve, command.duration);
    });
  });
}

// ============================================
// COMMAND EXECUTION
// ============================================

let isProcessing = false;

async function executeCommand(commandName: string): Promise<void> {
  const command = COMMANDS[commandName];
  if (!command) {
    console.log(`Unknown command: ${commandName}`);
    return;
  }

  robotState.busy = true;
  robotState.currentAction = commandName;
  robotState.lastCommand = commandName;
  robotState.lastCommandTime = Date.now();

  broadcast({
    type: "action_started",
    action: commandName,
    description: command.description,
    duration: command.duration,
    state: { ...robotState },
    queue: [...commandQueue],
  });

  try {
    if (robotState.connected) {
      await sendToRobot(command);
    } else {
      // Simulation mode
      await new Promise((r) => setTimeout(r, command.duration));
    }
  } catch (err) {
    console.error("Error executing command:", err);
  }

  robotState.busy = false;
  robotState.currentAction = null;

  broadcast({
    type: "action_completed",
    action: commandName,
    state: { ...robotState },
    queue: [...commandQueue],
  });
}

async function processQueue(): Promise<void> {
  if (isProcessing) return;

  isProcessing = true;

  try {
    while (commandQueue.length > 0) {
      const commandName = dequeueCommand();
      if (commandName) {
        await executeCommand(commandName);
      }
    }
  } catch (err) {
    console.error("Error processing queue:", err);
  } finally {
    isProcessing = false;
  }
}

function handleCommand(commandName: string): {
  success: boolean;
  message: string;
} {
  const command = COMMANDS[commandName];

  if (!command) {
    return { success: false, message: `Unknown command: ${commandName}` };
  }

  if (QUEUE_COMMANDS) {
    // Queue mode: add to queue
    if (enqueueCommand(commandName)) {
      processQueue().catch(console.error); // Start processing if not already
      return { success: true, message: `Queued: ${commandName}` };
    } else {
      return { success: false, message: "Queue full" };
    }
  } else {
    // Direct mode: drop if busy
    if (robotState.busy) {
      return { success: false, message: "Robot busy" };
    }
    executeCommand(commandName);
    return { success: true, message: `Executing: ${commandName}` };
  }
}

// ============================================
// WEBSOCKET SERVER
// ============================================

const clients = new Set<WebSocket>();

function broadcast(message: object): void {
  const data = JSON.stringify(message);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

function broadcastState(): void {
  broadcast({
    type: "state",
    state: { ...robotState },
    queue: [...commandQueue],
    clientCount: clients.size,
  });
}

function send(ws: WebSocket, message: object): void {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
}

// ============================================
// HTTP SERVER
// ============================================

const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = req.url || "/";

  if (url === "/" || url === "/index.html") {
    try {
      const html = readFileSync(
        join(__dirname, "../../public/index.html"),
        "utf-8",
      );
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } catch {
      res.writeHead(500);
      res.end("Error loading page");
    }
  } else if (url === "/api/commands") {
    // Return available commands
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(COMMANDS));
  } else if (url === "/api/state") {
    // Return current state
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(robotState));
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

// ============================================
// WEBSOCKET HANDLER
// ============================================

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws: WebSocket) => {
  clients.add(ws);
  console.log(`Client connected (${clients.size} total)`);

  // Send welcome message
  send(ws, {
    type: "welcome",
    message: "Connected to Robot Control Server",
    state: { ...robotState },
    queue: [...commandQueue],
    commands: Object.keys(COMMANDS),
    clientCount: clients.size,
  });

  // Notify all clients of new connection
  broadcastState();

  ws.on("message", (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());

      if (DEBUG) {
        console.log("Received:", message);
      }

      switch (message.type) {
        case "command":
          if (message.command) {
            const result = handleCommand(message.command);
            send(ws, {
              type: "command_response",
              command: message.command,
              ...result,
            });
          }
          break;

        case "ping":
          send(ws, { type: "pong", timestamp: Date.now() });
          break;

        case "get_state":
          send(ws, { type: "state", state: { ...robotState } });
          break;

        case "clear_queue":
          commandQueue.length = 0;
          robotState.queueLength = 0;
          broadcastState();
          send(ws, { type: "queue_cleared" });
          break;
      }
    } catch (err) {
      console.error("Error parsing message:", err);
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log(`Client disconnected (${clients.size} remaining)`);
    broadcastState();
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
    clients.delete(ws);
  });
});

// ============================================
// STARTUP
// ============================================

async function start() {
  console.log("=".repeat(50));
  console.log("REAL-TIME ROBOT CONTROL SERVER");
  console.log("=".repeat(50));
  console.log();
  console.log("Configuration:");
  console.log(`  HTTP/WS Port: ${PORT}`);
  console.log(`  Serial Port: ${SERIAL_PORT}`);
  console.log(`  Baud Rate: ${BAUD_RATE}`);
  console.log(`  Queue Mode: ${QUEUE_COMMANDS ? "enabled" : "disabled"}`);
  console.log(`  Max Queue: ${MAX_QUEUE_SIZE}`);
  console.log();

  // Try to connect to robot
  const connected = await connectSerial();

  if (!connected) {
    console.log("Warning: Robot not connected!");
    console.log("Running in simulation mode.\n");
  }

  // Start HTTP/WebSocket server
  httpServer.listen(PORT, () => {
    console.log("Server running at:");
    console.log(`  http://localhost:${PORT}`);
    console.log(`  ws://localhost:${PORT}`);
    console.log();
    console.log("Open the URL in your browser to control the robot!");
    console.log("Press Ctrl+C to stop\n");
  });
}

// Handle shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down...");
  if (serialPort && serialPort.isOpen) {
    serialPort.close();
  }
  process.exit(0);
});

start().catch(console.error);
