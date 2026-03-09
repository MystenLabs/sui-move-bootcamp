# Witness Hero — Implementation Guide

Complete the TODOs across two packages (`weapon/` and `hero/`) to implement a witness-based authorization system for cross-module weapon minting.

## Overview

You will:
1. Implement the `mint_weapon` function that validates callers via a witness + allow list
2. Fix a bug in `whitelist_witness` that prevents correct re-whitelisting
3. Declare a witness struct in the hero module
4. Implement `attach_weapon` to mint and attach a weapon using the witness

> **Build order matters:** The `hero` package depends on `weapon`, so always build `weapon` first.

---

## Step 1 — Implement `mint_weapon`

**File:** `weapon/sources/weapon.move`, lines 33–38

The starter code has the function signature and a placeholder `abort 0`. You need to:
1. Add the parameters: a witness instance, a name, the allow list, and the transaction context
2. Resolve the caller's type name at runtime
3. Assert it exists in the allow list **and** its value is `true`
4. Create and return a `Weapon`

```move
public fun mint_weapon<W: drop>(
    _: W,
    name: String,
    allow_list: &AllowList,
    ctx: &mut TxContext,
): Weapon {
    let caller_witness = type_name::with_original_ids<W>().into_string();
    assert!(
        allow_list.witness_types.contains(caller_witness) &&
        *allow_list.witness_types.borrow(caller_witness),
        EInvalidCaller,
    );

    Weapon {
        id: object::new(ctx),
        name,
    }
}
```

> **How the witness pattern works here:** The `_: W` parameter requires the caller to pass an *instance* of some type `W`. Since structs can only be created inside their declaring module, this proves the call originates from the module that defines `W`. The allow list adds a second layer — even if you can create a witness, the weapon deployer must have explicitly whitelisted your type.

---

## Step 2 — Fix `whitelist_witness` else-branch

**File:** `weapon/sources/weapon.move`, line 56

There is a deliberate bug in the starter code. When re-whitelisting a previously blacklisted witness, the else branch writes `false` instead of `true`:

```move
// BUG (starter code):
*allow_list.witness_types.borrow_mut(witness_type) = false;

// FIX:
*allow_list.witness_types.borrow_mut(witness_type) = true;
```

This must match the semantics of `mint_weapon`, which checks that the stored value is `true`. Without this fix, re-whitelisting a blacklisted witness would still fail at mint time.

> **Understanding the flow:** Look at `contains_and_is_whitelisted` on line 76 — it has inverted logic (`!*...borrow(...)`) for its own internal bookkeeping, but `mint_weapon` reads the raw `bool` value directly. The allow list value must be `true` for `mint_weapon` to succeed.

---

## Step 3 — Declare the witness struct

**File:** `hero/sources/hero.move`, line 13

Declare a public struct with `drop` ability that will serve as the hero module's witness:

```move
public struct HERO_WITNESS has drop {}
```

> **Why `public`?** The tests (and the weapon module's `whitelist_witness<HERO_WITNESS>` call) need to reference this type by name. If it were private, only this module could use it as a type parameter.

---

## Step 4 — Implement `attach_weapon`

**File:** `hero/sources/hero.move`, lines 70–71

Replace the `abort 0` placeholder with the actual logic:
1. Assert the payment meets the weapon price
2. Deposit the payment into the treasury
3. Create a `HERO_WITNESS` instance and pass it to `weapon::mint_weapon`
4. Attach the returned weapon to the hero as a dynamic object field

```move
public fun attach_weapon(
    hero: &mut Hero,
    price: Coin<SUI>,
    treasury: &mut Treasury,
    weapon_name: String,
    allow_list: &AllowList,
    ctx: &mut TxContext,
) {
    assert!(price.value() >= WEAPON_PRICE, EInsufficientFunds);
    treasury.balance.join(price.into_balance());
    let weapon = weapon::mint_weapon(HERO_WITNESS {}, weapon_name.to_ascii(), allow_list, ctx);
    dof::add(&mut hero.id, weapon_name, weapon);
}
```

> **Why `weapon_name.to_ascii()`?** The hero module uses `std::string::String` (UTF-8), but the weapon module uses `std::ascii::String`. The `.to_ascii()` conversion bridges between the two. The dynamic object field key uses the UTF-8 `String` so the test can later look up the weapon by name.

---

## Verify

```bash
# Build weapon first (hero depends on it)
cd weapon
sui move build

# Then build and test hero
cd ../hero
sui move build
sui move test
```

Both tests should pass:
- `test_attach_weapon_fails_for_non_whitelisted_witness` — confirms minting fails when `HERO_WITNESS` is not whitelisted
- `test_attach_weapon_succeeds_for_whitelisted_witness` — confirms end-to-end flow: whitelist the witness, mint a hero, attach a weapon, and verify it via dynamic object field lookup
