/**
 * R5 Simulator Mode — Live Control (WebSocket + Virtual Serial)
 *
 * Runs the R5 WebSocket control server but connects to the SuiBotics
 * simulator instead of a physical serial port.
 *
 * Prerequisites:
 *   1. Start the simulator: cd simulator && npm run dev
 *   2. Run this: npx tsx src/sim.ts
 *   3. Open R5/public/index.html in browser (or http://localhost:8080)
 */

import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { VirtualSerialPort } from "../../../simulator/lib/virtual-serial.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT || "8080");
const QUEUE_COMMANDS = process.env.QUEUE_COMMANDS !== "false";
const MAX_QUEUE_SIZE = parseInt(process.env.MAX_QUEUE_SIZE || "10");

// ── Virtual Robot Connection ──────────────────────
const robot = new VirtualSerialPort();
let robotBusy = false;
let currentAction: string | null = null;

const COMMANDS: Record<string, { code: string; duration: number }> = {
  sit: { code: "ksit", duration: 2000 },
  stand: { code: "kbalance", duration: 2000 },
  forward: { code: "kwkF", duration: 4000 },
  backward: { code: "kbk", duration: 4000 },
  wave: { code: "khi", duration: 3000 },
  jump: { code: "kjmp", duration: 2000 },
  rest: { code: "krest", duration: 3000 },
  pushup: { code: "kpu", duration: 5000 },
  trot: { code: "ktrF", duration: 3000 },
  stretch: { code: "kstr", duration: 3000 },
  playdead: { code: "kpd", duration: 3000 },
  standup: { code: "kup", duration: 2000 },
};

const commandQueue: string[] = [];

// ── HTTP Server ───────────────────────────────────
const server = createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    try {
      const html = readFileSync(join(__dirname, "../public/index.html"), "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } catch {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<html><body><h1>R5 Server Running (Simulator Mode)</h1>
        <p>Open the SuiBotics playground at <a href="http://localhost:3000">http://localhost:3000</a> to see the 3D robot.</p>
        <p>Or use wscat: <code>wscat -c ws://localhost:${PORT}</code></p></body></html>`);
    }
  } else if (req.url === "/api/state") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ busy: robotBusy, currentAction, queueLength: commandQueue.length }));
  } else if (req.url === "/api/commands") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(Object.keys(COMMANDS)));
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

// ── WebSocket Server ──────────────────────────────
const wss = new WebSocketServer({ server });
const clients = new Set<WebSocket>();

function broadcast(msg: object) {
  const data = JSON.stringify(msg);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) client.send(data);
  }
}

async function executeCommand(name: string): Promise<void> {
  const cmd = COMMANDS[name];
  if (!cmd) return;

  robotBusy = true;
  currentAction = name;
  broadcast({ type: "action_started", action: name, duration: cmd.duration });

  robot.write(cmd.code + "\n");
  await new Promise((r) => setTimeout(r, cmd.duration));

  robotBusy = false;
  currentAction = null;
  broadcast({ type: "action_completed", action: name });

  // Process next in queue
  if (commandQueue.length > 0) {
    const next = commandQueue.shift()!;
    broadcast({ type: "queue_update", queue: [...commandQueue], next });
    executeCommand(next);
  }
}

wss.on("connection", (ws) => {
  clients.add(ws);
  broadcast({ type: "client_count", count: clients.size });
  ws.send(JSON.stringify({
    type: "welcome",
    commands: Object.keys(COMMANDS),
    state: { busy: robotBusy, currentAction, queueLength: commandQueue.length },
  }));

  ws.on("message", (data) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.type === "command" && msg.command) {
        const name = msg.command.toLowerCase();
        if (!COMMANDS[name]) {
          ws.send(JSON.stringify({ type: "error", message: `Unknown command: ${name}` }));
          return;
        }

        if (robotBusy) {
          if (QUEUE_COMMANDS && commandQueue.length < MAX_QUEUE_SIZE) {
            commandQueue.push(name);
            broadcast({ type: "queue_update", queue: [...commandQueue] });
          } else {
            ws.send(JSON.stringify({ type: "error", message: "Robot busy, command dropped" }));
          }
          return;
        }

        executeCommand(name);
      } else if (msg.type === "ping") {
        ws.send(JSON.stringify({ type: "pong", timestamp: Date.now() }));
      }
    } catch { /* ignore */ }
  });

  ws.on("close", () => {
    clients.delete(ws);
    broadcast({ type: "client_count", count: clients.size });
  });
});

// ── Start ─────────────────────────────────────────
robot.on("open", () => {
  console.log("");
  console.log("=".repeat(50));
  console.log("  R5: Live Control — Simulator Mode");
  console.log("=".repeat(50));
  console.log("");
  console.log("  Connected to Virtual Bittle simulator.");

  robot.on("data", (data: Buffer) => {
    const msg = data.toString().trim();
    if (msg) console.log(`  [Robot] ${msg}`);
  });

  server.listen(PORT, () => {
    console.log(`  WebSocket server: ws://localhost:${PORT}`);
    console.log(`  HTTP server:      http://localhost:${PORT}`);
    console.log(`  Queue mode:       ${QUEUE_COMMANDS ? "enabled" : "disabled"}`);
    console.log("");
    console.log("  Open the playground at http://localhost:3000 to see the 3D robot,");
    console.log("  or connect any WebSocket client to ws://localhost:" + PORT);
    console.log("");
  });
});

robot.on("error", (err: Error) => {
  console.error("Failed to connect to simulator. Is it running?");
  console.error("  Start it: cd simulator && npm run dev");
  console.error(`  Error: ${err.message}`);
  process.exit(1);
});
