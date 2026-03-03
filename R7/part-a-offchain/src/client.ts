/**
 * Authenticated Robot Control Client
 *
 * This client demonstrates the challenge-response flow:
 *
 * 1. Connect to server
 * 2. Send public key, request authentication
 * 3. Receive challenge (random 32 bytes)
 * 4. Sign challenge with private key
 * 5. Send signature back
 * 6. Server verifies → we're in!
 *
 * The magic: Server never sees our private key!
 */

import * as ed from "@noble/ed25519";
import dotenv from "dotenv";
import readline from "readline";
import WebSocket from "ws";

// For Node.js crypto
import { webcrypto } from "crypto";
// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;

dotenv.config();

// ============================================
// CONFIGURATION
// ============================================

const SERVER_URL = process.env.SERVER_URL || "ws://localhost:8080";
const PRIVATE_KEY = process.env.CLIENT_PRIVATE_KEY || "";
const PUBLIC_KEY = process.env.CLIENT_PUBLIC_KEY || "";

if (!PRIVATE_KEY || !PUBLIC_KEY) {
  console.error("Error: Keys not found in .env");
  console.error("Run: pnpm generate-keys");
  process.exit(1);
}

// ============================================
// SIGNING
// ============================================

async function signChallenge(
  challengeHex: string,
  privateKeyHex: string,
): Promise<string> {
  const challenge = Buffer.from(challengeHex, "hex");
  const privateKey = Buffer.from(privateKeyHex, "hex");

  const signature = await ed.signAsync(challenge, privateKey);
  return Buffer.from(signature).toString("hex");
}

// ============================================
// CLIENT
// ============================================

let ws: WebSocket;
let authenticated = false;

function connect() {
  console.log("=".repeat(50));
  console.log("AUTHENTICATED ROBOT CONTROL CLIENT");
  console.log("=".repeat(50));
  console.log();
  console.log(`Connecting to ${SERVER_URL}...`);
  console.log(`Public Key: ${PUBLIC_KEY.slice(0, 16)}...`);
  console.log();

  ws = new WebSocket(SERVER_URL);

  ws.on("open", () => {
    console.log("Connected! Starting authentication...");
    console.log();

    // Step 1: Send our public key
    ws.send(
      JSON.stringify({
        type: "auth_start",
        publicKey: PUBLIC_KEY,
      }),
    );
  });

  ws.on("message", async (data: Buffer) => {
    const message = JSON.parse(data.toString());

    switch (message.type) {
      case "welcome":
        console.log(`Server: ${message.message}`);
        break;

      case "auth_challenge":
        // Step 2: Received challenge, sign it!
        console.log("Received challenge, signing...");
        console.log(`  Challenge: ${message.challenge.slice(0, 16)}...`);

        const signature = await signChallenge(message.challenge, PRIVATE_KEY);
        console.log(`  Signature: ${signature.slice(0, 16)}...`);
        console.log();

        // Step 3: Send signature back
        ws.send(
          JSON.stringify({
            type: "auth_response",
            signature: signature,
          }),
        );
        break;

      case "auth_success":
        // Step 4: We're authenticated!
        console.log("=".repeat(50));
        console.log("AUTHENTICATION SUCCESSFUL!");
        console.log("=".repeat(50));
        console.log();
        console.log("Available commands:", message.commands.join(", "));
        console.log();
        console.log("Type a command to control the robot:");
        authenticated = true;
        startPrompt();
        break;

      case "auth_error":
        console.error("Authentication failed:", message.message);
        process.exit(1);
        break;

      case "action_started":
        console.log(`>> ${message.description}...`);
        break;

      case "action_completed":
        console.log(`>> Done!`);
        break;

      case "error":
        console.error("Error:", message.message);
        break;
    }
  });

  ws.on("close", () => {
    console.log("Disconnected from server");
    process.exit(0);
  });

  ws.on("error", (err) => {
    console.error("Connection error:", err.message);
    process.exit(1);
  });
}

function sendCommand(command: string) {
  if (!authenticated) {
    console.log("Not authenticated yet!");
    return;
  }

  ws.send(
    JSON.stringify({
      type: "command",
      command: command.trim(),
    }),
  );
}

function startPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (line) => {
    const cmd = line.trim().toLowerCase();
    if (cmd === "quit" || cmd === "exit") {
      ws.close();
    } else if (cmd) {
      sendCommand(cmd);
    }
  });
}

connect();
