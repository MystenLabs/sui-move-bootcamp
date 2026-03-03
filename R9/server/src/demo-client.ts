/**
 * Demo WebSocket Client
 *
 * Simple client to test the multiplayer queue server.
 * Connects to the WebSocket server and logs all received messages.
 *
 * Usage:
 *   pnpm demo
 */

import WebSocket from "ws";

const WEBSOCKET_URL = process.env.WEBSOCKET_URL || "ws://localhost:8080";

console.log("=".repeat(50));
console.log("DEMO WEBSOCKET CLIENT");
console.log("=".repeat(50));
console.log("");
console.log(`Connecting to: ${WEBSOCKET_URL}`);
console.log("");

const ws = new WebSocket(WEBSOCKET_URL);

ws.on("open", () => {
  console.log("[Connected] WebSocket connection established");
  console.log("");

  // Request current state
  ws.send(JSON.stringify({ type: "get_state" }));
});

ws.on("message", (data) => {
  try {
    const message = JSON.parse(data.toString());
    const timestamp = new Date(message.timestamp).toISOString();

    console.log(`[${timestamp}] ${message.type}`);
    console.log(JSON.stringify(message.data, null, 2));
    console.log("");
  } catch (error) {
    console.log("[Raw]", data.toString());
  }
});

ws.on("close", () => {
  console.log("[Disconnected] WebSocket connection closed");
  process.exit(0);
});

ws.on("error", (error) => {
  console.error("[Error]", error.message);
  process.exit(1);
});

// Handle Ctrl+C
process.on("SIGINT", () => {
  console.log("\n[Client] Closing connection...");
  ws.close();
});
