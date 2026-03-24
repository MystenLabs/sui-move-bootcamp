# Seal Demo

A minimal Seal app demonstrating three access control patterns from the presentation:

1. **Private Data** (`private_seal`) — only the owner address can decrypt
2. **Time-Lock** (`timelock_seal`) — data unlocks after a timestamp
3. **Allowlist** (`allowlist_seal`) — only listed addresses can decrypt

## Prerequisites

- [Sui CLI](https://docs.sui.io/guides/developer/getting-started/sui-install) installed
- A Sui wallet browser extension (e.g. [Sui Wallet](https://chromewebstore.google.com/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil)) connected to **testnet**
- Testnet SUI in your wallet (`sui client faucet` or use the wallet's request button)
- Node.js 18+

## Quick Start (UI)

The Move package is already deployed on testnet. You just need to run the UI:

```bash
cd app
npm install
npm run dev
```

Open http://localhost:5173, connect your wallet, and try the three tabs.

### How to use each tab

**Private Data:**
1. Type a message and click **Encrypt** — this runs locally, no key server is contacted
2. Copy the ciphertext output
3. Paste it into the decrypt textarea and click **Decrypt**
4. Sign the session key in your wallet — key servers verify your identity via dry-run
5. Only you (the connected wallet) can decrypt it

**Time-Lock:**
1. Set a delay (e.g. 30 seconds), type a message, and click **Encrypt**
2. Copy the ciphertext and paste it into decrypt
3. Try clicking **Decrypt** immediately — it will fail because `seal_approve` checks `clock >= unlock_time`
4. Wait for the timer to pass, then decrypt again — it succeeds

**Allowlist:**
1. Click **Create Allowlist** — this deploys a shared object on-chain (costs gas)
2. Add yourself (or another address) as a member
3. Type a message and click **Encrypt**
4. Copy the ciphertext and paste it into decrypt
5. Only addresses on the allowlist can decrypt

## Deploy your own package (optional)

If you want to modify the Move contracts and deploy your own:

```bash
cd move
sui move build
sui client publish --gas-budget 100000000
```

Copy the published **Package ID** from the output and update `PACKAGE_ID` in `app/src/App.tsx`.

## CLI demo (Node.js)

There's also a standalone Node.js script for terminal-based encrypt/decrypt:

```bash
cd ts
npm install

# Edit src/index.ts — replace PACKAGE_ID if you deployed your own
npm run demo
```

## What the demo covers

| Presentation Concept | Where it appears |
|---|---|
| `seal_approve` as gatekeeper | `private_seal.move` — aborts if caller != owner |
| Identity = `[PackageId][id]` | `id` is BCS-encoded address, SDK prepends package ID |
| Encryption is local (no key server) | `sealClient.encrypt()` — only uses public keys |
| Session keys for user consent | `SessionKey.create()` — scoped to package, 10 min TTL |
| PTB dry-run for policy check | `tx.moveCall(seal_approve)` built and sent to key servers |
| Threshold encryption | `threshold: 1` with aggregator-backed key server |
| Client-side decryption | `sealClient.decrypt()` — key servers never see plaintext |

## SDK versions

- `@mysten/seal` ^1.1.1
- `@mysten/sui` ^2.9.1
- `@mysten/dapp-kit` ^1.0.4
