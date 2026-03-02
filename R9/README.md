# Module 9: Multiplayer Robot - Shared State

Learn how to build fair multiplayer systems where multiple users share access to a single resource (the robot) with proper queue management, rate limiting, and real-time updates.

## Learning Objectives

By completing this module, you will understand:

- **Fairness Algorithms**: Per-user limits, cooldowns, and priority queues
- **Shared Object Patterns**: Managing global state that multiple users modify
- **Event-Driven Architecture**: Using blockchain events for real-time updates
- **Table Storage**: Efficient per-user data tracking in Move
- **WebSocket Broadcasting**: Real-time dashboard updates to all connected clients
- **Sui dApp Development**: Creating React apps with wallet integration using `@mysten/dapp-kit`

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MULTIPLAYER QUEUE                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐   │
│   │  User A  │     │  User B  │     │  User C  │     │  User D  │   │
│   └────┬─────┘     └────┬─────┘     └────┬─────┘     └────┬─────┘   │
│        │                │                │                │         │
│        └────────────────┼────────────────┼────────────────┘         │
│                         │                │                          │
│                         ▼                ▼                          │
│              ┌─────────────────────────────────────┐                │
│              │      Fairness Mechanisms            │                │
│              │  ┌────────────────────────────────┐ │                │
│              │  │ • Max 3 pending per user       │ │                │
│              │  │ • 30 second cooldown           │ │                │
│              │  │ • Priority queue option        │ │                │
│              │  └────────────────────────────────┘ │                │
│              └───────────────────┬─────────────────┘                │
│                                  │                                  │
│                                  ▼                                  │
│              ┌─────────────────────────────────────┐                │
│              │        Action Queue (FIFO)          │                │
│              │  ┌───┬───┬───┬───┬───┬───┬───┐      │                │
│              │  │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │...│      │                │
│              │  └───┴───┴───┴───┴───┴───┴───┘      │                │
│              └───────────────────┬─────────────────┘                │
│                                  │                                  │
│                                  ▼                                  │
│              ┌─────────────────────────────────────┐                │
│              │          Robot Controller           │                │
│              │       (Admin processes queue)       │                │
│              └─────────────────────────────────────┘                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Fairness Mechanisms

### 1. Per-User Pending Limit

Each user can only have a maximum of 3 actions pending in the queue at any time. This prevents a single user from flooding the queue.

```move
// Check before queueing
assert!(stats.pending_count < queue.max_pending_per_user, ETooManyPending);
```

### 2. Cooldown Period

After queueing an action, users must wait 30 seconds before queueing another. This prevents rapid-fire spamming.

```move
// Check cooldown
let time_since_last = current_time - stats.last_queue_time;
assert!(time_since_last >= queue.cooldown_ms, EInCooldown);
```

### 3. Priority Queue (Optional)

Users can opt for priority placement, which puts their action at the front of the queue. This creates economic incentives while maintaining fairness.

```move
// Priority goes to front
if (is_priority) {
    queue.actions.insert(action, 0);
} else {
    queue.actions.push_back(action);
}
```

## Project Structure

```
R9/
├── move/                      # Smart contracts
│   ├── Move.toml             # Package configuration
│   └── sources/
│       └── multiplayer_queue.move    # Main contract
│
├── publish/                  # Deployment script
│   └── publish.sh            # Auto-deploy & generate .env files
│
├── server/                   # WebSocket server
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── server.ts         # WebSocket server
│       ├── blockchain.ts     # Event listener
│       ├── types.ts          # TypeScript types
│       └── demo-client.ts    # Test client
│
├── client/                   # CLI tools (admin operations)
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── config.ts         # Configuration
│       ├── create-queue.ts   # Create queue (admin)
│       ├── queue-action.ts   # Queue action (CLI)
│       ├── process-action.ts # Process action (admin)
│       ├── check-status.ts   # Check queue status
│       └── demo.ts           # Full demo
│
├── dapp/                     # React dApp with wallet integration
│   ├── package.json
│   ├── .env.example          # Environment template
│   └── src/
│       ├── App.tsx           # Main app component
│       ├── main.tsx          # React entry point
│       ├── networkConfig.ts  # Sui network configuration
│       └── MultiplayerQueue.tsx  # Queue dashboard & actions
│
└── README.md                 # This file
```

## Quick Start

### Option A: Using the Publish Script (Recommended)

The publish script automates deployment and generates all `.env` files:

```bash
# 1. Build and test
cd move
sui move build
sui move test

# 2. Deploy everything with one command
cd ../publish
./publish.sh "My Robot Queue"
```

This will:

- Publish the Move package to your active Sui network
- Create a MultiplayerQueue shared object
- Generate `.env` files for `client/`, `server/`, and `dapp/`

### Option B: Manual Deployment

#### 1. Build and Test Smart Contracts

```bash
cd move
sui move build
sui move test
```

#### 2. Deploy to Testnet

```bash
sui client publish --gas-budget 100000000
```

Save the package ID from the output.

