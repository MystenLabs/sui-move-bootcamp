# SuiBotics Simulator

A 3D robot simulator that replaces the Petoi Bittle X hardware for the R1–R10 module series. Built with Next.js, Three.js, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The simulator provides:

- **3D robot viewport** — Virtual Bittle with animated poses, walk cycles, and mood-based eye colors
- **Module browser** — All 10 lessons with rendered README content, architecture diagrams, and simulator instructions
- **TCP serial bridge** on port 8375 — R modules connect here via `VirtualSerialPort`
- **WebSocket** on `/ws` — Real-time state broadcasting to the browser UI
- **REST API** — `GET /api/state`, `GET /api/commands`, `POST /api/command`, `GET /api/modules`, `GET /api/module/:id`

## Using with R Modules

Modules that need hardware (R1, R4, R5, R7) each have a `src/sim.ts` entry point:

```bash
# Terminal 1: keep the simulator running
cd simulator && npm run dev

# Terminal 2: run any hardware module in sim mode
cd R1/hello-bittle && pnpm sim
cd R4/processor   && pnpm sim
cd R5/server      && pnpm sim
cd R7/part-a-offchain && pnpm sim
```

Modules without hardware dependencies (R2, R3, R6, R8, R9, R10) run as-is. R10's server has a built-in `SIMULATE_ROBOT=true` flag.

### Virtual Serial Adapter

Each sim script imports `simulator/lib/virtual-serial.ts`, a zero-dependency TCP adapter using Node.js built-in `net.Socket`. It connects to `localhost:8375` and exposes the same API as the `serialport` npm package:

```typescript
import { VirtualSerialPort } from '../../simulator/lib/virtual-serial.js';
const port = new VirtualSerialPort();
port.on('open', () => port.write('ksit\n'));
port.on('data', (buf) => console.log(buf.toString()));
```

## Architecture

```
Browser (Next.js + Three.js)
       |
   WebSocket /ws
       |
┌──────┴──────┐
│  Custom     │
│  Server     │── Next.js pages (/, /modules, /module/[id])
│  (server.ts)│── REST API (/api/*)
│             │── Robot state machine (src/lib/robot.ts)
└──┬───────┬──┘
   |       |
WS /serial TCP :8375
   |       |
R modules connect here
via VirtualSerialPort
```

## Command Support

The robot state machine supports 17 commands plus 30+ aliases covering every naming convention used across R1–R10:

| Serial | Alias Examples | Action |
|--------|---------------|--------|
| `ksit` | `sit`, `sitDown` | Sit down |
| `kbalance` | `balance`, `stand`, `reset` | Stand balanced |
| `khi` | `hi`, `wave`, `hello` | Wave hello |
| `kwkF` | `wkF`, `forward`, `walk`, `walkForward`, `walk_forward` | Walk forward |
| `kjmp` | `jmp`, `jump` | Jump |
| `kpu` | `pu`, `pushUp`, `push_up` | Push-up |
| `kpd` | `pd`, `playDead`, `play_dead` | Play dead |
| `krest` | `rest`, `lie`, `sleep` | Rest |
| `ktrF` | `trF`, `trot`, `trotForward` | Trot forward |
| `kstr` | `str`, `stretch` | Stretch |
| `kup` | `up`, `standUp`, `stand_up` | Stand tall |
| `kbf` | `bf`, `backFlip`, `back_flip` | Backflip |

## Tech Stack

- **Next.js 14** (App Router, custom server)
- **React 18** + TypeScript
- **Tailwind CSS**
- **Three.js** (procedural robot model, OrbitControls)
- **WebSocket** (`ws` library)
- **Node.js TCP** (serial bridge)
