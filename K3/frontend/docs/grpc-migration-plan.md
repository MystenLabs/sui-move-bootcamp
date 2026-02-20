# K3 Enoki Example: Sui gRPC Client Migration Plan

**Status: Migration carried out with RPC client for compatibility.** The provider’s `createClient` returns a JSON-RPC `SuiClient` so that `transaction.build()` works. The gRPC core’s `resolveTransactionPlugin()` in the SDK is a stub (`Promise<never>`), so the builder must use the RPC client’s core. **Execute** and **waitForTransaction** for counter writes use Sui gRPC: direct hooks use `createGrpcExecuteForNetwork()` and `createSuiGrpcClient().core.waitForTransaction()`; sponsored hooks use gRPC for wait. See F1 (`smb2/sui-move-bootcamp/F1/app/my-first-sui-dapp/src/dApp-kit.ts`) for the reference pattern.

---

## Previous state (pre-migration): JSON-RPC only

K3 currently uses the **JSON-RPC client** only:

| Location | What’s used | Client type |
|----------|--------------|-------------|
| `lib/network-config.ts` | `createNetworkConfig` with `url: getFullnodeUrl(...)` | JSON-RPC URL |
| `components/layout-wrapper.tsx` | `SuiClientProvider` from `@mysten/dapp-kit` | Legacy dapp-kit (RPC) |
| `useSuiClient()` (hooks, counter-reads) | Returns `SuiClient` from dapp-kit | `@mysten/sui/client` (JSON-RPC) |

So every call (getObject, queryEvents, waitForTransaction, transaction building) goes over **JSON-RPC**, not gRPC.

---

## Reference: Your D1 and D3 (gRPC client pattern)

The D1 and D3 you pulled into the workspace (e.g. under `smb2/sui-move-bootcamp` or your local copy) **do use SuiGrpcClient**. Use them as the reference for client creation.

**D3** (`D3/get-heroes/src/suiClient.ts`):

