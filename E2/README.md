## Sui & Move Bootcamp <> Sui dApp Kit

This exercise walks you through building a simple dApp that allows the user to:

- Connect their Sui wallet
- Mint an NFT (Hero) via a Move call
- See a filtered list of their owned Hero objects
- Auto-refresh the list after minting

For wallet integration we use **`@mysten/dapp-kit-react`**, which provides React components, hooks, and utilities for building Sui dApps with a gRPC-based client (`SuiGrpcClient`) for efficient node communication.

### Useful Links

- [Sui dApp Kit (React)](https://docs.sui.io/references/ts-sdk/dapp-kit-react)
- [Sui TypeScript SDK](https://docs.sui.io/references/ts-sdk/typescript)
- [Transaction Building](https://docs.sui.io/references/ts-sdk/typescript/transaction-building)

---

### Quickstart

The app scaffold is already provided in [`my-first-sui-dapp/`](./my-first-sui-dapp/). To get started:

```bash
cd E2/my-first-sui-dapp
pnpm i
pnpm dev
```

---

### 1. Explore the app structure

Before writing any code, walk through the existing files to understand how the dApp Kit wires everything together.

#### [`src/dapp-kit.ts`](./my-first-sui-dapp/src/dapp-kit.ts) — Client & network configuration

This file uses `createDAppKit` — a single factory that configures networks and client creation:

```ts
import { createDAppKit } from "@mysten/dapp-kit-react";
import { SuiGrpcClient } from "@mysten/sui/grpc";

export const dAppKit = createDAppKit({
  networks: ["devnet", "testnet", "mainnet"],
  defaultNetwork: "testnet",
  createClient(network) {
    return new SuiGrpcClient({ network, baseUrl: GRPC_URLS[network] });
  },
});
```

Key points:
- **`SuiGrpcClient`** uses gRPC (binary protocol) for efficient node communication.
- The **module augmentation** at the bottom (`declare module "@mysten/dapp-kit-react"`) registers the dAppKit instance with TypeScript, so hooks like `useCurrentClient()` return the correctly-typed client.

#### [`src/main.tsx`](./my-first-sui-dapp/src/main.tsx) — Provider setup

The app wraps everything in the dApp Kit provider:

```tsx
<DAppKitProvider dAppKit={dAppKit}>
  <App />
</DAppKitProvider>
```

- **`DAppKitProvider`** supplies wallet connectivity and the Sui client to the component tree.

#### [`src/App.tsx`](./my-first-sui-dapp/src/App.tsx) — Connect button

```tsx
import { ConnectButton } from "@mysten/dapp-kit-react";

<ConnectButton />
```

`ConnectButton` handles wallet discovery, connection, and disconnection UI.

#### [`src/WalletStatus.tsx`](./my-first-sui-dapp/src/WalletStatus.tsx) — Current account

```tsx
import { useCurrentAccount } from "@mysten/dapp-kit-react";

const account = useCurrentAccount();
```

`useCurrentAccount()` returns the currently connected wallet account (or `null`), giving you access to `account.address`.

---

### 2. Allow users to sign and execute a mint transaction

Create a [`src/components/ui/MintNFTForm.tsx`](./my-first-sui-dapp/src/components/ui/MintNFTForm.tsx) component that lets the connected user mint a Hero NFT.

You will need the following imports:

```tsx
import { useCurrentAccount, useCurrentClient, useDAppKit } from "@mysten/dapp-kit-react";
import { Transaction } from "@mysten/sui/transactions";
```

Key hooks:
- **`useDAppKit()`** — returns the dAppKit instance, which exposes `signAndExecuteTransaction()`.
- **`useCurrentClient()`** — returns the active `SuiGrpcClient` for direct RPC calls.
- **`useCurrentAccount()`** — returns the connected wallet account.

Build and execute the transaction:

```tsx
const tx = new Transaction();
const hero = tx.moveCall({
  target: `0xc413c2e2c1ac0630f532941be972109eae5d6734e540f20109d75a59a1efea1e::hero::mint_hero`,
  arguments: [],
  typeArguments: [],
});
tx.transferObjects([hero], account.address);

dAppKit.signAndExecuteTransaction({ transaction: tx });
```

Note: `signAndExecuteTransaction` is called on the **dAppKit instance** (obtained via `useDAppKit()`).

---

### 3. Display only the Hero objects

Modify [`src/OwnedObjects.tsx`](./my-first-sui-dapp/src/OwnedObjects.tsx) to fetch only Hero NFTs instead of all owned objects.

Use **`useCurrentClient()`** to get the client, then call its methods with React's `useState` and `useEffect` for manual state management:

```tsx
import { useCurrentAccount, useCurrentClient } from "@mysten/dapp-kit-react";
import { useState, useEffect, useCallback } from "react";

const client = useCurrentClient();

const [data, setData] = useState(null);
const [isPending, setIsPending] = useState(true);
const [error, setError] = useState(null);

const fetchObjects = useCallback(async () => {
  setIsPending(true);
  try {
    const result = await client.listOwnedObjects({
      owner: account!.address,
      type: "0xc413c2e2c1ac0630f532941be972109eae5d6734e540f20109d75a59a1efea1e::hero::Hero",
    });
    setData(result);
  } catch (e) {
    setError(e instanceof Error ? e.message : "Failed to fetch objects");
  } finally {
    setIsPending(false);
  }
}, [client, account]);

useEffect(() => {
  if (account) fetchObjects();
}, [account?.address, refreshKey, fetchObjects]);
```

Key points:
- The component accepts a `refreshKey` prop — incrementing it triggers a re-fetch.
- The **`type`** parameter is a string that filters by fully-qualified object type.
- Results are in `data.objects` (an array of object summaries).

---

### 4. Auto-refresh after minting

After the mint transaction succeeds, you want the Hero list to update automatically. The `MintNFTForm` accepts an `onMinted` callback prop that the parent uses to increment the `refreshKey`:

```tsx
// App.tsx — lift refresh state
const [refreshKey, setRefreshKey] = useState(0);

<WalletStatus refreshKey={refreshKey} />
<MintNFTForm onMinted={() => setRefreshKey((k) => k + 1)} />
```

Inside `MintNFTForm`, call the callback after the transaction is confirmed:

```tsx
dAppKit
  .signAndExecuteTransaction({ transaction: tx })
  .then(async (resp) => {
    // Wait for the transaction to be indexed
    await client.waitForTransaction({ result: resp });
    // Notify the parent to trigger a refetch
    onMinted();
  });
```

- **`client.waitForTransaction({ result })`** — waits until the transaction result is available on the node before triggering the refresh.
- **`onMinted()`** — calls back to the parent, which increments `refreshKey`, causing `OwnedObjects` to re-fetch via its `useEffect`.
