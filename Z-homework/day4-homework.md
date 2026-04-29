# Day 4 Homework

**Modules covered:** E2 (Dapp Wallet Integration), H1 (Package Upgrades), H2 (Advanced Move Patterns)

---

## Part A — Sui dApp Kit & Wallet Integration (Module E2)

### 1. Bootstrap and Explore

Set up the dApp from the E2 exercise:

```bash
cd E2
npm create @mysten/dapp   # choose react-client-dapp template
cd <app-name>
pnpm i
pnpm run dev
```

Explore the generated code and answer:

- What does the `<ConnectButton />` component do?
- What React hook gives you the currently connected wallet account?
- What hook is used for read queries against the Sui RPC?

### 2. Implement the Mint Button

Add a `<MintNFTButton />` component that:

1. Uses the `useSignAndExecuteTransaction()` hook.
2. Builds a `Transaction` with a `moveCall` to `hero::mint_hero`.
3. On success, logs the transaction digest to the console.

**Deliverable:** Paste your `MintNFTButton` component code.

### 3. Filter Owned Objects

Modify the `<OwnedObjects />` component to display only `Hero` NFTs:

- Add the `filter: { StructType: "<PACKAGE_ID>::hero::Hero" }` option to the `getOwnedObjects` query.

**Deliverable:** Paste the relevant query code showing the filter.

### 4. Auto-Refresh After Mint

After a successful mint transaction:

- Use `suiClient.waitForTransaction({ digest })` to wait for finality.
- Use `queryClient.invalidateQueries()` to refresh the owned objects list.

**Deliverable:** Paste the code that handles post-mint refresh.

### 5. Conceptual Questions

- Why do we need `waitForTransaction` before invalidating queries? What could happen if we skip it?
- What is the role of React Query (`@tanstack/react-query`) in a Sui dApp?
- What is the difference between `useSignAndExecuteTransaction` and `useSignTransaction`? When would you use each?

---

## Part B — Package Upgrades (Module H1)

### 6. Versioned Shared Objects

Read the `H1/` exercise code and answer:

- Why are published packages **immutable** on Sui? What problem does this create for developers who need to iterate?
- What is the role of the `Version` shared object in the upgrade pattern?
- How does the contract enforce that only the **latest version** of the package can call certain functions?

### 7. Implement the Upgrade Tasks

Complete the first two tasks from the H1 exercise:

**Task 1 — Bump the version:**
- In `version.move`, update the `VERSION` constant to `2`.
- Update the `Version` shared object's `version` field to `2`.

**Task 2 — Hero purchase system:**
- In `hero.move`, create a `mint_hero_v2` function that:
  - Accepts a `Coin<SUI>` as payment.
  - Requires the payment to be exactly 5 SUI.
  - Mints and returns the Hero.

**Deliverable:** Paste your modified `version.move` and the `mint_hero_v2` function.

### 8. Upgrade Policies

Answer:
- What are the three upgrade policies available in Sui (`compatible`, `additive`, `depOnly`)? Briefly describe each.
- Under the `compatible` policy, can you remove a public function from an existing module? Why or why not?
- What happens to existing objects on-chain when you upgrade a package?

---

## Part C — Advanced Move Patterns (Module H2)

### 9. Capability with Properties

Read the H2 exercise code and answer:

- How does a **Capability with Properties** differ from the simple `AdminCap` pattern from C1?
- Give an example of a property you might put on a capability object (e.g., `can_mint: bool`, `max_supply: u64`).
- Why is this pattern useful for fine-grained access control?

### 10. Witness Pattern

- What problem does the **Witness pattern** solve?
- How does Move's type system guarantee that a witness struct can only be created in its declaring module?
- Write pseudocode showing how module A can call a function in module B using a witness to prove its identity.

### 11. Display Pattern

- What is the **Display** standard in Sui? What problem does it solve for wallets and explorers?
- How do you create a `Display` object for a struct? What role does the `Publisher` play?
- If your Hero NFT has fields `name`, `stamina`, and an `image_url`, write the Display template entries that would render them.

### 12. Pattern Comparison (Stretch Goal)

Design a small system (pseudocode or real Move code) that uses **at least two** of the patterns from this module. For example:

- A marketplace where only certain sellers (Capability with Properties) can list items.
- Items use the Display pattern to render in wallets.
- A Witness guards cross-module calls between the marketplace and a separate token module.

Describe your design in 5-10 sentences and include the key struct definitions and function signatures.

---

## Submission Guidelines

- Create a folder called `day4-submission/` in your personal repo.
- Include your React component code from Part A.
- Include your Move code from Parts B and C.
- Include a markdown file with your written answers.
- Push your submission before the start of Day 5.
