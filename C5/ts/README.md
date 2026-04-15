# Derived Objects — TypeScript Tests

This exercise demonstrates **off-chain ID derivation** using the `@mysten/sui` SDK. You will implement a helper that predicts derived object IDs client-side, then validate predictions against real on-chain objects.

## What You'll Learn

- How to use `deriveObjectID` from `@mysten/sui/utils` to compute derived addresses off-chain
- How BCS serialization and type tags map to on-chain key types
- How deterministic IDs enable reverse search / batch lookups without an indexer

## Project Structure

```
ts/
├── src/
│   ├── suiClient.ts               # Sui client setup
│   └── helpers/
│       ├── deriveObjectID.ts       # TODO: off-chain ID derivation wrapper
│       ├── getSigner.ts            # Ed25519 keypair helper
│       └── typeTags.ts             # BCS type tag constants
└── tests/
    ├── derive.test.ts              # 5 test cases covering all derivation strategies
    └── derive.utils.ts             # TestUtils — tx building, signing, assertions
```

## Implementation Guide

Complete the `TODO` in `src/helpers/deriveObjectID.ts`.

The `deriveObjectIDFromParent` function should call `deriveObjectID` (imported from `@mysten/sui/utils`) with three arguments:

1. **Parent object ID** — from `process.env.PARENT_OBJECT_ID`
2. **Key type tag** — the `keyType` parameter (e.g. `"u64"`, `"address"`, `"0x1::string::String"`)
3. **BCS-serialized key** — use `bcsHelper.serialize(key).toBytes()`

The function is synchronous — `deriveObjectID` is pure math (no network calls).

## Setup

```bash
cp .env.example .env
# Fill in USER_SECRET_KEY with a funded testnet keypair
bun install
bun run test
```

Tests run against testnet — the signing account needs SUI from the [faucet](https://docs.sui.io/guides/developer/getting-started/get-coins).
