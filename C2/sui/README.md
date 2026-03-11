# Sui Gas Costs

How transaction fees work on the Sui blockchain.

---

## Folder Structure

```
sui/
├── theory/
│   ├── 01-overview.md              # Gas basics, who pays, where it goes
│   ├── 02-computation-gas-cost.md  # OPCodes, computation units, bucketing
│   ├── 03-storage-gas-cost.md      # Storage units, pricing, rebates
│   └── 04-estimating-costs.md      # Simulation with CLI & SDK
│
├── practice/
│   ├── move/                       # Sample Move module for testing
│   ├── ts/                         # TypeScript gas benchmarks
│   └── simulating-transactions.md  # Code examples
│
└── resources-utilities.md          # Calculators, explorers, references
```

---

## What You'll Learn

- The gas formula: `Total = Computation Cost + Storage Cost`
- How bucketing rounds down computation costs (and why micro-optimizations might be pointless)
- Storage pricing and the 99.9% rebate for deleting objects
- How to simulate/estimate gas costs
- Real cost comparisons: data types, loops, vectors vs tables

---

## Quick Tips

- Smaller data types (u8) cost less storage than larger ones (u256)
- Tables have O(1) lookup, vectors have O(n) — this affects gas at scale
- Delete unused objects to get your storage fees back
