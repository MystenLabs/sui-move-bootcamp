## Estimating Walrus Gas Costs

Walrus offers few commands of which the output information can help estimating costs without submitting transactions, just as the Sui CLI and SDK.  

These estimations do not include the cost of the transaction in SUI(gas), to obtain this detail you need to simulate the transactions using the `Sui Client`  (more details can be found here: https://sdk.mystenlabs.com/walrus#writing-files)

### Via 'walrus-info' (CLI)
By running
```
walrus info
```
in the `walrus cli`, the current costs for buying storage resources from the system contract and cost of uploads can be seen, as well as other details of the Walrus protocol, including:
- Epochs and storage duration
- Storage nodes
- Blob size limits and storage unit
- Storage prices per epoch

### Using '--dry-run' (CLI)
You can estimate the cost of storing a determined file via the `walrus cli` by adding a `dry-run` flag to the `store` command:
```
walrus store --dry-run [...args]
```
The command will output useful informations, such as:
- Blob ID: The ID of the Blob that would be created in Walrus if committing/actually executing
- Encoded Size: The total size of the Blob (including metadata and encoding data)
- Cost to store as new blob: The total cost to store the file(s)

An example of estimating costs via this command can be found under:
[practice/cli/estimate.sh](../practice/cli/estimate.sh)

### Via 'storageCost' (@mysten/walrus SDK)
You can estimate the cost of storing a determined file via the `@mysten/walrus` Typescript SDK by using the `storageCost` method in a `WalrusClient` instance:
```
walrusClient.storageCost(SIZE, EPOCHS)
```
The output of this method will provide:
- Storage Cost
- Write Cost
- Total Cost

An example of estimating costs via this command can be found under:
[practice/ts/src/estimate.ts](../practice/ts/src/estimate.ts)
And can be run just by using `pnpm run dev`
