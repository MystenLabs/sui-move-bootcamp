/**
 * R7 Part A Simulator Mode — Authenticated Robot Control
 *
 * Runs the challenge-response auth server but connects to the SuiBotics
 * simulator instead of a physical serial port.
 *
 * Prerequisites:
 *   1. Generate keys: npx tsx src/generate-keys.ts
 *   2. Start the simulator: cd simulator && npm run dev
 *   3. Start this server: npx tsx src/sim.ts
 *   4. Start the client: npx tsx src/client.ts
 */

import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { randomBytes } from "crypto";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as ed from "@noble/ed25519";
import { VirtualSerialPort } from "../../../simulator/lib/virtual-serial.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT || "8080");

// Allowed public keys (hex strings)
const ALLOWED_KEYS = new Set(
  (process.env.ALLOWED_PUBLIC_KEYS || "").split(",").filter(Boolean)
);

const COMMANDS: Record<string, { code: string; duration: number }> = {
  sit: { code: "ksit", duration: 2000 },
  stand: { code: "kbalance", duration: 2000 },
  wave: { code: "khi", duration: 3000 },
  walk: { code: "kwkF", duration: 4000 },
  jump: { code: "kjmp", duration: 2000 },
  rest: { code: "krest", duration: 3000 },
  pushup: { code: "kpu", duration: 5000 },
  trot: { code: "ktrF", duration: 3000 },
};

interface ClientState {
  challenge: Buffer | null;
  authenticated: boolean;
  publicKey: string | null;
}

// ── Virtual Robot Connection ──────────────────────
const robot = new VirtualSerialPort();
let robotBusy = false;

// ── HTTP + WebSocket Server ───────────────────────
const httpServer = createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    try {
      const html = readFileSync(join(__dirname, "../public/index.html"), "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } catch {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>R7 Auth Server (Simulator)</h1>");
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

const wss = new WebSocketServer({ server: httpServer });
const clientStates = new Map<WebSocket, ClientState>();

function send(ws: WebSocket, msg: object) {
  if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(msg));
}

wss.on("connection", (ws) => {
  clientStates.set(ws, { challenge: null, authenticated: false, publicKey: null });
  console.log("  [Auth] New client connected");
  send(ws, { type: "info", message: "Send auth_start with your public key to begin." });

  ws.on("message", async (data) => {
    try {
      const msg = JSON.parse(data.toString());
      const state = clientStates.get(ws)!;

      switch (msg.type) {
        case "auth_start": {
          const pubKey = msg.publicKey;
          if (!pubKey || typeof pubKey !== "string") {
            send(ws, { type: "error", message: "Missing publicKey" });
            return;
          }

          // Check whitelist (if configured)
          if (ALLOWED_KEYS.size > 0 && !ALLOWED_KEYS.has(pubKey)) {
            send(ws, { type: "error", message: "Public key not authorized" });
            return;
          }

          // Generate random challenge
          const challenge = randomBytes(32);
          state.challenge = challenge;
          state.publicKey = pubKey;
          console.log(`  [Auth] Challenge sent to ${pubKey.slice(0, 8)}...`);
          send(ws, { type: "auth_challenge", challenge: challenge.toString("hex") });
          break;
        }

        case "auth_response": {
          if (!state.challenge || !state.publicKey) {
            send(ws, { type: "error", message: "No pending challenge" });
            return;
          }

          const sig = Buffer.from(msg.signature, "hex");
          const valid = await ed.verifyAsync(sig, state.challenge, state.publicKey);

          if (valid) {
            state.authenticated = true;
            console.log(`  [Auth] Client ${state.publicKey.slice(0, 8)}... AUTHENTICATED`);
            send(ws, {
              type: "auth_success",
              message: "Authentication successful!",
              commands: Object.keys(COMMANDS),
            });
          } else {
            console.log(`  [Auth] Client ${state.publicKey.slice(0, 8)}... FAILED`);
            send(ws, { type: "auth_failed", message: "Invalid signature" });
          }
          break;
        }

        case "command": {
          if (!state.authenticated) {
            send(ws, { type: "error", message: "Not authenticated. Send auth_start first." });
            return;
          }

          const cmdName = msg.command?.toLowerCase();
          const cmd = COMMANDS[cmdName];
          if (!cmd) {
            send(ws, { type: "error", message: `Unknown command: ${cmdName}` });
            return;
          }

          if (robotBusy) {
            send(ws, { type: "error", message: "Robot busy" });
            return;
          }

          robotBusy = true;
          console.log(`  [Cmd] ${state.publicKey!.slice(0, 8)}... -> ${cmdName}`);
          robot.write(cmd.code + "\n");
          send(ws, { type: "action_started", action: cmdName, duration: cmd.duration });

          setTimeout(() => {
            robotBusy = false;
            send(ws, { type: "action_completed", action: cmdName });
          }, cmd.duration);
          break;
        }

        default:
          send(ws, { type: "error", message: `Unknown message type: ${msg.type}` });
      }
    } catch {
      send(ws, { type: "error", message: "Invalid message format" });
    }
  });

  ws.on("close", () => {
    const state = clientStates.get(ws);
    if (state?.publicKey) {
      console.log(`  [Auth] Client ${state.publicKey.slice(0, 8)}... disconnected`);
    }
    clientStates.delete(ws);
  });
});

// ── Start ─────────────────────────────────────────
robot.on("open", () => {
  console.log("");
  console.log("=".repeat(50));
  console.log("  R7: Secure the Channel — Simulator Mode");
  console.log("=".repeat(50));
  console.log("");
  console.log("  Connected to Virtual Bittle simulator.");
  if (ALLOWED_KEYS.size > 0) {
    console.log(`  Whitelisted keys: ${ALLOWED_KEYS.size}`);
  } else {
    console.log("  No key whitelist (any key accepted).");
  }

  robot.on("data", (data: Buffer) => {
    const msg = data.toString().trim();
    if (msg) console.log(`  [Robot] ${msg}`);
  });

  httpServer.listen(PORT, () => {
    console.log(`  Auth server: ws://localhost:${PORT}`);
    console.log(`  Web UI:      http://localhost:${PORT}`);
    console.log("");
    console.log("  Waiting for clients to authenticate...\n");
  });
});

robot.on("error", (err: Error) => {
  console.error("Failed to connect to simulator. Is it running?");
  console.error("  Start it: cd simulator && npm run dev");
  console.error(`  Error: ${err.message}`);
  process.exit(1);
});
