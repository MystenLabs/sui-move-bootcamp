## Computation Gas Cost
One of the factors that determines the total gas paid per transaction is the Computation Gas Cost (CGC).
Computation Gas Cost can be interpreted as the "Computation cost for the machine to execute instructions".

The final CGC for a transaction is determined by 2 Factors:
- Computation Cost (CC): The sum of all the operations' computational costs, in Computation Units (CUs)
- Computation Gas Price (CGP): The consensus-determined reference Gas Price at the current Blockchain epoch, in MIST(SUI units)

And is calculated as follows:
```
CGC = CC * CGP
```

### Bucketing
An important feature of the Sui blockchain is the Bucketing mechanism.
Thanks to this approach, the CGC of transactions can positively reduce, and the developers can sometimes avoid very strict gas optimizations of small units of CUs.
Buckets are represented as ranges of CUs, where the final CUs actually "charged" by the blockchain will be the lower threshold.
The logic behind bucketing is that: if two transactions of which CCs fall in the same bucket, they will both translate in the same CC.

For example:
- Bucket #1: Range 1001-5000 CUs
- Tx1 CGC: 1001 CUs
- Tx2 CGC: 4999 CUs
Since they fall under the same bucket, at the time of the execution, the blockchain will charge only for 1,001 CUs as Computation Cost, even if Tx2 has higher CC!

### The blockchain's "low level language": Bytecode
Every smart contract, and thus every single line of it, when compiled and published, is translated into Bytecode.
We can think about Bytecode as the "low level" binary language for the Blockchain, and it is indeed what the SuiVM will interpret.
When the SuiVM reads bytecodes, internally, it will also determine which operations will be executed inside it, those operations are low level instructions.
Behind the scenes, what the SuiVM achieves is indeed something like what a CPU in a normal computer does.

A CPU interprets ASM and Binary code, and "decodes" the instructions behind them: (ALLOC, ADD, ...), SuiVM achieves the same in a higher level.
The equivalent of a CPU's assembly instructions, are what we call in the blockchain the OPCodes.

### Computation Cost and Computation Units
Every operation(instruction) has its own OPCode, and every OPCode has its Computation Cost (CC), in Computation Units (CU).
The total sum of the CU of single opcodes, will translate into the final CC.

### Pseudo Example of OPCodes and Computation Costs
In the following examples, we can see a high level overview of how CC would look like in a transaction.
The following CUs, CC, and operations are for demostration purposes only and do not reflect the actual SuiVM's.
For simplicity, we will assume that the size of the items is always 1.
Let's assume we have the following (mock) OPCodes/Instructions and their respective CUs:
```code
- ALLOC (A): 1000 CU
- LOAD (L): 100 CU
- COPY (C): 10 CU
- SUM (S): 1 CU
```
And the following code(pseudo):
```code
fun f(): u64 {
    let a = 1; // CU: 1 * A = 1000 CU
    let c = *a; // CU: (1 * A) + (1 * L) + (1 * C) = 1110 CU
    x + y + z + a // CU: (n * L) + (n * S) = 400 + 4 = 404 CU
}
```
The total expected CC of the above will be:
1000 + 1110 + 404 = 2514 CU
