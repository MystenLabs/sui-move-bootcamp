# What Is Seal?

Seal is a decentralized secrets management protocol built on Sui. It lets developers encrypt data so that only users who satisfy an on-chain access policy can decrypt it -- without any central authority ever seeing the plaintext.

## Why Seal Exists

Traditional secret management relies on a trusted server: you send data up, the server decides who gets it back. That model introduces a single point of failure, requires trusting the operator, and doesn't compose with on-chain logic.

Seal removes the central operator. Access rules live in Move smart contracts on Sui, and decryption keys are distributed by independent key servers that enforce those rules. The result is programmable, decentralized access control for any encrypted payload.

## What You Can Build

Seal enables a range of applications where data privacy and on-chain logic intersect:

- **Private NFTs** -- content that only the current owner can view
- **Gated content** -- media or data unlocked by token ownership, subscriptions, or allowlists
- **Time-locked secrets** -- information that becomes available at a specific on-chain timestamp
- **Sealed-bid auctions and voting** -- encrypted submissions revealed only after a deadline
- **Confidential credentials** -- user-held secrets with transferable custody

## High-Level Architecture

Seal has two components that work together:

1. **On-chain access policies (Sui)** -- A Move package defines `seal_approve*` functions that encode who may decrypt. Each package controls an identity namespace tied to its package ID.

2. **Off-chain key servers** -- Independent services that each hold a master secret key. When a user requests a decryption key, the key server evaluates the on-chain policy. If the policy approves, the server returns a derived key; otherwise, it refuses.

The encryption itself uses **Identity-Based Encryption (IBE)**, a scheme where data is encrypted to an *identity string* rather than a specific public key. Seal maps those identity strings to on-chain namespaces, so Move code controls who can obtain the matching decryption key.

```
┌─────────────────────────────────────┐
│            Sui Blockchain           │
│                                     │
│  Move Package (access policy)       │
│  ┌───────────────────────────┐      │
│  │ seal_approve(id, ...) {   │      │
│  │   // your access logic    │      │
│  │ }                         │      │
│  └───────────────────────────┘      │
└──────────────┬──────────────────────┘
               │ evaluates policy
               ▼
┌──────────────────────────────┐
│     Key Server (off-chain)   │
│  Holds IBE master secret key │
│  Returns derived key only if │
│  on-chain policy approves    │
└──────────────────────────────┘
               │
               ▼
┌──────────────────────────────┐
│     Client (browser/app)     │
│  Encrypts with IBE + policy  │
│  Decrypts with derived key   │
└──────────────────────────────┘
```

> Seal never sees the plaintext. Encryption and decryption happen entirely on the client side.

## Key Properties

| Property | What It Means |
|---|---|
| **Decentralized** | No single party controls access; users choose which key servers to trust |
| **Programmable** | Access rules are arbitrary Move code -- token gates, time locks, allowlists, or custom logic |
| **Threshold** | Data can require *t-out-of-n* key servers to agree, tolerating server failures and compromise |
| **Composable** | Policies compose with any Sui on-chain state (coins, NFTs, clocks, shared objects) |
| **Upgradeable** | Package upgrades preserve the identity namespace, so policies can evolve without re-encrypting data |

## Further Reading

- [Seal Design Documentation](https://seal-docs.wal.app/Design/)
- [Seal Whitepaper](https://seal-docs.wal.app/) (linked from Design page)
- [How Seal Works](./how-seal-works.md) -- deeper dive into IBE, key servers, and the threshold model
