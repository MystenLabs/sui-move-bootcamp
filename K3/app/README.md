# K3 Enoki Sponsored Transactions + zkLogin Demo

Educational Next.js app showing how to build a gasless Sui UX using Enoki sponsorship + zkLogin, with a simple shared counter contract.

---

## Feature Recap

| Feature                            | Description                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| Enoki-sponsored transactions       | Builds transaction kind bytes, requests sponsorship server-side, signs, then executes via Enoki. |
| Direct wallet transactions         | Supports non-sponsored flow where users sign and pay gas directly.                               |
| zkLogin with Google OAuth          | Registers Enoki wallet initializer so users can authenticate with Google-based zkLogin.          |
| Traditional wallet support         | Works with standard Sui wallets in the same app and UI flow.                                     |
| Shared on-chain counter demo       | Increment/decrement a shared Move counter object with optional message notes.                    |
| Live counter state + activity feed | Polls current counter value and recent increment/decrement events for real-time UX.              |
| gRPC + GraphQL read architecture   | Uses gRPC for object/balance reads and GraphQL for event history queries.                        |

---

## What This Project Teaches

- How Enoki-sponsored transactions work end-to-end
- How zkLogin (Google OAuth) plugs into dApp Kit React
- How to structure Sui TypeScript v2 app code with gRPC + GraphQL reads
- How to separate client signing from server-side sponsorship execution

---

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- `@mysten/sui` v2
- `@mysten/dapp-kit-react` + `@mysten/dapp-kit-core`
- `@mysten/enoki`
- TanStack Query + Jotai
- Tailwind CSS + shadcn-style UI
- Move contract in `contracts/move/enoki_example`

---

## Project Structure

```text
K3/
├── app/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── docs/
│   └── specs/
└── contracts/
    └── move/enoki_example/
```

---

## Prerequisites

- Node.js 20+
- One package manager (`bun`, `npm`, `pnpm`, or `yarn`)
- Sui CLI (optional, only for Move build/test/publish)
- Enoki project (public + private API keys)
- Google OAuth client (for zkLogin)

---

## Quick Start

From repository root:

```bash
cd K3/app
bun install
cp .env.example .env.local
bun dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Set these in `K3/app/.env.local`:

```env
# Required app base URL (validated by runtime config)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Network + contract
NEXT_PUBLIC_SUI_NETWORK_NAME=testnet
NEXT_PUBLIC_PACKAGE_ADDRESS=0x...your_package_address
NEXT_PUBLIC_COUNTER_OBJECT_ID=0x...your_counter_object_id

# Enoki + zkLogin (client-side)
NEXT_PUBLIC_ENOKI_API_KEY=enoki_public_...your_public_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...your_google_client_id.apps.googleusercontent.com

# Enoki sponsorship (server-only)
ENOKI_PRIVATE_KEY=enoki_private_...your_private_key
```

### Why `NEXT_PUBLIC_APP_URL` matters

`lib/env-config-client.ts` validates this URL at startup.  
Use your actual deployment URL in production (for example `https://yourdomain.com`).

---

## OAuth / zkLogin Setup (Google)

1. Create OAuth client in Google Cloud Console.
2. Add redirect URI(s):
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback` (prod)
3. Copy Client ID to:
   - `.env.local` (`NEXT_PUBLIC_GOOGLE_CLIENT_ID`)
   - Enoki Portal -> Auth Providers -> Google

---

## Enoki Setup

1. Create project in Enoki Portal.
2. Copy:
   - Public key -> `NEXT_PUBLIC_ENOKI_API_KEY`
   - Private key -> `ENOKI_PRIVATE_KEY`
3. Configure sponsorship rules as needed (allowed addresses/targets/budgets).

---

## Running Move Contract (Optional)

```bash
cd K3/contracts/move/enoki_example
sui move build
sui move test
sui client publish --gas-budget 100000000
```

Use publish output to set:

- `NEXT_PUBLIC_PACKAGE_ADDRESS`
- `NEXT_PUBLIC_COUNTER_OBJECT_ID`

---

## How It Works (High Level)

Sponsored flow:

1. Build tx bytes with `onlyTransactionKind: true`
2. Server action requests Enoki sponsorship
3. User signs sponsored bytes
4. Server action executes sponsored transaction
5. App waits for confirmation and refreshes state

Direct flow:

1. Build transaction
2. Wallet signs and executes directly
3. App waits for confirmation and refreshes

---

## Important Files

- `lib/dapp-kit.ts` - dApp Kit + Enoki wallet initialization
- `components/layout-wrapper.tsx` - provider composition
- `lib/sui-grpc-client.ts` - gRPC client factory
- `lib/sui-graphql-client.ts` - GraphQL client factory
- `lib/enoki/get-sponsored-tx.ts` - sponsorship server actions
- `hooks/counter/*` - mutation logic (sponsored + direct)
- `lib/counter/counter-reads.ts` - object/event/balance reads
- `contracts/move/enoki_example/sources/counter.move` - on-chain logic

---

## Notes

- This app is educational-first and intentionally small.
- It demonstrates current v2-style integration, not legacy dApp Kit patterns.
