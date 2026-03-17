/**
 * SuiBotics Simulator — Custom Next.js Server
 *
 * Creates an HTTP server with:
 *  - Next.js request handler (pages + app router)
 *  - WebSocket server on /ws (UI state broadcasts) and /serial (virtual serial bridge)
 *  - TCP serial bridge on port 8375 (for VirtualSerialPort connections)
 *  - REST API routes for robot state, commands, and module metadata
 */

import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { parse } from 'node:url';
import { createServer as createTcpServer, Socket } from 'node:net';
import { readFile } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import next from 'next';
import { WebSocketServer, WebSocket } from 'ws';

// The robot state machine
import { VirtualBittle } from './src/lib/robot.js';

// Module metadata
import { MODULES, MODULE_CONCEPTS } from './src/lib/modules.js';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const HTTP_PORT = parseInt(process.env.PORT || '3000', 10);
const TCP_PORT = parseInt(process.env.TCP_PORT || '8375', 10);

// Project root is one level up from simulator/
const PROJECT_ROOT = join(__dirname, '..');
const ROBOT_ASSET_ROOT = join(PROJECT_ROOT, 'robot-dog-unitree-go1');

// ---------------------------------------------------------------------------
// Next.js app
// ---------------------------------------------------------------------------

const app = next({ dev, hostname, port: HTTP_PORT });
const handle = app.getRequestHandler();

// ---------------------------------------------------------------------------
// Robot instance
// ---------------------------------------------------------------------------

const robot = new VirtualBittle();

// ---------------------------------------------------------------------------
// Helper: read a module's README.md
// ---------------------------------------------------------------------------

