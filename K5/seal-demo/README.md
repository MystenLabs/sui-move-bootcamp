# Seal Demo — Simplest Seal App

A minimal Seal app demonstrating three access control patterns from the presentation:

1. **Private Data** (`private_seal`) — only the owner address can decrypt
2. **Time-Lock** (`timelock_seal`) — data unlocks after a timestamp
3. **Allowlist** (`allowlist_seal`) — only listed addresses can decrypt

## Quick Start

### 1. Deploy the Move package

```bash
cd move
sui move build
sui client publish --gas-budget 100000000
```

Copy the published **Package ID** from the output.

### 2. Run the TypeScript demo

```bash
cd ts
npm install

# Edit src/index.ts — replace PACKAGE_ID with your published package ID
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

- `@mysten/seal` v1.1.1
- `@mysten/sui` v2.9.1
- `@mysten/bcs` v2.0.3
