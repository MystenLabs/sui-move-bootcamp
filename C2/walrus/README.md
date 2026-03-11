# Walrus Storage Costs

How storage pricing works on the Walrus decentralized storage protocol.

---

## Folder Structure

```
walrus/
├── theory/
│   ├── 01-overview.md            # Dual-token model (WAL + SUI)
│   ├── 02-operations-details.md  # Cost breakdown per operation
│   ├── 03-optimizing-costs.md    # Strategies to reduce spending
│   └── 04-estimating-costs.md    # CLI & SDK estimation methods
│
├── practice/
│   ├── cli/                      # Shell script examples
│   ├── ts/                       # TypeScript SDK examples
│   ├── test_file_small.txt       # Sample file for testing
│   └── test_file_medium.txt      # Sample file for testing
│
└── resources-utilities.md        # Cost calculators, docs, explorers
```

---

## What You'll Learn

- Why Walrus needs two tokens: WAL for storage, SUI for metadata
- How storage resources work (capacity + duration in epochs)
- Why you pay for encoded size (~5× raw), not file size
- Why small files are relatively expensive (metadata overhead)
- How to estimate/calculate costs
- Optimization tricks: Quilt, bulk purchasing, PTBs, storage rebates

---

## Quick Tips

- Small blobs (< 10 MB) are expensive relative to size — use Quilt to batch them
- Buy storage in bulk, not per-blob
- Burn blob objects after expiration to get SUI rebate back
- Use `walrus info` to see current pricing
