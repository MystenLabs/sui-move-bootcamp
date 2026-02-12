## Sui & Move Bootcamp

### Sui Client Connection Setup with TypeScript SDK

### What you will learn in this module

- How to connect to a Sui network using the TypeScript SDK.
- How to check the balance of an address.
- How to use the faucet on Devnet/Testnet/Localnet to request SUI for gas.
- How to write and run a simple Jest test that demonstrates these concepts.

---

#### 1. Project Setup

Before writing code, make sure your **`package.json`** includes the right dependencies:

- **`@mysten/sui`** → TypeScript SDK for interacting with Sui.
- **`dotenv`** → manage environment variables (optional, but useful for storing private keys).
- **`ts-node`** → run TypeScript files directly.
- **`typescript`** → compile TypeScript.
- **`zod`** → runtime validation (often used for schemas).
- **`jest`** → testing framework we’ll use to run our example.

---

#### 2. Initialize a SuiClient

Use the SDK to connect to a specific network (Devnet in this example):

```ts
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

const suiClient = new SuiClient({ url: getFullnodeUrl("devnet") });
```

- `getFullnodeUrl("devnet")` gives the default Mysten-hosted Devnet endpoint.
- Available options are `"mainnet"`, `"testnet"`, `"devnet"`, `"localnet"`.

---

#### 3. Get Balance

To fetch the balance of an address:

```ts
const before = await suiClient.getBalance({ owner: MY_ADDRESS });
```

- Type of the response is `Promise<CoinBalance>`.
- That’s why we need `before.totalBalance` to access the actual number.
- In TypeScript, `?` marks an optional parameter — for `getBalance` only `owner` is required.

---

#### 4. Use the Faucet

On Devnet/Testnet/Localnet you can get SUI for gas using the faucet API:

```ts
import { getFaucetHost, requestSuiFromFaucetV2 } from "@mysten/sui/faucet";

await requestSuiFromFaucetV2({
  host: getFaucetHost("devnet"),
  recipient: MY_ADDRESS,
});
```

---

#### 5. Get Balance Again

After calling the faucet, check the balance a second time:

```ts
const after = await suiClient.getBalance({ owner: MY_ADDRESS });
```

---

#### 6. Assert the Result

In a test, you can verify that the balance increased:

```ts
expect(Number(after.totalBalance)).toBeGreaterThan(Number(before.totalBalance));
```

---

### Useful Links

- [Network Interactions with SuiClient
  ](https://sdk.mystenlabs.com/typescript/sui-client)
- [Sui Client Provider - React Dapp Kit](https://sdk.mystenlabs.com/dapp-kit/sui-client-provider)
- [RPC Best Practices
  ](https://docs.sui.io/references/sui-api/rpc-best-practices)
- [Sui Full Node Configuration
  ](https://docs.sui.io/guides/operator/sui-full-node)
