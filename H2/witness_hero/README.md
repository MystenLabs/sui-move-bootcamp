# Witness Pattern

This exercise demonstrates **module-level access control** using Move's type system and a dynamic whitelist mechanism.

## What You'll Learn

A *witness* is a struct with `has drop` that can only be instantiated inside its declaring module. By requiring a witness as a function argument, a module can restrict callers to authorized modules — verified at the type level by the Move compiler and at runtime by an on-chain `AllowList`.

## Project Structure

```
witness_hero/
├── weapon/              # Standalone package — owns the AllowList
│   ├── sources/
│   │   └── weapon.move  # Weapon minting gated by witness + AllowList
│   └── Move.toml
└── hero/                # Depends on weapon
    ├── sources/
    │   └── hero.move    # Defines HERO_WITNESS, uses it to mint weapons
    └── Move.toml        # weapon = { local = "../weapon" }
```

### `weapon.move` (weapon package)

- **`AllowList`** — a shared object holding a `Table<String, bool>` mapping type names to their whitelist status.
- **`mint_weapon<W: drop>`** — takes a witness instance, resolves its type name at runtime, and checks it against the `AllowList`.
- **`whitelist_witness<T>` / `blacklist_witness<T>`** — entry functions that require the weapon module's `Publisher` to modify the allow list. This means only the weapon package deployer can authorize new callers.

### `hero.move` (hero package)

- **`HERO_WITNESS has drop`** — the one-time-use witness type. Only `hero.move` can create `HERO_WITNESS {}`.
- **`attach_weapon`** — instantiates `HERO_WITNESS {}`, passes it to `weapon::mint_weapon`, and attaches the resulting weapon to a hero as a dynamic object field.

## Key Concept: Type-Based Authorization

```move
// Only the hero module can create this:
public struct HERO_WITNESS has drop {}

// The weapon module accepts any W: drop, but checks the AllowList:
public fun mint_weapon<W: drop>(_: W, name: String, allow_list: &AllowList, ctx: &mut TxContext): Weapon {
    let caller_witness = type_name::with_original_ids<W>().into_string();
    assert!(allow_list.witness_types.contains(caller_witness) && ..., EInvalidCaller);
    // ...
}
```

The weapon module owner must call `whitelist_witness<HERO_WITNESS>` before heroes can mint weapons. This creates a two-party authorization flow: the weapon deployer controls *who* can call, and the hero module controls *when* it calls.

## Build & Test

Since this exercise has two packages with a local dependency, build and test them separately:

```bash
# Build and test the weapon package first
cd weapon
sui move build
sui move test

# Then the hero package (depends on weapon)
cd ../hero
sui move build
sui move test
```

## Further Reading

- [Move Book: Witness Pattern](https://move-book.com/programmability/witness-pattern.html)
