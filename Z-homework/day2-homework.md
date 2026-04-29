# Day 2 Homework

**Modules covered:** B2 (Primitive Types), B3 (Object Abilities & Events), C1 (Move Patterns)

---

## Part A — Primitive Types & Strings (Module B2)

### 1. Integer Overflow

Move supports unsigned integers: `u8`, `u16`, `u32`, `u64`, `u128`, `u256`.

- What is the maximum value a `u8` can hold?
- What happens at runtime if you try to add `1` to the maximum `u8` value? (Hint: try it in a test.)
- When should you choose `u64` over `u128`? Give a practical example in the context of Sui (think balances, counters, timestamps).

### 2. Working with Vectors

Write a Move test function that:

1. Creates an empty `vector<u64>`.
2. Pushes the values `10`, `20`, `30` into it.
3. Removes the element at index 1 (should be `20`).
4. Asserts the vector now contains `[10, 30]` and has length `2`.

**Deliverable:** Paste your test function and `sui move test` output.

### 3. Strings in Move

- What is the underlying representation of a `String` in Move? (Hint: `vector<u8>`.)
- Write a test that creates a `String` from a byte literal (e.g. `b"Sui Bootcamp"`) and asserts its length equals `12`.
- Why can't you directly compare two `String` values with `==` in Move? What do you need to use instead?

---

## Part B — Object Abilities, Events & Storage (Module B3)

### 4. Abilities Deep Dive

For each struct below, list **all four abilities** (`copy`, `drop`, `key`, `store`) and state which ones it has and why:

```move
public struct TokenBalance has copy, drop, store {
    amount: u64,
}

public struct GameCharacter has key, store {
    id: UID,
    level: u64,
}

public struct Receipt has key {
    id: UID,
    total: u64,
}
```

Answer:
- Which of these can be stored inside another object's field?
- Which of these can be transferred to another address?
- Which of these can be freely duplicated in Move code?

### 5. Events

- What is the purpose of **events** in Sui Move?
- What ability must a struct have to be emitted as an event?
- Write a small event struct called `HeroCreated` with fields `hero_id: ID` and `creator: address`. Show the line of code that emits this event.

### 6. Shared Objects vs Owned Objects

- Explain the difference between `transfer::transfer` and `transfer::share_object`.
- What is the performance implication of using shared objects? Why should you prefer owned objects when possible?
- Give a real-world example where a shared object is necessary (e.g., a registry, a marketplace, a liquidity pool).

### 7. Parameter Passing

Explain the difference between these three function signatures:

```move
public fun level_up(hero: Hero)           // by value
public fun heal(hero: &mut Hero)          // mutable reference
public fun inspect(hero: &Hero)           // immutable reference
```

- When and why would you use each variant?

---

## Part C — Move Patterns (Module C1)

### 8. Capability Pattern

Look at the Capability module in `C1/`.

- Explain how the `AdminCap` object controls who can call `create_hero`.
- How does an existing admin grant admin rights to a new address? Write the Move function signature.
- What is the advantage of the capability pattern over hard-coding an admin address?

### 9. One-Time Witness (OTW) & Publisher

- What is a One-Time Witness in Sui Move? Why is it called "one-time"?
- What naming convention must the OTW struct follow?
- How does `package::claim_and_keep` work? What object does it produce?
- Can we claim the **Publisher** outside of the **init** function?
- Can **Publisher** be used for access control? If yes, why? If no, why?
- Why do we need to ensure that the Publisher object belongs to the current **module**?

### 10. Capability vs Publisher — Comparison

Fill in this comparison table:

| Property | Capability (AdminCap) | Publisher (OTW) |
|---|---|---|
| Number of authorized entities | can be many | 1 |
| Can be delegated? | ? | ? |
| Tied to module identity? | ? | ? |
| Created during `init`? | ? | ? |

### 11. Practical Exercise — Extend the Capability Module (Stretch Goal)

In the `C1/` capability module, add a new function called `revoke_admin` that:

1. Takes an `AdminCap` **by value** (not by reference).
2. Destroys the capability, effectively revoking admin access.
3. Write a test that creates an admin, revokes it, and then verifies the admin can no longer create heroes.

**Deliverable:** Paste your implementation and test output.

---

## Submission Guidelines

- Create a folder called `day2-submission/` in your personal repo.
- Include a markdown file with your written answers.
- Include Move source files for any code you wrote (exercises 2, 5, 11).
- Push your submission before the start of Day 3.
