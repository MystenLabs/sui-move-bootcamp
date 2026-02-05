---
marp: true
paginate: true
footer: "Sui"
---

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* ============================================================
   SUI CORPORATE THEME — Embedded CSS
   Palette: black bg · white headings · #8B8B8B body · #4DA2FF accent
   Canonical size: 1280 × 720 (16:9)
   ============================================================ */

/* ----- Base Section ----- */
section {
  background: #000000;
  color: #8B8B8B;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 22px;
  font-weight: 400;
  line-height: 1.5;
  padding: 60px;
  width: 1280px;
  height: 720px;
  position: relative;
}

/* ----- Typography ----- */
section h1 {
  color: #FFFFFF;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 16px 0;
}

section h2 {
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 12px 0;
}

section h3 {
  color: #FFFFFF;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 8px 0;
}

section h4 {
  color: #8B8B8B;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  margin: 0 0 8px 0;
}

section p {
  margin: 0 0 12px 0;
}

section strong {
  color: #FFFFFF;
  font-weight: 600;
}

section em {
  color: #4DA2FF;
  font-style: normal;
}

section a {
  color: #4DA2FF;
  text-decoration: none;
}

section code {
  background: #1A1A1A;
  color: #4DA2FF;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

section pre {
  background: #0A0A0A;
  border: 1px solid #3A3A3A;
  border-radius: 8px;
  padding: 20px;
  margin: 12px 0;
}

section pre code {
  background: transparent;
  padding: 0;
}

section ul, section ol {
  margin: 0 0 12px 0;
  padding-left: 24px;
}

section li {
  margin-bottom: 6px;
}

section li::marker {
  color: #4DA2FF;
}

section blockquote {
  border-left: 3px solid #4DA2FF;
  padding-left: 16px;
  margin: 12px 0;
  color: #AAAAAA;
}

section table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
}

section th {
  color: #FFFFFF;
  font-weight: 600;
  text-align: left;
  padding: 10px 16px;
  border-bottom: 2px solid #4DA2FF;
}

section td {
  padding: 8px 16px;
  border-bottom: 1px solid #1A1A1A;
}

section hr {
  border: none;
  border-top: 1px dashed #3A3A3A;
  margin: 24px 0;
}

/* ----- Pagination ----- */
section::after {
  color: #4DA2FF;
  font-size: 14px;
  font-weight: 600;
  background: rgba(77, 162, 255, 0.1);
  border-radius: 12px;
  padding: 2px 10px;
}

/* ----- Footer ----- */
section footer {
  color: #8B8B8B;
  font-size: 14px;
  position: absolute;
  bottom: 24px;
  left: 60px;
}

/* ----- Header ----- */
section header {
  color: #4DA2FF;
  font-size: 14px;
  font-weight: 500;
  position: absolute;
  top: 24px;
  right: 60px;
}

/* ============================================================
   GRID SYSTEM
   ============================================================ */

section .grid {
  display: grid;
  gap: 24px;
  width: 100%;
  height: auto;
}

section .col {
  display: flex;
  flex-direction: column;
}

section .col h3 {
  margin-bottom: 8px;
}

section .col p {
  font-size: 18px;
  margin: 0;
}

/* Blue square marker for column headings */
section .col h3::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #4DA2FF;
  margin-right: 10px;
  vertical-align: middle;
}

/* Dotted separator above columns */
section .col {
  border-top: 1px dashed #3A3A3A;
  padding-top: 16px;
}

/* Stat number styling */
section .stat {
  color: #FFFFFF;
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
}

section .stat-label {
  color: #8B8B8B;
  font-size: 16px;
}

section .stat-large {
  color: #FFFFFF;
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
}

/* Card item for list layouts */
section .card {
  background: #0A0A0A;
  border: 1px solid #1A1A1A;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 8px;
}

section .card h4 {
  color: #FFFFFF;
  margin: 0 0 4px 0;
}

section .card p {
  margin: 0;
  font-size: 16px;
}

/* Product icon container */
section .icon {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
}

section .icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ============================================================
   LAYOUT: lead — Cover / Title Slide
   ============================================================ */
section.lead {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 80px;
}

