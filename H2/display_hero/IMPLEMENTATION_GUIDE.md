# Display Hero — Implementation Guide

Complete the `create_display` function in `sources/hero.move` and the TypeScript test in `ts/src/tests/createDisplay.test.ts` to create a `Display<Hero>` both on-chain and off-chain.

## Overview

You will:

1. **(Move)** Implement the `create_display` entry function to register a Display via the `DisplayRegistry`, set template fields, share the Display, and transfer the `DisplayCap`
2. **(TypeScript)** Build a programmable transaction that creates a Display via SDK calls to `display_registry`

---

## Part A: Move

### Step 1 — Complete the `create_display` function

**File:** `sources/hero.move`, the `create_display` entry function

The starter code already has:
- An `init` function that claims a `Publisher` and transfers it to the deployer
- An empty `create_display` stub that receives `&mut DisplayRegistry` and `&mut Publisher`

You need to:

1. Call `display_registry::new_with_publisher` to create a `Display<Hero>` and `DisplayCap<Hero>`
2. Set three fields (`name`, `image_url`, `description`) using `display_registry::set`
3. Share the `Display` object
4. Transfer the `DisplayCap` to the caller

Replace the empty function body with:

```move
entry fun create_display(
    registry: &mut DisplayRegistry,
    publisher: &mut Publisher,
    ctx: &mut TxContext,
) {
    let (mut display, cap) = display_registry::new_with_publisher<Hero>(
        registry,
        publisher,
        ctx,
    );

    display.set(&cap, b"name".to_string(), b"{name}".to_string());
    display.set(
        &cap,
        b"image_url".to_string(),
        b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/{blob_id}".to_string(),
    );
    display.set(
        &cap,
        b"description".to_string(),
        b"{name} - A true Hero of the Sui ecosystem!".to_string(),
    );

    display.share();
    transfer::public_transfer(cap, ctx.sender());
}
```

> **Key concepts:**
>
> - `DisplayRegistry` is a shared system object (like `Clock`). Since `init` cannot receive shared objects, display creation must happen in a separate entry function called after publish.
> - `new_with_publisher` returns a tuple `(Display<T>, DisplayCap<T>)`. The `Display` holds template fields; the `DisplayCap` authorizes modifications.
> - Fields are set individually with `set(display, cap, key, value)` — there is no bulk `new_with_fields` in Display V2.
> - The `Display` must be **shared** (not transferred) — it is a shared object that indexers read from.
> - The `DisplayCap` is transferred to the caller so they can modify fields later.
> - Template syntax `{name}` and `{blob_id}` reference field names on the `Hero` struct. At query time, Sui substitutes the actual values from each Hero instance.

### Verify Move

```bash
sui move build
sui move test
```

The test `test_publisher_receives_the_display_object` will verify that:

- The three fields (`name`, `image_url`, `description`) have the expected template values
- The `Display<Hero>` is a shared object
- The `DisplayCap<Hero>` is owned by the sender

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

### Step 2 — Create the Display via the registry

**File:** `ts/src/tests/createDisplay.test.ts`, after the `//TODO: Create a new display using the registry` comment

Call `0x2::display_registry::new_with_publisher` to create a `Display` and `DisplayCap`:

```typescript
let [display, cap] = tx.moveCall({
    target: '0x2::display_registry::new_with_publisher',
    arguments: [
        tx.object('0xd'), // DisplayRegistry (shared system object)
        tx.object(ENV.PUBLISHER_ID),
    ],
    typeArguments: [`${ENV.DISPLAY_PACKAGE_ID}::hero::Hero`],
});
```

> The `DisplayRegistry` lives at the well-known system address `0xd`, similar to how `Clock` lives at `0x6`. The `typeArguments` tells Sui which type this Display is for — it must match the `Hero` type from your deployed package.

### Step 3 — Set the display fields

**File:** `ts/src/tests/createDisplay.test.ts`, after the `//TODO: Set the display fields` comment

Use `0x2::display_registry::set` to add each template field:

```typescript
for (let i = 0; i < keys.length; i++) {
    tx.moveCall({
        target: '0x2::display_registry::set',
        arguments: [
            display,
            cap,
            tx.pure.string(keys[i]),
            tx.pure.string(values[i]),
        ],
        typeArguments: [`${ENV.DISPLAY_PACKAGE_ID}::hero::Hero`],
    });
}
```

> In Display V2, fields are set individually with `set` — there is no bulk `new_with_fields`. The `DisplayCap` (second argument) authorizes the modification.

### Step 4 — Share the Display and transfer the cap

**File:** `ts/src/tests/createDisplay.test.ts`, after the `//TODO: Share the display and transfer the cap` comment

Share the `Display` (making it a shared object) and transfer the `DisplayCap` to yourself:

```typescript
tx.moveCall({
    target: '0x2::display_registry::share',
    arguments: [display],
    typeArguments: [`${ENV.DISPLAY_PACKAGE_ID}::hero::Hero`],
});

tx.transferObjects(
    [cap],
    tx.pure.address("0xf38a463604d2db4582033a09db6f8d4b846b113b3cd0a7c4f0d4690b3fe6aa37"),
);
```

> Replace the address with your own if needed. This is the same address set as `tx.setSender` below. The `Display` is shared (readable by indexers), while the `DisplayCap` is transferred to you so you retain control over the display fields.

### Verify TypeScript

```bash
cd ts
npm test
```

The test dry-runs the transaction against devnet and expects a `"success"` status.
