# C2: Gas & Storage Costs

Understanding transaction costs on Sui blockchain and Walrus protocol.

---

## What's This About

This module teaches you how those costs are calculated, how to estimate/calculate them before execution, and how to optimize your spending on both Sui and Walrus.

---

## Folder Structure

```
C2/
├── sui/                    # Sui blockchain gas costs
│   ├── theory/             # How gas fees work
│   ├── practice/           # Hands-on tests & examples
│   └── resources-utilities.md   # Resources and utilities
│
└── walrus/                 # Walrus storage costs
    ├── theory/             # How storage fees work
    ├── practice/           # Hands-on tests & examples
    └── resources-utilities.md   # Resources and utilities
```

---

## What You'll Learn

- How Sui calculates gas fees (computation + storage)
- The bucketing mechanism and why small optimizations might not matter
- How to simulate transactions before paying for them
- How Walrus uses two tokens (WAL + SUI) for storage
- Why small files are expensive and how to work around it
- Cost optimization strategies for both platforms

---

## Quick Tips

- Always simulate before executing (`--dry-run`)
- Sui gives ~99.9% rebate when you delete objects
- Walrus encodes data at ~5× the raw size — plan accordingly
- Check `resources-utilities.md` in each subfolder for calculators and tools
