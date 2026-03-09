---
marp: false
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

# Package Management

How Move packages are structured, configured, and published on Sui

---

# What Is a Move Package?

A Move **package** is the unit of compilation and publishing on Sui.

- Bundles one or more **modules** into a single on-chain object
- Each published package gets its own **on-chain address**
- Packages are **immutable** once published
- All code you deploy lives inside a package

---

<!-- _class: cols-4 -->

# Package Files

<div class="grid">
<div class="col">

### Move.toml

Manifest file declaring package name, edition, and dependencies.

</div>
<div class="col">

### sources/

Directory containing all `.move` source files with your modules.

</div>
<div class="col">

### Move.lock

Auto-generated pinned dependency graph. Commit to VCS for reproducible builds.

</div>
<div class="col">

### Published.toml

Auto-generated after publish. Records on-chain package address and chain ID.

</div>
</div>

---

# Manifest Structure

```toml
[package]
name = "my_package"
edition = "2024"

[dependencies]
# Git, local, MVR, or system dependencies
# Add modes = ["test"] for test-only dependencies

[environments]
# Map environment names to chain IDs.
# mainnet and testnet are available by default without needing to include this section
# For fetching your active environment chain ID run `sui client chain-identifier`
# and include it here (e.g., localnet = "4c78adac")
```

> Older projects may use `[addresses]` and `[dev-dependencies]` — see the *Migration Guide*.

---

<!-- _class: cols-2-center -->

# Key Manifest Fields

<div class="grid">
<div class="col">

### name

Doubles as the named address in Move code (`@my_package`). Must match module declarations.

### edition

Use `"2024"` to enable modern Move syntax and features.

</div>
<div class="col">

### implicit-dependencies

`std` and `sui` are auto-included. Set `implicit-dependencies = false` to disable.

### modes = ["test"]

Replaces `[dev-dependencies]`. Marks a dependency as test-only.

</div>
</div>

---

<!-- _class: list-right -->

<div class="content">

# Dependency Types

Move packages can pull in dependencies from multiple sources.

</div>

<div class="cards">
<div class="card">

#### Git Dependencies

Point to a repo, subfolder, and revision (branch, tag, or commit).

</div>
<div class="card">

#### Local Dependencies

Reference packages on your filesystem with relative paths.

</div>
<div class="card">

#### Move Registry (MVR)

Resolve packages by their registered MVR name across networks.

</div>
<div class="card">

#### System Packages

Sui framework (`0x1`, `0x2`) is auto-available. No explicit dependency needed.

</div>
</div>

---

# Git Dependencies

For packages hosted in a git repository:

```toml
[dependencies]
some_lib = {
  git = "https://github.com/example/lib.git",
  subdir = "packages/lib",
  rev = "main"
}
```

- **`git`** -- Repository URL
- **`subdir`** -- Path within the repo (optional if package is at root)
- **`rev`** -- Branch, tag, or commit hash to pin

---

# Local Dependencies

For packages on your filesystem — paths are relative to the package root:

```toml
[dependencies]
my_lib = { local = "../my_lib" }
```

Common use cases:

- Monorepo with multiple packages side-by-side
- Developing a library alongside the consuming package
- Overriding a transitive dependency with a local fork

---

# Move Registry (MVR) Dependencies

Resolve packages by their registered name on the [Move Registry](https://mvr.sui.io):

```toml
[dependencies]
my_dep = { r.mvr = "@org/package" }
```

- **`r.mvr`** -- The MVR identifier in `@org/package` format
- Resolution is network-aware (mainnet vs testnet)
- Packages must be published and registered on MVR first

---

# Implicit (System) Dependencies

`std` (0x1) and `sui` (0x2) are **automatically available** — no declaration needed.

```move
// These imports work without any [dependencies] entry:
use std::string::String;
use sui::object::UID;
use sui::transfer;
use sui::tx_context::TxContext;
```

To opt out (rare): set `implicit-dependencies = false` in `[package]`.

Other system packages like `deepbook` must still be declared explicitly.

---

# Test-Only Dependencies

Add `modes = ["test"]` to exclude a dependency from published bytecode:

```toml
[dependencies]
test_helper = { local = "../test_helper", modes = ["test"] }
mock_oracle = {
  git = "https://github.com/example/mocks.git",
  subdir = "oracle",
  rev = "v1.0.0",
  modes = ["test"]
}
```

Works with any dependency type (local, git, MVR).

---

<!-- _class: cols-3 -->

# Advanced Features

<div class="grid">
<div class="col">

### Overriding

Use `override = true` to resolve conflicting transitive dependency versions.

</div>
<div class="col">

### Renaming

Use `rename-from = "original_name"` to import a dependency under a different name.

</div>
<div class="col">

### Environments

Use `[environments]` to map names to chain IDs for multi-network builds.

</div>
</div>

---

## Key CLI Commands

| Command | Description |
|---|---|
| `sui client chain-identifier` | Fetch active environment chain identifier |
| `sui client test-publish --build-env <ENV>` | Publish to an ephemeral network for testing |
| `sui move update-deps` | Update dependencies to latest compatible versions |

---

<!-- _class: split-right -->

# Further Reading

Sui Packages Documentation, Move.toml Reference, Move Registry, and Package Manager Migration Guide are available at *docs.sui.io*.
