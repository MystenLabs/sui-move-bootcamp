# Display Hero — Implementation Guide

Complete the `init` function in `sources/hero.move` and the TypeScript test in `ts/src/tests/createDisplay.test.ts` to create a `Display<Hero>` both on-chain and off-chain.

## Overview

You will:

1. **(Move)** Set up display templates in the `init` function and transfer Display + Publisher to the deployer
2. **(TypeScript)** Build a programmable transaction that creates a Display via SDK calls

---

## Part A: Move

### Step 1 — Complete the `init` function

**File:** `sources/hero.move`, lines 14–18

The starter code already claims a `Publisher` from the one-time witness. You need to:

1. Define the keys and values vectors for the display template
2. Create the `Display<Hero>` object using `display::new_with_fields`
3. Call `update_version()` to apply the template
4. Transfer both the `Publisher` and `Display` to the deployer

Replace the `// setup the display` comment with:

```move
fun init(otw: HERO, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);

    let keys = vector[b"name".to_string(), b"image_url".to_string(), b"description".to_string()];

    let values = vector[
        b"{name}".to_string(),
        b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/{blob_id}".to_string(),
        b"{name} - A true Hero of the Sui ecosystem!".to_string(),
    ];

    let mut display = display::new_with_fields<Hero>(
        &publisher,
        keys,
        values,
        ctx,
    );

    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}
```

> **Key concepts:**
>
> - Template syntax `{name}` and `{blob_id}` reference field names on the `Hero` struct. At query time, Sui substitutes the actual values from each Hero instance.
> - `update_version()` must be called after modifying display fields — this increments the version counter, signaling to indexers that the template has changed.
> - `public_transfer` is required (not `transfer`) because `Publisher` and `Display` both have the `store` ability.

### Verify Move

```bash
sui move build
sui move test
```

The test `test_publisher_receives_the_display_object` will verify that:

- The display version is `1` (after one `update_version` call)
- The three fields (`name`, `image_url`, `description`) have the expected template values

---

## Part B: TypeScript (requires deployed package)

This part demonstrates creating a `Display` off-chain using the Sui TypeScript SDK. It builds a programmable transaction block (PTB) and dry-runs it against devnet.

### Prerequisites

1. Publish the package to devnet: `sui client publish --gas-budget 100000000`
2. Note the **package ID** and **Publisher object ID** from the publish output
3. Set up environment:
  ```bash
   cd ts
   npm install
   cp .env.example .env
  ```
4. Fill in `.env`:
  ```
   SUI_NETWORK=devnet
   DISPLAY_PACKAGE_ID=0x<your_package_id>
   PUBLISHER_ID=0x<your_publisher_id>
  ```

### Step 2 — Create the Display object

**File:** `ts/src/tests/createDisplay.test.ts`, line 17

After the `//TODO: Create a new display object` comment, add a `moveCall` to `0x2::display::new_with_fields`:

```typescript
let display = tx.moveCall({
    target: '0x2::display::new_with_fields',
    arguments: [
        tx.object(ENV.PUBLISHER_ID),
        tx.pure.vector("string", keys),
        tx.pure.vector("string", values),
    ],
    typeArguments: [`${ENV.DISPLAY_PACKAGE_ID}::hero::Hero`],
});
```

> The `typeArguments` tells Sui which type this Display is for — it must match the `Hero` type from your deployed package.

### Step 3 — Update the Display version

**File:** `ts/src/tests/createDisplay.test.ts`, line 19

After the `//TODO: Update the display object version` comment:

```typescript
tx.moveCall({
    target: '0x2::display::update_version',
    arguments: [display],
    typeArguments: [`${ENV.DISPLAY_PACKAGE_ID}::hero::Hero`],
});
```

### Step 4 — Transfer the Display object

**File:** `ts/src/tests/createDisplay.test.ts`, line 21

After the `//TODO: Transfer the display object to your address` comment:

```typescript
tx.transferObjects(
    [display],
    tx.pure.address("0xf38a463604d2db4582033a09db6f8d4b846b113b3cd0a7c4f0d4690b3fe6aa37"),
);
```

> Replace the address with your own if needed. This is the same address set as `tx.setSender` below.

### Verify TypeScript

```bash
cd ts
npm test
```

The test dry-runs the transaction against devnet and expects a `"success"` status.