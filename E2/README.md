## Sui & Move Bootcamp <> Sui dApp Kit

This exercise is a simple e2e example of building a dApp that allows the user to:

- connect their Sui wallet
- see a list with their owned objects
- mint an NFT

For this integration, we will be using [Sui dApp Kit](https://sdk.mystenlabs.com/dapp-kit) to handle wallet connections.
<br />
<i>The Sui dApp Kit is a set of React components, hooks, and utilities to help you build a dApp for the Sui ecosystem.</i>

To bootstrap our application, we will be using the CLI tool [@mysten/create-dapp](https://sdk.mystenlabs.com/dapp-kit/create-dapp), that creates a new React app with [Vite](https://vite.dev/).

## Instructions

### 1. Setup and start exploring your app:

1. `cd E2`
2. `npm create @mysten/dapp` (choose the `react-client-dapp` template)
3. cd `<app-name>`
4. `pnpm i`
5. `pnpm run dev`

Notice how @mysten/dapp-kit exports the following elements:

- `<ConnectButton />` component for handling connecting wallets in `App.tsx`
- `useCurrentAccount()` hook for getting the current account in `WalletStatus.tsx`
- `useSuiClientQuery()` hook for executing read queries in `OwnedObjects.tsx`

### 2. Allow the users to sign and execute a transaction for minting an NFT

1. Add a `<MintNFTButton />` component with a simple button
2. Use the `useSignAndExecuteTransaction()` function to mint the NFT, by making a move call to the function:

```
0xc413c2e2c1ac0630f532941be972109eae5d6734e540f20109d75a59a1efea1e::hero::mint_hero
```

### 3. Display only the Hero objects

- You should use the `filter` argument in the query of the owned objects list in the [<OwnedObjects />](./my-first-sui-dapp//src/OwnedObjects.tsx) component, to fetch only the desired NFT types

```
0xc413c2e2c1ac0630f532941be972109eae5d6734e540f20109d75a59a1efea1e::hero::Hero
```

### 4. Auto-refresh the owned objects list to see the fresh NFT

- You should wait for the mint transaction be available over the API using the [suiClient.waitForTransaction](https://sdk.mystenlabs.com/typescript/sui-client#waitfortransaction) method
- You should use the [queryClient.invalidateQueries](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation) method provided by React Query