section.lead h1 {
  font-size: 64px;
  font-weight: 700;
  margin-bottom: 16px;
}

section.lead p {
  font-size: 24px;
  color: #8B8B8B;
  max-width: 70%;
}

/* ============================================================
   LAYOUT: cols-4 — Four Columns with markers + body
   ============================================================ */
section.cols-4 .grid {
  grid-template-columns: repeat(4, 1fr);
  margin-top: 24px;
}

/* ============================================================
   LAYOUT: cols-3 — Three Columns
   ============================================================ */
section.cols-3 .grid {
  grid-template-columns: repeat(3, 1fr);
  margin-top: 24px;
}

/* ============================================================
   LAYOUT: cols-2-center — Two Columns, centered title
   ============================================================ */
section.cols-2-center {
  text-align: center;
}

section.cols-2-center h1 {
  text-align: center;
  width: 100%;
}

section.cols-2-center .grid {
  grid-template-columns: repeat(2, 1fr);
  margin-top: 24px;
  text-align: left;
}

/* ============================================================
   LAYOUT: grid-2x2 — 2×2 Grid, centered title
   ============================================================ */
section.grid-2x2 {
  text-align: center;
}

section.grid-2x2 h1 {
  text-align: center;
  width: 100%;
}

section.grid-2x2 .grid {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  margin-top: 24px;
  text-align: left;
}

/* ============================================================
   LAYOUT: cols-4-minimal — Four Columns, headlines only
   ============================================================ */
section.cols-4-minimal .grid {
  grid-template-columns: repeat(4, 1fr);
  margin-top: 40px;
}

section.cols-4-minimal .col {
  padding-top: 24px;
}

section.cols-4-minimal .col p {
  display: none;
}

/* ============================================================
   LAYOUT: fullbleed — Full bleed image, no padding
   ============================================================ */
section.fullbleed {
  padding: 0;
}

section.fullbleed img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ============================================================
   LAYOUT: cols-4-icon — Four Columns with product icons
   ============================================================ */
section.cols-4-icon .grid {
  grid-template-columns: repeat(4, 1fr);
  margin-top: 24px;
}

section.cols-4-icon .col h3::before {
  display: none;
}

/* ============================================================
   LAYOUT: cols-4-stats — Four Columns with large stat numbers
   ============================================================ */
section.cols-4-stats .grid {
  grid-template-columns: repeat(4, 1fr);
  margin-top: 24px;
}

section.cols-4-stats .col {
  text-align: center;
  border-top: none;
  padding-top: 0;
}

section.cols-4-stats .stat {
  font-size: 56px;
  color: #4DA2FF;
}

section.cols-4-stats .stat-label {
  font-size: 18px;
  color: #8B8B8B;
}

/* ============================================================
   LAYOUT: stats-side — Title+body left, stacked stats right
   ============================================================ */
