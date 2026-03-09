# Package Upgrades

On Sui, published packages are **immutable objects**. Once published, their bytecode never changes. But iterative development requires the ability to fix bugs, add features, and evolve logic. Package upgrades solve this by letting you publish a new version of a package that is linked to the original.

## How Upgrades Work

When you publish a package, Sui creates an **`UpgradeCap`** object and sends it to the publisher. This capability authorizes future upgrades.

The upgrade flow:

1. **Authorize** -- Present the `UpgradeCap` to get an `UpgradeTicket`
2. **Publish** -- Submit the new bytecode with the ticket
3. **Commit** -- Receive an `UpgradeReceipt` confirming the upgrade

The new package version gets its own address but is linked to the original. Existing objects retain their types from the original package -- the type system ensures continuity.

## Compatibility Rules

Upgrades must maintain backward compatibility:

| Allowed | Not Allowed |
|---|---|
| Add new modules | Remove existing modules |
| Add new functions (including `public`) | Change `public` function signatures |
| Add new structs | Change existing struct layouts (fields, abilities) |
| Change function bodies (private, `public(package)`) | Change `public` function parameter/return types |
| Add new error constants | Remove `public` functions |
| Remove generic type constraints from existing functions | |

Key points:
- **`init` does NOT re-run** on upgrade. Any new initialization logic must be handled separately.
- **Private and `public(package)` function signatures** can change freely -- only `public` functions are part of the compatibility contract.
- **New structs** can be added, but existing struct definitions are frozen.

## Upgrade Policies

The `UpgradeCap` controls what kinds of upgrades are allowed. Sui provides four built-in policies, ordered from most to least permissive:

| Policy | What It Allows |
|---|---|
| **compatible** (default) | Any upgrade that satisfies the compatibility rules above |
| **additive** | Only add new functionality; cannot change existing function bodies |
| **dependency-only** | Only change dependencies; cannot modify any module code |
| **immutable** | No upgrades ever; package is permanently frozen |

Policies can only become **more restrictive** over time -- you can move down this list but never back up.

To restrict:

- **Make immutable**: Call `upgrade_cap.make_immutable()` to permanently prevent upgrades.
- **Restrict to additive**: Call `upgrade_cap.only_additive_upgrades()`.
- **Restrict to dep-only**: Call `upgrade_cap.only_dep_upgrades()`.
- **Custom policies**: Wrap the `UpgradeCap` in a custom module that enforces additional rules (e.g., timelock, governance vote, multisig).

## Versioned Shared Objects Pattern

A common challenge: after upgrading, you want users to use the new package version's functions, not the old ones. Since old package versions remain on-chain, nothing technically prevents calling them.

The solution is a **versioned shared object** -- a shared object that tracks the current package version and also holds useful state:

```move
module my_package::training_ground;

const EInvalidPackageVersion: u64 = 0;
const VERSION: u64 = 1;

public struct TrainingGround has key {
    id: UID,
    version: u64,
    xp_per_level: u64,
}

fun init(ctx: &mut TxContext) {
    transfer::share_object(TrainingGround {
        id: object::new(ctx),
        version: VERSION,
        xp_per_level: 100,
    })
}

public fun check_is_valid(self: &TrainingGround) {
    assert!(self.version == VERSION, EInvalidPackageVersion);
}
```

Public functions that mutate shared state should take `&TrainingGround` and call `check_is_valid()`. When you upgrade:

1. Bump the `VERSION` constant in the new code
2. Add a `migrate` function that updates the shared object's `version` field (and any other config)
3. After publishing the upgrade, call `migrate` to activate the new version
4. Old package functions now fail the version check

This gives you a controlled migration: publish the upgrade, verify it works, then flip the switch by calling `migrate`.

## User Migration

After an upgrade:

- **Old objects persist**: Objects created by v1 still exist with their original type. The type is shared across all versions of the package.
- **Migration functions**: You can provide functions that transform old objects to work with new logic, or that transfer assets from deprecated structures to new ones.
- **Phased migration**: Deprecate old functions (make them abort with a descriptive error), add new functions with updated behavior, and give users time to transition.

---

# Hands-On Exercise: Upgrading the Hero Package

In this exercise you will publish the Hero game package (`package_upgrade/`), train and level up heroes, then upgrade the package to rebalance the training mechanics.

## Prerequisites

- Sui CLI installed and configured
- Working directory: `H1/package_upgrade/`

## Step 1: Setup

```bash
# Make sure you have a local network configured as an environment
sui client new-env --alias localnet --rpc http://127.0.0.1:9000
```

```bash
# Start the local network
RUST_LOG="off,sui_node=info" sui start --with-faucet --force-regenesis
```

```bash
# Switch to the local network
sui client switch --env localnet
```

```bash
# Get some localnet SUI
sui client faucet
```

```bash
# Set your localnet id on Move.toml
sui client chain-identifier
```

## Step 2: Build and Publish v1

```bash
cd H1/package_upgrade
sui client test-publish --build-env localnet
```

From the publish output, note three values:

| Value | Where to Find |
|---|---|
| **Package ID** | The `Published Objects` section, the new package address |
| **UpgradeCap ID** | In `Created Objects`, the object with type `0x2::package::UpgradeCap` |
| **TrainingGround ID** | In `Created Objects`, the object with type `<pkg>::training_ground::TrainingGround` |

