# Capability Hero — Implementation Guide

Complete the TODOs in `sources/store.move` and `sources/hero.move` to implement a capability-based access control system for a generic item store.

## Overview

You will:
1. Add an ID field to link each `StoreAdminCap` to its specific store
2. Implement the `build_store` function to create and share a store
3. Add authorization checks in admin-only functions
4. Write convenience functions for heroes to buy items from stores

---

## Step 1 — Add the `store` field to `StoreAdminCap`

**File:** `sources/store.move`, line 17

The `StoreAdminCap` needs a field that records *which* store this capability controls. This is what makes it an **ID-linked capability** rather than a generic one.

Add an `ID` field named `store`:

```move
public struct StoreAdminCap has key {
    id: UID,
    store: ID,
}
```

> **Why `ID` and not `UID`?** A `UID` is for the object's own identity and must be unique. An `ID` is a simple copy of another object's identifier — perfect for referencing a related object without owning it.

---

## Step 2 — Implement `build_store`

**File:** `sources/store.move`, lines 35–37

This function must:
1. Create a `HeroStore<T>` with an empty items table, the given price, and a zero balance
2. Create a `StoreAdminCap` whose `store` field matches the new store's ID
3. Transfer the admin cap to the transaction sender
4. Share the store so anyone can buy from it

```move
public fun build_store<T: store>(item_price: u64, ctx: &mut TxContext) {
    let store = HeroStore<T> {
        id: object::new(ctx),
        items: table::new(ctx),
        item_price,
        funds: balance::zero(),
    };
    let store_admin_cap = StoreAdminCap {
        id: object::new(ctx),
        store: store.id.to_inner(),
    };
    transfer::transfer(store_admin_cap, ctx.sender());
    transfer::share_object(store)
}
```

> **Note:** `store.id.to_inner()` converts the store's `UID` to an `ID` value. The cap is sent to the sender (owned object), while the store is shared (anyone can interact with it).

---

## Step 3 — Authorize `add_item`

**File:** `sources/store.move`, line 40

Before allowing items to be added, verify that the admin cap belongs to this specific store:

```move
assert!(admin_cap.store == store.id.to_inner(), ENotAuthorized);
```

Place this as the first line inside `add_item`, above the existing `let items = ...` line.

---

## Step 4 — Authorize `collect_funds`

**File:** `sources/store.move`, line 51

Same authorization check as Step 3 — the admin must prove they control this particular store before withdrawing funds:

```move
assert!(admin_cap.store == store.id.to_inner(), ENotAuthorized);
```

Place this as the first line inside `collect_funds`, above the existing `let funds = ...` line.

---

## Step 5 — Implement `buy_weapon`

**File:** `sources/hero.move`, line 23

Add a public function that purchases a `Weapon` from a `HeroStore<Weapon>` and equips it on the hero:

```move
public fun buy_weapon(hero: &mut Hero, store: &mut HeroStore<Weapon>, coin: Coin<SUI>) {
    let weapon = store.buy_item<Weapon>(coin);
    hero.weapon = option::some(weapon);
}
```

> This function delegates payment validation and balance collection to the store's existing `buy_item`, then assigns the returned weapon to the hero's optional slot.

---

## Step 6 — Implement `buy_armor`

**File:** `sources/hero.move`, line 25

Same pattern as `buy_weapon`, but for `Armor`:

```move
public fun buy_armor(hero: &mut Hero, store: &mut HeroStore<Armor>, coin: Coin<SUI>) {
    let armor = store.buy_item<Armor>(coin);
    hero.armor = option::some(armor);
}
```

---

## Verify

```bash
sui move build
sui move test
```

Both tests should pass:
- `test_cannot_buy_from_empty_store_on_unauthorized_equip_attempt` — confirms that an admin cap from Store B cannot add items to Store A
- `test_can_buy_from_non_empty_stores` — confirms end-to-end flow of building stores, stocking items, and buying/equipping
