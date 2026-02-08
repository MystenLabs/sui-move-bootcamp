# Security Model

Seal's security rests on two assumptions: that the key servers you choose are not compromised (or, with threshold encryption, that fewer than the threshold are compromised), and that the on-chain access policy is correctly configured. Understanding these assumptions — and the best practices that flow from them — is essential before deploying to production.

## Trust Assumptions

| Assumption | What It Means |
|-----------|---------------|
| **Key server integrity** | The key servers are not colluding or compromised. With threshold encryption, fewer than `t` of your chosen servers must be honest. |
| **Full node integrity** | Key servers depend on Sui full nodes for policy evaluation. A compromised full node could feed a key server false state. |
| **Correct access policy** | The Move code in your `seal_approve*` functions accurately expresses your intended access rules. If the package is upgradeable, the owner can change the policy at any time. |

Seal does **not** assume trust in:
- The storage layer (Walrus, Sui objects) — encrypted data is safe at rest regardless of storage security
- The network transport — derived keys are encrypted under an ephemeral key before transmission
- The dApp code — session keys limit exposure to a specific package and TTL

## Threshold Configuration

Choosing the right threshold is a trade-off between security (privacy) and availability (liveness):

| Configuration | Privacy Guarantee | Liveness Guarantee | Trade-Off |
|--------------|-------------------|-------------------|-----------|
| 1-of-1 | No threshold protection | Single point of failure | Simplest; no redundancy |
| 2-of-3 | Tolerates 1 compromised server | Tolerates 1 unavailable server | Good default for most apps |
| 3-of-5 | Tolerates 2 compromised servers | Tolerates 2 unavailable servers | Higher security for sensitive data |

> **Important:** The set of key servers is fixed once data is encrypted. You cannot change which servers are used for existing ciphertexts. For long-lived data, use envelope encryption so you only need to re-encrypt the small symmetric key when rotating servers.

## Key Server Vetting

Since Seal is permissionless — anyone can run a key server — treat server selection as a trust decision:

1. **Choose trusted operators** — Prefer organizations with established infrastructure and reputations
2. **Establish agreements** — Business or legal agreements specify obligations around availability, incident response, and service continuity
3. **Verify full node dependencies** — Ask whether the key server uses a self-managed, third-party, or public full node. Factor redundancy and upgrade cadence into your assessment.
4. **Diversify** — Select servers operated by different organizations, in different jurisdictions, with different infrastructure providers

## Envelope Encryption

For data that is highly sensitive, large, or stored immutably (e.g., on Walrus), use envelope encryption:

1. Generate your own symmetric key
2. Encrypt the data with that key
3. Use Seal to encrypt and manage access to the symmetric key only

**Benefits:**
- Rotate key servers by re-encrypting only the small symmetric key, not the entire dataset
- Decouple data storage from key management
- Enable key rotation without touching stored content

The symmetric key from Seal's `encrypt()` API is distinct from the one you generate for envelope encryption. Both need secure handling.

## Symmetric Key Management

The `encrypt()` API returns the symmetric key used for encryption. If you retain this key (for disaster recovery), it becomes a sensitive secret:

- **Store securely** — Use a KMS, hardware vault, or secure user storage
- **Consider returning to the user** — Let the user manage their own backup key
- **Understand the risk** — Anyone with this key can decrypt the data regardless of the on-chain policy

## Decryption Key Leak Risks

Seal uses client-side encryption. The dApp retrieves the decryption key and decrypts locally. If the key is leaked (intentionally or through a vulnerability):

- Unauthorized parties can decrypt the data
- There is no on-chain audit trail of key delivery events — key servers don't log to the blockchain

**Mitigations:**
- Implement audit logging in your application
- Log key access attempts and decryption events
- Store logs in a tamper-evident system (Walrus, or anchored on-chain)

## Cryptographic Security

Seal's formal security is proven in the whitepaper under the co-BDH (co-Bilinear Diffie-Hellman) assumption in the Random Oracle Model:

| Property | Guarantee |
|----------|-----------|
| **Confidentiality** | If fewer than `t` key servers are compromised, the adversary cannot learn the encrypted message |
| **Non-malleability** | Adversaries cannot transform valid ciphertexts into valid ciphertexts for related messages |
| **Share consistency** | Decryption produces the same result regardless of which `t`-of-`n` key subset is used |
| **Key transport privacy** | Derived keys in transit are encrypted; eavesdroppers and aggregators cannot access them |

**DEM-specific note:** HMAC-CTR mode achieves full UC (Universally Composable) security because the random oracle can be programmed for equivocation. AES-256-GCM provides IND-ID-CCA security (the standard IBE security notion) but not full UC security due to lack of programmability. For most applications, AES-256-GCM's security guarantee is sufficient.

## Further Reading

- [Security Best Practices](./docs/SecurityBestPractices.md) — Full list of operational recommendations
- [Seal Whitepaper — Section 5](./docs/Seal_White_Paper_v1.pdf) — Formal cryptographic definitions and proofs
