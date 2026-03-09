# Capability Pattern

This exercise demonstrates **fine-grained access control** using capability objects with property-based authorization.

## What You'll Learn

The standard Capability pattern in Sui relies on object ownership — if you hold the cap, you're authorized. This exercise goes a step further: each `StoreAdminCap` carries a `store: ID` field that links it to a **specific** `HeroStore`. Operations assert `admin_cap.store == store.id` before allowing mutations, so holding *a* cap isn't enough — you must hold *the right* cap.

## Project Structure

```
capability_hero/
├── sources/
│   ├── hero.move    # Hero struct, minting, buying weapons/armor
│   └── store.move   # Generic HeroStore<T> with AdminCap authorization
└── tests/
```

### `store.move`

- **`HeroStore<phantom T>`** — a shared, generic store holding a `Table<u64, T>` of items, a price, and a `Balance<SUI>` for collected funds.
- **`StoreAdminCap`** — an owned capability with a `store: ID` field set to the store's object ID at creation time.
- **`build_store`** — creates a store and its linked admin cap in a single transaction.
- **`add_item` / `collect_funds`** — admin-only operations that assert `admin_cap.store == store.id`.
- **`buy_item`** — public function anyone can call (pays the item price in SUI).

### `hero.move`

- **`Hero`** — a key+store object with optional `Weapon` and `Armor` slots.
- **`buy_weapon` / `buy_armor`** — convenience functions that purchase from the store and equip the hero in one step.

## Key Concept: ID-Linked Capabilities

```move
public struct StoreAdminCap has key {
    id: UID,
    store: ID,   // links this cap to exactly one HeroStore
}

public fun add_item<T: store>(store: &mut HeroStore<T>, admin_cap: &StoreAdminCap, item: T) {
    assert!(admin_cap.store.to_inner() == store.id.to_inner(), ENotAuthorized);
    // ...
}
```

This means multiple stores can coexist, each with its own admin, and an admin of Store A cannot modify Store B.

## Build & Test

```bash
sui move build
sui move test
```

## Further Reading

- [Move Book: Capability Pattern](https://move-book.com/programmability/capability.html)
