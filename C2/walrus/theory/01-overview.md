## Walrus Gas Costs
Writing and updating data in Walrus costs gas.  
There are two different tokens necessary to pay for gas costs in Walrus:
- Walrus Token( WAL): for Walrus blob operations
- Sui Token (SUI): for pushing and updating the blob metadata in the Sui blockchain

The gas costs in WAL are represented in FROST units (the smallest unit of a WAL):
1 WAL = 1,000,000,000 FROST

### Storage Units
FROST gas costs are per `Storage Unit`, a Storage Unit is measured in Bytes.
Currently, a `Storage Unit` is equal to **1Mb**(1024Kb -> 1024*1024 Bytes).

### Sources of Costs
The sources of cost associated with Walrus Storage are:

- Acquiring storage resources
- Uploading blobs
- Creating Sui transactions
- Creating Sui objects on-chain

### WAL token Gas Costs
WAL token is used to pay gas for updating blobs in Walrus and the subsequent operations, such as:
- Acquiring storage resources
- Storing a Blob
- Updating a Blob

### SUI token Gas Costs
SUI token is used to pay gas for updating the data in the SUI blockchain, such as:
- Saving the blob metadata and the Blob object in Sui
- Extending a Blob duration

For details about Sui gas costs, refer to the `sui` folder of this module

### Big Picture Summary

- You need a **storage resource** to store blobs
- Costs are based on the **encoded size**, not raw file size
- **Small blobs are relatively expensive** due to fixed metadata
- Uploading blobs consumes **WAL**
- Storing blobs requires **Sui transactions and gas**
- Blobs live on-chain as **Sui objects**, with most SUI costs refundable