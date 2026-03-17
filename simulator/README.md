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

## On-Chain Robot Actions

Every control panel button (Sit, Stand, Up, Rest, Wave, Jump, Push-up, Stretch, Forward, Back, Left, Right) and keyboard shortcut (W/A/S/D/Space) triggers a real Sui testnet transaction when a wallet is connected.

### How it works

Each button click fires two independent paths:

1. **Path A (WebSocket)** — robot animates immediately (~10ms)
2. **Path B (On-chain)** — builds a PTB calling `robot_queue::add_action`, wallet signs, submits to Sui testnet (~2-3s)

The robot never waits for the blockchain. If no wallet is connected, only Path A runs.

### Contract

Uses the R2 `action_queue::robot_queue` contract deployed on Sui testnet:

| | Address |
|---|---|
| Package | `0x27a3292a055a7904753a8c741579d9cdebc17010c8b65d3d1f00da43047962b7` |
| ActionQueue | `0x83ba18609f73b99518b7aaa13ce4a17293c4d18c4e2bab38ce59c7dc0fef355c` |

The `add_action` function is permissionless — anyone with a Sui wallet can call it. Each call emits an `ActionAdded` event with the action name, sender address, and current queue length.

### Wallet integration

The simulator uses `@mysten/dapp-kit-react` for wallet connection:

- Click **Connect wallet** in the navbar to open the wallet selection modal
- Select any installed Sui wallet (Slush, Phantom, Suiet, etc.)
- Once connected, every action button prompts a transaction signature
- The terminal shows submission status and transaction digests
- The control panel shows on-chain status cards (chain, queue length, total actions, pending txs)
- Disconnect at any time — the simulator falls back to local-only mode

### Configuration

The testnet contract addresses are hardcoded as defaults. To use a different deployment:

```bash
cp .env.example .env.local
# Edit the addresses in .env.local
```

## Tech Stack

- **Next.js 14** (App Router, custom server)
- **React 18** + TypeScript
- **Tailwind CSS**
- **Three.js** (procedural robot model, OrbitControls)
- **WebSocket** (`ws` library)
- **Node.js TCP** (serial bridge)
- **@mysten/dapp-kit-react** + **@mysten/sui** (wallet connection, transaction signing)
- **Sui Move** (R2 `action_queue::robot_queue` contract on testnet)
