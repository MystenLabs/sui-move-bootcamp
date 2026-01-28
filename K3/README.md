# Enoki Sponsored Transactions Demo

An educational web app showcasing **Enoki sponsored transactions** on Sui. This project demonstrates how to build gasless user experiences by letting a sponsor pay for transaction fees on behalf of users.

![Sui Network](https://img.shields.io/badge/Sui-Testnet-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Enoki](https://img.shields.io/badge/Enoki-Sponsored%20TX-purple)

---

## Table of Contents

- [Quick Start](#quick-start)
- [Getting an Enoki API Key](#getting-an-enoki-api-key)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [Project Overview](#project-overview)
- [What is Enoki?](#what-is-enoki)
- [Enoki Use Cases](#enoki-use-cases)
- [Tech Stack](#tech-stack)

---

## Quick Start

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd K3

# 2. Install dependencies
bun install
# or npm install

# 3. Copy environment template and fill in values
cp .env.example .env.local

# 4. Get your Enoki API key (see instructions below)

# 5. Run the development server
bun dev
# or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Getting an Enoki API Key

Enoki is Mysten Labs' infrastructure service that enables sponsored transactions on Sui. Here's how to get your API key:

### Step 1: Access the Enoki Portal

1. Navigate to the [Enoki Portal](https://portal.enoki.mystenlabs.com/)
2. Sign in with your Google account or create a new account

### Step 2: Create a New Project

1. Click **"Create Project"** or **"New Project"**
2. Give your project a descriptive name (e.g., "Counter Demo")
3. Select the network you want to use:
   - **Testnet** (recommended for development)
   - **Mainnet** (for production)

### Step 3: Get Your API Key

1. Once your project is created, navigate to the **API Keys** section
2. You'll see two types of keys:
   - **Public Key** (`enoki_public_...`) - Safe to expose in client code
   - **Private Key** (`enoki_private_...`) - **KEEP THIS SECRET** - server-side only
3. Copy the **Private Key** - you'll need this for your `.env.local` file

### Step 4: Configure Sponsorship Settings (Optional)

In the Enoki portal, you can configure:

- **Spending limits** - Set daily/monthly gas budget limits
- **Allowed addresses** - Restrict which addresses can use sponsorship
- **Allowed Move call targets** - Whitelist specific smart contract functions

> ⚠️ **Security Note**: Never expose your `ENOKI_PRIVATE_KEY` in client-side code. Always use it in server actions or API routes.

---

## Environment Setup

Create a `.env.local` file in the project root with the following variables:

```env
# ===========================================
# Client-side variables (exposed to browser)
# ===========================================

# Network to connect to: mainnet, testnet, or devnet
NEXT_PUBLIC_SUI_NETWORK_NAME=testnet

# The deployed package address of the counter contract
NEXT_PUBLIC_PACKAGE_ADDRESS=0x...your_package_address

# The shared counter object ID
NEXT_PUBLIC_COUNTER_OBJECT_ID=0x...your_counter_object_id

# ===========================================
# Server-side variables (KEEP SECRET)
# ===========================================

# Your Enoki private API key - NEVER expose this to the client!
ENOKI_PRIVATE_KEY=enoki_private_...your_private_key
```

### How to Get Package Address and Counter Object ID

If you're deploying the Move contract yourself:

```bash
cd move/enoki_example

# Publish the contract
sui client publish --gas-budget 100000000

# Look for the published package address in the output
# The Counter object ID will also be shown (it's created on publish via init())
```

If using an existing deployment, the package address and counter object ID will be provided to you.

---

## Running the Project

### Development

```bash
# Using bun (recommended)
bun dev

# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
# Build for production
bun run build
# or npm run build

# Start production server
bun start
# or npm start
```

### Move Contract (Optional)

If you want to modify or redeploy the Move contract:

```bash
cd move/enoki_example

# Build the contract
sui move build

# Run tests
sui move test

# Publish to testnet
sui client publish --gas-budget 100000000
```

---

## Project Overview

This app demonstrates a **two-step sponsored transaction flow**:

1. **Prepare Transaction** - Build the transaction, get sponsorship from Enoki
2. **Sign & Execute** - User signs, transaction executes with sponsored gas

### Features

| Feature                    | Description                                           |
| -------------------------- | ----------------------------------------------------- |
| **Global Counter**         | A shared counter anyone can increment/decrement       |
| **Sponsored Transactions** | All gas fees are paid by the sponsor, not the user    |
| **Activity Feed**          | Real-time updates showing who modified the counter    |
| **Transaction Log**        | Step-by-step visibility into the sponsorship flow     |
| **Code Examples**          | Interactive code snippets showing how each step works |

### Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│  UI Components (React)                                               │
│    └─> React Hook (useMutation)                                      │
│         └─> Transaction Builder Function                             │
│              └─> Build TX with `onlyTransactionKind: true`           │
│                   └─> Server Action: getSponsoredTx()                │
│                        └─> EnokiClient.createSponsoredTransaction() │
│                   └─> Sign with Wallet (signTransaction)             │
│                   └─> Server Action: executeSponsoredTx()            │
│                        └─> EnokiClient.executeSponsoredTransaction() │
│                   └─> Wait for Transaction & Parse Results           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## What is Enoki?

**Enoki** is a developer infrastructure service by Mysten Labs designed to simplify building on Sui. It provides several powerful features:

### Sponsored Transactions

The core feature demonstrated in this app. Sponsored transactions allow a third party (the sponsor) to pay gas fees on behalf of users. This enables:

- **Gasless user experiences** - Users don't need SUI tokens to interact with your dApp
- **Onboarding simplicity** - New users can try your app without acquiring tokens first
- **B2B applications** - Companies can subsidize usage for their customers

### How Sponsored Transactions Work

```
Traditional Transaction:
User → Signs TX → Pays Gas → Executes

Sponsored Transaction:
User → Builds TX Kind → Sponsor Pays Gas → User Signs → Executes
          ↓
   No gas payment needed!
```

The key technical detail is building transactions with `onlyTransactionKind: true`:

```typescript
// Build only the transaction "kind" (the Move calls)
// without gas payment information
const txBytes = await transaction.build({
  client: suiClient,
  onlyTransactionKind: true, // Critical for sponsorship!
});

// Send to Enoki to add sponsorship
const sponsored = await enokiClient.createSponsoredTransaction({
  transactionKindBytes: toBase64(txBytes),
  sender: userAddress,
  // ...
});
```

### zkLogin Integration

Beyond sponsorship, Enoki also provides **zkLogin** - a way to authenticate users using familiar OAuth providers (Google, Facebook, etc.) without requiring them to manage private keys. Users sign in with their social account, and Enoki handles the cryptographic proof generation.

### Other Enoki Features

| Feature            | Description                        |
| ------------------ | ---------------------------------- |
| **Salt Service**   | Secure salt management for zkLogin |
| **Prover Service** | Zero-knowledge proof generation    |
| **Faucet**         | Testnet SUI distribution           |
| **Analytics**      | Usage tracking and monitoring      |

---

## Enoki Use Cases

### 1. Gaming

- Players can start playing immediately without buying tokens
- In-game transactions are seamless and gasless
- Game studio absorbs gas costs as part of user acquisition

### 2. Social Applications

- Users can post, like, and interact without crypto knowledge
- Social actions feel native, not "blockchainy"
- Platform subsidizes on-chain activity

### 3. NFT Minting & Marketplaces

- Free minting experiences for users
- Collectors don't need to manage gas
- Marketplace covers transaction costs

### 4. Enterprise Applications

- B2B SaaS with blockchain features
- Employees interact with on-chain data without wallets
- Company manages all gas costs centrally

### 5. Onboarding & Trials

- Free trial periods for dApps
- Users experience the app before committing
- Reduces friction in user acquisition funnel

### 6. Loyalty & Rewards Programs

- Issue on-chain rewards without user friction
- Points, badges, and achievements stored on Sui
- Recipients don't need any crypto knowledge

---

## Tech Stack

| Category           | Technology                    |
| ------------------ | ----------------------------- |
| **Framework**      | Next.js 16 (App Router)       |
| **Language**       | TypeScript                    |
| **React**          | React 19                      |
| **Blockchain**     | Sui Network                   |
| **Sui SDK**        | @mysten/sui, @mysten/dapp-kit |
| **Sponsorship**    | @mysten/enoki                 |
| **State**          | TanStack Query, Jotai         |
| **Forms**          | React Hook Form               |
| **Styling**        | Tailwind CSS v4               |
| **UI Components**  | Radix UI, shadcn/ui           |
| **Validation**     | Zod                           |
| **Notifications**  | Sonner                        |
| **Smart Contract** | Move (Sui)                    |

---

## Project Structure

```
K3/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                 # Reusable UI primitives
│   └── *.tsx               # Feature components
├── hooks/
│   └── counter/            # Counter mutation hooks
├── lib/
│   ├── atoms/              # Jotai atoms for state
│   ├── counter/            # Counter reads & transactions
│   ├── data/               # Demo data
│   ├── enoki/              # Enoki server actions
│   └── *.ts                # Utilities and configs
├── move/
│   └── enoki_example/      # Move smart contract
│       ├── sources/        # Contract source code
│       └── tests/          # Contract tests
└── specs/                  # Design documentation
```

---

## Learn More

- [Sui Documentation](https://docs.sui.io/)
- [Enoki Documentation](https://docs.enoki.mystenlabs.com/)
- [Move Language Guide](https://move-book.com/)
- [@mysten/dapp-kit](https://sdk.mystenlabs.com/dapp-kit)
- [Next.js Documentation](https://nextjs.org/docs)

---

## License

MIT
