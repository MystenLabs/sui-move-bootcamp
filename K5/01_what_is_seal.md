# What Is Seal

Seal is a Decentralized Secrets Management (DSM) service that lets you encrypt data and control who can decrypt it using access policies defined in Move on Sui. It bridges a fundamental gap in blockchain infrastructure: while blockchains solve authentication ("who are you?"), they lack a native model for encryption ("what are you allowed to decrypt, and under what conditions?").

## Why Seal Exists

Blockchain ecosystems have robust mechanisms for signing transactions — seed phrases, hardware wallets, zkLogin, Passkeys — but no standardized way to encrypt data and enforce access to it. Developers who need encryption today resort to ad hoc solutions: encrypting with ephemeral keys and sharing them through side channels, or building one-off key management systems that don't generalize.

Seal addresses this by combining two ideas:

1. **Identity-Based Encryption (IBE)** — a cryptographic scheme where any string can serve as a public key, removing the need for key exchange infrastructure
2. **On-chain access policies** — Move smart contracts that define who is authorized to obtain decryption keys, evaluated transparently on Sui

The result is a system where you can encrypt data once and let a Move contract decide who can decrypt it — without the encryptor needing to know who the eventual recipients are at encryption time.

## What You Can Build

Seal supports a range of access control scenarios:

| Use Case | How It Works |
|----------|-------------|
| **Secure personal storage** | Encrypt data on Walrus so only the uploading user can decrypt it |
| **Gated content sharing** | Share encrypted content with a specific allowlist of addresses |
| **Subscription access** | Grant time-limited decryption rights to paying subscribers |
| **End-to-end messaging** | Encrypt messages so only the recipient address can read them |
| **Secure voting** | Keep ballots encrypted until the voting period ends, then tally on-chain |
| **MEV-resistant trading** | Encrypt orders until a future timestamp to prevent frontrunning |
| **Token-gated access** | Restrict decryption to holders of a specific NFT or token |

These patterns compose naturally because access logic lives in Move — you can combine time checks, ownership checks, and on-chain state into arbitrary policies.

## What Seal Is NOT

Seal has clear boundaries. Understanding them prevents misuse:

- **Not a KMS like AWS KMS** — Seal key servers do not store application or user keys. Each server holds only its own IBE master key pair and derives identity-specific keys on demand.
- **Not a privacy technology** — Unlike zkLogin or zero-knowledge systems, Seal does not hide transaction metadata. It encrypts data at rest and controls decryption access.
- **Not for highly sensitive data** — Seal should not be used for wallet private keys, regulated personal health information (PHI), or government-classified data. Future capabilities (DRM, secure enclaves) may extend its scope, but those do not exist yet.

## Core Concepts at a Glance

Before diving into architecture, here are the terms you'll encounter throughout this guide:

- **IBE identity** — A string of the form `[packageId][id]` that serves as the encryption target. The `packageId` is the Move package controlling access; the `id` encodes policy-specific conditions (e.g., a timestamp, an address).
- **`seal_approve`** — A Move entry function that key servers evaluate to decide whether to release a decryption key. If it doesn't abort, access is granted.
- **Key server** — An off-chain service holding an IBE master secret key. It derives identity-specific decryption keys on demand after verifying the on-chain access policy.
- **Threshold encryption** — Users choose `t`-out-of-`n` key servers. Privacy holds as long as fewer than `t` are compromised; liveness holds as long as at least `t` are available.
- **Session key** — A time-limited authorization that lets a dApp retrieve decryption keys for a specific package without repeated wallet prompts.

## Further Reading

- [Seal Overview](./docs/index.md) — Official overview with feature list and contact info
- [Seal Whitepaper](./docs/Seal_White_Paper_v1.pdf) — Formal cryptographic analysis and security proofs (19 pages)
