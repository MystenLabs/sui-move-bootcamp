# Nano Stores Lit

<img align="right" width="92" height="92" title="Nano Stores logo"
     src="https://nanostores.github.io/nanostores/logo.svg">

[Lit](https://lit.dev/) integration for **[Nano Stores]**, a tiny state manager
with many atomic tree-shakable stores.

- **Small.** Less than 1 KB. Zero dependencies.
- **Fast.** With small atomic and derived stores, you do not need to call
  the selector function for all components on every store change.
- **Tree Shakable.** The chunk contains only stores used by components
  in the chunk.
- Was designed to move logic from components to stores.
- It has good **TypeScript** support.

## Quick start

Install it:

```bash
npm add nanostores @nanostores/lit # or yarn
```

Use it as a decorator with `@useStores`:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { useStores } from "@nanostores/lit";

import { profile } from "./stores/profile.js";

@customElement("my-header")
@useStores(profile)
class MyHeader extends LitElement {
  render() {
    return html`<header>${profile.get().userId}</header>`;
  }
}
```

Or as a mixin with `withStores`:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { withStores } from "@nanostores/lit";

import { profile } from "./stores/profile.js";

@customElement("my-header")
class MyHeader extends withStores(LitElement, [profile]) {
  render() {
    return html`<header>${profile.get().userId}</header>`;
  }
}
```

Or as a Reactive Controller with `StoreController`:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { StoreController } from "@nanostores/lit";

import { profile } from "./stores/profile.js";

@customElement("my-header")
class MyHeader extends LitElement {
  private profileController = new StoreController(this, profile);
  render() {
    return html`<header>${this.profileController.value.userId}</header>`;
  }
}
```

[Nano Stores]: https://github.com/nanostores/nanostores/
