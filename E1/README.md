## Sui & Move Bootcamp <> Advanced Programmable Transactions

This exercise contains a simple Node project using Typescript, that executes an advanced transaction block on the Sui blockchain, to mint a Hero NFT and a Sword NFT, and attach the Sword to the Hero as a Dynamic Object Field.

### Useful Links

- [Programmable Transaction Blocks](https://docs.sui.io/concepts/transactions/prog-txn-blocks)
- [Sui TS SDK | Programmable Transaction Blocks](https://sdk.mystenlabs.com/typescript/transaction-building/basics)
- [Sui TS SDK | Passing inputs to a transaction](https://sdk.mystenlabs.com/typescript/transaction-building/basics#passing-inputs-to-a-transaction)

### Quickstart

- Create a .env file in the [mint-hero/](./mint-hero/) directory, following the structure of the [.env.example](./mint-hero/.env.example):

```
SUI_NETWORK=https://rpc.testnet.sui.io:443
PACKAGE_ID=0xc413c2e2c1ac0630f532941be972109eae5d6734e540f20109d75a59a1efea1e
USER_SECRET_KEY=
```

- Run the following commands:

```
cd mint-hero
npm i
npm run test
```

### Instructions

- Notice that all of the tests in the [mintHeroWithSword.test.ts](./mint-hero/src/tests/mintHeroWithSword.test.ts) file are failing:
  - `Transaction Status`: Validates that the status of the transfer transaction is "success".
  - `Created Hero And Sword`: Validates that a Hero NFT and a Sword NFT are created.
  - `Hero is equiped with a Sword`: Validates that our Hero is equiped with a Sword.

### 1. Mint the Hero, the Sword, and equip it

- Modify the [src/helpers/mintHeroWithSword.ts](./mint-hero/src/helpers/mintHeroWithSword.ts) function, by adding the implementation:
  - You should use the `tx.moveCall` method for making custom move calls.
  - You should use the `mint_hero` function of the [hero](./hero/sources/hero.move) module to mint the Hero object.
  - You should use the `new_sword` function of the [blacksmith](./hero/sources/blacksmith.move) module to mint the Sword object.
  - You should use the `equip_sword` function of the [hero](./hero/sources/hero.move) module to equip the Sword object.
  - Last but not least, do not forget to transfer the Hero object to an address, since the Hero object is an actual NFT that does not have the Drop ability, so it must be "consumed" somehow!!

### 2. Parse the IDs of the created Hero and Sword

- Modify the [parseCreatedObjectsIds.ts](./mint-hero/src/helpers/parseCreatedObjectsIds.ts) function, so that you can extract both the Hero's and the Sword's object ID:
  - You should filter the object changes by `type === "created"`.
  - You can use some smart type assertions to get access to the `objectType` field in a clean way.
  - Filter by the corresponding `objectType` to differentiate between the Hero and the Sword.

### 3. Parse the Swords that are attached to a specfic Hero

- Modify the [getHeroSwordIds.ts](./mint-hero/src/helpers/getHeroSwordIds.ts) function, so that you can extract the object IDs of the Swords that are attached to a Hero object:
  - You should use the `suiClient.getDynamicFields` function to get the dynamic fields that are attached to the Hero.
  - You should filter them by the object type, to keep only the Swords.