> Tip: Use `sui client objects` to list all objects owned by your address.

## Step 3: Play the Game

Mint a hero:

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module hero \
  --function mint_hero
```

Note the **Hero object ID** from the output. You can inspect it:

```bash
sui client object <HERO_ID>
```

You should see a `Hero` with `lvl: 1`, `xp: 0`, and `xp_2_lvl_up: 100`.

Now train the hero twice (each training session gives 50 XP):

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module training_ground \
  --function train \
  --args <TRAINING_GROUND_ID> <HERO_ID>
```

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module training_ground \
  --function train \
  --args <TRAINING_GROUND_ID> <HERO_ID>
```

The hero now has 100 XP -- enough to level up:

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module training_ground \
  --function level_up \
  --args <TRAINING_GROUND_ID> <HERO_ID>
```

Inspect the hero again:

```bash
sui client object <HERO_ID>
```

You should see `lvl: 2`, `xp: 0`, `xp_2_lvl_up: 200` (level × 100 XP per level).

## Step 4: Modify Code for v2

Now make the following changes to upgrade the package and rebalance the training mechanics:

### 4a. Rebalance the TrainingGround (`sources/training_ground.move`)

Bump the `VERSION` constant from `1` to `2` and add a `migrate` function that updates both the version and the XP-per-level configuration. Deprecate the old `train` function and add `train_v2` with reduced XP gain:

```move
const VERSION: u64 = 2;  // bumped from 1

const EUseTrainV2Instead: u64 = 2;

/// Migrate the shared object to v2: update version and rebalance xp_per_level.
public fun migrate(self: &mut TrainingGround) {
    self.version = VERSION;
    self.xp_per_level = 150;  // rebalanced from 100
}

/// Deprecated -- use train_v2 instead.
public fun train(_self: &TrainingGround, _hero: &mut Hero) {
    abort EUseTrainV2Instead
}

/// Train a hero (v2): grants 30 XP per session instead of 50.
public fun train_v2(self: &TrainingGround, hero: &mut Hero) {
    self.check_is_valid();
    hero.add_xp(30);
}
```

## Step 5: Upgrade the Package

```bash
sui move build
sui client test-upgrade --upgrade-capability <UPGRADE_CAP_ID>
```

Note the **new Package ID** from the output.

## Before Migrating: The Version Gap

The upgrade is published, but the on-chain `TrainingGround` still has `version: 1`. The new package code expects `VERSION = 2`, so the version check will fail:

```bash
# Try train_v2 through the NEW package — fails!
sui client call \
  --package <NEW_PACKAGE_ID> \
  --module training_ground \
  --function train_v2 \
  --args <TRAINING_GROUND_ID> <HERO_ID>
```

This aborts with `EInvalidPackageVersion` because `TrainingGround.version` (1) ≠ `VERSION` (2).

Meanwhile, the **old package still works** — its compiled code has `VERSION = 1`, which still matches the object:

```bash
# Train through the OLD package — still works!
sui client call \
  --package <PACKAGE_ID> \
  --module training_ground \
  --function train \
  --args <TRAINING_GROUND_ID> <HERO_ID>
```

This succeeds and grants 50 XP as before.

> **This is the controlled migration window.** The upgrade is live on-chain but not yet activated. Users can still use the old package until you call `migrate` to flip the switch. This is why the versioned shared object pattern is powerful — it decouples publishing from activation.

## Step 6: Migrate

Call `migrate` on the TrainingGround using the **new** package ID:

```bash
sui client call \
  --package <NEW_PACKAGE_ID> \
  --module training_ground \
  --function migrate \
  --args <TRAINING_GROUND_ID>
```

After this, the TrainingGround's `version` is `2` and `xp_per_level` is `150`.

## Step 7: Observe the Differences

### Old `train` now fails

```bash
sui client call \
  --package <NEW_PACKAGE_ID> \
  --module training_ground \
  --function train \
  --args <TRAINING_GROUND_ID> <HERO_ID>
```

This will abort with `EUseTrainV2Instead`.

### New `train_v2` works with reduced XP

```bash
sui client call \
  --package <NEW_PACKAGE_ID> \
  --module training_ground \
  --function train_v2 \
  --args <TRAINING_GROUND_ID> <HERO_ID>
```

This succeeds and grants 30 XP (down from 50 in v1).

### Level up uses rebalanced XP curve

Train enough times and level up again. With `xp_per_level` now set to `150`, the hero needs `lvl * 150` XP to reach each new level -- a harder grind than v1's `lvl * 100`.

### Compare v1 vs v2 heroes

Mint a new hero using the v2 package and train both heroes. The v1 hero (migrated) and the v2 hero share the same `Hero` type but experience the rebalanced mechanics: 30 XP per training session (down from 50) and 150 XP per level (up from 100).

## Further Reading

- [Package Upgrades Documentation](https://docs.sui.io/concepts/sui-move-concepts/packages/upgrade)
- [Upgrade Requirements](https://docs.sui.io/concepts/sui-move-concepts/packages/upgrade#upgrade-requirements)
- [Versioned Shared Objects](https://docs.sui.io/concepts/sui-move-concepts/packages/upgrade#versioned-shared-objects)
- [Custom Upgrade Policies](https://docs.sui.io/concepts/sui-move-concepts/packages/custom-policies)
