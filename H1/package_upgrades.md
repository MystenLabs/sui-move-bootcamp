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

The solution is a **Version** shared object:

```move
module my_package::version;

const EInvalidPackageVersion: u64 = 0;
const VERSION: u64 = 1;

public struct Version has key {
    id: UID,
    version: u64,
}

fun init(ctx: &mut TxContext) {
    transfer::share_object(Version {
        id: object::new(ctx),
        version: VERSION,
    })
}

public fun check_is_valid(self: &Version) {
    assert!(self.version == VERSION, EInvalidPackageVersion);
}
```

Public functions that mutate shared state should take `&Version` and call `check_is_valid()`. When you upgrade:

1. Bump the `VERSION` constant in the new code
2. Add a `migrate` function that updates the shared `Version` object's `version` field
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

In this exercise you will publish the Hero game package (`package_upgrade/`), interact with it, then upgrade it to add paid minting.

## Prerequisites

- Sui CLI installed and configured
- An active Sui address with testnet SUI (use `sui client faucet` if needed)
- Working directory: `H1/package_upgrade/`

## Step 1: Build and Publish v1

```bash
cd H1/package_upgrade
sui move build
sui client publish --gas-budget 100000000
```

From the publish output, note three values:

| Value | Where to Find |
|---|---|
| **Package ID** | The `Published Objects` section, the new package address |
| **UpgradeCap ID** | In `Created Objects`, the object with type `0x2::package::UpgradeCap` |
| **Version ID** | In `Created Objects`, the object with type `<pkg>::version::Version` |

> Tip: Use `sui client objects` to list all objects owned by your address.

## Step 2: Interact with v1

Mint a free hero:

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module hero \
  --function mint_hero \
  --args <VERSION_ID> \
  --gas-budget 10000000
```

Note the **Hero object ID** from the output. You can inspect it:

```bash
sui client object <HERO_ID>
```

You should see a `Hero` with `health: 100` and `stamina: 10`.

## Step 3: Modify Code for v2

Now make the following changes to upgrade the package:

### 3a. Bump the version (`sources/version.move`)

Change the `VERSION` constant from `1` to `2`:

```move
const VERSION: u64 = 2;
```

Add a `migrate` function that an admin can call to update the shared `Version` object:

```move
public fun migrate(self: &mut Version, cap: &UpgradeCap) {
    assert!(cap.package() == @package_upgrade, EInvalidPackageVersion); // package name = named address
    self.version = VERSION;
}
```

You'll need to add the import:

```move
use sui::package::UpgradeCap;
```

### 3b. Deprecate `mint_hero` and add `mint_hero_v2` (`sources/hero.move`)

Add a new error constant:

```move
const EUseMintHeroV2Instead: u64 = 2;
```

Make `mint_hero` abort so old callers get a clear error:

```move
public fun mint_hero(_version: &Version, _ctx: &mut TxContext): Hero {
    abort EUseMintHeroV2Instead
}
```

Add the paid minting function (5 SUI = 5_000_000_000 MIST):

```move
use sui::coin::Coin;
use sui::sui::SUI;

const HERO_PRICE: u64 = 5_000_000_000;
const EInsufficientPayment: u64 = 3;

public fun mint_hero_v2(
    version: &Version,
    payment: Coin<SUI>,
    ctx: &mut TxContext,
): Hero {
    version.check_is_valid();
    assert!(payment.value() >= HERO_PRICE, EInsufficientPayment);
    transfer::public_transfer(payment, ctx.sender()); // simplified; in production, send to a treasury address
    Hero {
        id: object::new(ctx),
        health: 100,
        stamina: 10,
    }
}
```

## Step 4: Upgrade the Package

```bash
sui move build
sui client upgrade --upgrade-capability <UPGRADE_CAP_ID> --gas-budget 100000000
```

Note the **new Package ID** from the output.

## Step 5: Migrate the Version Object

Call the `migrate` function using the **new** package ID:

```bash
sui client call \
  --package <NEW_PACKAGE_ID> \
  --module version \
  --function migrate \
  --args <VERSION_ID> <UPGRADE_CAP_ID> \
  --gas-budget 10000000
```

## Step 6: Observe the Differences

### Old `mint_hero` now fails

```bash
sui client call \
  --package <NEW_PACKAGE_ID> \
  --module hero \
  --function mint_hero \
  --args <VERSION_ID> \
  --gas-budget 10000000
```

This will abort with `EUseMintHeroV2Instead`.

### New `mint_hero_v2` works with payment

First, get a coin object with at least 5 SUI. Then:

```bash
sui client call \
  --package <NEW_PACKAGE_ID> \
  --module hero \
  --function mint_hero_v2 \
  --args <VERSION_ID> <COIN_ID> \
  --gas-budget 10000000
```

This succeeds and creates a new Hero.

### Compare the two Heroes

```bash
sui client object <V1_HERO_ID>
sui client object <V2_HERO_ID>
```

Both have the same `Hero` type (referencing the original package ID), but were created by different package versions.

## Further Reading

- [Package Upgrades Documentation](https://docs.sui.io/concepts/sui-move-concepts/packages/upgrade)
- [Upgrade Requirements](https://docs.sui.io/concepts/sui-move-concepts/packages/upgrade#upgrade-requirements)
- [Versioned Shared Objects](https://docs.sui.io/concepts/sui-move-concepts/packages/upgrade#versioned-shared-objects)
- [Custom Upgrade Policies](https://docs.sui.io/concepts/sui-move-concepts/packages/custom-policies)
