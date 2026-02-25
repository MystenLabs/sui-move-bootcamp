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

The app wraps everything in **two providers** — TanStack Query's `QueryClientProvider` and the dApp Kit provider:

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DAppKitProvider } from "@mysten/dapp-kit-react";

const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <DAppKitProvider dAppKit={dAppKit}>
    <App />
  </DAppKitProvider>
</QueryClientProvider>
```

- **`QueryClientProvider`** (outer) — provides the TanStack Query cache to the entire app. All `useQuery` calls share this cache, enabling automatic refetching and cache invalidation.
- **`DAppKitProvider`** (inner) — supplies wallet connectivity and the Sui client to the component tree.

#### [`src/App.tsx`](./my-first-sui-dapp/src/App.tsx) — Connect button

```tsx
import { ConnectButton } from "@mysten/dapp-kit-react";

<ConnectButton />
```

`ConnectButton` handles wallet discovery, connection, and disconnection UI. Notice that `App` doesn't manage any refresh state — `WalletStatus` and `MintNFTForm` are rendered as siblings with no props passed between them.

#### [`src/WalletStatus.tsx`](./my-first-sui-dapp/src/WalletStatus.tsx) — Current account

```tsx
import { useCurrentAccount } from "@mysten/dapp-kit-react";

const account = useCurrentAccount();
```

`useCurrentAccount()` returns the currently connected wallet account (or `null`), giving you access to `account.address`.

---

### 2. Allow users to sign and execute a mint transaction

Open [`src/components/ui/MintNFTForm.tsx`](./my-first-sui-dapp/src/components/ui/MintNFTForm.tsx) — the scaffold already has the button and wallet guard. You need to implement the minting logic.

You will need the following imports:

```tsx
import { useCurrentAccount, useCurrentClient, useCurrentNetwork, useDAppKit } from "@mysten/dapp-kit-react";
import { useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@mysten/sui/transactions";
```

Key hooks:
- **`useDAppKit()`** — returns the dAppKit instance, which exposes `signAndExecuteTransaction()`.
- **`useCurrentClient()`** — returns the active `SuiGrpcClient` for direct RPC calls.
- **`useCurrentAccount()`** — returns the connected wallet account.
- **`useCurrentNetwork()`** — returns the active network name (e.g., `"testnet"`).
- **`useQueryClient()`** — returns the TanStack Query client, used to invalidate cached queries.

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

Open [`src/OwnedObjects.tsx`](./my-first-sui-dapp/src/OwnedObjects.tsx) — the scaffold has placeholder variables and the full rendering JSX. You need to replace the placeholders with a TanStack Query `useQuery()` call.

Use **`useCurrentClient()`** to get the Sui client, **`useCurrentNetwork()`** for the network name, and **`useQuery()`** for declarative data fetching:

```tsx
import { useCurrentAccount, useCurrentClient, useCurrentNetwork } from "@mysten/dapp-kit-react";
import { useQuery } from "@tanstack/react-query";

const client = useCurrentClient();
const network = useCurrentNetwork();

const { data, isPending, error } = useQuery({
  queryKey: [network, "getOwnedObjects", account?.address],
  queryFn: () =>
    client.listOwnedObjects({
      owner: account!.address,
      type: "0xc413c2e2c1ac0630f532941be972109eae5d6734e540f20109d75a59a1efea1e::hero::Hero",
    }),
  enabled: !!account,
});
```

Key points:
- **`queryKey`** — a unique cache key that includes the network and address. TanStack Query uses this to cache and deduplicate requests. When any part of the key changes (e.g., switching networks), the query automatically refetches.
- **`queryFn`** — the async function that fetches data. It only runs when `enabled` is `true`.
- **`enabled`** — prevents the query from firing when there's no connected account.
- The destructured `{ data, isPending, error }` replaces the placeholder variables in the scaffold — no `useState` or `useEffect` needed!

---

### 4. Auto-refresh after minting

After the mint transaction succeeds, you want the Hero list to update automatically. Instead of prop-drilling a refresh callback, use TanStack Query's **cache invalidation** — the `MintNFTForm` can tell the query cache to refetch without knowing anything about `OwnedObjects`.

Inside `MintNFTForm`, after the transaction is confirmed, invalidate matching queries:

```tsx
const queryClient = useQueryClient();
const network = useCurrentNetwork();

dAppKit
  .signAndExecuteTransaction({ transaction: tx })
  .then(async (resp) => {
    // Wait for the transaction to be indexed
    await client.waitForTransaction({ result: resp });
    // Invalidate all queries matching the network + "getOwnedObjects" pattern
    queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey[0] === network &&
        query.queryKey[1] === "getOwnedObjects",
    });
  });
```

- **`client.waitForTransaction({ result })`** — waits until the transaction result is available on the node before triggering the refresh.
- **`queryClient.invalidateQueries()`** — marks matching cached queries as stale, causing them to refetch automatically. The `predicate` function matches any query whose key starts with the current network and `"getOwnedObjects"`.
- This approach is more scalable than prop-drilling: the minting component doesn't need to know which components display objects — it just invalidates the cache and any component using a matching `useQuery` will refresh.
