# Getting Started

This guide walks through setting up Seal, encrypting data, and decrypting it with on-chain access control. By the end you'll have a working encrypt/decrypt cycle using the Seal SDK.

> This is a quickstart for development on Testnet. Before deploying to Mainnet, review the full [Seal documentation](https://seal-docs.wal.app/) and [Security Best Practices](./security-best-practices.md).

## 1. Install the SDK

```bash
npm install @mysten/seal
```

The SDK provides `SealClient` for encryption/decryption and `SessionKey` for wallet-authorized key access.

## 2. Choose Key Servers

Key servers are registered on-chain as `KeyServer` objects. For Testnet, use verified key servers provided by the ecosystem. Each server is referenced by its Sui object ID.

Two modes of server access:

| Mode | Description |
|---|---|
| **Open** | Any package can use the server directly |
| **Permissioned** | Your access policy package ID must be allowlisted by the server operator |

For permissioned servers, contact the provider to register your package ID before encrypting.

## 3. Define an Access Policy

Write a Move module with a `seal_approve*` function that encodes your access rules. This function is what key servers evaluate before releasing decryption keys.

Example -- a simple allowlist check:

```move
module my_package::access;

entry fun seal_approve(id: vector<u8>, list: &Allowlist) {
    assert!(list.contains(tx_context::sender()), ENotOnList);
}
```

Build and publish with the Sui CLI:

```bash
sui move build
sui client publish
```

See [Access Policy Patterns](./access-policy-patterns.md) for five ready-made patterns you can adapt.

## 4. Configure the SealClient

Create a `SealClient` instance with your chosen key servers:

```typescript
import { SealClient } from '@mysten/seal';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

const serverObjectIds = [
  "0x73d05d62c18d9374e3ea529e8e0ed6161da1a141a94d3f76ae3fe4e99356db75",
  "0xf5d14a81a982144ae441cd7d64b09027f116a468bd36e7eca494f750591623c8",
];

const client = new SealClient({
  suiClient,
  serverConfigs: serverObjectIds.map((id) => ({
    objectId: id,
    weight: 1,
  })),
  verifyKeyServers: false,
});
```

**`weight`** -- How many times a server contributes to the threshold. Useful for giving more trusted servers higher influence.

**`verifyKeyServers`** -- Set to `true` to confirm that each server's on-chain object matches the URL it advertises. Adds latency; best used at app startup rather than per-operation.

### API Keys

Some key servers require authentication. Add credentials to the server config:

```typescript
{
  objectId: id,
  weight: 1,
  apiKeyName: "x-api-key",
  apiKey: "my123api456key",
}
```

Header names vary by provider -- confirm with the server operator.

## 5. Encrypt Data

Call `encrypt` with the threshold, your package ID, the identity for this piece of data, and the plaintext:

```typescript
const { encryptedObject: encryptedBytes, key: backupKey } = await client.encrypt({
  threshold: 2,
  packageId: fromHEX(packageId),
  id: fromHEX(id),
  data,
});
```

**`threshold`** -- The minimum number of key servers that must agree for decryption. With two servers of weight 1, a threshold of 2 means both must approve.

**`backupKey`** -- The symmetric key used internally. Store it securely as a fallback for manual CLI decryption.

> Encryption does not conceal message size. If size is sensitive, pad your data with zeros before encrypting.

## 6. Store Encrypted Data

The encrypted bytes can be stored anywhere:

- **Walrus** -- Decentralized blob storage (HTTP API or SDK)
- **Sui objects** -- On-chain storage for smaller payloads
- **Custom storage** -- Any backend, database, or file system

Seal is storage-agnostic. It encrypts and decrypts bytes; where you keep them is up to you.

## 7. Decrypt with Access Control

Decryption requires three things: a session key, a transaction that calls your `seal_approve*` function, and the encrypted data.

### Create a Session Key

```typescript
import { SessionKey } from '@mysten/seal';

const sessionKey = await SessionKey.create({
  address: suiAddress,
  packageId: fromHEX(packageId),
  ttlMin: 10,
  suiClient,
});

// User approves in wallet
const message = sessionKey.getPersonalMessage();
const { signature } = await keypair.signPersonalMessage(message);
sessionKey.setPersonalMessageSignature(signature);
```

The session key authorizes the dApp to request decryption keys for the specified package for `ttlMin` minutes. The user confirms once in their wallet.

### Build the Transaction and Decrypt

```typescript
import { Transaction } from '@mysten/sui/transactions';

const tx = new Transaction();
tx.moveCall({
  target: `${packageId}::${moduleName}::seal_approve`,
  arguments: [
    tx.pure.vector("u8", fromHEX(id)),
    // additional arguments your seal_approve function expects
  ],
});

const txBytes = await tx.build({ client: suiClient, onlyTransactionKind: true });

const decryptedBytes = await client.decrypt({
  data: encryptedBytes,
  sessionKey,
  txBytes,
});
```

The SDK sends the transaction to each key server. If the `seal_approve*` function succeeds on at least `threshold` servers, the client combines the derived keys and decrypts locally.

## Performance Tips

- **Reuse `SealClient`** -- It caches retrieved keys and on-chain objects
- **Reuse `SessionKey`** -- Avoid repeated wallet prompts within the TTL
- **Batch key retrieval** -- Use `client.fetchKeys()` when decrypting multiple items
- **Use AES** -- The default DEM is fast; only switch to HMAC-CTR for on-chain decryption
- **Envelope encryption** -- For large files, encrypt with a symmetric key and use Seal to protect only that key

## Debugging

If decryption fails, run the transaction block directly:

```typescript
const result = await suiClient.dryRunTransactionBlock({ transactionBlock: txBytes });
```

This shows whether the `seal_approve*` function succeeds or aborts, and why.

> `InvalidParameter` errors from key servers often mean recently created on-chain objects haven't been indexed yet. Wait a few seconds and retry.

## Next Steps

- [Access Policy Patterns](./access-policy-patterns.md) -- five patterns to adapt for your application
- [Security Best Practices](./security-best-practices.md) -- before going to Mainnet
- [Seal Design Documentation](https://seal-docs.wal.app/Design/) -- full architecture details
- [Example Apps on GitHub](https://github.com/MystenLabs/seal) -- end-to-end integration examples

## Further Reading

- [Seal SDK on npm](https://www.npmjs.com/package/@mysten/seal)
- [Using Seal Documentation](https://seal-docs.wal.app/UsingSeal/)
- [Getting Started Documentation](https://seal-docs.wal.app/GettingStarted/)
