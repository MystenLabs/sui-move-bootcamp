# Access Policy Patterns

Seal's access control is defined by `seal_approve*` functions in Move packages. The logic inside those functions determines who can decrypt. This guide covers five patterns from the official Seal examples, each solving a different access control problem.

All pattern source code is available in the [Seal patterns repository](https://github.com/MystenLabs/seal/tree/main/move/patterns/sources).

## Private Data

Encrypted content controlled by a single owner. The ciphertext is stored as an owned Sui object -- only the current owner can decrypt it.

**How it works:** The `seal_approve` function checks that the transaction sender is the object's owner. Transferring the object transfers decryption rights without exposing the plaintext.

**Use cases:**
- Personal key storage
- Private NFTs (content viewable only by the holder)
- User-held credentials that need confidentiality with portability

**Key property:** Ownership transfer moves custody of the secret. The previous owner loses decryption access.

## Allowlist

Encrypted content shared with a defined group of approved addresses. Access is managed by adding or removing members from the list.

**How it works:** The `seal_approve` function checks whether the sender's address appears on a shared `Allowlist` object. Changes to the list take effect on future decryption requests -- no re-encryption needed.

**Use cases:**
- Partner-only data rooms
- Early-access content drops
- Subscription groups with manual membership control
- Gradual transition from private to public access

**Key property:** Modifying the allowlist changes who can decrypt *future* requests. Already-obtained keys are unaffected.

## Subscription

Time-limited access to encrypted content or services. Users pay and receive a pass that authorizes decryption until it expires.

**How it works:** A service is defined with a price and duration. When a user subscribes, they receive a pass object. The `seal_approve` function checks that the user holds a valid (non-expired) pass for the requested content.

**Use cases:**
- Premium media and content platforms
- Paid data feeds
- API or AI model access with time-based billing
- Any service where access should expire without manual revocation

**Key property:** No re-encryption or data movement needed when subscriptions expire. The policy simply stops approving requests for expired passes.

## Time-Lock Encryption

Content that unlocks automatically at a specific on-chain timestamp. Before the unlock time, nobody can decrypt -- after it passes, anyone can.

**How it works:** The identity encodes a target timestamp. The `seal_approve` function reads the Sui `Clock` and approves only when the current time exceeds the encoded value.

```move
entry fun seal_approve(id: vector<u8>, c: &clock::Clock) {
    let mut prepared: BCS = bcs::new(id);
    let t = prepared.peel_u64();
    let leftovers = prepared.into_remainder_bytes();
    assert!((leftovers.length() == 0) && (c.timestamp_ms() >= t), ENoAccess);
}
```

**Use cases:**
- Coordinated reveals (launches, announcements)
- MEV-resistant trading (orders stay hidden until execution time)
- Sealed-bid auctions
- Secure voting (ballots decryptable only after polls close)

**Variant -- pre-signed URLs:** Combine time-lock encryption with time-limited blob access for content that is both encrypted until a deadline and accessible only through temporary URLs.

**Key property:** The unlock time is baked into the encrypted identity at encryption time. It cannot be changed after encryption.

## Secure Voting

Ballots stay encrypted until the vote is complete. Voters submit encrypted choices; after voting ends, threshold keys from Seal enable on-chain decryption to produce a verifiable tally.

**How it works:**

1. The vote organizer defines eligible voters and a voting period
2. Each voter encrypts their ballot and submits it on-chain
3. While voting is open, no one can decrypt any ballot
4. After the voting period ends, anyone can fetch the threshold keys and trigger on-chain decryption
5. The tally is computed and verified entirely on-chain

**Use cases:**
- Governance proposals
- Sealed-bid auctions with verifiable outcomes
- Time-locked voting where privacy is required during the process

**Key property:** On-chain decryption produces a publicly verifiable result. No trusted party is needed to count votes.

> On-chain decryption uses HMAC-CTR mode (not AES). This is required because Move smart contracts cannot execute AES. Keep encrypted payloads small for on-chain decryption.

## Pattern Comparison

| Pattern | Who Can Decrypt | Access Changes | Re-encryption Needed |
|---|---|---|---|
| **Private Data** | Current object owner | Transfer ownership | No |
| **Allowlist** | Addresses on the list | Add/remove members | No |
| **Subscription** | Users with valid pass | Passes expire automatically | No |
| **Time-Lock** | Anyone (after unlock time) | N/A -- time-based | No |
| **Secure Voting** | Anyone (after vote ends) | On-chain decryption | No |

A common theme: Seal separates the encrypted data from the access policy. Changing *who* can decrypt never requires re-encrypting the data.

## Building Custom Patterns

These five patterns are starting points. Any logic expressible in Move can serve as an access policy:

- Combine patterns (e.g., allowlist + time-lock)
- Gate on NFT ownership, coin balances, or staking status
- Use shared objects for dynamic, multi-party access control
- Implement role-based access with capability objects

The only constraints are those of `seal_approve*` functions: they must be side-effect free, and they receive the identity bytes as their first parameter.

## Further Reading

- [Pattern Source Code](https://github.com/MystenLabs/seal/tree/main/move/patterns/sources)
- [Example Patterns Documentation](https://seal-docs.wal.app/ExamplePatterns/)
- [Getting Started](./getting-started.md) -- set up and run your first encrypt/decrypt
- [Security Best Practices](./security-best-practices.md) -- operational safety for production
