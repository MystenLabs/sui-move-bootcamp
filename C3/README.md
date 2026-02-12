# Sui & Move Bootcamp

## Programmable Transaction Blocks (PTBs)

This section introduces Programmable Transaction Blocks (PTBs) in Sui, demonstrating how they enable atomic multi-step transactions and flexible smart contract composition.

## What are PTBs?

Programmable Transaction Blocks (PTBs) are a powerful feature in Sui that allows you to:
- Execute multiple operations atomically in a single transaction
- Compose smart contract calls dynamically on the client side
- Create flexible transaction flows without requiring smart contract upgrades

## Example 1: Coin Splitting and Transfer

### Traditional Approach (2 Transactions)
In traditional blockchains, splitting a coin and transferring it would require two separate transactions:
1. Split the coin into smaller amounts
2. Transfer the newly created coin

This approach has several drawbacks:
- Non-atomic execution (transactions can fail independently)
- Higher gas costs (two separate transactions)
- More complex error handling

### PTB Approach (1 Transaction)
Using PTBs, we can combine these operations into a single atomic transaction:
```bash
sui client ptb \
    --split-coins @$COIN_ID [1000000000] \
    --assign coin \
    --transfer-objects [coin] @RECIPIENT_ADDRESS
```

Benefits:
- Atomic execution (all operations succeed or fail together)
- Lower gas costs (single transaction)
- Simpler error handling
- Better user experience

## Example 2: Dynamic Smart Contract Composition

### Traditional Approach
In traditional blockchains, smart contract composition is static and requires:
1. Direct dependencies between contracts
2. Contract upgrades for new functionality
3. Fixed function implementations

Example: A greeting event emitter that depends on:
- `age_calculator`: Calculates age from birth date
- `names_indexer`: Provides name lookups
- `weather_oracle`: Provides weather information

To change the greeting format (e.g., exclude weather), you would need:
1. A new function in the contract
2. A contract upgrade
3. Deployment of the new version

### PTB Approach
With PTBs, we can compose smart contract calls dynamically on the client side:
1. Define a simple event structure in `my_event_emitter_ptb`
2. Compose the greeting dynamically using PTBs
3. Call external contracts as needed

Benefits:
- No direct contract dependencies
- Flexible composition without upgrades
- Dynamic data gathering
- Customizable output formats

## Implementation Details

The example includes several smart contracts:
- `age_calculator`: Calculates age from birth date
- `names_indexer`: Provides name lookups
- `weather_oracle`: Provides weather information
- `my_event_emitter_ptb`: Simple event emitter

The PTB script demonstrates how to:
1. Create a greeting string
2. Get weather information
3. Look up a name
4. Calculate age
5. Combine all information into a custom greeting
6. Emit the event

## Learning Objectives

By completing this section, you will understand:
1. How PTBs enable atomic multi-step transactions
2. The advantages of dynamic smart contract composition
3. How to use the Sui client for PTB execution
4. Best practices for flexible smart contract design
5. How to combine multiple contract calls in a single transaction

## Getting Started

1. Review the `split_and_transfer.sh` script to understand basic PTB usage
2. Study the `execute_ptb.sh` script to see complex PTB composition
3. Explore the smart contracts to understand their individual functionalities
4. Try modifying the PTB script to create different greeting formats

