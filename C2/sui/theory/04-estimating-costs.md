# Estimating Sui Gas Costs: Simulating Transactions

Dry running (simulating) allows you to execute a transaction locally, enabling you to estimate gas costs and verify transaction outcomes, without submitting it to the network and thus committing actual execution.

## Using Sui CLI

By adding a `--dry-run` flag, the client will simulate the execution(without actually executing it) and displays gas usage, effects, and return values without broadcasting the transaction.

An example of this can be found in [practice/simulating-transactions.md](../practice/simulating-transactions.md) (under "Using Sui CLI")

## Using @mysten/sui SDK

The `SuiClient` (JSON-RPC, gRPC, etc.) provides two methods for simulation:
- `dryRunTransactionBlock` - Simulates execution and returns gas usage and effects
- `devInspectTransactionBlock` - Provides more detailed inspection, including return values and requires a sender address

Both methods execute the transaction locally(without committing to the blockchain) and show outputs and gas costs, similar to the CLI's `--dry-run` flag.

An example of this can be found in [practice/simulating-transactions.md](../practice/simulating-transactions.md) (under "Using @mysten/sui SDK")

## Key Benefits

- **Gas estimation**: See exact gas costs before committing
- **Validation**: Verify transaction logic without spending SUI
- **Debugging**: Identify errors before execution
- **Cost optimization**: Compare different approaches to minimize fees