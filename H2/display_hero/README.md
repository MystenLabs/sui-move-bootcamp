# Display Pattern (V2)

This exercise demonstrates **Sui's Display standard** — the mechanism for defining how objects render in wallets, explorers, and marketplaces — using the **Display V2** architecture built on the `DisplayRegistry`.

## What You'll Learn

Display objects attach metadata templates to a type. Fields use template syntax (`{name}`, `{blob_id}`) that interpolates actual object field values at query time.

In Display V2, the **`DisplayRegistry`** is a shared system object (similar to `Clock` at `0x6`). Because `init` functions cannot receive shared objects, display creation happens in a **separate entry function** called after publish. This produces two objects:

- **`Display<Hero>`** — a shared object holding the template fields
- **`DisplayCap<Hero>`** — an owned capability that authorizes field modifications

## Project Structure

```
display_hero/
├── sources/
│   └── hero.move          # Move contract with create_display entry function for Display<Hero>
└── ts/                    # TypeScript integration test
    ├── src/
    │   ├── tests/
    │   │   └── createDisplay.test.ts   # Creates Display via PTB (dry run)
    │   ├── env.ts
    │   └── index.ts
    ├── .env.example
    ├── package.json
    └── tsconfig.json
```

### `hero.move`

- **`HERO has drop`** — one-time witness (OTW) used to claim a `Publisher` in `init`.
- **`Hero`** — a key+store object with `name` and `blob_id` fields.
- **`init`** — claims the publisher and transfers it to the deployer. Display creation is **not** done here because the `DisplayRegistry` is a shared object that `init` cannot receive.
- **`create_display`** — entry function that takes a `&mut DisplayRegistry` and `&mut Publisher`, creates a `Display<Hero>` with three template fields, shares the Display, and transfers the `DisplayCap` to the caller. This is the function you implement.

### Key Concept: Display Template Interpolation

Display fields use template tokens that reference struct field names:

```
name       → {name}
image_url  → https://aggregator.walrus-testnet.walrus.space/v1/blobs/{blob_id}
description → {name} - A true Hero of the Sui ecosystem!
```

When a wallet queries a `Hero` object, Sui replaces `{name}` and `{blob_id}` with the actual field values from that specific Hero instance. The `image_url` field shows how Display can bridge on-chain objects to off-chain storage (Walrus in this case).

In Display V2, fields are set individually using `display_registry::set` rather than all at once via a constructor. The `DisplayCap` must be passed to authorize each modification.

### TypeScript Test

The `ts/` directory contains a Jest test that demonstrates creating a Display off-chain using the Sui TypeScript SDK. It builds a programmable transaction block (PTB) that calls `0x2::display_registry::new_with_publisher`, sets fields via `0x2::display_registry::set`, shares the Display via `0x2::display_registry::share`, and transfers the `DisplayCap` — then dry-runs it against devnet.

## Build & Test

### Move

```bash
sui move build
sui move test
```

### TypeScript

```bash
cd ts
npm install
cp .env.example .env
# Fill in DISPLAY_PACKAGE_ID and PUBLISHER_ID from a previous deployment
npm test
```

The TypeScript test requires a published package on devnet. Set these environment variables in `.env`:
- `DISPLAY_PACKAGE_ID` — the package ID from `sui client publish`
- `PUBLISHER_ID` — the Publisher object ID received during publish

## Further Reading

- [Move Book: Display](https://move-book.com/programmability/display)
