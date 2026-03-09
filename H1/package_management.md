# Package Management

A Move **package** is the unit of compilation and publishing on Sui. It bundles one or more modules into a single on-chain object with its own address.

## Package Files

Every Move package directory contains at least:

| File | Purpose |
|---|---|
| `Move.toml` | Manifest: name, edition, dependencies |
| `sources/` | Directory containing `.move` source files |

Two additional files may appear:

- **`Move.lock`** -- Auto-generated pinned dependency graph. Commit this to version control so builds are reproducible.
- **`Published.toml`** -- Auto-generated after `sui client publish`. Records the on-chain package address and chain ID. Useful for tooling and MVR integration.

## Manifest Structure (`Move.toml`)

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

> **Migration Note:** Older projects may use `[addresses]`, `[dev-addresses]`, and explicit Sui git dependencies. These are from the pre-v1.63 format. See the [Package Manager Migration Guide](https://docs.sui.io/references/package-managers/package-manager-migration) for upgrade steps.

### Key Fields

- **`name`**: The package name doubles as the named address in Move code (`@my_package`). Must match your module declarations.
- **`edition`**: Use `"2024"`. Controls language features and syntax.
- **`implicit-dependencies`**: `std` and `sui` are auto-included by default. Set `implicit-dependencies = false` to disable (not recommended).
- **`[environments]`**: Map environment names to chain IDs; use with `sui move build --env <name>`.
- **`modes = ["test"]`**: Replaces `[dev-dependencies]`. Add this flag to any dependency that should only be available during testing.

## Dependency Types

### Git Dependencies

Point to a git repo, subfolder, and revision (branch, tag, or commit):

```toml
[dependencies]
some_lib = { git = "https://github.com/example/lib.git", subdir = "packages/lib", rev = "main" }
```

> The Sui framework (`std` and `sui`) is included implicitly -- no need to declare it as a dependency.

### Local Dependencies

For packages on your filesystem. Paths are relative to the package root:

```toml
[dependencies]
MyLib = { local = "../my_lib" }
```

### Move Registry (MVR)

Resolve packages by their MVR name:

```toml
[dependencies]
my_dep = { r.mvr = "@org/package" }
```

### System Packages

`std` (0x1) and `sui` (0x2) are implicit dependencies -- they're available in every package without being declared. Other built-in system packages (like `deepbook`) must be declared explicitly using the system dependency syntax:

```toml
[dependencies]
deepbook = { system = "deepbook" }
```

> **Note:** The `deepbook` system package refers to the deprecated DeepBook v2. New applications should use DeepBook v3 via MVR instead: `deepbook = { r.mvr = "@deepbook/core" }`.

## Advanced Features

### Overriding Dependencies

When two dependencies pull in conflicting versions of the same transitive dependency, use `override = true` to force a specific version. Note that overrides only allow upgrading to newer versions:

```toml
[dependencies]
ConflictingDep = { local = "../my_version", override = true }
```

### Renaming Dependencies

If you need to use a dependency under a different name:

```toml
[dependencies]
MyAlias = { git = "...", subdir = "...", rev = "...", rename-from = "original_name" }
```

### Test-Only Dependencies

Add `modes = ["test"]` to dependencies that are only needed for testing. They won't be included in published bytecode:

```toml
[dependencies]
test_helper = { local = "../test_helper", modes = ["test"] }
```

## Key CLI Commands

| Command | Description |
|---|---|
| `sui client chain-identifier` | Fetch active environment chain identifier |
| `sui client test-publish --build-env <ENV>` | Publish to an ephemeral network for testing |
| `sui move update-deps` | Update dependencies to latest compatible versions |

## Further Reading

- [Sui Packages Documentation](https://docs.sui.io/concepts/sui-move-concepts/packages)
- [Move.toml Reference](https://docs.sui.io/references/move/move-toml)
- [Move Registry (MVR)](https://docs.sui.io/guides/developer/packages/move-package-management#move-registry-mvr)
- [Package Manager Migration Guide](https://docs.sui.io/references/package-managers/package-manager-migration)
