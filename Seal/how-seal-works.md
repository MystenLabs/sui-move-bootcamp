# How Seal Works

Seal combines Identity-Based Encryption with on-chain access policies and off-chain key servers to create a decentralized secrets management system. This guide explains each piece and how they fit together.

## Identity-Based Encryption (IBE)

At the core of Seal is an IBE scheme -- a cryptographic system where data is encrypted to an *identity string* rather than a recipient's public key. IBE has four algorithms:

1. **Setup** -- Generates a master secret key (`msk`) and a master public key (`mpk`)
2. **Derive(msk, id)** -- Produces a derived secret key for a specific identity
3. **Encrypt(mpk, id, m)** -- Encrypts a message using the public key and an identity string
4. **Decrypt(sk, c)** -- Decrypts a ciphertext using the derived secret key

The identity can be any string or byte array. Seal exploits this flexibility by using identities that encode on-chain conditions -- a package ID combined with application-specific data like a timestamp, user address, or token ID.

### Cryptographic Primitives

| Component | Primitive | Notes |
|---|---|---|
| Key Encapsulation (KEM) | Boneh-Franklin IBE on BLS12-381 | Core encryption scheme |
| Data Encapsulation (DEM) | AES-256-GCM | Default; fast, suitable for most use cases |
| Data Encapsulation (DEM) | HMAC-based CTR mode | Required for on-chain decryption in Move |

Post-quantum primitives are planned for the future. For advanced encryption needs, Seal can serve as a KMS protecting external scheme keys.

## On-Chain Access Policies

Every Move package on Sui has a unique package ID. In Seal, that ID defines an **identity namespace**: the package controls all IBE identities prefixed with its package ID.

Access logic lives in `seal_approve*` functions -- standard Move entry functions that the key server evaluates before releasing a derived key.

```move
module patterns::tle;

use sui::bcs;
use sui::clock;

const ENoAccess : u64 = 1;

/// Time-lock: approve only after timestamp T has passed.
entry fun seal_approve(id: vector<u8>, c: &clock::Clock) {
    let mut prepared: BCS = bcs::new(id);
    let t = prepared.peel_u64();
    let leftovers = prepared.into_remainder_bytes();
    assert!((leftovers.length() == 0) && (c.timestamp_ms() >= t), ENoAccess);
}
```

In this example, the identity encodes a timestamp. The function parses it, checks the on-chain clock, and aborts if the time hasn't arrived yet. The key server calls this function via a dry-run -- if it succeeds, the derived key is released.

### Rules for `seal_approve*` Functions

- The first parameter must be the requested identity (`vector<u8>`), excluding the package ID prefix
- The function should abort if access is denied
- Define as non-public `entry` functions for upgrade flexibility
- Multiple `seal_approve*` functions can exist in a package, each with different logic
- Functions **must be side-effect free** -- they cannot modify on-chain state

### Limitations

`seal_approve*` functions are evaluated on full nodes via `dry_run_transaction_block`. This creates important constraints:

- Full nodes operate asynchronously, so results may vary across nodes
- On-chain state changes propagate with delay
- Don't rely on frequently changing state for access decisions
- Avoid invariants depending on transaction ordering within checkpoints

### Package Upgrades

When you upgrade a package, it keeps its identity namespace. Encrypted data remains decryptable under the new policy. However, if a package is upgradeable, the owner can change access logic at any time -- these changes are publicly visible on-chain.

> Use versioned shared objects to support secure upgrades. See the allowlist and subscription patterns for examples.

## Key Servers

A key server is an off-chain service that holds an IBE master secret key and has access to a Sui full node. It exposes two endpoints:

| Endpoint | Purpose |
|---|---|
| `/v1/service` | Returns the server's on-chain registration info |
| `/v1/fetch_key` | Returns derived keys if the on-chain policy approves |

Every key request to `/v1/fetch_key` must include:

1. A **user signature** (via `signPersonalMessage`) proving the requester's identity
2. A **programmable transaction block (PTB)** that calls the relevant `seal_approve*` function
3. An **ephemeral encryption key** so the response is encrypted to the requester

The server evaluates the PTB against the full node. If the `seal_approve*` function succeeds, it derives the IBE key and returns it encrypted to the ephemeral key.

### Deployment Options

Key servers can run in various configurations depending on security requirements:

- Backend service with protected key storage
- Software or hardware vault integration
- Secure enclave deployment
- MPC committee (t-out-of-n participants)
- Air-gapped environments

## Threshold Encryption

Seal supports **t-out-of-n threshold encryption** across multiple key servers. Instead of trusting a single server, users encrypt data so that any *t* of *n* chosen servers must agree to release their portion of the key.

This provides two guarantees:

- **Privacy** -- Data stays secret as long as fewer than *t* servers are compromised
- **Liveness** -- Decryption works as long as at least *t* servers are available

Users choose which key servers to use and what threshold to set, based on their own trust assumptions. Servers may differ in security characteristics, jurisdictions, and infrastructure.

> The set of key servers is fixed at encryption time and cannot be changed afterward. Choose carefully.

### MPC-Based Key Servers

A single key server can itself be implemented as an MPC committee, where multiple participants share the master secret key. Unlike the top-level threshold (which is fixed at encryption time), MPC committee membership can change over time. This mechanism is planned but not yet available.

## Sessions and User Confirmation

When a dApp requests decryption keys, the user must approve in their wallet. This approval creates a **session key** -- a time-limited authorization that lets the dApp fetch derived keys without repeated wallet prompts.

The flow:

1. dApp creates a `SessionKey` with a time-to-live (TTL)
2. User signs a personal message in their wallet
3. The session key is active for the TTL duration
4. During the session, the dApp can request derived keys for the approved package

## Putting It All Together

The full encryption/decryption flow:

1. **Developer** publishes a Move package with `seal_approve*` functions defining access rules
2. **Encryptor** selects key servers and encrypts data using the package's identity namespace and the servers' public keys
3. **Decryptor** builds a transaction calling `seal_approve*`, creates a session key, and requests derived keys from the key servers
4. **Key servers** evaluate the transaction against the full node -- if the policy approves, they return their share of the derived key
5. **Client** combines *t* derived key shares and decrypts the data locally

At no point does any key server, the blockchain, or any intermediary see the plaintext.

## Further Reading

- [Seal Design Documentation](https://seal-docs.wal.app/Design/)
- [Getting Started](./getting-started.md) -- hands-on setup and first encrypt/decrypt
- [Access Policy Patterns](./access-policy-patterns.md) -- five ready-made policy examples