async function readModuleReadme(moduleId: string): Promise<string | null> {
  // Strip the 'R' prefix if present to get the number, then reconstruct
  const readmePath = join(PROJECT_ROOT, moduleId, 'README.md');
  try {
    return await readFile(readmePath, 'utf-8');
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Helper: JSON response
// ---------------------------------------------------------------------------

function jsonResponse(res: ServerResponse, data: unknown, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

function getContentType(pathname: string): string {
  const extension = extname(pathname).toLowerCase();

  if (extension === '.glb') {
    return 'model/gltf-binary';
  }
  if (extension === '.png') {
    return 'image/png';
  }
  if (extension === '.jpg' || extension === '.jpeg') {
    return 'image/jpeg';
  }
  return 'application/octet-stream';
}

// ---------------------------------------------------------------------------
// Helper: read request body
// ---------------------------------------------------------------------------

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

app.prepare().then(() => {
  // -------------------------------------------------------------------------
  // HTTP server
  // -------------------------------------------------------------------------

  const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url || '/', true);
    const { pathname } = parsedUrl;

    // CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      res.end();
      return;
    }

    try {
      if (pathname?.startsWith('/robot-dog-unitree-go1/') && (req.method === 'GET' || req.method === 'HEAD')) {
        const assetPath = resolve(PROJECT_ROOT, pathname.slice(1));

        if (!assetPath.startsWith(ROBOT_ASSET_ROOT)) {
          res.writeHead(403);
          res.end('Forbidden');
          return;
        }

        try {
          const file = await readFile(assetPath);
          res.writeHead(200, {
            'Content-Type': getContentType(assetPath),
            'Cache-Control': dev ? 'no-store' : 'public, max-age=31536000, immutable',
          });
          res.end(req.method === 'HEAD' ? undefined : file);
          return;
        } catch {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
      }

      // -------------------------------------------------------------------
      // REST API routes (handled before Next.js)
      // -------------------------------------------------------------------

      // GET /api/state — current robot state
      if (pathname === '/api/state' && req.method === 'GET') {
        jsonResponse(res, robot.getState());
        return;
      }

      // GET /api/commands — available commands
      if (pathname === '/api/commands' && req.method === 'GET') {
        jsonResponse(res, VirtualBittle.getCommands());
        return;
      }

      // POST /api/command — execute a command
      if (pathname === '/api/command' && req.method === 'POST') {
        const body = await readBody(req);
        let command: string;
        try {
          const parsed = JSON.parse(body);
          command = parsed.command;
        } catch {
          jsonResponse(res, { error: 'Invalid JSON body. Expected { "command": "ksit" }' }, 400);
          return;
        }

        if (!command) {
          jsonResponse(res, { error: 'Missing "command" field' }, 400);
          return;
        }

        const result = robot.processCommand(command);
        jsonResponse(res, { result, state: robot.getState() });
        return;
      }

      // GET /api/modules — list all modules
      if (pathname === '/api/modules' && req.method === 'GET') {
        const modulesWithConcepts = MODULES.map((m) => ({
          ...m,
          concepts: MODULE_CONCEPTS[m.id] || [],
        }));
        jsonResponse(res, modulesWithConcepts);
        return;
      }

      // GET /api/module/:id — single module with README
      const moduleMatch = pathname?.match(/^\/api\/module\/([A-Za-z0-9]+)$/);
      if (moduleMatch && req.method === 'GET') {
        const moduleId = moduleMatch[1].toUpperCase();
        const mod = MODULES.find((m) => m.id === moduleId);

        if (!mod) {
          jsonResponse(res, { error: `Module "${moduleId}" not found` }, 404);
          return;
        }

        const readme = await readModuleReadme(moduleId);
        jsonResponse(res, {
          ...mod,
          concepts: MODULE_CONCEPTS[mod.id] || [],
          readme: readme || undefined,
        });
        return;
      }

      // -------------------------------------------------------------------
      // Everything else → Next.js
      // -------------------------------------------------------------------
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Request error:', err);
      jsonResponse(res, { error: 'Internal server error' }, 500);
    }
  });

  // -------------------------------------------------------------------------
  // WebSocket server — /ws (UI state broadcasts)
  // -------------------------------------------------------------------------

  const wssUI = new WebSocketServer({ noServer: true });
  const uiClients = new Set<WebSocket>();

  wssUI.on('connection', (ws: WebSocket) => {
    uiClients.add(ws);
    console.log(`[WS /ws] Client connected (${uiClients.size} total)`);

    // Send current state immediately
    ws.send(JSON.stringify({ type: 'state', data: robot.getState() }));

    ws.on('message', (data: Buffer) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'command' && msg.command) {
          const result = robot.processCommand(msg.command);
          ws.send(JSON.stringify({ type: 'command_ack', result }));
          return;
        }

        if (msg.type === 'action' && msg.action) {
          const result = robot.executeAction(String(msg.action));
          ws.send(JSON.stringify({ type: 'command_ack', result }));
        }
      } catch {
        // Ignore malformed messages
      }
    });

    ws.on('close', () => {
      uiClients.delete(ws);
      console.log(`[WS /ws] Client disconnected (${uiClients.size} total)`);
    });
  });

  // -------------------------------------------------------------------------
  // WebSocket server — /serial (virtual serial bridge)
  // -------------------------------------------------------------------------

  const wssSerial = new WebSocketServer({ noServer: true });
  const serialClients = new Set<WebSocket>();

  wssSerial.on('connection', (ws: WebSocket) => {
    serialClients.add(ws);
    console.log(`[WS /serial] Serial client connected (${serialClients.size} total)`);

    ws.on('message', (data: Buffer) => {
      const cmd = data.toString().trim();
      if (cmd) {
        const result = robot.processCommand(cmd);
        // Reply like a real Bittle: echo back the result
        ws.send(result + '\n');
      }
    });

    ws.on('close', () => {
      serialClients.delete(ws);
      console.log(`[WS /serial] Serial client disconnected (${serialClients.size} total)`);
    });
  });

  // -------------------------------------------------------------------------
  // HTTP upgrade handler — route to correct WebSocket server
  // -------------------------------------------------------------------------

  server.on('upgrade', (req, socket, head) => {
    const { pathname } = parse(req.url || '/');

    if (pathname === '/ws') {
      wssUI.handleUpgrade(req, socket, head, (ws) => {
        wssUI.emit('connection', ws, req);
      });
    } else if (pathname === '/serial') {
      wssSerial.handleUpgrade(req, socket, head, (ws) => {
        wssSerial.emit('connection', ws, req);
      });
    } else {
      socket.destroy();
    }
  });

  // -------------------------------------------------------------------------
  // Robot state change → broadcast to all UI clients
  // -------------------------------------------------------------------------

  robot.onStateChange((state, event) => {
    const msg = JSON.stringify({ type: 'state', data: state, event });
    for (const client of uiClients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    }
  });

  // -------------------------------------------------------------------------
  // TCP serial bridge (port 8375)
  // -------------------------------------------------------------------------

  const tcpClients = new Set<Socket>();

  const tcpServer = createTcpServer((socket: Socket) => {
    tcpClients.add(socket);
    const addr = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`[TCP :${TCP_PORT}] Serial client connected from ${addr} (${tcpClients.size} total)`);

    let buffer = '';

    socket.on('data', (data: Buffer) => {
      buffer += data.toString();

      // Process complete lines (commands terminated by \n)
      let newlineIdx: number;
      while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
        const cmd = buffer.slice(0, newlineIdx).trim();
        buffer = buffer.slice(newlineIdx + 1);

        if (cmd) {
          const result = robot.processCommand(cmd);
          socket.write(result + '\n');
        }
      }
    });

    socket.on('close', () => {
      tcpClients.delete(socket);
      console.log(`[TCP :${TCP_PORT}] Serial client disconnected (${tcpClients.size} total)`);
    });

    socket.on('error', (err: Error) => {
      console.error(`[TCP :${TCP_PORT}] Socket error:`, err.message);
      tcpClients.delete(socket);
    });
  });

  // -------------------------------------------------------------------------
  // Start listening
  // -------------------------------------------------------------------------

  server.listen(HTTP_PORT, () => {
    printBanner();
  });

  tcpServer.listen(TCP_PORT, () => {
    console.log(`  TCP serial bridge listening on port ${TCP_PORT}`);
  });
});

