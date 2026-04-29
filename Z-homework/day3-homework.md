# Day 3 Homework

**Modules covered:** D1 (Sui TS SDK Basics), D2 (Read Queries), D4 (Programmable Transactions), E1 (Advanced Programmable Transactions)

---

## Part A — Sui TypeScript SDK Basics (Module D1)

### 1. SuiClient Setup

- Create a new TypeScript file that initializes a `SuiGrpcClient` connected to **Testnet**.
- Use the faucet to request SUI for a test address.
- Query the balance before and after the faucet call.
- Assert the balance increased.

**Deliverable:** Paste your code and the Jest test output showing the balance difference.

### 2. Network Exploration

Answer:
- What are the four network options available via `getJsonRpcFullnodeUrl()`?
- Why would you use `localnet` during development instead of `devnet`?
- What is the difference between `devnet` and `testnet` in terms of data persistence and reset cycles?

---

## Part B — Read Queries (Module D2)

Complete the `D2/` exercise so that all three tests pass.

### 3. Fetch an Object

- Implement `getHero.ts` so that it fetches the Hero object by its Object ID using `suiClient.getObject`.
- The `Hero Exists` test should pass.

**Deliverable:** Paste your `getHero.ts` implementation.

### 4. Parse Object Fields

- Extend `getHero.ts` to include `json`.
- Implement `parseHeroContent.ts` to map the raw response into the TypeScript `Hero` interface.
- The `Hero Content` test should pass.

**Deliverable:** Paste your `parseHeroContent.ts` implementation.

### 5. Dynamic Object Fields

- Implement `getHeroSwordIds.ts` to fetch the dynamic object fields of the Hero.
- Filter them by the Sword type to extract attached sword IDs.
- The `Hero Has Attached Swords` test should pass.

**Deliverable:** Paste your `getHeroSwordIds.ts` implementation.

### 6. Conceptual Questions

- What is the difference between `content` and `json` in `getObject` include(s)?
- What are Dynamic Object Fields and how do they differ from regular struct fields? When would you use one over the other?

---

## Part C — Programmable Transaction Blocks (Module D4)

Complete the `D4/` exercise so that both tests pass.

### 7. Build a Transfer Transaction

Implement the `transferSUI.ts` helper:

- Use `tx.splitCoins(tx.gas, [amount])` to create a coin from the gas object.
- Use `tx.transferObjects` to send it to the recipient.
- Include `effects` and `balanceChanges` in the transaction include(s).

**Deliverable:** Paste your `transferSUI.ts` implementation and the passing test output.

### 8. Parse Balance Changes

Implement `parseBalanceChanges.ts`:

- Filter `balanceChanges` by `owner` matching the recipient.
- Filter by `coinType`: `SUI_TYPE_ARG` from `@mysten/sui/utils`.
- Return the balance change amount.

**Deliverable:** Paste your `parseBalanceChanges.ts` implementation.

### 9. Gas Information

After running your transfer transaction, inspect the full JSON response and answer:

- How much gas was consumed (in MIST)?
- Why does the sender's balance decrease by more than just the transferred amount?

---

## Part D — Advanced PTBs: Minting NFTs (Module E1)

Complete the `E1/` exercise so that all three tests pass.

### 10. Mint a Hero with a Sword

Implement `mintHeroWithSword.ts`:

- Use `tx.moveCall` to call `hero::mint_hero` and `blacksmith::new_sword`.
- Use `tx.moveCall` to call `hero::equip_sword`, passing the hero and sword results.
- Transfer the hero to the sender's address.
- Include `effects` and `objectTypes` in the output options.

**Deliverable:** Paste your `mintHeroWithSword.ts` implementation.

### 11. Parse Created Objects

Implement `parseCreatedObjectsIds.ts`:

- Filter `objectChanges` where `idOperation === "Created"`.
- Use the `objectType` to separate the Hero ID from the Sword ID.

**Deliverable:** Paste your implementation.

### 12. Verify Equipment via Dynamic Fields

Implement `getHeroSwordIds.ts`:

- Use `suiClient.listDynamicFields` to get the Hero's dynamic fields.
- Filter by the Sword type.
- Use `suiClient.getDynamicObjectField` to get each Sword's object ID.

**Deliverable:** Paste your implementation and the full passing test output.

### 13. PTB Composition (Conceptual)

Answer:
- Why are Programmable Transaction Blocks powerful compared to single-instruction transactions?
- In your `mintHeroWithSword` implementation, how many Move calls does the single PTB contain? Could you add even more operations to the same PTB?
- What happens if one command in a PTB fails — do the previous commands still take effect?

---

## Submission Guidelines

- Create a folder called `day3-submission/` in your personal repo.
- Include your implemented `.ts` files for each exercise (D2, D4, E1).
- Include a markdown file with your written answers for the conceptual questions.
- Include screenshots or terminal output showing all tests passing.
- Push your submission before the start of Day 4.
