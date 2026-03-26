# Derived Objects — Move Contract

This exercise demonstrates **derived objects** on Sui — deterministic, top-level objects whose IDs are computed from a parent's `UID` and a key, without using `object::new(ctx)`.

## What You'll Learn

- How `sui::derived_object::claim(&mut uid, key)` creates a `UID` tied to a parent + key pair
- Four key strategies for derivation: `u64`, `address`, `String`, and custom struct
- How to verify derived addresses on-chain with `derived_object::derive_address`

## Project Structure

```
derived_objects/
├── sources/
│   ├── parent.move    # ParentObject definition, init, counter helpers
│   └── objects.move   # Four derived object types + creation functions
└── tests/
    └── derived_objects_tests.move
```

### `parent.move`

- **`ParentObject`** — shared object with a `UID` and an `incremental_counter`. Created and shared at `init`.
- **`uid_mut_ref`** — `public(package)` accessor needed to call `derived_object::claim`.
- **`increment_counter` / `get_incremental_counter`** — manage the counter for incremental derivation.

### `objects.move`

Defines four derived object structs and their creation functions. Each struct has `key, store` abilities and stores a `derivation_id` pointing back to the parent.

## Implementation Guide

Complete the four `TODO` functions in `objects.move`. Each function should:

1. Call `derived_object::claim(parent.uid_mut_ref(), key)` to get the derived `UID`
2. Return the struct with the derived `UID` and `object::id(parent)` as `derivation_id`

### `new_derived_incremental`

- Get the current counter via `parent.get_incremental_counter()`
- Use the counter as the key for `derived_object::claim`
- Increment the counter via `parent.increment_counter()` **after** claiming

### `new_derived_address`

- Use the `key: address` parameter directly as the key for `derived_object::claim`

### `new_derived_string`

- Use the `key: String` parameter directly as the key for `derived_object::claim`

### `new_derived_struct`

- Create a `DerivedObjectStructKey` from `addr` using `create_derived_struct_key(addr)`
- Use it as the key for `derived_object::claim`
- Store `addr` in the struct's `addr` field as well

## Build & Test

```bash
sui move build
sui move test
```
