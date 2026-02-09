# Key Servers

Key servers are the off-chain component that makes Seal's decryption work. Each one holds a single IBE master secret key, evaluates on-chain access policies, and derives identity-specific decryption keys on demand. They are stateless by design — no session tracking, no user data, just a master key and a connection to a Sui full node.

## What a Key Server Does

A key server exposes two endpoints:

| Endpoint | Purpose |
|----------|---------|
| `/v1/service` | Returns the server's on-chain registered information (object ID, public key, URL) |
| `/v1/fetch_key` | Handles key derivation requests — returns the derived key if the access policy approves |

For a `/v1/fetch_key` request to succeed, it must:

1. Be signed by the requester using `signPersonalMessage`
2. Include a valid PTB that calls the `seal_approve*` function
3. Provide an ephemeral encryption key so the response is encrypted to the requester only

The server evaluates the PTB via `dry_run_transaction_block` on its full node. No gas is consumed, and no state changes occur.

## Operational Modes

Key servers operate in one of three modes: **Open**, **Permissioned**, and **Committee**.

| Aspect | Open | Permissioned | Committee |
|--------|------|-------------|-----------|
| **Access** | Any on-chain package | Only allowlisted packages | Determined by aggregator/policy config |
| **Master key** | Single key for all requests | Per-client derived keys from a master seed | Distributed shares from DKG — no single party holds the full key |
| **Use case** | Public/general-purpose, testing | B2B deployments, commercial offerings | High-security deployments requiring distributed trust |
| **Client isolation** | None — shared key | Full — per-client key | N/A — committee holds shared distributed key |
| **Key export** | Not applicable | Supports export/import | Not applicable — shares are non-exportable |
| **Operator model** | Single operator | Single operator | Coordinator + committee members + aggregator |

### Open Mode

The server is initialized with a BLS master key pair and accepts requests for any package. Ideal for testing or best-effort public service.

### Permissioned Mode

The server is initialized with a master *seed* from which per-client keys are derived. Each client is registered with:

- A derivation index (0 for the first client, incrementing)
- A list of allowed package IDs (must be the first-published version)
- A dedicated on-chain `KeyServer` object

This means different clients are cryptographically isolated — compromising one client's key doesn't affect others. Clients can also export their key and migrate to a different key server provider.

### Committee Mode

In committee mode, no single party holds the full IBE master secret key. Instead, a group of **committee members** each hold a *share* generated through a **Distributed Key Generation (DKG)** ceremony. An **aggregator server** sits in front of the committee as the client-facing gateway.

When a client sends a `/v1/fetch_key` request, the aggregator fans it out to committee members, collects enough partial responses to meet the threshold, and combines them into a single decryption key using **Lagrange interpolation**. To the client, this looks identical to querying a single key server.

**DKG Ceremony** — Setting up a committee follows three phases:

1. **Registration** — Members generate encryption keys and register them on-chain
2. **Message Creation** — Members create and exchange DKG messages off-chain
3. **Finalization** — Members process messages and propose the committee configuration on-chain

A coordinator orchestrates timing between phases. After finalization, each member has a `MASTER_SHARE_V0` and runs their key server with `server_mode: !Committee` and `committee_state: !Active`.

**Key Rotation** — Committee membership can change without losing access to previously encrypted data. During rotation, continuing members must meet the current threshold. The process follows the same three phases as a fresh DKG, producing a new share version (`MASTER_SHARE_VX+1`). The key server transitions through `!Rotation` back to `!Active` state.

> No committee-mode providers appear in the verified provider list yet. See the Further Reading section for the full operational runbooks.

## On-Chain Registration

Every key server registers an on-chain `KeyServer` object so the SDK can discover it:

```shell
sui client call \
  --function create_and_transfer_v1 \
  --module key_server \
  --package <SEAL_PACKAGE_ID> \
  --args <SERVER_NAME> https://<YOUR_URL> 0 <MASTER_PUBKEY>
```

| Network | Seal Package ID |
|---------|----------------|
| Testnet | `0x927a54e9ae803f82ebf480136a9bcfe45101ccbe28b13f433c89f5181069d682` |
| Mainnet | `0xa212c4c6c7183b911d0be8768f4cb1df7a383025b5d0ba0c014009f0f30f5f8d` |

## Infrastructure

The key server is lightweight and stateless, making it easy to scale:

- **Horizontal scaling** — Run multiple instances behind a load balancer
- **Full node dependency** — Each instance needs a trusted Sui full node, ideally geographically close
- **Master key storage** — Use a cloud KMS or hardware vault for the master key/seed
- **Reverse proxy** — Place behind an API gateway for HTTPS termination, rate limiting, and API key authentication
- **Observability** — Prometheus metrics on port `9184`; health check on port `2024` at `/health`
- **CORS** — Configure `Access-Control-Allow-Origin: *` and the required headers for browser-based SDK access

## Verified Providers

### Testnet (Open Mode — Free for Development)

| Provider | Object ID |
|----------|-----------|
| Mysten Labs (testnet-1) | `0x73d05d62c18d9374e3ea529e8e0ed6161da1a141a94d3f76ae3fe4e99356db75` |
| Mysten Labs (testnet-2) | `0xf5d14a81a982144ae441cd7d64b09027f116a468bd36e7eca494f750591623c8` |
| Ruby Nodes | `0x6068c0acb197dddbacd4746a9de7f025b2ed5a5b6c1b1ab44dade4426d141da2` |
| NodeInfra | `0x5466b7df5c15b508678d51496ada8afab0d6f70a01c10613123382b1b8131007` |
| Studio Mirai | `0x164ac3d2b3b8694b8181c13f671950004765c23f270321a45fdd04d40cccf0f2` |
| Overclock | `0x9c949e53c36ab7a9c484ed9e8b43267a77d4b8d70e79aa6b39042e3d4c434105` |

> Testnet servers are for development only — no SLAs or long-term key persistence guarantees. The `Object ID` is the source of truth; URLs may change.

### Mainnet

Contact providers directly for Mainnet access: Ruby Nodes, NodeInfra, Overclock, Studio Mirai, H2O Nodes, Triton One, Natsai, or Enoki by Mysten Labs. Most offer both Open and Permissioned modes with commercial terms.

## Further Reading

- [Key Server Operations](./docs/KeyServerOps.md) — Full operational guide for running a standalone key server
- [Committee Mode Operations](./docs/KeyServerCommitteeOps.md) — DKG ceremony, committee setup, and key rotation
- [Aggregator Server](./docs/Aggregator.md) — Configuration and operation of the committee aggregator
- [Pricing & Verified Servers](./docs/Pricing.md) — Complete provider list with URLs and Object IDs
