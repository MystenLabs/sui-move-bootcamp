# Architecture

Seal's architecture is built on a clean separation: **access policies live on-chain** in Move smart contracts, while **key management lives off-chain** in independent key servers. Identity-Based Encryption connects the two, allowing anyone to encrypt data to a policy-defined identity without contacting a key server, and allowing authorized users to obtain decryption keys by proving they satisfy the policy.

## The Two Pillars

### On-Chain Access Policies

A Move package deployed at address `PkgId` controls all IBE identities that start with `[PkgId]`. Think of `[PkgId]` as an identity *namespace*. The package defines, through `seal_approve*` functions, who is authorized to access decryption keys within its namespace.

For example, a time-lock policy might use identities of the form `[PkgId][bcs::to_bytes(T)]`, where `T` is a future timestamp. The `seal_approve` function checks whether the current on-chain time exceeds `T`.

### Off-Chain Key Servers

Each key server holds a single IBE master secret key (`msk`) and publishes the corresponding public key (`mpk`). When a user requests a derived decryption key for identity `[PkgId][id]`, the key server:

1. Evaluates the `seal_approve*` function from package `PkgId` using a read-only dry run on a Sui full node
2. If the function doesn't abort, derives and returns the IBE key for that identity
3. If the function aborts, rejects the request

Key servers are stateless — they only store `msk` and derive keys on demand. This makes them simple to scale horizontally.

## The IBE Identity Model

The central architectural insight is how Seal maps IBE identities to on-chain policies:

```
IBE Identity = [packageId] || [id]
                ─────────    ────
                namespace    policy-specific identifier
```

- **`packageId`** — The address of the Move package that controls this identity namespace. After package upgrades, the original (first-published) package ID is always used for key derivation, maintaining continuity.
- **`id`** — A byte array whose format is defined by the policy. It might be a serialized address, a timestamp, an object ID, or any other data the policy needs.

This model means:
- Different packages have completely separate identity namespaces
- The same key servers can serve any number of packages
- Encryption requires no interaction with key servers — only the public key and the identity

## Encryption Flow

Encryption is a local operation. The encryptor never contacts key servers:

1. **Choose a policy** — Select a deployed package (`packageId`) and construct the identity `id` that encodes the access conditions
2. **Select key servers** — Pick a set of key servers and a threshold `t` (e.g., 2-of-3)
3. **Generate a symmetric key** — The SDK generates a random symmetric key `k_sym`
4. **Encrypt the data** — `k_sym` encrypts the plaintext using AES-256-GCM (or HMAC-CTR for on-chain decryption)
5. **Threshold-share the symmetric key** — `k_sym` is split into `n` shares using Shamir's secret sharing with threshold `t`
6. **IBE-encrypt each share** — Each share is encrypted under the IBE identity `[packageId][id]` using a different key server's public key
7. **Package everything** — The encrypted data, encrypted shares, identity, threshold, and key server references are bundled into a single `EncryptedObject`

The resulting ciphertext can be stored anywhere — on Walrus, as a Sui object, or on any other storage.

## Decryption Flow

Decryption requires interaction with key servers and policy evaluation:

1. **Build a PTB** — The app constructs a Programmable Transaction Block that calls the relevant `seal_approve*` function with the requested identity and any required on-chain objects (e.g., `Clock`, NFTs)
2. **Request derived keys** — The SDK sends the PTB to at least `t` key servers. Each server:
   - Validates the request signature
   - Executes the PTB as a dry run on its full node
   - If the policy approves, returns its IBE-derived key encrypted under the requester's ephemeral key
3. **Reconstruct the symmetric key** — With `t` derived keys, the SDK reconstructs `k_sym` using Shamir reconstruction
4. **Decrypt the data** — `k_sym` decrypts the original plaintext

The ephemeral encryption in step 2 ensures that only the requester can see the derived keys — even if the transport is intercepted.

## Session Keys

Decryption keys are returned directly to the dApp's web page. To prevent dApps from accessing keys without user consent, Seal uses a session key mechanism:

1. The dApp creates a `SessionKey` for a specific package with a time-to-live (e.g., 10 minutes)
2. The user approves by signing a personal message in their wallet
3. The signature initializes the session key
4. For the duration of the TTL, the dApp can retrieve decryption keys for that package without further wallet prompts

Session keys are scoped to a single package and expire automatically. They can be stored in `localStorage` or `IndexedDB` for cross-tab persistence.

## Cryptographic Primitives

| Component | Primitive | Purpose |
|-----------|-----------|---------|
| **KEM** | Boneh-Franklin IBE over BLS12-381 | Threshold key encapsulation — encrypts symmetric key shares |
| **DEM (fast)** | AES-256-GCM | Symmetric encryption of data — recommended for most use cases |
| **DEM (on-chain)** | HMAC-based CTR mode | Symmetric encryption that can be decrypted in Move |
| **Key transport** | ElGamal-based Encrypted BLS | Protects derived keys in transit from key server to client |
| **Threshold sharing** | Shamir's Secret Sharing | Splits `k_sym` into shares so any `t`-of-`n` can reconstruct |

The KEM/DEM structure means threshold operations only touch small key material, while bulk data encryption uses efficient symmetric cryptography.

## Seal in the Sui Stack

Seal integrates with other Sui ecosystem components:

- **Sui blockchain** — Hosts access policies as Move packages; provides identity and object model
- **Walrus** — Stores encrypted payloads; Seal separates key control from storage
- **Nautilus** — Enclaves can derive Seal keys using their attested identity, enabling use cases like encrypted data lakes processed only by verified enclave binaries
- **zkLogin / Passkeys** — Seal works with any Sui authentication mechanism without requiring users to have published public keys

## Further Reading

- [Seal Design](./docs/Design.md) — Technical architecture details including the trust model
- [Seal Whitepaper](./docs/Seal_White_Paper_v1.pdf) — Formal definitions of TSS-BF-KEM and UC-security proofs
