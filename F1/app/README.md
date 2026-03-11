## Sui & Move Bootcamp <> End to End Decentralized Application | React App

This exercise is a simple React app that uses the smart contracts we built in step 1.

The app will have three main views:

- Main view with latest created Heroes
- Create Hero view
- My Heroes view

In an approach similar to section E2, we will be using the [@mysten/create-dapp](https://docs.sui.io/references/ts-sdk/dapp-kit-react) CLI tool to bootstrap a new React app with Vite, and integrate the [`@mysten/dapp-kit-react`](https://docs.sui.io/references/ts-sdk/dapp-kit-react) package.

## Instructions

### 1. Setup the app
- Run:

```
cd F1/app
npm create @mysten/dapp
cd <app-name>
pnpm i
pnpm run dev
```

- Explore the generated scaffold. The key pieces to understand are:
  - **`createDAppKit`** — configures networks and creates a `SuiGrpcClient` per network (see `dapp-kit.ts`)
  - **`DAppKitProvider`** — wraps the app and supplies wallet connectivity and the Sui client to the component tree
  - **`ConnectButton`** — handles wallet discovery, connection, and disconnection UI

#### 1st View: List with Created Heroes

In this view, we will utilise the shared object `HeroRegistry`, which keeps track of all the created Heroes.

1. Let's move on by creating a new React component, called `<HeroesList />`, that:
   - Uses `useCurrentClient()` to get the active `SuiGrpcClient`
   - Uses `useState` and `useEffect` to call `client.getObject` and fetch the `HeroesRegistry` object
   - Accepts a `refreshKey` prop so the parent can trigger a re-fetch by incrementing it
   - Renders a link to a sui explorer for each Hero in the `ids` vector

Extension of this view as Homework:

> 2. Let's display the fields of each Hero NFT:
>
> - For each Hero id, call `client.getObject` to fetch its fields
> - Create a simple `<HeroCard />` component, that gets the fields of the Hero as arguments, and not just the id. You should use some simple CSS rules to display these data in a nice way.
>
> You will notice that the latest Heroes are currently displayed in the last positions of the list. Consider reversing the list in your component to display the latest Heroes first.

#### 2nd View: Create Hero

In this view, we will build the code for signing and executing a transaction that mints a Hero and transfers it to the transaction sender. You should build the `Transaction` with `moveCall` commands directly in the component.

1. Create a `<CreateHeroForm />` component, with a simple Button that mints the Hero, the Weapon, and equips the Weapon to the Hero:
   - For the inputs of the Transaction (`name` and `stamina` of the `Hero`, `name` and `attack` of the `Weapon`), you can initially use hard-coded values.
   - Build a `Transaction` using `tx.moveCall()` to invoke the relevant Move functions, just as we did in [E2](../E2/).
   - Use `useDAppKit()` to get the dAppKit instance, then call `dAppKit.signAndExecuteTransaction({ transaction: tx })` to sign and execute the transaction (see [Sui dApp Kit docs](https://docs.sui.io/references/ts-sdk/dapp-kit-react))
   - After a successful transaction, call `client.waitForTransaction({ result })` (via `useCurrentClient()`) to wait for indexing, then invoke an `onMinted` callback prop so the parent can increment `refreshKey` and trigger a re-fetch of the `HeroesList`

Extension of this view as Homework:

> 2.  Add some text and number HTML inputs, so that the user can specify the values of the `name` and `stamina` of the `Hero`, `name` and `attack` of the `Weapon`, instead of using the hard-coded ones.

#### 3rd View: My Heroes

The template app already includes a component that displays the IDs of the owned objects for the connected wallet. We will modify it to display only the Heroes.

1. Modify the existing `<OwnedObjects />` component to display only the Hero NFTs, by calling `client.listOwnedObjects({ owner, type: "<package>::hero::Hero" })` via `useCurrentClient()` with `useState`/`useEffect`
2. Add a `refreshKey` prop to `<OwnedObjects />` and lift state so that the `CreateHeroForm`'s `onMinted` callback also triggers a re-fetch of this component

Extension of this view as Homework:

> 3. For each Hero in the list, call `client.getObject` to fetch its full fields
> 4. Re-use the `<HeroCard />` component that you built in the Homework part of the 1st view to display the details of each Hero, and not just the object id
