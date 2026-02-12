# Sui & Move Bootcamp - C4: On-Chain Randomness

This folder demonstrates how to use [Sui's native on-chain randomness](https://docs.sui.io/guides/developer/on-chain-primitives/randomness-onchain) - a secure source of unpredictable random values for smart contracts.

---

##### What you will learn in this module:

1. **Understanding On-Chain Randomness** - Why blockchain randomness is hard and how Sui solves it
2. **Using the Random Object** - How to generate random values in Move contracts
3. **Weighted Randomness** - Implementing probability distributions (e.g., sword drop rates)
4. **Security Best Practices** - Common pitfalls and how to avoid them
5. **End-to-End Integration** - Calling randomness functions from TypeScript

##### Key Concepts:

- The `Random` object at address `0x8`
- `RandomGenerator` and its methods
- `entry` functions for security
- PTB restrictions with randomness
- Test-and-abort attack prevention

---

## What is On-Chain Randomness?

Sui provides a native `Random` object (at address `0x8`) that generates random values. This enables use cases like:

- **Gaming**: Fair loot drops, dice rolls, card shuffles
- **Lotteries**: Unbiased winner selection
- **NFTs**: Random trait generation
- **DeFi**: Random participant selection

## Examples

### 1. Simple Example: Treasure Chest

A Move contract demonstrating randomness in a game context - a hero opens treasure chests at the blacksmith to receive random swords.

**Location**: [move/](move/)

**Features**:

- Weighted random sword drops (common to legendary)
- Random power generation
- Event emission for tracking

### 2. Full E2E Example: Plinko Game

A complete end-to-end application (frontend + backend + contracts) showcasing on-chain randomness in a real game accompanied by a detailed README file.

**Repository**: [github.com/MystenLabs/plinko-poc](https://github.com/MystenLabs/plinko-poc)

---

## Quick Start

### Prerequisites

- [Sui CLI](https://docs.sui.io/guides/developer/getting-started/sui-install) installed
- A Sui wallet with some (testnet) SUI for gas

### Build & Deploy

```bash
cd move

# Build the contract
sui move build

# Deploy to testnet
sui client publish
```

After publishing, note the `PackageID` from the output.

### Interact with the Contract

You can also use the pre-published contract on testnet. Find the `PackageID` in [Published.toml](move/Published.toml) under `published-at`.

#### Using the CLI Demo

The easiest way to try it out:

```bash
cd ts
pnpm install

# Copy the example env and fill in your credentials
cp .env.example .env

# Run the loot command
pnpm loot
```

Example output:

```
🎲 Treasure Chest - On-Chain Randomness Demo

📍 Using address: 0x...
💰 Balance: 1.2345 SUI

📦 Creating and opening treasure chest...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✨ You received a Legendary Sword with 87 power! ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Rarity: 🟨 Legendary (5%) - Power: 50-100

🔗 Transaction: https://testnet.suivision.xyz/txblock/...
```

#### Using Sui CLI

Create and open a treasure chest in a single PTB:

```bash
sui client ptb \
  --move-call "<PACKAGE_ID>::treasure_chest::create_chest" '""' \
  --assign chest \
  --move-call "<PACKAGE_ID>::treasure_chest::open_chest" chest @0x8 \
  --gas-budget 10000000
```

The `@0x8` argument is the address of Sui's native `Random` object.

#### Using TypeScript SDK

```typescript
import { Transaction } from "@mysten/sui/transactions";

const tx = new Transaction();

// Create a treasure chest and open it in one transaction
const chest = tx.moveCall({
  target: `${PACKAGE_ID}::treasure_chest::create_chest`,
  arguments: [tx.pure.string("")],
});

tx.moveCall({
  target: `${PACKAGE_ID}::treasure_chest::open_chest`,
  arguments: [chest, tx.object("0x8")], // or utilize the existing tx.object.random() function
});

const result = await client.signAndExecuteTransaction({
  transaction: tx,
  signer: keypair,
});
```

---

## How It Works

### Basic Usage Pattern

```move
use sui::random::{Random, new_generator};

entry fun my_random_function(random: &Random, ctx: &mut TxContext) {
    // 1. Create a generator from the Random object
    let mut generator = new_generator(random, ctx);

    // 2. Generate random values
    let random_u8 = generator.generate_u8();
    let random_u64 = generator.generate_u64();
    let random_bool = generator.generate_bool();
    let random_in_range = generator.generate_u8_in_range(1, 100);

    // 3. Use the values in your logic
    // ...
}
```

### Weighted Randomness Example

From our treasure chest contract - implementing weighted drop rates:

```move
let roll = generator.generate_u8_in_range(1, 100);

let (type_id, name) = if (roll <= 50) {
    (SWORD_WOODEN, b"Wooden Sword")      // 50% chance
} else if (roll <= 80) {
    (SWORD_IRON, b"Iron Sword")          // 30% chance
} else if (roll <= 95) {
    (SWORD_STEEL, b"Steel Sword")        // 15% chance
} else {
    (SWORD_LEGENDARY, b"Legendary Sword") // 5% chance
};
```

### Available Generator Methods

| Method                             | Description               |
| ---------------------------------- | ------------------------- |
| `generate_u8()`                    | Random u8 (0-255)         |
| `generate_u16()`                   | Random u16                |
| `generate_u32()`                   | Random u32                |
| `generate_u64()`                   | Random u64                |
| `generate_u128()`                  | Random u128               |
| `generate_u256()`                  | Random u256               |
| `generate_bool()`                  | Random boolean            |
| `generate_u8_in_range(min, max)`   | Random u8 in [min, max]   |
| ...                                | ...                       |
| `generate_u128_in_range(min, max)` | Random u128 in [min, max] |
| `generate_bytes(length)`           | Random byte vector        |
| `shuffle(vector)`                  | Randomly shuffle a vector |

---

## Security Best Practices

### 1. Random Calls Must Be Last in PTB

Sui enforces this to prevent "test-and-abort" attacks where an attacker could inspect the random result and abort the transaction if unfavorable, effectively allowing unlimited retries until they get a desired outcome.

Sui allows commands **before** a Random-consuming call, but rejects any commands **after** it:

```bash
# ALLOWED - commands before Random, Random call is last
create_chest(...)        # ✓ before Random
open_chest(..., @0x8)    # ✓ Random call is last

# REJECTED - commands after Random call
open_chest(..., @0x8)    # Random call
do_something_else(...)   # ✗ not allowed after Random
```

This is why our PTB works - `open_chest` is the final command.

### 2. Use `entry` Functions

Mark randomness-consuming functions as `entry` to prevent other Move modules from calling them:

```move
// GOOD: Other modules cannot call this
entry fun open_chest(chest: TreasureChest, random: &Random, ctx: &mut TxContext) { ... }

// BAD: Other modules could compose this unexpectedly
public fun open_chest(chest: TreasureChest, random: &Random, ctx: &mut TxContext) { ... }
```

**Why?** The PTB restriction handles direct transaction composition, but `entry` adds defense against cross-module composition attacks.

### 3. Don't Accept RandomGenerator as Parameter

```move
// GOOD: Create generator internally
entry fun open_chest(random: &Random, ctx: &mut TxContext) {
    let mut gen = new_generator(random, ctx);
    // ...
}

// BAD: Generator passed from outside
entry fun open_chest(gen: &mut RandomGenerator) {
    // Attacker could manipulate the generator
}
```

### 4. Balance Resource Usage

Design functions so all outcome paths consume similar gas:

```move
entry fun open_chest(chest: TreasureChest, random: &Random, ctx: &mut TxContext) {
    let mut gen = new_generator(random, ctx);
    let roll = gen.generate_u8_in_range(1, 100);

    // All paths create a sword and emit an event - similar gas cost
    let sword = if (roll <= 95) {
        create_common_sword(ctx)
    } else {
        create_legendary_sword(ctx)  // Same operations, different values
    };

    emit(ChestOpened { ... });
    transfer::transfer(sword, ctx.sender());
}
```

**Why?** An attacker could set a gas budget that only succeeds on favorable outcomes, effectively retrying until they get legendary swords.

### 5. Consider Two-Transaction Pattern

For high-stakes applications, split into two transactions:

1. **Commit**: Generate and store the random value
2. **Reveal**: Read the stored value and execute logic

This prevents attackers from seeing the result before committing resources.

---

## Understanding the Plinko Example

The [Plinko PoC](https://github.com/MystenLabs/plinko-poc) demonstrates a complete implementation:

### Contract Structure

```
plinko/
├── sources/
│   ├── plinko.move      # Main game logic
│   └── house_data.move  # House configuration & balance
```

### Key Concepts

1. **Game Creation**: Player bets SUI to start a game
2. **Random Ball Drops**: Each ball's path is determined by 12 random bytes
3. **Multiplier Calculation**: Final position determines payout multiplier
4. **Payout**: Winnings transferred from house balance to player

### Randomness Flow in Plinko

```move
// Create generator from Random object
let mut random_generator = random.new_generator(ctx);

// For each ball dropped
while (ball_index < num_balls) {
    // Generate 12 random bytes for the ball's path
    let mut i = 0;
    while (i < 12) {
        let byte = random_generator.generate_u8_in_range(0, 255);
        // Even byte = go right, Odd byte = go left
        state = if (byte % 2 == 0) { state + 1 } else { state };
        i = i + 1;
    };
    // state determines which multiplier bucket the ball lands in
}
```

---

## Troubleshooting

### "Cannot compose Random with other commands"

Sui blocks programmable transaction blocks that have commands after a `Random`-consuming call. Solutions:

1. Make your randomness function the last call in the transaction
2. Use the `entry` modifier on your function
3. Split into multiple transactions if needed

### "Randomness not available"

The `Random` object (`0x8`) is only available on:

- Mainnet
- Testnet
- Devnet

It's not available in local development without special setup.

---

## Self-Study Exercises

Now that you've learned the concepts, try these exercises to deepen your understanding:

### Exercise 1: Modify Drop Rates

Modify the treasure chest contract to have different drop rates:

- 40% Wooden Sword
- 35% Iron Sword
- 20% Steel Sword
- 5% Legendary Sword

**Hint:** Adjust the `roll` comparisons in `open_chest`.

### Exercise 2: Add a New Sword Tier

Add a "Mythic Sword" with a 1% drop chance. This should be the rarest sword.

### Exercise 3: Implement a Dice Roll Function

Create a new function `roll_dice` that:

- Takes a number of dice (1-6) as input
- Returns the sum of all dice rolls (each die is 1-6)

```move
public fun roll_dice(num_dice: u8, random: &Random, ctx: &mut TxContext): u64 {
    // Your implementation here
}
```

### Exercise 4: Shuffle a Vector

Write a function that takes a vector of items and returns them in a random order.

**Hint:** Look at the `shuffle` method in the generator methods table.

### Exercise 5: Explore the Plinko Repository

Clone and study the [Plinko PoC](https://github.com/MystenLabs/plinko-poc):

1. Read through `plinko.move` and identify where randomness is used
2. Understand how the house balance is managed
3. Note how the game handles the two-phase commit pattern
4. Try deploying it to testnet and playing a few rounds

---

## Code Walkthrough

### Understanding the Treasure Chest Contract

Let's walk through [treasure_chest.move](move/sources/treasure_chest.move) step by step:

**1. Sword Constants (Lines 12-16)**

```move
const SWORD_WOODEN: u64 = 1;
const SWORD_IRON: u64 = 2;
const SWORD_STEEL: u64 = 3;
const SWORD_LEGENDARY: u64 = 4;
```

These constants define sword types. Using constants instead of magic numbers makes the code readable and maintainable.

**2. Structs (Lines 18-39)**

- `TreasureChest` - The chest object that gets destroyed when opened
- `Sword` - The reward item with type, name, and power
- `ChestOpened` - Event for off-chain tracking

**3. The `open_chest` Function (Lines 58-103)**
This is where the magic happens. Notice:

- It's marked `entry` (security requirement)
- Takes `&Random` reference (not a generator)
- Creates the generator internally
- Uses weighted randomness for swords
- Different power ranges based on rarity

### Understanding the TypeScript Client

The [chest.ts](ts/src/chest.ts) file demonstrates:

- Environment setup with dotenv
- SuiClient initialization
- Building a PTB with multiple Move calls
- Parsing events from transaction results

---

## Review Questions

Test your understanding with these questions:

1. **Why must random-consuming functions use `entry` instead of `public`?**
   <details>
   <summary>Answer</summary>
   To prevent other modules from composing calls in ways that could manipulate outcomes. The `entry` modifier ensures the function can only be called directly from a transaction.
   </details>

2. **Why is the Random object at a fixed address (0x8)?**
   <details>
   <summary>Answer</summary>
   It's a system object created at genesis. Having a fixed address means all contracts can reliably access it without passing object IDs around.
   </details>

3. **What happens if you try to call another function after a random-consuming call in a PTB?**
   <details>
   <summary>Answer</summary>
   Sui will reject the transaction. Random calls must be the last operation to prevent test-and-abort attacks.
   </details>

4. **Why should all outcome paths in a random function have similar gas costs?**
   <details>
   <summary>Answer</summary>
   An attacker could set a low gas budget that only succeeds on certain outcomes. If rare swords cost more gas to create, the attacker could retry until they get common swords cheaply, then increase the budget only when they've observed a legendary roll.
   </details>

5. **When would you use the two-transaction commit-reveal pattern?**
   <details>
   <summary>Answer</summary>
   For high-stakes applications where seeing the random value before committing resources would give an unfair advantage. The commit phase locks in the user's choice, and the reveal phase uses randomness.
   </details>

---

## Useful Links

- [Official Sui Randomness Documentation](https://docs.sui.io/guides/developer/on-chain-primitives/randomness-onchain)
- [Plinko PoC Repository](https://github.com/MystenLabs/plinko-poc)
- [Sui Move Framework - Random Module](https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/random.move)
- [Move Book - Randomness](https://move-book.com/guides/randomness.html)