```ts
import { SuiGrpcClient } from '@mysten/sui/grpc';
import { ENV } from "./env";

export const suiClient = new SuiGrpcClient({
  baseUrl: `https://fullnode.${ENV.SUI_NETWORK}.sui.io:443`,
  network: ENV.SUI_NETWORK,
});
```

**D1** (`D1/ts/src/tests/suiClient.test.ts`): same pattern — `new SuiGrpcClient({ baseUrl: \`https://fullnode.${ENV.SUI_NETWORK}.sui.io:443\`, network: ENV.SUI_NETWORK })`.

Use this pattern for K3’s gRPC client. **K1** (`K1/backend/indexer.ts`) also uses `SuiGrpcClient` for checkpoint subscriptions (streaming); it uses `getFullnodeUrl(network)` for `baseUrl`. Either URL style is fine; the D3 pattern matches multi-network env (e.g. `ENV.SUI_NETWORK` = devnet/testnet/mainnet).

---

## Why D3 can use gRPC and K3 can't (for the same client)

**How D3 uses the gRPC client (smb2 branch):**

- D3 creates a **standalone** `SuiGrpcClient` (no dapp-kit, no `useSuiClient()`).
- The only usage in the repo is **reads**: `getOwnedHeroesIds` calls `suiClient.listOwnedObjects({ owner, type, cursor })` to paginate owned Hero NFTs.
- D3 does **not** call `transaction.build({ client })`, `client.waitForTransaction()`, or any signing/execution flow that goes through that client.

So D3 uses gRPC for **read-only** operations that the gRPC client supports (e.g. `listOwnedObjects`). The gRPC client **does** implement `executeTransaction` at the transport level (submitting signed bytes), but D3 never needs that in this app.

**Why K3 ends up using RPC for the dapp-kit client:**

- K3 uses **one** client from dapp-kit (`useSuiClient()`) for: building transactions, reading (getObject, queryEvents), and waiting (waitForTransaction).
- When we call `transaction.build({ client })`, the SDK runs a **resolution** step that does:
  - `plugin = client.core?.resolveTransactionPlugin() ?? jsonRpcClientResolveTransactionPlugin(client)`
- So if the client has a `.core` (e.g. `SuiGrpcClient`), it uses **that** core's `resolveTransactionPlugin()`. On the gRPC core, that method is a **stub**: it returns a plugin that never calls `next()`, so resolution never completes and the build fails. The SDK only falls back to the working RPC plugin when `client.core?.resolveTransactionPlugin()` is falsy.
- So with a **pure** gRPC client, `transaction.build()` fails before we ever get to execute. The blocker is the **build** step (transaction resolution), not execution. Once the SDK's gRPC core implements a real `resolveTransactionPlugin()`, we could use a gRPC client for the same flow as K3.

**Summary:**

| | D3 (get-heroes) | K3 (Enoki counter) |
|---|-----------------|---------------------|
| **Client** | Standalone `SuiGrpcClient` | dapp-kit client from `useSuiClient()` |
| **Uses client for** | Reads only (`listOwnedObjects`) | Build tx, reads, wait, (Enoki/wallet use same client) |
| **Calls `transaction.build({ client })`?** | No | Yes |
| **Why gRPC works** | No dependency on `resolveTransactionPlugin()` | N/A |
| **Why RPC needed** | N/A | Build step requires RPC core's `resolveTransactionPlugin()` until gRPC core implements it |

---

## K3 client surface to migrate

These are the **client methods** used in K3 that must work with the gRPC client (or an adapter):

| Method | File(s) | Purpose |
|--------|--------|---------|
| `client.getObject()` | `lib/counter/counter-reads.ts` | Fetch counter object |
| `client.queryEvents()` | `lib/counter/counter-reads.ts` | Fetch counter events |
| `client.waitForTransaction()` | `useIncrement.ts`, `useDecrement.ts`, `useIncrementDirect.ts`, `useDecrementDirect.ts` | Wait for tx confirmation |
| `transaction.build({ client })` | Counter hooks (via `counter-transactions.ts`) | Build transaction (needs a client) |

Plus:

- **Enoki**: `get-sponsored-tx.ts` uses `EnokiClient` only (no Sui client).
- **Wallet/signing**: `useSignTransaction` from dapp-kit (unchanged by client type).

---

## Migration plan

### Phase 1: Verify SDK and dapp-kit support

1. **Confirm `@mysten/sui` gRPC API**
   - In `node_modules/@mysten/sui` (or SDK docs), check whether `SuiGrpcClient` from `@mysten/sui/grpc` exposes:
     - `getObject` (or equivalent, e.g. under `ledgerService` / `stateService`)
     - `queryEvents` (or equivalent)
     - `waitForTransaction` (or equivalent)
   - If the API is different (e.g. different method names or request/response shapes), you’ll need a small adapter or use the SDK’s compatibility layer if one exists.

2. **Decide frontend strategy**
   - **Option A – New dApp Kit (recommended if you can upgrade):**  
     New packages use gRPC via `createClient` returning `SuiGrpcClient`. Check:
     - [Sui dApp Kit migrations](https://sdk.mystenlabs.com/sui/migrations/sui-2.0/dapp-kit)
     - Whether `@mysten/dapp-kit-react` (or current equivalent) supports `createClient` with `SuiGrpcClient` and still provides `useSuiClient`, `useSignTransaction`, and Enoki integration.
   - **Option B – Keep current dApp Kit, swap client:**  
     If the new dApp Kit is not ready or doesn’t support Enoki yet, keep `SuiClientProvider` but provide a **custom client** that is a `SuiGrpcClient` (or a thin wrapper) so that `useSuiClient()` returns a gRPC-backed client. This only works if `SuiClientProvider` accepts a client type compatible with gRPC (same method names/signatures).

### Phase 2: Add gRPC client creation (K1-style)

3. **Introduce a shared gRPC client config**
   - Add a small module (e.g. `lib/sui-grpc-client.ts`) that creates `SuiGrpcClient` per network, **matching your D3 pattern**:
     - Import `SuiGrpcClient` from `@mysten/sui/grpc`.
     - Create client with `{ network, baseUrl: \`https://fullnode.${network}.sui.io:443\` }` (or use `getFullnodeUrl(network)` like K1). For a single default network you can use env (e.g. `NEXT_PUBLIC_SUI_NETWORK_NAME`) like D3’s `ENV.SUI_NETWORK`.
   - Use the same networks as today (devnet/testnet/mainnet) so behavior stays aligned with `network-config`.

4. **Wire gRPC into the app**
   - **If Option A (new dApp Kit):**  
     In the new `createDAppKit` (or equivalent) config, set `createClient(network) { return new SuiGrpcClient({ network, baseUrl: ... }); }` and remove RPC-only `createNetworkConfig` for the client.
   - **If Option B (current dApp Kit):**  
     In `lib/network-config.ts` (or a new config module), check whether `createNetworkConfig` can take a `createClient`-style option that returns `SuiGrpcClient`. If not, you may need to:
     - Provide a custom context that holds the gRPC client and network, and a custom `useSuiClient()` that returns that client, **or**
     - Patch the network config so that the “url” points to a gRPC endpoint and the provider constructs a gRPC client (only if dapp-kit supports that).

### Phase 3: Adapt code that uses the client

5. **Update `lib/counter/counter-reads.ts`**
   - Replace `SuiClient` type with the type returned by `useSuiClient()` after migration (e.g. `SuiGrpcClient` or a shared interface).
   - Ensure `getCounterById` and `getCounterEvents` use the same method names as the gRPC client (`getObject`, `queryEvents` or their gRPC equivalents). If the gRPC client uses different methods or response shapes, add a thin adapter (e.g. `getObjectAdapter`) so the rest of the app keeps using the same interface.

6. **Update counter hooks**
   - In `useIncrement.ts`, `useDecrement.ts`, `useIncrementDirect.ts`, `useDecrementDirect.ts`:
     - Keep using `useSuiClient()` (or your custom hook that returns the gRPC client).
     - Replace `client.waitForTransaction` with the gRPC client’s equivalent (same or different method name) and adjust response handling if needed.
   - In `lib/counter/counter-transactions.ts`, ensure `transaction.build({ client })` is called with the same client type; if the builder expects a specific interface, add an adapter or use the SDK’s documented type.

7. **Enoki and server**
   - `get-sponsored-tx.ts` and `executeSponsoredTx` do not use a Sui client; no change required unless you later add server-side chain reads.

### Phase 4: Testing and cleanup

8. **Test flows**
   - Connect wallet (traditional and zkLogin/Enoki).
   - Read counter (object + events).
   - Increment / decrement (sponsored and direct), then confirm `waitForTransaction` (or equivalent) and UI updates.
   - Switch networks if you support multiple; ensure the gRPC client uses the correct network/URL.

9. **Cleanup**
   - Remove or deprecate RPC-only URL usage for the main app client (keep only gRPC).
   - Update `lib/network-config.ts` and any docs (e.g. `specs/enoki-implementation.md`) to state that the app uses the Sui gRPC client.
   - Optionally add a short comment or README section in the repo that “K3 uses SuiGrpcClient (see `lib/sui-grpc-client.ts` and network config).”

---

## Reference: gRPC client creation (D3 and K1)

**D3 style (recommended for app client):**

```ts
// D3/get-heroes/src/suiClient.ts
import { SuiGrpcClient } from '@mysten/sui/grpc';

export const suiClient = new SuiGrpcClient({
  baseUrl: `https://fullnode.${ENV.SUI_NETWORK}.sui.io:443`,
  network: ENV.SUI_NETWORK,
});
```

**K1 style (alternative; used for indexer streaming):**

```ts
// K1/backend/indexer.ts
import { getFullnodeUrl } from "@mysten/sui/client";
import { SuiGrpcClient } from "@mysten/sui/grpc";

const grpcClient = new SuiGrpcClient({
  network: "testnet",
  baseUrl: getFullnodeUrl("testnet"),
});
```

For K3, use the same constructor pattern as D3; the main work is ensuring the **polling** methods (`getObject`, `queryEvents`, `waitForTransaction`) exist on `SuiGrpcClient` and match how the rest of the app is written, or adding a small adapter layer.

---

## Summary

| Question | Answer |
|----------|--------|
| Is K3 using the Sui gRPC client today? | **Provider uses RPC.** The app client is JSON-RPC so `transaction.build()` works (gRPC core’s `resolveTransactionPlugin()` is a stub). gRPC client is in `lib/sui-grpc-client.ts` for direct use. |
| Where do D1/D3 use gRPC? | In **your** D1/D3 (e.g. smb2 copy): they use `SuiGrpcClient` with `baseUrl` + `network` as above. Use that as the reference. |
| What was implemented | `lib/sui-grpc-client.ts` (create SuiGrpcClient per network, D3 pattern), `lib/sui-client-wrapper.ts` (RPC client + gRPC .core), `createClient` in layout-wrapper.tsx returns the wrapper. |

---

## Implemented files (migration carried out)

- **`lib/sui-grpc-client.ts`** – Creates `SuiGrpcClient` for a given network (D3-style baseUrl + network).
- **`lib/sui-client-wrapper.ts`** – Returns a JSON-RPC `SuiClient` for the given network so `transaction.build()` works (the SDK’s gRPC core does not implement `resolveTransactionPlugin()` yet).
- **`components/layout-wrapper.tsx`** – `SuiClientProvider` uses `createClient={(network) => createSuiClientForNetwork(network as SuiNetworkName)}`.
- **`lib/network-config.ts`** – Comment added that the real client is gRPC-backed via createClient.