#### 3. Create a Queue (Admin)

```bash
cd client
pnpm install
cp .env.example .env
# Edit .env with your PACKAGE_ADDRESS
pnpm create-queue "My Robot Queue"
```

Save the Queue ID from the output.

#### 4. Configure the dApp

```bash
cd dapp
cp .env.example .env
# Edit .env:
# VITE_PACKAGE_ID=0x...
# VITE_QUEUE_ID=0x...
```

### Running the Application

#### Start the WebSocket Server (for real-time updates)

```bash
cd server
pnpm install
pnpm dev
```

#### Run the dApp

```bash
cd dapp
pnpm install
pnpm dev
```

Open http://localhost:5173 in your browser, connect your Sui wallet, and start queueing actions!

## Creating a Sui dApp

This module demonstrates how to build a Sui dApp from scratch. Here's how the dApp was created:

### Step 1: Scaffold the Project

```bash
pnpm create @mysten/dapp
```

This creates a new React + Vite project with:

- `@mysten/dapp-kit` - Wallet connection and Sui hooks
- `@mysten/sui` - Sui TypeScript SDK
- `@radix-ui/themes` - UI components
- `@tanstack/react-query` - Data fetching

### Step 2: Configure Networks

Edit `src/networkConfig.ts` to add your contract addresses:

```typescript
import { getFullnodeUrl } from "@mysten/sui/client";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable } = createNetworkConfig({
  testnet: {
    url: getFullnodeUrl("testnet"),
    variables: {
      packageId: import.meta.env.VITE_PACKAGE_ID || "",
      queueId: import.meta.env.VITE_QUEUE_ID || "",
    },
  },
});

export { useNetworkVariable, networkConfig };
```

### Step 3: Use dApp Kit Hooks

The dApp kit provides powerful hooks for interacting with Sui:

```typescript
import {
  useCurrentAccount, // Get connected wallet
  useSuiClient, // Get Sui client for queries
  useSignAndExecuteTransaction, // Sign and execute transactions
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

// Get wallet address
const account = useCurrentAccount();

// Query blockchain
const client = useSuiClient();
const obj = await client.getObject({
  id: queueId,
  options: { showContent: true },
});

// Execute transaction
const { mutate: signAndExecute } = useSignAndExecuteTransaction();

const tx = new Transaction();
tx.moveCall({
  target: `${packageId}::multiplayer_queue::queue_action`,
  arguments: [
    tx.object(queueId),
    tx.pure.string("wave"),
    tx.object(SUI_CLOCK_OBJECT_ID),
  ],
});

signAndExecute(
  { transaction: tx },
  {
    onSuccess: (result) => console.log("Success:", result.digest),
    onError: (error) => console.error("Error:", error),
  },
);
```

### Step 4: Add Wallet Connection

The dApp kit provides a ready-to-use connect button:

```tsx
import { ConnectButton } from "@mysten/dapp-kit";

function App() {
  return (
    <header>
      <ConnectButton />
    </header>
  );
}
```

## Smart Contract API

### Create Queue

```move
public fun create_queue(
    name: String,
    ctx: &mut TxContext,
)
```

### Queue Action

```move
public fun queue_action(
    queue: &mut MultiplayerQueue,
    action_name: String,
    clock: &Clock,
    ctx: &mut TxContext,
)
```

### Queue Priority Action

```move
public fun queue_priority_action(
    queue: &mut MultiplayerQueue,
    action_name: String,
    clock: &Clock,
    ctx: &mut TxContext,
)
```

### Process Action (Admin)

```move
public fun process_action(
    queue: &mut MultiplayerQueue,
    clock: &Clock,
    ctx: &mut TxContext,
)
```

### View Functions

```move
public fun queue_length(queue: &MultiplayerQueue): u64
public fun can_user_queue(queue: &MultiplayerQueue, user: address, clock: &Clock): bool
public fun remaining_cooldown(queue: &MultiplayerQueue, user: address, clock: &Clock): u64
public fun user_pending_count(queue: &MultiplayerQueue, user: address): u64
```

## Valid Actions

The following actions are supported:

| Action          | Description      |
| --------------- | ---------------- |
| `sit`           | Robot sits down  |
| `stand`         | Robot stands up  |
| `wave`          | Robot waves      |
| `walk_forward`  | Walk forward     |
| `walk_backward` | Walk backward    |
| `turn_left`     | Turn left        |
| `turn_right`    | Turn right       |
| `jump`          | Robot jumps      |
| `balance`       | Balance pose     |
| `push_up`       | Push-up exercise |

## Events

The contract emits events for every state change:

### ActionQueued

```typescript
{
  queue_id: string,
  action_name: string,
  sender: string,
  position: number,
  is_priority: boolean,
  queue_length: number,
  timestamp: number
}
```

### ActionProcessed

```typescript
{
  queue_id: string,
  action_name: string,
  original_sender: string,
  was_priority: boolean,
  wait_time_ms: number,
  remaining_in_queue: number
}
```

