# Day 5 Homework

**Module covered:** F1 (End-to-End DApp — "A DApp for Managing Your NFT Heroes")

This is a full-day, project-based homework. You will build a complete decentralized application spanning smart contracts, TypeScript integration scripts, and a React UI.

---

## Overview

The application allows creating and viewing two types of NFTs: **Heroes** and **Weapons**.

**User stories:**
- As a user, I can connect my Slush wallet to the application.
- As a user, I can create a Hero and equip them with a Weapon.
- As a user, I can see a list of Heroes I own.
- As a user, I can see the latest minted Heroes (not only the ones I own).

---

## Part 1 — Smart Contracts (Sui Move)

The contract scaffold is provided in `F1/move/`. The structs (`Hero`, `Weapon`, `HeroRegistry`) are already defined in `hero.move`, but the functions lack implementation. The tests in `hero_tests.move` are already written.

### Task 1.1: Implement the Move functions

Implement the following functions in `hero.move` so that **all Move tests pass**:

| Function | What it should do |
|---|---|
| `new_hero` | Create a Hero, register it in the HeroRegistry, increment the counter |
| `new_weapon` | Create a Weapon with a name and attack value |
| `equip_weapon` | Attach a Weapon to a Hero (abort if already equipped) |
| `unequip_weapon` | Detach the Weapon from a Hero and return it (abort if none equipped) |
| Accessor functions | Return the corresponding fields for Hero, Weapon, and HeroRegistry |

**Validation:**

```bash
cd F1/move/hero
sui move test
```

**Deliverable:** All tests passing. Paste the output of `sui move test`.

### Task 1.2: Publish the contract

- Publish the contract to Testnet: `sui client publish --gas-budget 100000000`.
- Note down the **Package ID** and the **HeroRegistry Object ID** from the transaction output.

**Deliverable:** Paste the Package ID and HeroRegistry ID.

---

## Part 2 — TypeScript Integration Tests

The TypeScript scaffold is provided in `F1/typescript/`. Fill in the helper functions so that all tests in `e2e.test.ts` pass.

### Task 2.1: Mint Hero with Weapon

Implement `mintHeroWithWeapon.ts`:

- Call `hero::new_hero` with a name, stamina, and the HeroRegistry.
- Call `hero::new_weapon` with a name and attack value.
- Call `hero::equip_weapon` to attach the weapon to the hero.
- Transfer the hero to the sender.

### Task 2.2: Parse Created Object IDs

Implement `parseCreatedObjectIds.ts`:

- Filter object changes for created objects.
- Separate Hero and Weapon IDs by their `objectType`.

### Task 2.3: Get Weapon ID of a Hero

Implement `getWeaponIdOfHero.ts`:

- Fetch the Hero object with `showContent: true`.
- Parse the nested fields to extract the attached Weapon's ID.

### Task 2.4: Read the HeroesRegistry

Implement `getHeroesRegistry.ts`:

- Fetch the HeroesRegistry shared object.
- Parse and return the `ids` vector and the `counter`.

**Validation:**

```bash
cd F1/typescript
npm i
npm run test
```

**Deliverable:** All tests passing. Paste the test output and your four implemented helper files.

---

## Part 3 — React User Interface

Build the frontend in `F1/app/`. Bootstrap it using `@mysten/create-dapp` (as done in E2).

### Task 3.1: Setup

```bash
cd F1/app
npm create @mysten/dapp   # choose react-client-dapp
cd <app-name>
pnpm i
```

Create a `.env` file with your `VITE_PACKAGE_ID` and `VITE_HEROES_REGISTRY_ID`.

### Task 3.2: Heroes List View

Build a `<HeroesList />` component that:

1. Fetches the `HeroRegistry` shared object using `useSuiClientQuery` with the `getObject` method.
2. Includes `showContent: true` to access the `ids` vector.
3. Renders a link to a Sui explorer ([SuiScan](https://suiscan.xyz) or [SuiVision](https://suivision.xyz)) for each Hero ID.

### Task 3.3: Create Hero View

Build a `<CreateHeroForm />` component that:

1. Contains a button to mint a Hero with a Weapon.
2. Uses the `mintHeroWithWeapon` logic from Part 2 to populate the `Transaction`.
3. Uses `useSignAndExecuteTransaction` to execute the transaction.
4. Refreshes the Heroes list on success via `waitForTransaction` + `invalidateQueries`.

### Task 3.4: My Heroes View

Modify the `<OwnedObjects />` component to:

1. Filter by the Hero struct type: `<PACKAGE_ID>::hero::Hero`.
2. Only display Hero NFTs belonging to the connected wallet.

**Validation:** Run the app and verify you can:
- Connect a wallet.
- Mint a Hero with a Weapon.
- See the Hero appear in both "Latest Heroes" and "My Heroes" views.

**Deliverable:** Screenshots of the three views working, plus your component source files.

---

## Stretch Goals

These are optional extensions mentioned in the F1 app README. Completing them will deepen your understanding.

### Stretch A: Hero Cards

- In the Heroes List view, use `multiGetObjects` to fetch the data of each Hero.
- Create a `<HeroCard />` component that renders the Hero's name, stamina, and weapon info in a styled card.

### Stretch B: Form Inputs

- Replace the hard-coded values in `<CreateHeroForm />` with HTML inputs for Hero name, stamina, Weapon name, and attack value.

### Stretch C: My Heroes with Details

- Add `showContent: true` to the `getOwnedObjects` query in `<OwnedObjects />`.
- Reuse the `<HeroCard />` component to display full Hero details instead of just object IDs.

---

## Submission Guidelines

- Create a folder called `day5-submission/` in your personal repo.
- Include your `hero.move` implementation (Part 1).
- Include your four TypeScript helper files (Part 2).
- Include your React component files (Part 3).
- Include screenshots or a short screen recording showing the working app.
- Push your submission before the start of Day 6.
