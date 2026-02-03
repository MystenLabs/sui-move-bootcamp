# [H1]: Package Management & Upgrades

This module covers two foundational topics for working with Move packages on Sui.

## Contents

### [Package Management](./package_management.md)

How Move packages are structured, configured, and published. Covers the manifest (`Move.toml`), dependency types, lock files, and key CLI commands.

### [Package Upgrades](./package_upgrades.md)

How to safely upgrade published packages while preserving on-chain state. Covers the upgrade flow, compatibility rules, versioned shared objects, and includes a **hands-on CLI exercise** using the `package_upgrade/` code.

## Exercise Code

The `package_upgrade/` directory contains a Hero game package used for the upgrade exercise. You will publish it as v1, then modify and upgrade it to v2 following the walkthrough in the upgrades guide.
