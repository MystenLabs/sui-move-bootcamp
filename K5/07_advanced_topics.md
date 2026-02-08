# Advanced Topics

This guide covers capabilities beyond the core encrypt/decrypt workflow: on-chain decryption in Move, MPC committee key servers with distributed key generation, the Seal CLI for local operations, and the planned roadmap.

## On-Chain Decryption

Most Seal decryption happens client-side with AES-256-GCM. But some use cases — secure voting tallies, sealed-bid auctions, verifiable on-chain workflows — need decryption to happen in Move. Seal supports this through the `bf_hmac_encryption` package using HMAC-CTR mode.

### Seal Package IDs for On-Chain Decryption

| Network | Package ID |
|---------|-----------|
| Testnet | `0x4016869413374eaa71df2a043d1660ed7bc927ab7962831f8b07efbc7efdb2c3` |
| Mainnet | `0xcb83a248bda5f7a0a431e6bf9e96d184e604130ec5218696e3f1211113b447b7` |

### Workflow

On-chain decryption follows three phases:

1. **Initialize** — Retrieve key server public keys with `client.getPublicKeys()`, convert them to on-chain format with `bf_hmac_encryption::new_public_key`, and store them as shared objects

2. **Verify derived keys** — Use the SDK's `client.getDerivedKeys()` to fetch derived keys, convert to `Element<G1>`, and call `bf_hmac_encryption::verify_derived_keys` with the raw keys, package ID, identity, and public keys. This returns `VerifiedDerivedKey` objects.

3. **Decrypt** — Call `bf_hmac_encryption::decrypt` with the encrypted object, verified derived keys, and public keys. Returns `Option<vector<u8>>` — `None` if decryption fails.

> **Performance note:** HMAC-CTR is significantly slower than AES-256-GCM. Use it only for small data that must be decrypted on-chain. For large payloads, decrypt client-side.

## MPC Committee Key Servers

A single key server can be backed by an MPC committee — a group of participants who collectively hold the master secret through distributed key generation (DKG). This provides stronger security guarantees than a standalone server because no single party ever sees the full master key.

### DKG Ceremony

Setting up a committee involves two roles: a **coordinator** (orchestrates the workflow) and **committee members** (participate in key generation).

The ceremony has three phases:

| Phase | What Happens |
|-------|-------------|
| **1. Registration** | Members generate encryption keys and register them on-chain |
| **2. Message Creation** | Members create and exchange DKG messages off-chain |
| **3. Finalization** | Members process messages and propose the committee configuration on-chain |

After finalization, each member has a `MASTER_SHARE_V0` — their portion of the master key. The coordinator receives a `KEY_SERVER_OBJ_ID` that identifies the committee.

### Key Rotation

Committees can rotate membership without disrupting service:

- Continuing members provide their old share during Phase 2
- New members only participate in Phase 1 (registration) and Phase 3 (finalization)
- The key server transitions from `MASTER_SHARE_VX` to `MASTER_SHARE_VX+1`
- During rotation, continuing members run with both shares; the server auto-selects based on the on-chain committee version

| Aspect | Fresh DKG | Key Rotation |
|--------|----------|-------------|
| **Purpose** | Create new committee | Update membership/threshold |
| **Starting version** | `V0` | `VX` → `VX+1` |
| **Who creates messages** | All members | Only continuing members |
| **Old share needed** | No | Yes (continuing members) |
| **Coordinator command** | `publish-and-init` | `init-rotation` |

### Aggregator Server

Committee mode requires an **aggregator** that sits between clients and committee members:

1. Receives key requests from clients
2. Fans out requests to committee members until threshold is met
3. Verifies each encrypted partial response using the member's partial public key
4. Aggregates partial responses using Lagrange interpolation
5. Returns the aggregated encrypted key to the client

The aggregator authenticates to member servers using API keys and never sees the actual decryption keys (they're encrypted under the client's ephemeral key).

## Seal CLI

The `seal-cli` tool provides local key generation, encryption, decryption, and inspection without needing the TypeScript SDK or a running key server.

### Key Commands

| Command | Purpose |
|---------|---------|
| `genkey` | Generate a BLS master key pair (master key + public key) |
| `gen-seed` | Generate a master seed for Permissioned mode |
| `derive-key` | Derive a client key from a master seed at a specific index |
| `encrypt-aes` | Encrypt a hex message using AES with specified key server public keys |
| `encrypt` | Encrypt using live key server objects from the network |
| `decrypt` | Decrypt with threshold user secret keys |
| `symmetric-decrypt` | Decrypt using only the symmetric backup key |
| `fetch-keys` | Fetch derived keys from live key servers |
| `extract` | Derive a user secret key from a master key (for testing) |
| `parse` | Display an encrypted object in human-readable format |

### Example: Local Encrypt/Decrypt Cycle

```shell
# 1. Generate 3 key pairs
cargo run --bin seal-cli genkey  # Repeat 3 times

# 2. Encrypt with threshold 2
cargo run --bin seal-cli encrypt-aes \
  --message <HEX_MESSAGE> \
  --package-id 0x0 \
  --id <HEX_ID> \
  --threshold 2 \
  <PUBKEY_1> <PUBKEY_2> <PUBKEY_3> \
  -- 0x1 0x2 0x3

# 3. Extract user keys from each master key
cargo run --bin seal-cli extract \
  --package-id 0x0 \
  --id <HEX_ID> \
  --master-key <MASTER_KEY_1>

# 4. Decrypt with any 2 user keys
cargo run --bin seal-cli decrypt \
  <ENCRYPTED_OBJECT> \
  <USER_KEY_1> <USER_KEY_2> \
  -- 0x1 0x2

# 5. Inspect the encrypted object
cargo run --bin seal-cli parse <ENCRYPTED_OBJECT>
```

The `parse` command reveals the structure: version, package ID, identity, key server mappings, threshold, encryption type (AES-256-GCM or HMAC-CTR), and encrypted shares.

## Key Export and Import (Permissioned Mode)

In Permissioned mode, client keys can be exported and imported for disaster recovery or provider migration:

1. **Export** — `derive-key --seed $SEED --index X` outputs the client's master key
2. **Disable on current server** — Change config to `!Exported` with the deprecated derivation index
3. **Transfer on-chain object** — Transfer the `KeyServer` object to the new server owner
4. **Import on new server** — Configure as `!Imported` with the key in an environment variable

## Future Roadmap

Features planned for future Seal releases (from `index.md`):

- **MPC committee key servers** — Extend the committee mode to broader deployment (DKG + aggregator infrastructure documented but still maturing)
- **Server-side encryption** — Allow key servers to decrypt data directly, as an alternative to client-side decryption
- **Digital Rights Management (DRM)** — Client-side encryption/decryption in a secure trusted environment, similar to streaming services
- **Post-quantum security** — Post-quantum secure TSS-IBE schemes for long-term protection against quantum attacks

## Further Reading

- [Using Seal — On-Chain Decryption](./docs/UsingSeal.md#on-chain-decryption) — Full TypeScript SDK code for on-chain decryption
- [Key Server Committee Operations](./docs/KeyServerCommitteeOps.md) — Complete DKG and rotation runbooks
- [Aggregator](./docs/Aggregator.md) — Aggregator server setup and Docker deployment
- [Seal CLI](./docs/SealCLI.md) — Full CLI walkthrough with example outputs
