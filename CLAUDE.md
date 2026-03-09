# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the **Sui & Move Bootcamp**, an educational repository with 11 modules (A through K) teaching Sui blockchain development and Move programming. The `main` branch contains scaffolded projects with intentionally incomplete code for learners. Each module X has a corresponding `X-solution` branch with completed implementations.

## Build and Test Commands

All Move packages are independent. Run commands from within each package directory (where `Move.toml` lives):

```bash
# Build a specific Move package
cd G1/scenario && sui move build

# Run tests for a package
cd G1/scenario && sui move test

# Run a specific test
sui move test --filter test_name

# Publish to testnet
sui client publish --gas-budget 100000000
```

TypeScript projects (found in `ts/` subdirectories, plus `ts-scaffold/`, `K2/`, etc.) use npm or pnpm:

```bash
npm install && npm run dev     # development server
npm run build                  # production build
```

## Architecture

### Module Structure

Each top-level directory is a module lesson (e.g., `A4/`, `B1/`, `G2/`). Within each lesson:
- **Move packages**: Self-contained directories with `Move.toml`, `sources/`, and optionally `tests/`
- **TypeScript projects**: In `ts/` subdirectories with their own `package.json`
- **Shell scripts**: PTB demonstrations and deployment helpers (e.g., `C3/execute_ptb.sh`)

There are ~40 independent Move packages. They do not depend on each other. Each is a standalone example.

### Module Progression

- **A**: Sui introduction, first contract
- **B**: Move fundamentals (types, abilities, events)
- **C**: Advanced patterns (capabilities, OTW, PTBs, on-chain randomness)
- **D**: TypeScript SDK client interactions
- **E**: NFT minting and wallet integration
- **F**: Full DApp (frontend + contracts)
- **G**: Test scenarios, collections (Vector, VecMap, Bag, Option), dynamic fields, tables
- **H**: Package upgrades, security patterns (capability, witness, hot potato), vulnerability patterns
- **I**: Coins, treasury caps, closed-loop tokens, Kiosk, transfer policies
- **J**: Indexers, Prometheus/Grafana monitoring (includes `docker-compose.yml`)
- **K**: Advanced topics (ZKLogin demo with React frontend)

### Move Package Configuration

All packages use Move 2024 edition. The Sui framework dependency is auto-resolved by the package manager (v1.63+):

```toml
[package]
name = "package_name"
edition = "2024"

[dependencies]
```

### Scaffolding Pattern

The main branch has intentional TODOs and placeholder implementations. When contributing:
- Code on `main` should remain scaffolded (incomplete)
- Completed code goes on the corresponding solution branch
- PR checklist requires both `sui move build` and `sui move test` to pass

## Marp Slides

Some modules contain a `slides/` directory with [Marp](https://marp.app/) slide decks. Whenever a `slides/` directory exists (or is created), ensure it contains a `README.md` with usage instructions. Use `H1/slides/README.md` as the canonical template — copy its contents into any new `slides/README.md`.

## Key Patterns Used Across the Codebase

- **Hero theme**: Most modules use Hero/Sword/Weapon structs as teaching examples
- **test_scenario**: The standard pattern for Move tests, using `ts::begin(@ADDR)` and `test.next_tx(@ADDR)`
- **Capability pattern**: `AdminCap`, `StoreAdminCap` structs for access control
- **One Time Witness (OTW)**: Module-named uppercase structs for initialization (e.g., `SILVER` in I1)
- **Dynamic fields and tables**: G3 and beyond for flexible object storage
