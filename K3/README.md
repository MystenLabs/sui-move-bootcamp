# K3 Student Exercise: Enoki Counter

This version of `K3` is intentionally scaffolded for practice.
You will implement both:

- on-chain Move logic (`counter.move`)
- off-chain TypeScript flow (Sui TS SDK + Enoki sponsorship + zkLogin wallet path)

## Learning Goals

By the end of this exercise, you should be able to explain:

- why the `Counter` is a shared object
- why increment/decrement operations emit events
- how `TxContext.sender()` gives action attribution
- why underflow protection is part of contract safety
- how these on-chain patterns support sponsored transaction UX
- how a sponsored transaction moves from client build to server sponsorship to signed execution
- why zkLogin wallets can use the same dApp Kit hooks as traditional wallets

## Where You Will Code

- Move module: `K3/contracts/move/enoki_example/sources/counter.move`
- Sponsored increment hook: `K3/app/hooks/counter/useIncrement.ts`
- Enoki server action: `K3/app/lib/enoki/get-sponsored-tx.ts`

Functions marked with TODO are intentionally incomplete:

- `init`
- `increment`
- `decrement`
- `useIncrement` sponsorship flow steps
- `getSponsoredTx` implementation

## Milestones

Run tests from:

```bash
cd K3/contracts/move/enoki_example
sui move test
```

This scaffold starts with failing tests on purpose because TODO logic is not implemented yet.
During development, run one milestone at a time (the filter is positional, not a `--filter` flag):

```bash
sui move test milestone_1
sui move test milestone_2
sui move test milestone_3
sui move test milestone_4
```

### Milestone 1 - Initialize and Share

Target test:

- `milestone_1_init_creates_shared_counter`

What to implement:

- create `Counter` with initial `value = 0`
- share it using `transfer::share_object`

Reflection:

- Why must this object be shared instead of owned by one address?

### Milestone 2 - Increment + Event

Target test:

- `milestone_2_increment_updates_value`

What to implement:

- increment by exactly 1
- emit `Incremented` using sender, note, and new value

Reflection:

- If an indexer listens only to events, what useful history does `Incremented` provide?

### Milestone 3 - Safe Decrement + Event

Target tests:

- `milestone_3_decrement_updates_value`
- `milestone_3_decrement_below_zero_fails`

What to implement:

- assert counter value is above zero before decrement
- decrement by exactly 1
- emit `Decremented`

Reflection:

- Why is protecting invariants on-chain better than relying on frontend checks?

### Milestone 4 - Multi-user Sequence

Target tests:

- `milestone_4_multiple_users_share_one_counter`
- `milestone_4_operation_sequence`

What to validate:

- different senders can mutate the same shared object
- state transitions stay correct across mixed operations

Reflection:

- What assumptions would break if each user had a private counter instead?

### Milestone 5 - TS SDK Transaction Build

Target file:

- `K3/app/hooks/counter/useIncrement.ts`

What to implement:

- construct increment transaction with `incrementTransaction(...)`
- build transaction bytes using `transaction.build({ client, onlyTransactionKind: true })`
- preserve `TransactionError` handling for failed build

Reference:

- `K3/app/hooks/counter/useDecrement.ts` (same flow, already complete)

Reflection:

- Why do we use `onlyTransactionKind: true` before sponsorship?

### Milestone 6 - Enoki Sponsorship Request

Target file:

- `K3/app/lib/enoki/get-sponsored-tx.ts`

What to implement:

- call `createSponsoredTransaction` on `EnokiClient`
- pass network, base64 transaction kind bytes, sender
- restrict `allowedAddresses` and `allowedMoveCallTargets`

Reflection:

- What security risk appears if sponsorship targets are not constrained?

### Milestone 7 - Sign + Execute Sponsored Transaction

Target file:

- `K3/app/hooks/counter/useIncrement.ts`

What to implement:

- request sponsorship from server (`getSponsoredTx`)
- sign sponsored bytes through `dAppKit.signTransaction(...)`
- execute via `executeSponsoredTx(...)`
- wait for confirmation with `client.core.waitForTransaction(...)`

Reference:

- `K3/app/hooks/counter/useDecrement.ts` (complete end-to-end example)

Reflection:

- Why does the user sign sponsored bytes, even when gas is paid by sponsor?

### Milestone 8 - zkLogin Understanding Check

Reading targets:

- `K3/app/lib/dapp-kit.ts`
- `K3/app/app/auth/callback/page.tsx`

What to explain:

- how Enoki wallet initializer configures Google provider + redirect URL
- why callback page can remain lightweight
- why zkLogin wallet and regular wallet share the same mutation hooks

Reflection:

- Which parts are auth-specific vs transaction-specific in this architecture?

## Suggested Workflow

1. Read one milestone's test first.
2. Predict expected behavior.
3. Implement only the TODO needed for that milestone.
4. Validate quickly:
   - Move: `sui move test milestone_X`
   - App: run `bun dev` in `K3/app` and test increment flow in UI
5. Repeat until all milestones pass and UI flow works.

## Stretch Ideas (Optional)

- Add a `reset` function restricted by a capability.
- Emit an extra event field (for example, previous value).
- Add tests for empty notes and more edge cases.
