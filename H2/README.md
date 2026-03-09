# Sui & Move Bootcamp - H2: Advanced Move Patterns

##### What you will learn in this module:

This section demonstrates three fundamental Move patterns that are essential for building secure and flexible smart contracts on Sui. Each exercise is self-contained with its own README and detailed instructions.

## Exercises

### 1. [Capability Pattern](./capability_hero/)

Uses `AdminCap` objects with an ID-linked `for` field for fine-grained, per-object access control. A generic `HeroStore<T>` lets players buy weapons and armor, while only the correct store admin can add inventory or collect funds.

### 2. [Witness Pattern](./witness_hero/)

Uses Move's type system to implement module-level access control across two packages. The `weapon` package maintains an `AllowList` of authorized witness types, and the `hero` package passes its `HERO_WITNESS` to mint weapons — but only after the weapon deployer whitelists it.

### 3. [Display Pattern](./display_hero/)

Uses Sui's Display standard to define how `Hero` objects render in wallets and explorers. Template fields like `{name}` and `{blob_id}` interpolate object values at query time. Includes a TypeScript integration test that creates a Display via a programmable transaction block.

---

### Useful Links

- [Pattern: Capability](https://move-book.com/programmability/capability.html)
- [Pattern: Witness](https://move-book.com/programmability/witness-pattern.html)
- [Pattern: Display](https://move-book.com/programmability/display)
