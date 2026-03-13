# Multiplayer Robot Queue dApp

A React dApp for interacting with the Multiplayer Robot Queue smart contract on
Sui.

## Features

- Wallet connection (Sui Wallet, Suiet, etc.)
- View queue statistics in real-time
- Queue actions with a single click
- WebSocket integration for live updates
- Event log for tracking activity

## Prerequisites

1. Deploy the Move contract and create a queue (see main README.md)
2. Have a Sui wallet browser extension installed

## Setup

```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env

# Edit .env with your contract addresses:
# VITE_PACKAGE_ID=0x...
# VITE_QUEUE_ID=0x...
```

## Development

```bash
pnpm dev
```

Open http://localhost:5173 in your browser.

## Building

```bash
pnpm build
```

## How This dApp Was Created

This dApp was scaffolded using:

```bash
pnpm create @mysten/dapp
```

Which sets up:

- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [@mysten/dapp-kit-react](https://sdk.mystenlabs.com/dapp-kit) - Sui wallet
  integration using `SuiGrpcClient`
- [@mysten/sui](https://sdk.mystenlabs.com/typescript) - Sui TypeScript SDK
- [@radix-ui/themes](https://www.radix-ui.com/) - UI components
- [@tanstack/react-query](https://tanstack.com/query) - Data fetching

## Client Setup

The dApp uses `@mysten/dapp-kit-react` with `SuiGrpcClient` for network
communication:

```typescript
import { createDAppKit, DAppKitProvider } from "@mysten/dapp-kit-react";
import { SuiGrpcClient } from "@mysten/sui/grpc";

const dAppKit = createDAppKit({
  networks: ["devnet", "testnet", "mainnet"],
  defaultNetwork: "testnet",
  createClient(network) {
    return new SuiGrpcClient({
      network,
      baseUrl:
        network === "mainnet"
          ? "https://fullnode.mainnet.sui.io:443"
          : network === "testnet"
            ? "https://fullnode.testnet.sui.io:443"
            : "https://fullnode.devnet.sui.io:443",
    });
  },
});
```

Then use the `useCurrentClient` hook to access the gRPC client:

```typescript
import { useCurrentClient } from "@mysten/dapp-kit-react";

const client = useCurrentClient();

// Read object state
const obj = await client.core.getObject({
  objectId: queueId,
  include: { json: true },
});
```

## Key Files

- `src/App.tsx` - Main app layout with wallet connection
- `src/MultiplayerQueue.tsx` - Queue dashboard and action buttons
- `src/networkConfig.ts` - Contract address configuration
- `src/main.tsx` - React entry point with DAppKitProvider setup