### UserStatsUpdated

```typescript
{
  queue_id: string,
  user: string,
  pending_count: number,
  total_queued: number,
  total_processed: number,
  cooldown_remaining_ms: number
}
```

### QueueStateChanged

```typescript
{
  queue_id: string,
  queue_length: number,
  unique_users: number,
  total_queued: number,
  total_processed: number,
  is_paused: boolean
}
```

## WebSocket Protocol

### Server Messages

```typescript
// Welcome on connect
{ type: "welcome", data: { serverVersion: "1.0.0", queueId: "0x..." } }

// Queue state snapshot
{ type: "queue_state", data: { queueLength: 5, uniqueUsers: 3, ... } }

// Action queued
{ type: "action_queued", data: { actionName: "wave", sender: "0x...", ... } }

// Action processed
{ type: "action_processed", data: { actionName: "wave", waitTimeMs: 5000, ... } }
```

### Client Messages

```typescript
// Get current state
{ type: "get_state" }

// Subscribe to queue (optional)
{ type: "subscribe", queueId: "0x..." }
```

## Key Concepts Explained

### Shared Objects

The `MultiplayerQueue` is a shared object, meaning multiple users can access it concurrently. The Sui runtime ensures consensus on the order of modifications.

```move
public struct MultiplayerQueue has key {
    id: UID,
    actions: vector<QueuedAction>,
    user_stats: Table<address, UserStats>,
    // ...
}
```

### Table Storage

We use a `Table` to efficiently store per-user statistics. This is more gas-efficient than alternatives for large numbers of users.

```move
// Create table
user_stats: table::new(ctx),

// Check if user exists
if (!queue.user_stats.contains(sender)) {
    queue.user_stats.add(sender, UserStats { ... });
}

// Borrow for reading
let stats = queue.user_stats.borrow(sender);

// Borrow for modification
let stats = queue.user_stats.borrow_mut(sender);
```

### Borrow Checker Pattern

Move's borrow checker prevents data races. When emitting events that reference the queue, we must ensure mutable borrows are released first:

```move
// Capture values while holding mutable borrow
let (pending, total_queued, total_processed) = {
    let stats = queue.user_stats.borrow_mut(sender);
    stats.pending_count = stats.pending_count + 1;
    (stats.pending_count, stats.total_queued, stats.total_processed)
}; // Borrow released here

// Now safe to emit event (uses immutable borrow)
event::emit(UserStatsUpdated { ... });
```

## Environment Variables

### Client (.env)

```env
# Required
PACKAGE_ADDRESS=0x...
QUEUE_ID=0x...

# One of these required for transactions
USER_PHRASE="twelve word mnemonic phrase"
USER_PRIVATE_KEY=suiprivkey1...

# Optional
SUI_RPC_URL=https://fullnode.testnet.sui.io
```

### Server (.env)

```env
PACKAGE_ADDRESS=0x...
QUEUE_ID=0x...
SUI_RPC_URL=https://fullnode.testnet.sui.io
WEBSOCKET_PORT=8080
POLL_INTERVAL_MS=2000
```

### dApp (.env)

```env
VITE_PACKAGE_ID=0x...
VITE_QUEUE_ID=0x...
```

## Testing

### Move Tests

```bash
cd move
sui move test
```

Tests cover:

- Queue creation
- Action queueing
- Pending limits
- Cooldown enforcement

### Manual Testing

1. Deploy contract and create queue
2. Start the server: `cd server && pnpm dev`
3. Run the dApp: `cd dapp && pnpm dev`
4. Connect wallet and queue actions
5. Watch events appear in real-time!

## Exercises

1. **Add VIP Status**: Create a VIP system where certain users have higher pending limits or shorter cooldowns.

2. **Action History**: Track the last N processed actions for display in the dashboard.

3. **User Leaderboard**: Create a leaderboard showing users with the most processed actions.

4. **Queue Scheduling**: Add time-based scheduling where users can specify when their action should run.

5. **Action Combos**: Allow users to queue action sequences that play as a single unit.

## Troubleshooting

### "ETooManyPending" Error

You have reached the maximum pending actions (default: 3). Wait for some actions to be processed or ask the admin to process them.

### "EInCooldown" Error

You must wait for the cooldown period (default: 30 seconds) before queueing another action.

### "ENotAdmin" Error

Only the queue creator (admin) can process actions. Make sure you're using the admin's keypair.

### WebSocket Not Connecting

1. Check that the server is running: `pnpm dev`
2. Verify the WebSocket URL (default: ws://localhost:8080)
3. Check browser console for errors

### dApp Shows "Configuration Required"

1. Make sure you've deployed the contract and created a queue
2. Copy `.env.example` to `.env` in the dapp directory
3. Add your VITE_PACKAGE_ID and VITE_QUEUE_ID
4. Restart the dev server

## Next Steps

- **Module 10**: Advanced game mechanics and tournament systems
- Integrate with physical robot control from earlier modules
- Add payment for priority actions using tokens from Module 8
