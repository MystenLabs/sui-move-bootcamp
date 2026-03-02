/**
 * Authenticated Robot Control Server
 *
 * This server implements Ed25519 challenge-response authentication:
 *
 * 1. Client connects
 * 2. Server sends a random CHALLENGE (32 bytes)
 * 3. Client signs the challenge with their private key
 * 4. Server verifies signature using client's public key
 * 5. If valid, client can control the robot!
 *
 * Why this matters:
 * - Anyone can know your public key
 * - Only YOU can sign with your private key
 * - Server confirms you are who you claim to be
 */

import * as ed from "@noble/ed25519";
import { randomBytes } from "crypto";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { dirname, join } from "path";
import { SerialPort } from "serialport";
import { fileURLToPath } from "url";
import { WebSocket, WebSocketServer } from "ws";

// For Node.js crypto
import { webcrypto } from "crypto";
// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// ============================================
// CONFIGURATION
// ============================================

const PORT = parseInt(process.env.PORT || "8080");
const SERIAL_PORT = process.env.SERIAL_PORT || "/dev/ttyACM0";
const BAUD_RATE = parseInt(process.env.BAUD_RATE || "115200");

// Allowed public keys (add your clients here!)
// In production, load from a database
const ALLOWED_PUBLIC_KEYS: Set<string> = new Set([
  // Add your client's public key here
  process.env.CLIENT_PUBLIC_KEY || "",
]);

// ============================================
// AUTHENTICATION STATE
// ============================================

interface ClientState {
  ws: WebSocket;
  challenge: Buffer | null;
  authenticated: boolean;
  publicKey: string | null;
}

const clients = new Map<WebSocket, ClientState>();

// ============================================
// CHALLENGE-RESPONSE AUTH
// ============================================

function generateChallenge(): Buffer {
  // 32 random bytes - impossible to guess
  return randomBytes(32);
}

async function verifySignature(
  publicKeyHex: string,
  signature: Uint8Array,
  message: Uint8Array,
): Promise<boolean> {
  try {
    const publicKey = Buffer.from(publicKeyHex, "hex");
    return await ed.verifyAsync(signature, message, publicKey);
  } catch {
    return false;
  }
}

// ============================================
// ROBOT COMMANDS
// ============================================

interface BittleCommand {
  code: string;
  duration: number;
  description: string;
}

const COMMANDS: Record<string, BittleCommand> = {
  sit: { code: "ksit", duration: 2000, description: "Sit down" },
  stand: { code: "kup", duration: 2000, description: "Stand up" },
  wave: { code: "khi", duration: 3000, description: "Wave hello" },
  forward: { code: "kwkF", duration: 3000, description: "Walk forward" },
  backward: { code: "kbk", duration: 3000, description: "Walk backward" },
  left: { code: "kwkL", duration: 2000, description: "Turn left" },
  right: { code: "kwkR", duration: 2000, description: "Turn right" },
  balance: { code: "kbalance", duration: 2000, description: "Balance" },
};

// ============================================
// SERIAL CONNECTION (Same as Module 5)
// ============================================

let serialPort: SerialPort | null = null;
let robotConnected = false;

function connectSerial(): Promise<boolean> {
  return new Promise((resolve) => {
    serialPort = new SerialPort({
      path: SERIAL_PORT,
      baudRate: BAUD_RATE,
    });

    serialPort.on("open", () => {
      console.log("Robot connected!");
      robotConnected = true;
      resolve(true);
    });

    serialPort.on("error", () => {
      robotConnected = false;
      resolve(false);
    });
  });
}

async function sendToRobot(command: BittleCommand): Promise<void> {
  if (!serialPort || !serialPort.isOpen) {
    // Simulation mode
    console.log(`[SIM] ${command.description} (${command.code})`);
    await new Promise((r) => setTimeout(r, command.duration));
    return;
  }

  return new Promise((resolve, reject) => {
    serialPort!.write(command.code + "\n", (err) => {
      if (err) return reject(err);
      setTimeout(resolve, command.duration);
    });
  });
}

// ============================================
// WEBSOCKET HANDLER
// ============================================

function send(ws: WebSocket, message: object): void {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
}

function broadcast(message: object): void {
  const data = JSON.stringify(message);
  clients.forEach((state) => {
    if (state.authenticated && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(data);
    }
  });
}

