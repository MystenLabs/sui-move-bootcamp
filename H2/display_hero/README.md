# Display Pattern

This exercise demonstrates **Sui's Display standard** — the mechanism for defining how objects render in wallets, explorers, and marketplaces.

## What You'll Learn

Display objects attach metadata templates to a type. Fields use template syntax (`{name}`, `{blob_id}`) that interpolates actual object field values at query time. Creating a Display requires a `Publisher` object, which proves you deployed the package.

## Project Structure

```
display_hero/
├── sources/
│   └── hero.move          # Move contract with init that creates Display<Hero>
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
- **`init`** — claims the publisher, creates a `Display<Hero>` with three fields (`name`, `image_url`, `description`), calls `update_version()` to apply the template, and transfers both objects to the deployer.

### Key Concept: Display Template Interpolation

```move
let keys = vector[b"name".to_string(), b"image_url".to_string(), b"description".to_string()];
let values = vector[
    b"{name}".to_string(),
    b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/{blob_id}".to_string(),
    b"{name} - A true Hero of the Sui ecosystem!".to_string(),
];
```

When a wallet queries a `Hero` object, Sui replaces `{name}` and `{blob_id}` with the actual field values from that specific Hero instance. The `image_url` field shows how Display can bridge on-chain objects to off-chain storage (Walrus in this case).

### TypeScript Test

The `ts/` directory contains a Jest test that demonstrates creating a Display off-chain using the Sui TypeScript SDK. It builds a programmable transaction block (PTB) that calls `0x2::display::new_with_fields` and `0x2::display::update_version`, then dry-runs it against devnet.

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
