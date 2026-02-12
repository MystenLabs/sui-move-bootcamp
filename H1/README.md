# [H1]: Package Upgrades

## What You Will Learn: Upgrading Packages in Sui Move

In this section, you will learn how to safely upgrade published Move packages on Sui, a critical skill for evolving on-chain applications. You will explore:

- The concept of package immutability in Sui and why upgrades are necessary for iterative development.
- How to perform package upgrades while maintaining the benefits of immutable code.
- The use of versioned shared objects to manage state and restrict access to only the latest package version.
- Safe migration patterns, including the use of `Publisher` and migration functions to transition users and objects to upgraded logic.
- Best practices for maintaining compatibility and deprecating old functionality.

By the end of this section, you will be able to design and implement upgradeable Move packages, ensuring your smart contracts remain secure, maintainable, and up-to-date as requirements evolve.

In this section we will work with upgrading a published package that implements a game with Heroes, Swords, and Shields.

## Package Overview

The package `package_upgrade` consists of the following modules:

### blacksmith
Module `blacksmith` involves the `Blacksmith` capability object which can create `Sword`s and `Shield`s.

### hero
A `Hero` is a freely mintable NFT which can equip `Sword` and `Shield` under the dynamic field keys `"sword"` and `"shield"`.

### version
Includes the `Version` object and the constant `VERSION` used to enforce the usage of latest contract version methods.

### package_version
Uses the [Versioned Shared Objects](https://docs.sui.io/concepts/sui-move-concepts/packages/upgrade#versioned-shared-objects) pattern to enable deprecation of functions defined in previous package version.

## Project Structure

The codebase consists of several key components:

1. `package_upgrade/sources/hero.move` - Contains the Hero NFT implementation
2. `package_upgrade/sources/blacksmith.move` - Contains the Blacksmith and item implementations
3. `package_upgrade/sources/version.move` - Contains version management for package upgrades
4. `package_upgrade/sources/admin.move` - Contains admin capabilities
5. `package_upgrade/Move.toml` - Package configuration and dependencies

## Tasks to Complete

There are four main tasks to implement in this project:

### 1. Update Package Version
In `version.move`, update:
- Bump the `VERSION` constant to 2
- Update the `Version` shared object's version field to 2
![Versioned Shared Object](./VersionedSharedObject.png)

### 2. Implement Hero Purchase
In `hero.move`, modify the hero creation to:
- Replace free minting with a purchase system
- Set the price to 5 SUI
- Create a new `mint_hero_v2` function that accepts payment

# The below Tasks are deprecated, to be removed after the Istanbul bootcamp
### 3. Add Type-Safe Equipment Keys
In `hero.move`, implement:
- New structs for sword and shield equipment keys
- Update the equipment functions to use these type-safe keys instead of strings

### 4. Add Hero Power
In `hero.move`, add:
- A `power` field to the `Hero` struct
- Logic to increase power when equipping swords (by attack value) or shields (by defense value)

## Useful Links

- [Package Upgrades Documentation](https://docs.sui.io/concepts/sui-move-concepts/packages/upgrade)
- [Package Upgrade Requirements](https://docs.sui.io/concepts/sui-move-concepts/packages/upgrade#upgrade-requirements)
