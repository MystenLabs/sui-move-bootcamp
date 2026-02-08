# Access Policies

Access control in Seal is defined entirely in Move. You write `seal_approve*` functions that act as gatekeepers: the key server calls them via a dry run, and if the function doesn't abort, the decryption key is released. This gives you the full expressiveness of Move for defining who can decrypt what, and when.

## The `seal_approve` Interface

A `seal_approve*` function must follow these conventions:

- **Prefix** — The function name must start with `seal_approve` (e.g., `seal_approve`, `seal_approve_with_nft`, `seal_approve_subscription`)
- **First parameter** — Must be `id: vector<u8>`, the requested identity *without* the package ID prefix
- **Entry function** — Should be declared as a non-public `entry` function for upgradeability
- **Abort on denial** — If access is not granted, the function must abort. A successful return (no abort) means access is approved.
- **Side-effect free** — The function cannot modify on-chain state. It's evaluated via `dry_run_transaction_block`, which is read-only.

A package can define multiple `seal_approve*` functions with different parameters and logic, each implementing a different access control pattern.

```move
module my_package::access;

const ENoAccess: u64 = 0;

/// Only the owner of this address can decrypt
entry fun seal_approve(id: vector<u8>, ctx: &TxContext) {
    let caller_bytes = bcs::to_bytes(&ctx.sender());
    assert!(id == caller_bytes, ENoAccess);
}
```

## Built-In Patterns

Seal's documentation provides five reference patterns. Each demonstrates a different access model:

### Private Data

The simplest pattern: a single owner controls encrypted content. Only the current owner of the Sui object containing the ciphertext can decrypt. Ownership transfers move decryption rights without exposing the data.

**Use for:** Personal key storage, private NFTs, user-held credentials.

### Allowlist

A shared object maintains a list of approved addresses. Only addresses on the list can decrypt. The list can be updated without re-encrypting data. Optionally supports switching to public access after a set time.

**Use for:** Partner-only data rooms, early-access drops, curated group access.

### Subscription

Defines a service with a price and duration. When someone subscribes, they receive a time-limited pass that authorizes decryption for the service's content. No re-encryption or data movement needed when subscriptions expire.

**Use for:** Premium media, paid data feeds, API/AI model access.

### Time-Lock Encryption

Encrypts data to a future timestamp. Before that time, no one can decrypt. After the time passes, anyone (or a specified audience) can obtain the decryption key. The identity encodes the unlock time as `bcs::to_bytes(T)`.

```move
entry fun seal_approve(id: vector<u8>, c: &clock::Clock) {
    let mut prepared: BCS = bcs::new(id);
    let t = prepared.peel_u64();
    let leftovers = prepared.into_remainder_bytes();
    assert!((leftovers.length() == 0) && (c.timestamp_ms() >= t), ENoAccess);
}
```

**Use for:** Coordinated reveals, MEV-resistant trading, sealed-bid auctions.

### Secure Voting

Eligible voters submit encrypted ballots. When all votes are in, anyone can fetch threshold keys from Seal and use on-chain decryption to produce a verifiable tally. Invalid or tampered ballots are ignored.

**Use for:** DAO governance, sealed-bid auctions, time-locked voting.

### Composing Patterns

Since these are standard Move functions, you can combine them. A pre-signed URL pattern, for example, combines a time-based check (expire after deadline) with an allowlist check (only authorized addresses):

```move
entry fun seal_approve(id: vector<u8>, list: &Allowlist, c: &clock::Clock, ctx: &TxContext) {
    // Check time hasn't expired
    let mut prepared: BCS = bcs::new(id);
    let expiry = prepared.peel_u64();
    assert!(c.timestamp_ms() <= expiry, EExpired);

    // Check caller is on the allowlist
    assert!(allowlist::contains(list, ctx.sender()), ENoAccess);
}
```

## Limitations

The `seal_approve*` evaluation model has constraints you need to understand:

| Constraint | Details |
|-----------|---------|
| **Eventual consistency** | Full nodes run asynchronously. Changes to on-chain state may not be visible to all key servers simultaneously. Avoid relying on rapidly changing state. |
| **No atomic cross-server evaluation** | Different key servers may observe different chain states. Don't rely on state that changes frequently or on ordering within a checkpoint. |
| **No side effects** | `seal_approve*` cannot modify state — dry runs are read-only. |
| **No secure randomness** | The `Random` module is available but its output is not deterministic across full nodes. Do not use it in `seal_approve*`. |
| **PTB isolation** | Only `seal_approve*` functions can be invoked during Seal evaluation. Don't assume composition with other PTB commands. |
| **`TxContext::sender()` semantics** | During Seal evaluation, `sender()` returns the account that signed the session key, not the dApp. |

## Upgradeability

When you upgrade a package, it retains the same identity namespace (the original `packageId` is always used for key derivation). To support secure upgrades:

- Version your shared objects, or create a global versioned shared object
- Define `seal_approve*` as non-public `entry` functions so internal logic can change
- Note that if a package is upgradeable, the package owner can change access policies at any time — these changes are transparent and visible on-chain

## Testing

`seal_approve*` functions are standard Move functions, so you can test them locally with `sui move test`. Build and publish with the Sui CLI:

```shell
sui move build
sui client publish
```

## Further Reading

- [Example Patterns](./docs/ExamplePatterns.md) — Pattern summaries with links to Move source
- [Using Seal — Access Control Management](./docs/UsingSeal.md) — Full guidelines for `seal_approve*` functions
- [Seal Design](./docs/Design.md) — Time-lock encryption example with walkthrough
