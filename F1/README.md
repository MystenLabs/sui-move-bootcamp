# Sui & Move Bootcamp <> End to End Decentralized Application

This exercise is an example of building an e2e dApp on Sui.
We will be implementing the Sui Move, Typescript, and React concepts that we explored until now.

We will initially build a simple version of the dApp, and we are going to keep building on this application as we learn more concepts in the upcoming sessions.

## Tech Stack

- Smart Contracts (Sui Move)
- User Interface (React)

## Business Description

The application will allow creating and viewing two types of NFTs: Heros and Weapons.

Requirements:
As a user, I can:

- Connect my Slush wallet to the application
- Create a Hero and equip them with a Weapon
- See a list with Heroes I own
- See the latest minted Heroes (not only the ones I own)

## Implementation Tasks

### 1. Smart Contracts and Move Tests

- The contracts already contain the basic scaffold in the [move](./move/) directory. The structs are already built for you in the [hero.move](./move/hero/sources/hero.move) file, but the Move functions lack implementation.
- The Move tests are already implemented in the [hero_tests.move](./move/hero/tests/hero_tests.move) file.
- For this part of the exercise, we have to add the implementation of the functions of the [hero.move](./move/hero/sources/hero.move) module, so that the tests pass.
- After completing that part, you can
Please read the corresponding [README.md](./move/README.MD) for the detailed instructions.

### 2. User Interface

- For this part of the exercise, we will have to build the UI that interacts with the smart contracts.
- As we did in exercise [E2](../E2/), we will bootstrap our application and use [`@mysten/dapp-kit-react`](https://docs.sui.io/references/ts-sdk/dapp-kit-react) for wallet connections and Sui interactions

Please read the corresponding [README.md](./app/README.md) for the detailed instructions.
