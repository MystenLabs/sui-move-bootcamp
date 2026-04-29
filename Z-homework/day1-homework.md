# Day 1 Homework

**Modules covered:** A1 (Intro to Blockchains & DLTs), A3 (Intro to Sui Blockchain), A4 (Interacting with Sui), B1 (Basic Move Concepts)

---

## Part A — Conceptual Questions

Answer each question in a few sentences. You may refer to the slides, the Sui documentation, and the Move Book.

### 1. Blockchains & DLTs (Module A1)

1. Explain the difference between a **distributed ledger** and a traditional centralized database. Why does decentralisation matter for trust?
2. What role do **smart contracts** play in a blockchain? Write some sentences about them.
3. Name **three products** in the Sui ecosystem (e.g. Walrus, Enoki, DeepBook, Seal) and write one sentence about what each one does.

### 2. Sui Architecture (Module A3)

4. What is the difference between a **Validator** and a **Full Node** in the Sui network? Can a Full Node produce blocks?
5. What consensus mechanism does Sui use, and why does it enable high throughput compared to traditional BFT chains?
6. In Sui, objects can be **owned** or **shared**. Describe the difference and give one example use-case for each.

---

## Part B — Hands-On: CLI & First Smart Contract (Module A4)

Complete each task and paste the relevant command outputs (or screenshots) into your submission.

### 7. Set up your Sui CLI environment

- Install the Sui CLI (if you haven't already).
- Create a **new address** using `sui client new-address ed25519`.
- Switch to Devnet: `sui client switch --env devnet`.
- Request tokens from the faucet: `sui client faucet`.
- Run `sui client gas` and confirm you have a non-zero balance.

**Deliverable:** Paste the output of `sui client gas`.

### 8. Publish your first smart contract

Using the scaffold provided in the `A4/` directory:

- Make sure the active-env in the CLI is `testnet` or `devnet`, refer to the "Set up your Sui CLI environment" section to see how to switch
- Build the contract: `sui move build`.
- Publish it: `sui client publish`.
- Copy the **Package ID** and the **Transaction Digest** from the output.
- Open the transaction on [SuiScan](https://suiscan.xyz) or [SuiVision](https://suivision.xyz) (Devnet) and explore the created objects.

**Deliverable:** Paste the Package ID and a link to the transaction on SuiScan or SuiVision.

### 9. Interact with the published contract

- Using SuiScan's or SuiVision's "Execute" UI, call the mint function from the contract you just published to create an NFT on-chain.
- Inspect the minted object on [SuiScan](https://suiscan.xyz) or [SuiVision](https://suivision.xyz). Note its **Object ID**, **type**, and **owner**.

**Deliverable:** Paste the Object ID and describe the fields you see.

---

## Part C — Move Fundamentals (Module B1)

### 10. Packages, Modules, and the Compiler

Open the `B1/` exercise directory.

- Run `sui move build` to compile the package.
- Run `sui move test` to execute the unit tests.
- Ensure all provided tests pass.

**Deliverable:** Paste the test output showing passing tests.

### 11. Understanding Abilities

Given the following struct:

```move
public struct Potion has key, store {
    id: UID,
    healing: u64,
}
```

Answer:
- Why does `Potion` need the `key` ability?
- What does `store` allow that `key` alone does not?
- Could we add `drop` to `Potion`, if it has the `key` ability?
- Could we add `drop` to `Potion`, if it has only the `store` ability?

### 12. Hero and Weapon Composition

Looking at the B1 exercise code, answer:

- Why does creating a `Hero` inside a Move test require you to **destroy** or **transfer** it before the test ends?
- If `Hero` had the `drop` ability, would this still be necessary? What is the trade-off?
- Explain the purpose of wrapping a `Weapon` inside an `Option<Weapon>` on a `Hero`. What happens when a Hero has no weapon?

### 13. Write a Move test (Stretch Goal)

In the `B1/` exercise, write a **new test function** that:

1. Creates a `Hero` with a stamina of `100`.
2. Asserts the stamina is `100`.
3. Properly cleans up (destroys or transfers) the Hero so the test compiles and passes.

**Deliverable:** Paste your test function and the output of `sui move test`.

---

## Submission Guidelines

- Create a folder called `day1-submission/` in your personal repo.
- Include a markdown file with your written answers (Parts A and C conceptual questions).
- Include screenshots or terminal outputs for the hands-on tasks (Parts B and C practical).
- Push your submission before the start of Day 2.
