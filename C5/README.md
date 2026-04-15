# Sui & Move Bootcamp - C5: Derived Objects

##### What you will learn in this module:

This section introduces **Derived Objects** on Sui — deterministic, top-level objects whose IDs are computed from a parent object and a key, without using `object::new(ctx)`. You will learn how to create derived objects on-chain and predict their IDs off-chain.

## Exercises

### 1. [Move Contract](./contracts/derived_objects/)

Implements a shared `ParentObject` and four derived object types, each using a different key strategy (`u64`, `address`, `String`, custom struct) with `sui::derived_object::claim`.

### 2. [TypeScript Tests](./ts/)

Off-chain ID derivation using the `@mysten/sui` SDK's `deriveObjectID` utility. Tests create derived objects on testnet and assert that the predicted ID matches the on-chain result.

---

### Useful Links

- [Derived Objects](https://docs.sui.io/guides/developer/objects/derived-objects)
- [Sui TypeScript SDK](https://sdk.mystenlabs.com/typescript)
