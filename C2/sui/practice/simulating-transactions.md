# Simulating Transactions: Inspecting Gas Costs

## Using Sui CLI

```bash
# Dry run a transaction
sui client dry-run <TX_BYTES>

# Example: dry run a move call
sui client call \
  --package <PACKAGE_ID> \
  --module <MODULE_NAME> \
  --function <FUNCTION_NAME> \
  --args <ARGS> \
  --gas-budget <BUDGET> \
  --dry-run
```

## Using @mysten/sui SDK

```typescript
import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';

const client = new SuiJsonRpcClient({ url: getFullnodeUrl("NETWORK") }); 
// or new SuiClient({ url: getFullnodeUrl("NETWORK") }); for older versions

// Create your transaction
const tx = new Transaction();
tx.moveCall({
  target: `${packageId}::${module}::${function}`,
  arguments: [/* your args */],
});

// Dry run the transaction
// using: devInspectTransactionBlock
const devInspectResult = await client.devInspectTransactionBlock({
  transactionBlock: await tx.build({ client }),
  sender: '<SENDER_ADDRESS>', // required for devInspect
});

// using: dryRunTransactionBlock
// const dryRunResult = await client.dryRunTransactionBlock({
//   transactionBlock: await tx.build({ client }),
// });

// Access gas estimation and effects
console.log('Gas used:', dryRunResult.effects.gasUsed);
console.log('Status:', dryRunResult.effects.status);
console.log('Changes:', dryRunResult.effects.mutated);
```
