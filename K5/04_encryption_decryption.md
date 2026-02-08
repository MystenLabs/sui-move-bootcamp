# Encryption & Decryption

The TypeScript SDK (`@mysten/seal`) is the primary interface for encrypting and decrypting data with Seal. This guide walks through the complete workflow: installing the SDK, configuring key servers, encrypting data, creating session keys, and decrypting with access control.

## Install the SDK

```shell
npm install @mysten/seal
```

## Configure Key Servers

Before encrypting, select which key servers to use. Each key server registers an on-chain `KeyServer` object containing its name, public key, and URL. You reference servers by their object IDs.

For development, use the verified testnet servers:

```typescript
const serverObjectIds = [
  "0x73d05d62c18d9374e3ea529e8e0ed6161da1a141a94d3f76ae3fe4e99356db75",
  "0xf5d14a81a982144ae441cd7d64b09027f116a468bd36e7eca494f750591623c8"
];
```

Create a `SealClient` instance:

```typescript
import { SealClient } from '@mysten/seal';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

const client = new SealClient({
  suiClient,
  serverConfigs: serverObjectIds.map((id) => ({
    objectId: id,
    weight: 1,
  })),
  verifyKeyServers: false,
});
```

**Key configuration options:**

| Option | Purpose |
|--------|---------|
| `objectId` | The on-chain `KeyServer` object ID |
| `weight` | How many times this server counts toward the threshold (default: 1) |
| `verifyKeyServers` | If `true`, verifies each server's URL matches its on-chain registration. Enable at app startup for security; disable for performance. |
| `apiKeyName` / `apiKey` | For servers that require authentication — sent as an HTTP header |

A key server may appear multiple times (with different weights) to give it more influence over the threshold.

## Encrypt Data

Call `encrypt()` with the threshold, the package ID of your access policy, the identity, and the data:

```typescript
import { fromHEX } from '@mysten/bcs';

const { encryptedObject: encryptedBytes, key: backupKey } = await client.encrypt({
  threshold: 2,
  packageId: fromHEX(packageId),
  id: fromHEX(id),
  data,
});
```

**Parameters:**

- `threshold` — Minimum number of key servers needed for decryption
- `packageId` — The deployed Move package containing your `seal_approve*` functions
- `id` — The policy-specific identity (without the package ID prefix)
- `data` — The plaintext bytes to encrypt

**Returns:**

- `encryptedObject` — BCS-serialized `EncryptedObject` containing all ciphertext data
- `key` — The symmetric key used for encryption. Store this as a backup for disaster recovery, or discard it.

> **Note:** Encryption does not conceal message size. If size is sensitive, pad the message before encrypting.

### Envelope Encryption for Large Data

For large files (videos, datasets), use Seal as a KMS rather than encrypting the full payload:

1. Generate a symmetric key and encrypt the data with AES locally
2. Encrypt only the symmetric key using Seal
3. Store the AES-encrypted data on Walrus and keep the Seal-encrypted key separately

This approach lets you rotate key servers or update access policies without re-encrypting the stored content.

## Create a Session Key

Before decrypting, the user must authorize a session key. This grants the dApp time-limited access to retrieve decryption keys for a specific package:

```typescript
import { SessionKey } from '@mysten/seal';

const sessionKey = await SessionKey.create({
  address: suiAddress,
  packageId: fromHEX(packageId),
  ttlMin: 10,
  suiClient: new SuiClient({ url: getFullnodeUrl('testnet') }),
});

// User signs in their wallet
const message = sessionKey.getPersonalMessage();
const { signature } = await keypair.signPersonalMessage(message);
sessionKey.setPersonalMessageSignature(signature);
```

The session key is now initialized and can be reused for multiple decryptions within the TTL window.

**Session key options:**

- `ttlMin` — Time-to-live in minutes
- `mvr_name` — Optional Move Package Registry name for a more readable wallet prompt
- `Signer` — Can be passed in the constructor for classes extending `Signer` (e.g., `EnokiSigner`)
- `import` / `export` — Methods for persisting session keys to IndexedDB across browser tabs

## Decrypt Data

Build a transaction that calls your `seal_approve*` function, then pass it to `decrypt()`:

```typescript
import { Transaction } from '@mysten/sui/transactions';

const tx = new Transaction();
tx.moveCall({
  target: `${packageId}::${moduleName}::seal_approve`,
  arguments: [
    tx.pure.vector("u8", fromHEX(id)),
    // Additional arguments required by your policy
  ],
});

const txBytes = await tx.build({ client: suiClient, onlyTransactionKind: true });

const decryptedBytes = await client.decrypt({
  data: encryptedBytes,
  sessionKey,
  txBytes,
});
```

**Requirements for the transaction:**

- May only call `seal_approve*` functions
- All calls must target the same package
- Objects referenced in the PTB should include full version information to reduce full node lookups

### Batch Decryption

When you need multiple keys (e.g., decrypting a gallery of images), use `fetchKeys()` with a multi-command PTB:

```typescript
await client.fetchKeys({
  ids: [id1, id2],
  txBytes: txBytesWithTwoSealApproveCalls,
  sessionKey,
  threshold: 2,
});
```

This groups requests and reduces key server round trips. Key servers may apply rate limiting, so batching is the recommended approach for multi-key scenarios.

## Performance Tips

| Strategy | Impact |
|----------|--------|
| **Reuse the `SealClient` instance** | Caches keys and fetched objects — avoids redundant setup |
| **Reuse the `SessionKey`** | Avoids repeated wallet prompts and object fetches |
| **Disable `verifyKeyServers` after startup** | Saves round-trip latency per operation |
| **Include full object references in PTBs** | Reduces object resolution calls by key servers |
| **Use `fetchKeys()` for batch operations** | Groups requests, minimizes server interactions |
| **Use AES-256-GCM (not HMAC-CTR)** | Significantly faster; reserve HMAC-CTR for on-chain decryption |

### Handling Errors

If a key server request fails with `InvalidParameter`, the cause may be a recently created on-chain object in the PTB that the key server's full node hasn't indexed yet. Wait a few seconds and retry.

To debug a transaction, call `dryRunTransactionBlock` directly with the transaction block.

## Further Reading

- [Getting Started](./docs/GettingStarted.md) — Quick-start bootstrap guide
- [Using Seal — Encryption](./docs/UsingSeal.md#encryption) — Full encryption API details
- [Using Seal — Decryption](./docs/UsingSeal.md#decryption) — Full decryption API with on-chain variant
- [Using Seal — Performance](./docs/UsingSeal.md#optimizing-performance) — Optimization strategies
