# Sui & Move Bootcamp

A comprehensive, hands-on learning resource for building on the [Sui](https://sui.io/) blockchain using the [Move](https://move-book.com/) programming language — from your first smart contract to full-stack decentralized applications and beyond.

---

## Table of Contents

- [Getting Started](#getting-started)
- [How This Repository Works](#how-this-repository-works)
- [Learning Paths](#learning-paths)
  - [Path 1: Sui & Move Fundamentals (Modules A–K)](#path-1-sui--move-fundamentals-modules-ak)
  - [Path 2: Blockchain Robotics Workshop (Modules R1–R10)](#path-2-blockchain-robotics-workshop-modules-r1r10)
- [Module Reference](#module-reference)
  - [Module A: Introduction to Sui](#module-a-introduction-to-sui)
  - [Module B: Move Language Fundamentals](#module-b-move-language-fundamentals)
  - [Module C: Advanced Move Patterns](#module-c-advanced-move-patterns)
  - [Module D: Sui Client Interactions](#module-d-sui-client-interactions)
  - [Module E: NFT Development](#module-e-nft-development)
  - [Module F: Complete DApp Development](#module-f-complete-dapp-development)
  - [Module G: Advanced Move Programming](#module-g-advanced-move-programming)
  - [Module H: Upgrades and Security](#module-h-upgrades-and-security)
  - [Module I: Token Standards and Marketplaces](#module-i-token-standards-and-marketplaces)
  - [Module J: Infrastructure and Monitoring](#module-j-infrastructure-and-monitoring)
  - [Module K: Advanced Topics](#module-k-advanced-topics)
  - [Module R1: Hello Bittle — Serial Basics](#module-r1-hello-bittle--serial-basics)
  - [Module R2: My First Move Contract — Blockchain Fundamentals](#module-r2-my-first-move-contract--blockchain-fundamentals)
  - [Module R3: WebSocket Playground — Real-time Basics](#module-r3-websocket-playground--real-time-basics)
  - [Module R4: Blockchain Robot — First Integration](#module-r4-blockchain-robot--first-integration)
  - [Module R5: Live Control — WebSocket + Serial](#module-r5-live-control--websocket--serial)
  - [Module R6: Open to the World — Tunneling 101](#module-r6-open-to-the-world--tunneling-101)
  - [Module R7: Secure the Channel — Authentication](#module-r7-secure-the-channel--authentication)
  - [Module R8: Pay to Play — Tokenomics](#module-r8-pay-to-play--tokenomics)
  - [Module R9: Multiplayer Robot — Shared State](#module-r9-multiplayer-robot--shared-state)
  - [Module R10: Robot Rental Platform — Capstone](#module-r10-robot-rental-platform--capstone)
- [Prerequisites](#prerequisites)
- [Technology Stack](#technology-stack)
- [Resources](#resources)

---

## Getting Started

1. **Install the Sui CLI** — Follow the [official installation guide](https://docs.sui.io/guides/developer/getting-started/sui-install).
2. **Clone this repository**:
   ```bash
   git clone https://github.com/MystenLabs/sui-move-bootcamp.git
   cd sui-move-bootcamp
   ```
3. **Pick a learning path** below and start with the first module.
4. **Follow the README** inside each module folder for detailed instructions.

---

## How This Repository Works

Each module includes a hands-on project with code examples demonstrating specific Sui and Move concepts.

- The **`main` branch** provides scaffolded projects with intentionally incomplete code — learners implement the missing parts as they progress through the lessons.
- For each module **X**, there is a corresponding **`X-solution` branch** containing the fully completed source code (e.g., `B1-solution`, `G2-solution`).

This approach encourages interactive learning: experiment, debug, and understand the development process step by step before reviewing the final implementation.

---

## Learning Paths

### Path 1: Sui & Move Fundamentals (Modules A–K)

A structured curriculum covering the full spectrum of Sui development — from writing your first Move contract to deploying production DApps with monitoring.

```
A (Intro to Sui) → B (Move Basics) → C (Advanced Patterns) → D (Client SDK)
    → E (NFTs) → F (Full DApp) → G (Advanced Move) → H (Security)
    → I (Tokens & Marketplaces) → J (Infrastructure) → K (Advanced Topics)
```

Start with **[Module A](#module-a-introduction-to-sui)** if you are new to Sui and Move.

### Path 2: Blockchain Robotics Workshop (Modules R1–R10)

A progressive, project-based series that teaches Sui blockchain development through building a robot control platform — from a simple "Hello Robot" script to a complete rental marketplace with tokens, authentication, and multiplayer access.

```
R1 (Serial) → R2 (Move Basics) → R3 (WebSocket) → R4 (Blockchain + Robot)
    → R5 (Real-time Control) → R6 (Tunneling) → R7 (Auth & State Channels)
    → R8 (Tokenomics) → R9 (Multiplayer) → R10 (Full Platform)
```

**Hardware**: Most modules work in simulation mode. A physical [Petoi Bittle X](https://docs.petoi.com/) robot is required for the full experience in Modules R1, R4, R5+.

Choose based on your goals:

| Goal                                  | Modules           | Time        |
| ------------------------------------- | ----------------- | ----------- |
| Control a robot from your browser     | R1 → R5 → R6      | 4–6 hours   |
| Learn Sui blockchain through projects | R2 → R7 → R8 → R9 | 8–12 hours  |
| Full stack blockchain robotics        | R1 → R2 → … → R10 | 25–35 hours |

Start with **[Module R1](#module-r1-hello-bittle--serial-basics)** or **[Module R2](#module-r2-my-first-move-contract--blockchain-fundamentals)** depending on your interest.

---

## Module Reference

### Module A: Introduction to Sui

- [A1: Introduction to Decentralized Ledgers and Smart-Contracts](./A1/)
- [A2: Description of the Sui ecosystem (Walrus, Enoki, Deepbook)](./A2/)
- [A3: Intro to Sui & Move, Validators vs Fullnodes — Sui Infra](./A3/)
- [A4: Creating a Sui Wallet from CLI and First Smart Contract](./A4/)

### Module B: Move Language Fundamentals

- [B1: Packages, Modules, Move Compiler, and Objects](./B1/)
- [B2: Numeric Types, Strings, and Pure Arguments](./B2/)
- [B3: Copy ability, Events, Key/Store abilities, and Parameter Types](./B3/)

### Module C: Advanced Move Patterns

- [C1: Capability Pattern and One Time Witness + Publisher](./C1/)
- [C2: Object Display](./C2/)
- [C3: PTBs Introduction](./C3/)
- [C4: On-Chain Randomness](./C4/)

### Module D: Sui Client Interactions

- [D1: Sui Client initialization and Fullnode restrictions](./D1/)
- [D2: Reading Objects from chain and Dynamic Fields](./D2/)
- [D3: Paginated Reads](./D3/)
- [D4: Transaction submission, Balance Changes, and Gas Profiling](./D4/)

### Module E: NFT Development

- [E1: Minting custom NFTs, Object Changes, and Error Handling](./E1/)
- [E2: Wallet integration in applications](./E2/)

### Module F: Complete DApp Development

- [F1: Building a complete DApp from Requirements to Production](./F1/)

### Module G: Advanced Move Programming

- [G1: Custom initializers and Test Transactions](./G1/)
- [G2: Collections and Data Structures (Vector, ID, UID, VecMap, Bag, Option)](./G2/)
- [G3: Dynamic Fields and Tables](./G3/)

### Module H: Upgrades and Security

- [H1: Upgrade preconditions and Versioned Shared Objects](./H1/)
- [H2: Advanced Patterns (Capability with Properties, Witness Pattern, Hot Potato)](./H2/)
- [H3: General Security Concerns](./H3/)
- [H4: Common vulnerability patterns](./H4/)

### Module I: Token Standards and Marketplaces

- [I1: Creating Custom Coins and Coin Metadata](./I1/)
- [I2: Treasury Cap Handling](./I2/)
- [I3: Closed Loop Tokens](./I3/)
- [I4: Kiosk](./I4/)
- [I5: Custom Rules & Transfer Policies](./I5/)

### Module J: Infrastructure and Monitoring

- [J1: Setting up and customizing an Indexer](./J1/)
- [J2: Integrating Indexer in a DApp](./J2/)
- [J3: Using Prometheus and Grafana for Monitoring](./J3/)

### Module K: Advanced Topics

- [K1: Sui Indexer Pro (Backend)](./K1/)
- [K2: ZKLogin Demo (React Frontend)](./K2/)
- [K4: Nautilus — Trusted Execution Environments](./K4/)
- [K5: Seal — Encryption & Access Policies](./K5/)

---

### Module R1: Hello Bittle — Serial Basics

Control a Petoi Bittle X robot with 20 lines of TypeScript. Learn serial communication fundamentals, baud rates, USB device detection, and the Bittle command protocol.

```bash
cd R1/hello-bittle && pnpm install && pnpm start
```

### Module R2: My First Move Contract — Blockchain Fundamentals

Build a simple action queue on the Sui blockchain. Learn Sui Move basics — objects, ownership, shared state — and interact with your contract using the TypeScript SDK.

```bash
cd R2/move && sui move build && sui client publish --gas-budget 100000000
```

### Module R3: WebSocket Playground — Real-time Basics

Build a real-time robot controller with WebSocket. Control a virtual robot from your browser with instant feedback, bidirectional communication, and multi-client broadcasting.

```bash
cd R3/server && pnpm install && pnpm start
# Open http://localhost:8080
```

### Module R4: Blockchain Robot — First Integration

Connect the Sui blockchain to a physical robot. Learn polling architecture for bridging the on-chain world to the physical world, mapping on-chain actions to robot commands.

```bash
cd R4/processor && pnpm install && pnpm start
```

### Module R5: Live Control — WebSocket + Serial

Real-time robot control over local network — 100x faster than blockchain polling. Combine WebSocket and serial communication with command queuing and latency optimization.

```bash
cd R5/server && pnpm install && pnpm start
```

### Module R6: Open to the World — Tunneling 101

Control your robot from anywhere in the world using Cloudflare Tunnel. Learn why NAT blocks incoming connections and how tunneling solves the problem.

```bash
cd R6/scripts && ./install-cloudflared.sh && ./start-all.sh
```

### Module R7: Secure the Channel — Authentication

The most important security module. **Part A** covers off-chain Ed25519 challenge-response authentication. **Part B** introduces on-chain state channels — the key innovation for real-time blockchain robot control with deposits and trustless operation.

```bash
# Part A: Off-chain auth
cd R7/part-a-offchain && pnpm install && pnpm generate-keys && pnpm demo
# Part B: On-chain state channels
cd R7/part-b-onchain/move && sui move build && sui client publish --gas-budget 100000000
```

### Module R8: Pay to Play — Tokenomics

Create an economic model for shared robot access. Build a custom COOKIE token, a rate-limited faucet, and a pay-per-action system — learning Sui Coin modules, TreasuryCap, Table storage, and Clock-based logic.

```bash
cd R8/move && sui move build && sui client publish --gas-budget 100000000
cd ../client && pnpm install && pnpm demo
```

### Module R9: Multiplayer Robot — Shared State

Multiple users, one robot, fair access. Build an on-chain fairness queue with per-user limits and cooldowns, a React dApp with wallet integration (`@mysten/dapp-kit`), and a WebSocket broadcast server for real-time updates.

```bash
cd R9/move && sui move build && sui move test
cd ../publish && ./publish.sh "My Queue"
cd ../dapp && pnpm install && pnpm dev
```

### Module R10: Robot Rental Platform — Capstone

The capstone project. Combines everything from R1–R9 into a complete robot rental platform: TREAT token payments with escrow, a robot registry for discovery, Ed25519 command signing with replay protection, time-based billing with automatic refunds, and rental receipts.

```bash
cd R10/move && sui move build && sui client publish --gas-budget 100000000
cd ../client && pnpm install && pnpm demo
```

---

## Prerequisites

| Tool                                                                        | Required for                                                             |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [Sui CLI](https://docs.sui.io/guides/developer/getting-started/sui-install) | All Move modules                                                         |
| Node.js 18+ & npm/pnpm                                                      | TypeScript projects (D, E, F, K, R series)                               |
| Python 3                                                                    | Robot device detection (R1)                                              |
| [Petoi Bittle X](https://docs.petoi.com/)                                   | Physical robot experience (R1, R4, R5+) — optional, simulation available |
| Docker                                                                      | J3 (Prometheus/Grafana monitoring)                                       |

## Technology Stack

| Layer      | Technologies                         |
| ---------- | ------------------------------------ |
| Blockchain | Sui, Move 2024 edition               |
| Backend    | Node.js, TypeScript                  |
| Frontend   | React, Vite, `@mysten/dapp-kit`      |
| Real-time  | WebSocket (`ws` library)             |
| Hardware   | `serialport` library, Petoi Bittle X |
| Networking | Cloudflare Tunnel                    |
| Crypto     | Ed25519 (`@noble/ed25519`)           |
| Monitoring | Prometheus, Grafana, Docker Compose  |

## Resources

- [Sui Developer Documentation](https://docs.sui.io/)
- [Move Language Book](https://move-book.com/)
- [Sui TypeScript SDK](https://sdk.mystenlabs.com/typescript)
- [Petoi Bittle Documentation](https://docs.petoi.com/)

---

Each module contains detailed lessons, code examples, and exercises. Start exploring by clicking on any module above!
