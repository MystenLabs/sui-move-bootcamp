## Sui & Move Bootcamp <> End to End Decentralized Application | React App

This exercise is a simple React app that uses the smart contracts we built in step 1.

The app will have three main views:

- Main view with latest created Heroes
- Create Hero view
- My Heroes view

In an approach similar to the section E2, we will be using the [@mysten/create-dapp](https://docs.sui.io/references/ts-sdk/dapp-kit-react) CLI tool to bootstrap a new React app with Vite, and integrate the [`@mysten/dapp-kit-react`](https://docs.sui.io/references/ts-sdk/dapp-kit-react) package.

## Instructions

### 1. Setup the app

- Create a `.env` file at the same level with your [.env.example](./my-first-sui-dapp/.env.example) one, following the same format:

```
VITE_PACKAGE_ID=0xcf55ac67195cc3f7290cc7e7ff9f64bcac4140b3feb99587d75c5c4e60c5105b
VITE_HEROES_REGISTRY_ID=0x4473ad8db121386abef670f3c752b54836673d995d6963100225415d369e74b1
```

- Run:

```
cd F1/app
npm create @mysten/dapp
cd <app-name>
pnpm i
pnpm run dev
```

After bootstrapping, set up dApp Kit v2 in your app entry point: create a `SuiGrpcClient`, pass it to `createDAppKit()`, and wrap your component tree with `<DAppKitProvider>`.

#### 1st View: List with Created Heroes

In this view, we will utilise the shared object `HeroRegistry`, which keeps track of all the created Heroes.

1. Let's move on by creating a new React component, called `<HeroesList />`, that:
   - Gets the Sui client via `useCurrentClient()` and fetches the `HeroesRegistry` object using `client.getObject({ objectId, options: { showContent: true } })` inside a `useEffect`
   - Uses a `refreshKey` state variable to re-fetch when new Heroes are minted
   - Renders a link to a sui explorer for each Hero in the `ids` vector

Extension of this view as Homework:

> 2. Let's display the fields of each Hero NFT:
>
> - For each Hero ID, call `client.getObject({ objectId, options: { showContent: true } })` to fetch its data
> - Create a simple `<HeroCard />` component, that gets the fields of the Hero as arguments, and not just the id. You should use some simple CSS rules to display these data in a nice way.
>
> You will notice that the latest Heroes are currently displayed in the last positions of the list. Modifying our implementation to display the latest Heroes first will be implemented in next steps.

#### 2nd View: Create Hero

In this view, we will build the code for signing and executing a transaction that mints a Hero and transfers it to the transaction sender.

1. Create a `<CreateHeroForm />` component, with a simple Button that mints the Hero, the Weapon, and equips the Weapon to the Hero:
   - For the inputs of the Transaction (`name` and `stamina` of the `Hero`, `name` and `attack` of the `Weapon`), you can initially use hard-coded values.
   - Build a `Transaction` using `tx.moveCall({ target: '...' })` to call the mint functions from your published package.
   - Remember that the `PACKAGE_ID` and the `HEROES_REGISTRY_ID` should be retrieved by the `.env` file using the `import.meta.env` object in Vite (similar to the approach we are following in the `<OwnedObjects />` component to access the package id)
   - You should use `useDAppKit()` to get `signAndExecuteTransaction()` from [`@mysten/dapp-kit-react`](https://docs.sui.io/references/ts-sdk/dapp-kit-react) to sign and execute the transaction
   - After execution, call `client.waitForTransaction({ digest: result.digest })` and then update a shared `refreshKey` (via an `onMinted` callback) to refresh the `HeroesList`

Extension of this view as Homework:

> 2.  Add some text and number HTML inputs, so that the user can specify the values of the `name` and `stamina` of the `Hero`, `name` and `attack` of the `Weapon`, instead of using the hard-coded ones.

#### 3rd View: My Heroes

The template app already includes a component that displays the IDs of the owned objects for the connected wallet. We will modify it to display only the Heroes.

1. Modify the existing `<OwnedObjects />` component to display only the Hero NFTs, by calling `client.listOwnedObjects({ owner, type: '<package>::hero::Hero' })` to filter by the Hero struct type
2. Modify the `CreateHeroForm`, so that the `<OwnedObjects />` list is also refreshed after minting successfully a Hero

Extension of this view as Homework:

> 3. For each owned Hero ID, call `client.getObject({ objectId, options: { showContent: true } })` to fetch its full fields
> 4. Re-use the `<HeroCard />` component that you built in the Homework part of the 1st view to display the details of each Hero, and not just the object id
