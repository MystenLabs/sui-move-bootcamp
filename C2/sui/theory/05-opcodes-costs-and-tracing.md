## Low-level Instructions (OPCodes), Computation Costs Deep-Dive, and Tracing in Tests

Have you ever wondered what happens low-level, "under the hood", when you call a function, change a value, access memory or any other operation in smart contracts?
In the previous material (02-computation-gas-cost), we introduced OPCodes and how they relate to Computation Cost and Computation Units.
Here, we will go deeper into the actual low-level instructions that the MoveVM executes, their gas costs, how to trace them, and what happens to gas when transactions fail.

### Low-level Instructions: OPCodes
Low-level instructions(often referred to as OPCodes) are the "core" of a smart contract execution.
Think about them as the "assembly instructions", the "native language" for the blockchain's VM.

Every single action you write in your Move code, no matter how small, translates into one or more OPCodes.
Declaring a variable, borrowing a reference, calling a function, adding two numbers, packing a struct, even returning a value -- all of these are OPCodes under the hood.
There is no "free" operation: if you wrote it in your smart contract, the MoveVM will execute it as an OPCode, and it will cost gas.

Each one of these instructions has its own gas cost.
For example, mutably borrowing a value, translates at runtime into an OPCode, that can be: MutBorrowLoc.
This is what the MoveVM will actually see and execute.

A simple, high level example:
```code
fun example(x: u64): u64 {
    let y = x + 1;  // This line alone involves multiple OPCodes:
                     // CopyLoc (read x) -> LdU64 (load the constant 1) -> Add (sum them) -> StLoc (store into y)
    y                // And returning: MoveLoc (move y to the return value)
}
```
As you can see, even a one-liner like "let y = x + 1" is not a single operation for the VM; it is a sequence of OPCodes, each with its own cost.

### Where to find SUI's OPCodes
SUI's low-level instructions(OPCodes) can be found in the Move source code, specifically under the Bytecode enum:
Learn more at: https://github.com/MystenLabs/sui/blob/main/external-crates/move/crates/move-binary-format/src/file_format.rs

Some examples of OPCodes you will find there:
```code
- MoveLoc: Move a value from a local variable
- CopyLoc: Copy a value from a local variable
- StLoc: Store a value into a local variable
- MutBorrowLoc: Mutably borrow a local variable
- ImmBorrowLoc: Immutably borrow a local variable
- Add: Add two integers
- Sub: Subtract two integers
- Call: Call a function
- Pack: Pack a struct
- Unpack: Unpack a struct
- ...and many more
```

### Gas Cost per OPCode
Every OPCode has its own Gas Cost(and/or units), and the total sum of them will be the total Computation Gas Cost(and/or computation units) spent/used by the transaction.
The actual cost per OPCode can be found in the Move interpreter source code:
Learn more at: https://github.com/MystenLabs/sui/blob/main/external-crates/move/crates/move-vm-runtime/src/interpreter.rs

By inspecting and diving into the source code's modules, you can see in the end the cost per operation.
This is useful for understanding exactly where your gas is being consumed and for performing fine-grained gas optimizations.

### What happens when a Transaction fails: Partial Gas Refund
An important detail about gas on failed transactions: when a Tx fails, you do NOT get a 100% "refund" of the gas you paid to execute it.
The blockchain will only refund the unspent gas.

Consider the following scenario:
```code
- call1: OK        -> gas consumed
- call2: OK        -> gas consumed
- call3: REVERT    -> gas consumed up to the revert point
- call4: not executed (reverted on call3)
- ...callN: not executed (reverted on call3)
```
The gas you get back is only the gas from the instructions that were never executed(from call3's revert point onwards).
call1 and call2 still used resources, so you pay gas for them.
In other words: the gas budget you set minus the gas actually consumed by executed instructions, is what you get back, not the full budget.

### Tracing Calls in Tests
By tracing tests, you can see:
- The ordered low-level ops/calls in a test function(e.g. when you called "fun X", what exactly happened under the hood?)
- The gas cost per every instruction(comparing previous instruction's gasLeft - current instruction's gasLeft)
- And much more

You can trace all the low-level instructions/calls in tests by adding --trace at the end of your test command, e.g.:
```
sui move test --trace
```
The output of this will be saved under a new "traces" folder in your project directory.
The files will be in .zst(Zstandard-compressed binary) format, that your IDE(s) are able to read.

### Reading the Trace Output
You can also read and decompress the trace output from the command line, using zstd:
```
zstd -d traces/<trace-file>.zst -o trace-output.json
```
Or, if you have zstdcat available:
```
zstdcat traces/<trace-file>.zst
```
Once decompressed, the trace output shows you the full sequence of OPCodes executed, along with their gas consumption, giving you a complete picture of what happened under the hood during your test execution.
This way, you can actually verify at a very low level the exact operations that occurred, see the gas cost per instruction, and understand the full lifecycle of your function calls.