// ---------------------------------------------------------------------------
// Startup banner
// ---------------------------------------------------------------------------

function printBanner() {
  const reset = '\x1b[0m';
  const bold = '\x1b[1m';
  const dim = '\x1b[2m';
  const green = '\x1b[32m';
  const cyan = '\x1b[36m';
  const yellow = '\x1b[33m';
  const magenta = '\x1b[35m';

  console.log('');
  console.log(`${bold}${green}  ╔══════════════════════════════════════════════════╗${reset}`);
  console.log(`${bold}${green}  ║                                                  ║${reset}`);
  console.log(`${bold}${green}  ║${reset}   ${bold}${cyan}SuiBotics Simulator v2.0${reset}                       ${bold}${green}║${reset}`);
  console.log(`${bold}${green}  ║${reset}   ${dim}Virtual Bittle Robot + Next.js UI${reset}              ${bold}${green}║${reset}`);
  console.log(`${bold}${green}  ║                                                  ║${reset}`);
  console.log(`${bold}${green}  ╠══════════════════════════════════════════════════╣${reset}`);
  console.log(`${bold}${green}  ║                                                  ║${reset}`);
  console.log(`${bold}${green}  ║${reset}   ${bold}Web UI:${reset}        ${cyan}http://localhost:${HTTP_PORT}${reset}${' '.repeat(Math.max(0, 14 - String(HTTP_PORT).length))}${bold}${green}║${reset}`);
  console.log(`${bold}${green}  ║${reset}   ${bold}WebSocket:${reset}     ${yellow}ws://localhost:${HTTP_PORT}/ws${reset}${' '.repeat(Math.max(0, 11 - String(HTTP_PORT).length))}${bold}${green}║${reset}`);
  console.log(`${bold}${green}  ║${reset}   ${bold}Serial WS:${reset}     ${yellow}ws://localhost:${HTTP_PORT}/serial${reset}${' '.repeat(Math.max(0, 7 - String(HTTP_PORT).length))}${bold}${green}║${reset}`);
  console.log(`${bold}${green}  ║${reset}   ${bold}TCP Serial:${reset}    ${magenta}localhost:${TCP_PORT}${reset}${' '.repeat(Math.max(0, 19 - String(TCP_PORT).length))}${bold}${green}║${reset}`);
  console.log(`${bold}${green}  ║                                                  ║${reset}`);
  console.log(`${bold}${green}  ║${reset}   ${bold}REST API:${reset}                                     ${bold}${green}║${reset}`);
  console.log(`${bold}${green}  ║${reset}   ${dim}GET  /api/state${reset}      Robot state               ${bold}${green}║${reset}`);
  console.log(`${bold}${green}  ║${reset}   ${dim}GET  /api/commands${reset}   Available commands         ${bold}${green}║${reset}`);
  console.log(`${bold}${green}  ║${reset}   ${dim}POST /api/command${reset}    Execute command            ${bold}${green}║${reset}`);
  console.log(`${bold}${green}  ║${reset}   ${dim}GET  /api/modules${reset}    Module list                ${bold}${green}║${reset}`);
  console.log(`${bold}${green}  ║${reset}   ${dim}GET  /api/module/:id${reset}  Module detail + README    ${bold}${green}║${reset}`);
  console.log(`${bold}${green}  ║                                                  ║${reset}`);
  console.log(`${bold}${green}  ╚══════════════════════════════════════════════════╝${reset}`);
  console.log('');
  console.log(`  ${dim}Mode: ${dev ? 'development' : 'production'}${reset}`);
  console.log(`  ${dim}Modules: ${MODULES.length} available${reset}`);
  console.log('');
}