async function handleMessage(ws: WebSocket, message: any): Promise<void> {
  const state = clients.get(ws);
  if (!state) return;

  switch (message.type) {
    case "auth_start": {
      // Client provides their public key and requests authentication
      const publicKey = message.publicKey;

      if (!ALLOWED_PUBLIC_KEYS.has(publicKey)) {
        send(ws, {
          type: "auth_error",
          message: "Public key not authorized",
        });
        return;
      }

      // Generate and send challenge
      const challenge = generateChallenge();
      state.challenge = challenge;
      state.publicKey = publicKey;

      send(ws, {
        type: "auth_challenge",
        challenge: challenge.toString("hex"),
      });

      console.log(`Challenge sent to client (${publicKey.slice(0, 8)}...)`);
      break;
    }

    case "auth_response": {
      // Client provides signed challenge
      if (!state.challenge || !state.publicKey) {
        send(ws, { type: "auth_error", message: "No pending challenge" });
        return;
      }

      const signature = Buffer.from(message.signature, "hex");
      const valid = await verifySignature(
        state.publicKey,
        signature,
        state.challenge,
      );

      if (valid) {
        state.authenticated = true;
        state.challenge = null;

        send(ws, {
          type: "auth_success",
          message: "Authentication successful! You can now control the robot.",
          commands: Object.keys(COMMANDS),
        });

        console.log(
          `Client authenticated! (${state.publicKey.slice(0, 8)}...)`,
        );
      } else {
        send(ws, {
          type: "auth_error",
          message: "Invalid signature",
        });

        console.log(
          `Authentication failed for ${state.publicKey.slice(0, 8)}...`,
        );
      }
      break;
    }

    case "command": {
      // Only authenticated clients can send commands
      if (!state.authenticated) {
        send(ws, {
          type: "error",
          message: "Not authenticated. Call auth_start first.",
        });
        return;
      }

      const commandName = message.command;
      const command = COMMANDS[commandName];

      if (!command) {
        send(ws, { type: "error", message: `Unknown command: ${commandName}` });
        return;
      }

      console.log(
        `Executing: ${commandName} (from ${state.publicKey?.slice(0, 8)}...)`,
      );

      broadcast({
        type: "action_started",
        action: commandName,
        description: command.description,
      });

      await sendToRobot(command);

      broadcast({
        type: "action_completed",
        action: commandName,
      });

      break;
    }

    case "ping": {
      send(ws, { type: "pong", timestamp: Date.now() });
      break;
    }
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
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(COMMANDS));
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

// ============================================
// WEBSOCKET SERVER
// ============================================

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws: WebSocket) => {
  // Initialize client state (unauthenticated)
  clients.set(ws, {
    ws,
    challenge: null,
    authenticated: false,
    publicKey: null,
  });

  console.log("New client connected (not authenticated)");

  // Send welcome (but no access yet!)
  send(ws, {
    type: "welcome",
    message: "Connected. Please authenticate.",
    authenticated: false,
  });

  ws.on("message", async (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());
      await handleMessage(ws, message);
    } catch (err) {
      console.error("Error handling message:", err);
    }
  });

  ws.on("close", () => {
    const state = clients.get(ws);
    if (state?.authenticated) {
      console.log(
        `Authenticated client disconnected (${state.publicKey?.slice(0, 8)}...)`,
      );
    }
    clients.delete(ws);
  });
});

// ============================================
// STARTUP
// ============================================

async function start() {
  console.log("=".repeat(50));
  console.log("AUTHENTICATED ROBOT CONTROL SERVER");
  console.log("=".repeat(50));
  console.log();
  console.log("Configuration:");
  console.log(`  Port: ${PORT}`);
  console.log(`  Serial: ${SERIAL_PORT}`);
  console.log(`  Allowed keys: ${ALLOWED_PUBLIC_KEYS.size}`);
  console.log();

  await connectSerial();

  if (!robotConnected) {
    console.log("Warning: Robot not connected (simulation mode)");
    console.log();
  }

  httpServer.listen(PORT, () => {
    console.log("Server running at:");
    console.log(`  http://localhost:${PORT}`);
    console.log(`  ws://localhost:${PORT}`);
    console.log();
    console.log("Clients must authenticate with Ed25519 signature!");
    console.log();
  });
}

start().catch(console.error);
