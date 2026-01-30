# Enoki Sponsored Transactions + zkLogin Demo

An educational web app showcasing **Enoki sponsored transactions** and **zkLogin** on Sui. This project demonstrates how to build gasless user experiences with social login authentication—users can sign in with Google and interact with the blockchain without managing private keys or paying gas fees.

![Sui Network](https://img.shields.io/badge/Sui-Testnet-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Enoki](https://img.shields.io/badge/Enoki-Sponsored%20TX-purple)
![zkLogin](https://img.shields.io/badge/zkLogin-Google-green)

---

## Table of Contents

- [Quick Start](#quick-start)
- [Getting an Enoki API Key](#getting-an-enoki-api-key)
- [Setting Up zkLogin (Google OAuth)](#setting-up-zklogin-google-oauth)
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

### Step 3: Get Your API Keys

1. Once your project is created, navigate to the **API Keys** section
2. You'll see two types of keys:
   - **Public Key** (`enoki_public_...`) - Used for zkLogin (client-side)
   - **Private Key** (`enoki_private_...`) - **KEEP THIS SECRET** - server-side only for sponsorship
3. Copy **both keys** - you'll need them for your `.env.local` file:
   - Public key → `NEXT_PUBLIC_ENOKI_API_KEY`
   - Private key → `ENOKI_PRIVATE_KEY`

### Step 4: Configure Auth Providers (Required for zkLogin)

If you want to use zkLogin (social login):

1. Navigate to the **Auth Providers** section in Enoki Portal
2. Add your OAuth provider (e.g., Google)
3. Enter your **Google OAuth Client ID** (see [Setting Up zkLogin](#setting-up-zklogin-google-oauth))
4. Save the configuration

### Step 5: Configure Sponsorship Settings (Optional)

In the Enoki portal, you can configure:

- **Spending limits** - Set daily/monthly gas budget limits
- **Allowed addresses** - Restrict which addresses can use sponsorship
- **Allowed Move call targets** - Whitelist specific smart contract functions

> ⚠️ **Security Note**: Never expose your `ENOKI_PRIVATE_KEY` in client-side code. Always use it in server actions or API routes.

---

## Setting Up zkLogin (Google OAuth)

zkLogin allows users to sign in with their Google account and interact with the blockchain without managing private keys. Here's how to set it up:

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**

### Step 2: Configure OAuth Consent Screen

1. Click **OAuth consent screen** in the sidebar
2. Select **External** user type (unless you have Google Workspace)
3. Fill in the required fields:
   - App name: Your app name
   - User support email: Your email
   - Developer contact email: Your email
4. Click **Save and Continue** through the remaining steps

### Step 3: Create OAuth 2.0 Client ID

1. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
2. Select **Web application**
3. Configure the authorized redirect URIs:
   ```
   http://localhost:3000/auth/callback    (for development)
   https://yourdomain.com/auth/callback   (for production)
   ```
4. Click **Create**
5. Copy the **Client ID** - you'll need this for:
   - `.env.local` as `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - Enoki Portal Auth Providers configuration

### Step 4: Add Client ID to Enoki Portal

1. Go back to the [Enoki Portal](https://portal.enoki.mystenlabs.com/)
2. Navigate to your project → **Auth Providers**
3. Add Google as a provider
4. Paste your Google OAuth Client ID
5. Save

> 💡 **Important**: The Google Client ID must be configured in **both** your `.env.local` file AND the Enoki Portal Auth Providers section.

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

# Enoki public API key (for zkLogin - safe to expose)
NEXT_PUBLIC_ENOKI_API_KEY=enoki_public_...your_public_key

# Google OAuth Client ID (for zkLogin)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...your_google_client_id.apps.googleusercontent.com

# ===========================================
# Server-side variables (KEEP SECRET)
# ===========================================

# Your Enoki private API key - NEVER expose this to the client!
# Used for sponsored transactions
ENOKI_PRIVATE_KEY=enoki_private_...your_private_key
```

### Environment Variables Summary

| Variable                        | Purpose                | Where to Get                       |
| ------------------------------- | ---------------------- | ---------------------------------- |
| `NEXT_PUBLIC_SUI_NETWORK_NAME`  | Sui network            | `testnet`, `mainnet`, or `devnet`  |
| `NEXT_PUBLIC_PACKAGE_ADDRESS`   | Counter contract       | From `sui client publish` output   |
| `NEXT_PUBLIC_COUNTER_OBJECT_ID` | Shared counter object  | From contract deployment           |
| `NEXT_PUBLIC_ENOKI_API_KEY`     | zkLogin client auth    | Enoki Portal → API Keys (Public)   |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID`  | Google OAuth           | Google Cloud Console → Credentials |
| `ENOKI_PRIVATE_KEY`             | Sponsored transactions | Enoki Portal → API Keys (Private)  |

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

| Feature                    | Description                                                    |
| -------------------------- | -------------------------------------------------------------- |
| **zkLogin (Google)**       | Sign in with Google—no wallet extension needed                 |
| **Global Counter**         | A shared counter anyone can increment/decrement                |
| **Sponsored Transactions** | All gas fees are paid by the sponsor, not the user             |
| **Dual Login Support**     | Works with both traditional wallets and zkLogin                |
| **Activity Feed**          | Real-time updates showing who modified the counter             |
| **Transaction Log**        | Step-by-step visibility into the sponsorship flow              |
| **Smart Step Skipping**    | Transaction log adapts based on login type (wallet vs zkLogin) |

### Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│  Authentication Layer                                                │
│    ├─> Traditional Wallet (Sui Wallet, Suiet, etc.)                  │
│    └─> zkLogin (Google OAuth → registerEnokiWallets)                 │
│         └─> Ephemeral key pair + ZK proof                            │
├─────────────────────────────────────────────────────────────────────┤
│  Transaction Flow (unified for both wallet types)                    │
│    └─> React Hook (useMutation)                                      │
│         └─> Transaction Builder Function                             │
│              └─> Build TX with `onlyTransactionKind: true`           │
│                   └─> Server Action: getSponsoredTx()                │
│                        └─> EnokiClient.createSponsoredTransaction() │
│                   └─> Sign with signTransaction (dapp-kit)           │
│                        ├─> Wallet: User approves in popup            │
│                        └─> zkLogin: Auto-signs with ephemeral key    │
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

Beyond sponsorship, Enoki also provides **zkLogin** - a way to authenticate users using familiar OAuth providers (Google, Facebook, etc.) without requiring them to manage private keys.

**How zkLogin Works:**

```
User clicks "Sign in with Google"
         ↓
Google OAuth flow (standard)
         ↓
Enoki generates ephemeral key pair
         ↓
Zero-knowledge proof is created
         ↓
User has a Sui address tied to their Google account!
```

**Key Benefits:**

- Users sign in with Google (familiar flow)
- No wallet extension required
- No seed phrases to manage
- Transactions are signed automatically with ephemeral keys
- Same Sui address every time (derived from Google identity)

**Implementation (using `registerEnokiWallets`):**

```typescript
import { registerEnokiWallets } from '@mysten/enoki';

// Register zkLogin as a wallet provider
registerEnokiWallets({
  apiKey: 'enoki_public_...',
  providers: {
    google: {
      clientId: 'your-google-client-id',
      redirectUrl: 'http://localhost:3000/auth/callback',
    },
  },
  client: suiClient,
  network: 'testnet',
});
```

Once registered, zkLogin appears as a wallet option in the standard dapp-kit `ConnectButton`, and all existing code using `useSignTransaction` works seamlessly for both traditional wallets and zkLogin.

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
├── app/
│   ├── auth/
│   │   └── callback/       # OAuth callback handler for zkLogin
│   └── page.tsx            # Main page
├── components/
│   ├── ui/                 # Reusable UI primitives (shadcn/ui)
│   ├── layout-wrapper.tsx  # Providers + registerEnokiWallets
│   ├── home-page.tsx       # Main demo UI
│   └── zklogin-button.tsx  # zkLogin connect button
├── hooks/
│   ├── counter/            # Counter mutation hooks
│   │   ├── useIncrement.ts # Sponsored increment
│   │   └── useDecrement.ts # Sponsored decrement
│   └── useLoginType.ts     # Detect wallet vs zkLogin
├── lib/
│   ├── atoms/              # Jotai atoms for UI state
│   ├── counter/            # Counter reads & transactions
│   ├── data/               # Demo data & code snippets
│   ├── enoki/              # Enoki server actions
│   ├── env-config-client.ts # Client env validation (includes zkLogin vars)
│   └── env-config-server.ts # Server env validation
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
