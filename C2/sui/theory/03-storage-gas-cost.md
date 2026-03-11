## Storage Gas Cost
Another factor that determines the gas price is the Storage Gas Cost (SGC).
Storage Gas Cost represents the cost for Storing data in the blockchain.
For every data(assets/objects) actually stored in the blockchain, the cost of transaction will increase accordingly.

Storage cost depends on three factors:
- Storage Units(SU): Size of the storage
- Storage Price(SP): Price reference per SU, in MIST(Sui Units)
- Storage Rebate(SB): Refund, for freeing/removing data from the chain

The final formula for the Storage Cost is:
```
SGC = (SU * SP) - SB
```
The Storage Cost is fixed and independent of the CC.

### Storage Units
Similar to the CUs, SUs represent the size of the data that is stored during a transaction.
The larger the size, the more the units.

At the time this doc was written,
for every Byte written in the blockchain, the actual SU value is:
1 Byte = 100 SU

So, for example:
```
100 Bytes = 100,000 SU
1Kb = 102,400 SU
...n bytes = 100 * n
```

### Storage Price
Storage Price, or Storage Gas Price, is the reference price in MIST that is used to determine the final Gas Cost.
This price represents the amount of MIST paid for every SU.
Similarly to the Gas Price(for CUs), the SP is determined through governance proposals by the Consensus.
SP usually reflects the off-chain dollar($) cost of data storage and it is updated 

### Storage Rebate
Storage Rebate represents the amount of SUI tokens an user can earn by freeing onchain data.
At the time of the writing of this document, storage rebate on an object is equivalent to 99.9% of the fees paid to create it.
This means that, if at some point some objects become unused or not necessary, developers and users who own them can actually delete them from the blockchain, and earn SUI back!