section.stats-side {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

section.stats-side .content {
  display: flex;
  flex-direction: column;
}

section.stats-side .stats {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

section.stats-side .stat-row {
  border-top: 1px dashed #3A3A3A;
  padding-top: 16px;
}

/* ============================================================
   LAYOUT: stats-left — Large stacked stats, left-aligned
   ============================================================ */
section.stats-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

section.stats-left .grid {
  grid-template-columns: 1fr;
  gap: 32px;
}

section.stats-left .stat-large {
  font-size: 80px;
  color: #FFFFFF;
}

section.stats-left .stat-label {
  font-size: 20px;
  color: #8B8B8B;
  margin-top: 4px;
}

/* ============================================================
   LAYOUT: split-right — Title+body right-aligned
   ============================================================ */
section.split-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

section.split-right h1,
section.split-right p {
  max-width: 55%;
}

/* ============================================================
   LAYOUT: list-right — Title right, stacked cards
   ============================================================ */
section.list-right {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

section.list-right .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

section.list-right .cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* ============================================================
   UTILITY CLASSES
   ============================================================ */
section .text-center { text-align: center; }
section .text-right { text-align: right; }
section .accent { color: #4DA2FF; }
section .muted { color: #555555; }
section .small { font-size: 16px; }
section .large { font-size: 28px; }
section .no-border { border-top: none; padding-top: 0; }
section .center {
  display: flex;
  align-items: center;
  justify-content: center;
}
section .badge {
  display: inline-block;
  background: rgba(77, 162, 255, 0.15);
  color: #4DA2FF;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
}
section .spacer {
  height: 24px;
}
</style>

<!-- _class: lead -->

# Package Upgrades

Evolving on-chain code while preserving state on Sui

---

# Why Upgrades?

Published packages on Sui are **immutable objects** -- their bytecode never changes.

- Bug fixes require updated code
- New features need new functions and structs
- Business logic evolves over time
- **Package upgrades** let you publish a new version linked to the original

---

<!-- _class: cols-3 -->

# The Upgrade Flow

<div class="grid">
<div class="col">

### Authorize

Present the `UpgradeCap` to obtain an `UpgradeTicket` for the upgrade.

</div>
<div class="col">

### Publish

Submit new bytecode along with the ticket to create the upgraded package.

</div>
<div class="col">

### Commit

Receive an `UpgradeReceipt` confirming the new version is live on-chain.

</div>
</div>

---

# UpgradeCap

When you publish a package, Sui creates an **`UpgradeCap`** and sends it to the publisher.

- Acts as the **authorization** to upgrade
- Holder controls the package's future
- Can be made immutable to **permanently lock** the package
- Can be wrapped in custom logic for governance or timelocks

---

<!-- _class: cols-2-center -->

# Compatibility Rules

<div class="grid">
<div class="col">

### Allowed

- Add new modules
- Add new functions (including `public`)
- Add new structs
- Change private / `public(package)` bodies
- Add new error constants
- Remove generic type constraints

</div>
<div class="col">

### Not Allowed

- Remove existing modules
- Change `public` function signatures
- Change existing struct layouts
- Change `public` return types
- Remove `public` functions

</div>
</div>

---

# Key Compatibility Points

- **`init` does NOT re-run** on upgrade -- handle new initialization separately
- **Private and `public(package)` signatures** can change freely
- Only **`public` functions** are part of the compatibility contract
- **New structs** can be added, but existing struct definitions are frozen
- The new package gets its own address but is **linked to the original**

---

<!-- _class: cols-4 -->

# Upgrade Policies

The `UpgradeCap` controls allowed upgrade types. Policies can only become **more restrictive**.

<div class="grid">
<div class="col">

### compatible

Default. Any upgrade satisfying the compatibility rules.

</div>
<div class="col">

### additive

Only add new functionality. Cannot change existing function bodies.

</div>
<div class="col">

### dependency-only

Only change dependencies. Cannot modify any module code.

</div>
<div class="col">

### immutable

No upgrades ever. Package permanently frozen.

</div>
</div>

---

# Versioned Shared Objects

After upgrading, old package versions remain callable on-chain. A **Version** shared object forces users onto the latest version.

```move
const VERSION: u64 = 1;

public struct Version has key {
    id: UID,
    version: u64,
}

public fun check_is_valid(self: &Version) {
    assert!(self.version == VERSION, EInvalidPackageVersion);
}
```

---

<!-- _class: list-right -->

<div class="content">

# Version Migration

Public functions that mutate shared state take `&Version` and call `check_is_valid()`.

On upgrade, a `migrate` function flips the switch.

</div>

<div class="cards">
<div class="card">

#### Bump VERSION

Update the constant in the new package code.

</div>
<div class="card">

#### Add migrate()

A function that updates the shared Version object's field.

</div>
<div class="card">

#### Publish Upgrade

Deploy the new bytecode via `sui client upgrade`.

</div>
<div class="card">

#### Call migrate

Activate the new version -- old functions now fail the check.

</div>
</div>

---

<!-- _class: cols-3 -->

# User Migration

<div class="grid">
<div class="col">

### Old Objects Persist

Objects from v1 still exist with their original type, shared across all versions.

</div>
<div class="col">

### Migration Functions

Provide functions to transform or transfer assets from deprecated structures.

</div>
<div class="col">

### Phased Deprecation

Old functions abort with descriptive errors. New functions provide updated behavior.

</div>
</div>

---

<!-- _class: lead -->

# Hands-On Exercise

Upgrading the Hero package from free minting to paid minting

---

# Exercise Overview

You will work with the `package_upgrade/` Hero game package:

1. **Build and publish v1** -- free hero minting
2. **Interact with v1** -- mint a hero via CLI
3. **Modify code for v2** -- add paid minting, deprecate free minting
4. **Upgrade the package** -- publish v2 on-chain
5. **Migrate** -- update the Version object
6. **Observe** -- old function fails, new function works

---

# Step 1: Publish v1

```bash
cd H1/package_upgrade
sui move build
sui client publish --gas-budget 100000000
```

From the output, note:

| Value | Where to Find |
|---|---|
| **Package ID** | Published Objects section |
| **UpgradeCap ID** | Created Objects, type `0x2::package::UpgradeCap` |
| **Version ID** | Created Objects, type `<pkg>::version::Version` |

---

# Step 2: Mint a Hero

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module hero \
  --function mint_hero \
  --args <VERSION_ID> \
  --gas-budget 10000000
```

Inspect the result:

```bash
sui client object <HERO_ID>
```

You should see a `Hero` with *health: 100* and *stamina: 10*.

---

<!-- _class: grid-2x2 -->

# Step 3: Modify for v2

<div class="grid">
<div class="col">

### Bump VERSION

Change constant from `1` to `2` in `version.move`.

</div>
<div class="col">

### Add migrate()

New function to update the shared Version object using the `UpgradeCap`.

</div>
<div class="col">

### Deprecate mint_hero

Make it abort with `EUseMintHeroV2Instead` error.

</div>
<div class="col">

### Add mint_hero_v2

Requires 5 SUI payment to create a Hero.

</div>
</div>

---

# v2: Version Changes

```move
// version.move
use sui::package::UpgradeCap;

const VERSION: u64 = 2;  // bumped from 1

public fun migrate(self: &mut Version, cap: &UpgradeCap) {
    assert!(cap.package() == @package_upgrade, EInvalidPackageVersion);
    self.version = VERSION;
}
```

---

# v2: Hero Changes

```move
// hero.move
const EUseMintHeroV2Instead: u64 = 2;
const HERO_PRICE: u64 = 5_000_000_000;  // 5 SUI

public fun mint_hero(_version: &Version, _ctx: &mut TxContext): Hero {
    abort EUseMintHeroV2Instead  // deprecated
}

public fun mint_hero_v2(
    version: &Version, payment: Coin<SUI>, ctx: &mut TxContext,
): Hero {
    version.check_is_valid();
    assert!(payment.value() >= HERO_PRICE, EInsufficientPayment);
    transfer::public_transfer(payment, ctx.sender());
    Hero { id: object::new(ctx), health: 100, stamina: 10 }
}
```

---

# Step 4: Upgrade

```bash
sui move build
sui client upgrade \
  --upgrade-capability <UPGRADE_CAP_ID> \
  --gas-budget 100000000
```

Note the **new Package ID** from the output.

---

# Step 5: Migrate

Call `migrate` using the **new** package ID:

```bash
sui client call \
  --package <NEW_PACKAGE_ID> \
  --module version \
  --function migrate \
  --args <VERSION_ID> <UPGRADE_CAP_ID> \
  --gas-budget 10000000
```

After this, the Version object's `version` field is updated to `2`.

---

<!-- _class: cols-2-center -->

# Step 6: Observe

<div class="grid">
<div class="col">

### Old mint_hero

Calling `mint_hero` on the new package aborts with `EUseMintHeroV2Instead`.

</div>
<div class="col">

### New mint_hero_v2

Calling `mint_hero_v2` with a 5 SUI coin succeeds and creates a new Hero.

</div>
</div>

---

# Comparing Heroes

```bash
sui client object <V1_HERO_ID>
sui client object <V2_HERO_ID>
```

Both Heroes share the **same type** (referencing the original package ID), but were created by **different package versions**.

This demonstrates how Sui's type system maintains continuity across upgrades.

---

<!-- _class: split-right -->

# Further Reading

Package Upgrades, Upgrade Requirements, Versioned Shared Objects, and Custom Policies documentation at *docs.sui.io*.
