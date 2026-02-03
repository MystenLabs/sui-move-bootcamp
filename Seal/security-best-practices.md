# Security Best Practices

Seal's security depends on correct configuration and operational discipline. This guide covers the critical decisions you need to get right before deploying to production.

## Threshold Configuration

Seal supports threshold encryption using multiple independent key servers. The threshold *t* in a *t-out-of-n* setup determines both your privacy guarantee and your availability risk.

| Scenario | Privacy | Availability |
|---|---|---|
| **1-of-1** | Compromised if the single server is breached | Unavailable if the server goes down |
| **1-of-3** | Compromised if *any one* server is breached | Survives up to 2 servers going down |
| **2-of-3** | Requires compromising *two* servers | Survives 1 server going down |
| **3-of-3** | All three must be breached | Unavailable if *any one* goes down |

Higher thresholds improve privacy but reduce tolerance for server failures. A 2-of-3 configuration is a common starting point -- it survives one compromised server and one unavailable server.

> The set of key servers is fixed at encryption time and cannot be changed. If your chosen servers go offline permanently, data encrypted with a threshold above the remaining servers becomes unrecoverable.

## Key Server Provider Vetting

Anyone can run a Seal key server -- the system is permissionless. This means provider selection is a trust decision, not a technical one.

Before choosing key servers for production:

1. **Confirm availability terms** -- What uptime does the provider commit to? What happens during maintenance?
2. **Understand infrastructure** -- Is the key stored in an HSM, secure enclave, or software vault? Where is it hosted?
3. **Establish agreements** -- For production data, have explicit business agreements covering data handling, incident response, and key lifecycle
4. **Diversify** -- Choose servers operated by different entities, in different jurisdictions, with different infrastructure stacks

> Don't use a single provider for all *n* servers in a threshold setup. The point of multiple servers is independent failure domains.

## Envelope Encryption

For large or highly sensitive data, use **envelope encryption** (also called layered encryption):

1. Generate a random symmetric key
2. Encrypt your data with the symmetric key using AES
3. Encrypt the symmetric key using Seal
4. Store the encrypted data (e.g., on Walrus) and the Seal-encrypted key separately

This approach provides several benefits:

- **Performance** -- Symmetric encryption is faster for large payloads
- **Key rotation** -- You can re-encrypt the symmetric key with new Seal parameters without touching the data
- **Flexibility** -- Swap key server configurations without re-encrypting gigabytes of content
- **Separation** -- The bulk data never passes through the Seal encryption path

> Envelope encryption is strongly recommended for files, media, datasets, and any payload larger than a few kilobytes.

## Symmetric Key Management

The `encrypt` API returns both the encrypted object and the symmetric key (`backupKey`). This key is a backup -- anyone who holds it can decrypt the data directly, bypassing Seal entirely.

Rules for handling the symmetric key:

- **If you store it:** Treat it with the same care as any production secret. Use a vault, HSM, or equivalent.
- **If you discard it:** Ensure it is not logged, cached, or persisted anywhere in your application.
- **If you transfer it to users:** Make clear that they are responsible for its security from that point forward.

The key exists for emergency recovery (e.g., all key servers are permanently unavailable). In normal operation, decryption goes through Seal's key servers.

## Leaked Decryption Key Risks

Seal uses client-side decryption. Once a derived key reaches the client, Seal has no further control over how it is used. There is no on-chain audit trail for decryption events.

Mitigations:

- **Application-level logging** -- Log key access requests and decryption events in your application. This won't prevent leaks, but it enables detection and compliance.
- **Short session TTLs** -- Use the shortest `ttlMin` that provides acceptable UX. Shorter sessions limit the window of exposure.
- **Monitor access patterns** -- Flag unusual volumes of key requests from a single address or session.
- **Assume client-side exposure** -- Design your system knowing that decrypted data can be copied, screenshotted, or forwarded. Seal protects access control, not post-decryption data handling.

## Access Policy Safety

Your `seal_approve*` functions are the access control boundary. Bugs in these functions can lock users out or grant unauthorized access.

- **Test thoroughly** -- `seal_approve*` functions are standard Move; use `sui move test` with unit tests
- **Avoid time-sensitive state** -- Full nodes may lag; don't depend on state that changes every checkpoint
- **Version shared objects** -- If your package is upgradeable, use versioned shared objects so upgrades don't break existing encryptions
- **Audit before Mainnet** -- A bug in an access policy is harder to fix than in a normal smart contract, because existing encrypted data is bound to the policy

## Checklist Before Mainnet

1. Threshold is set appropriately (not too high for availability, not too low for privacy)
2. Key servers are operated by independent, vetted providers
3. Envelope encryption is used for large or sensitive payloads
4. Backup symmetric keys are stored securely or explicitly discarded
5. Application logs key access and decryption events
6. `seal_approve*` functions are tested and audited
7. Session TTLs are as short as acceptable
8. Package upgrade strategy uses versioned shared objects

## Further Reading

- [Security Best Practices Documentation](https://seal-docs.wal.app/SecurityBestPractices/)
- [Seal Design -- Trust Model](https://seal-docs.wal.app/Design/)
- [How Seal Works](./how-seal-works.md) -- threshold encryption and key server architecture
- [Access Policy Patterns](./access-policy-patterns.md) -- patterns with built-in upgrade safety
