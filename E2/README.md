## Sui & Move Bootcamp <> Sui dApp Kit

This exercise walks you through building a simple dApp that allows the user to:

- Connect their Sui wallet
- Mint an NFT (Hero) via a Move call
- See a filtered list of their owned Hero objects
- Auto-refresh the list after minting

For wallet integration we use **`@mysten/dapp-kit-react`**, which provides React components, hooks, and utilities for building Sui dApps with a gRPC-based client (`SuiGrpcClient`) for efficient node communication. For async data fetching and cache management we use **`@tanstack/react-query`**.

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

The app wraps everything in two providers — Tanstack React Query for data fetching/caching and the dApp Kit provider for wallet + Sui client:

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

- **`QueryClientProvider`** enables Tanstack React Query hooks (`useQuery`, `useQueryClient`) throughout the app.
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
import { useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@mysten/sui/transactions";
```

Key hooks:
- **`useDAppKit()`** — returns the dAppKit instance; destructure `signAndExecuteTransaction` from it.
- **`useCurrentClient()`** — returns the active Sui Client defined in `dapp-kit.ts` which is by default, what we're using: `SuiGrpcClient`, for direct RPC calls (e.g. waiting for transaction finality).
- **`useCurrentAccount()`** — returns the connected wallet account.
- **`useQueryClient()`** — returns the Tanstack React Query client for cache invalidation after minting.

Build and execute the transaction:

```tsx
const { signAndExecuteTransaction } = useDAppKit();

const tx = new Transaction();
const hero = tx.moveCall({
  target: `0xc413c2e2c1ac0630f532941be972109eae5d6734e540f20109d75a59a1efea1e::hero::mint_hero`,
  arguments: [],
  typeArguments: [],
});
tx.transferObjects([hero], account.address);

await signAndExecuteTransaction({ transaction: tx });
```

Note: `signAndExecuteTransaction` is destructured from the **dAppKit instance** (returned by `useDAppKit()`).

---

### 3. Display only the Hero objects

Modify [`src/OwnedObjects.tsx`](./my-first-sui-dapp/src/OwnedObjects.tsx) to fetch only Hero NFTs instead of all owned objects.

Use **`useCurrentClient()`** to get the client, then use **`useQuery`** from Tanstack React Query for automatic loading/error state management:

```tsx
import { useCurrentAccount, useCurrentClient } from "@mysten/dapp-kit-react";
import { useQuery } from "@tanstack/react-query";

const client = useCurrentClient();
const account = useCurrentAccount();

const { data, isPending, error } = useQuery({
  queryKey: ["ownedObjects", account?.address],
  queryFn: async () => {
    const { response } = await client.stateService.listOwnedObjects({
      owner: account!.address,
      objectType:
        "0xc413c2e2c1ac0630f532941be972109eae5d6734e540f20109d75a59a1efea1e::hero::Hero",
    });
    return response.objects ?? [];
  },
  enabled: !!account,
});
```

Key points:
- The query uses **`client.stateService.listOwnedObjects()`** — the gRPC state-service endpoint for listing objects.
`client.listOwnedObjects()` (without stateService) could also be used.
- The **`objectType`** parameter filters by the fully-qualified Object type in Sui.
- **`queryKey`** includes the account address so the cache is per-wallet.
- **`enabled: !!account`** prevents the query from running before a wallet is connected.
- `data` is the resolved array of object summaries (each with an `objectId` field).

---

### 4. Auto-refresh after minting

After the mint transaction succeeds, you want the Hero list to update automatically. Instead of threading callback props through the component tree, we use **React Query cache invalidation**.

Inside `MintNFTForm`, after the transaction is confirmed, invalidate the `ownedObjects` query so `OwnedObjects` re-fetches:

```tsx
const queryClient = useQueryClient();

await signAndExecuteTransaction({ transaction: tx })
  .then(async (resp) => {
    await client.waitForTransaction({ result: resp });
    queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey[0] === "ownedObjects" &&
        query.queryKey[1] === account.address,
    });
  });
```

- **`client.waitForTransaction({ result })`** — waits until the transaction is propagated, and indexed by the node before refreshing.
- **`queryClient.invalidateQueries()`** — marks the matching cached query as stale, triggering Tanstack React Query to automatically re-fetch it. This avoids the need for lifted state or callback props — any component using the same `queryKey` will re-render with fresh data.
