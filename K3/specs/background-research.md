# Enoki Sponsored Transactions - Educational Web App

## Project Goal

Create an educational web app showcasing **Enoki sponsored transactions** on Sui. The focus is on demonstrating the Enoki setup and sponsorship flow, not complex smart contract logic.

---

## Target Audience

**Semi-technical developers** who:
- Understand basic blockchain concepts
- Have some frontend development experience
- Want to learn Enoki integration quickly
- Prefer "learning by doing" over hand-holding tutorials

**Design Philosophy**: "Do → See Code → Understand" loop. Respect their intelligence, let them explore.

---

## Core Decisions

### Authentication
- **Simple wallet connection** using dApp Kit's `<ConnectButton>`
- No zkLogin - keep it straightforward

### Smart Contract
- **Extremely simple** Move contract
- Counter with optional message functionality
- Focus should remain on Enoki integration, not Move complexity

### Design Approach
- **Tabbed layout with real-time code highlighting** (NOT slideshow)
- Interactive demo synced with code explanations
- Transaction log that connects actions to code

---

## Features

### Two-Tab Layout

| Tab | Purpose |
|-----|---------|
| **Demo** | Interactive showcase - users try the sponsored transactions |
| **Code** | Step-by-step guide with navigation - developers learn how it works |

### Demo Tab Features
1. **Global Counter** - Anyone can increment/decrement
2. **Two-Step Buttons** - "Prepare +" / "Prepare −" then "Sign & Execute"
3. **Prepared State Modal** - Shows tx details + sponsor confirmation before signing
4. **Optional Message** - Leave a short message when incrementing
5. **Recent Activity Feed** - Show who incremented and their messages
6. **Transaction Log** (collapsible) - Real-time visibility into sponsorship flow
7. **"Gas Sponsored" Badge** - Reinforce the value prop after each transaction

### Code Tab Features
1. **Step-by-step navigation** - Prev/Next buttons through the sponsorship flow
2. **Code blocks with syntax highlighting** - Copy-paste ready
3. **Active step highlighting** - Current step visually emphasized
4. **Sync with transaction log** - Clicking log steps jumps to corresponding code

### Code Tab Steps
```
Step 1: Get API Key
Step 2: Environment Variables  
Step 3: Provider Setup
Step 4: Build Transaction (onlyTransactionKind: true)
Step 5: Get Sponsored Transaction (send bytes to Enoki)
Step 6: Sign & Execute (separate transaction)
```

---

## Move Contract

```move
module counter::counter {
    public struct Counter has key {
        id: UID,
        value: u64,
        owner: address,
    }

    public fun create(ctx: &mut TxContext) {
        transfer::share_object(Counter {
            id: object::new(ctx),
            value: 0,
            owner: tx_context::sender(ctx),
        });
    }

    public fun increment(counter: &mut Counter) {
        counter.value = counter.value + 1;
    }

    public fun decrement(counter: &mut Counter) {
        counter.value = counter.value - 1;
    }
}
```

**Note:** Message functionality to be added (store recent messages on-chain or emit events).

---

## UI Layout

### Main Layout (Side-by-Side)

```
┌─────────────────────────────────────────────────────────────────┐
│  Enoki Sponsored Transactions                   [Connect Wallet]│
├─────────────────────────────────────────────────────────────────┤
│  [Demo]  [Code]                                                 │
├───────────────────────────────┬─────────────────────────────────┤
│                               │                                 │
│   ┌───────────────────────┐   │  Step 4 of 6: Build Transaction │
│   │     Counter: 42       │   │  ───────────────────────────────│
│   │                       │   │                                 │
│   │ [Prepare −] [Prepare +]   │  ```typescript                  │
│   │                       │   │  const tx = new Transaction();  │
│   │  ┌─────────────────┐  │   │  tx.moveCall({                  │
│   │  │ Leave a message │  │   │    target: `${PKG}::counter...  │
│   │  └─────────────────┘  │   │  });                            │
│   └───────────────────────┘   │                                 │ 
│                               │  // Key: onlyTransactionKind    │
│   Recent Activity:            │  const bytes = await tx.build({ │
│   • alice (+1) "gm!" 0x8f2a.. │    client,                      │
│   • bob (+1) 0x3c1d..         │    onlyTransactionKind: true ←  │ ← highlighted
│                               │  });                            │
│                               │  ```                            │
│                               │                                 │
│                               │  [← Prev]  ● ● ● ● ○ ○  [Next →]│
│                               │                                 │
├───────────────────────────────┴─────────────────────────────────┤
│  ▼ Transaction Log                                              │
│  [1] Build ✓  [2] Get bytes ✓  [3] Sponsor...  [4]  [5]  [6]   │
│                                      ↑                          │
│                              clicking jumps to code step        │
└─────────────────────────────────────────────────────────────────┘
```

### Two-Step Transaction Flow

The transaction is split into **two user actions** for educational visibility:

**Step 1: Prepare** (User clicks "Prepare +" or "Prepare −")
```
┌───────────────────────────────────────┐
│  Preparing transaction...             │
│  ━━━━━━━━━━━━░░░░░░░░                 │
└───────────────────────────────────────┘
         ↓ (builds tx, gets bytes, requests sponsorship)
┌───────────────────────────────────────┐
│  ✓ Transaction Ready                  │
│                                       │
│  Action: Increment counter            │
│  Bytes: 0x3a8f2b...                   │
│  Sponsor: Enoki ✓                     │
│  Gas: Covered by sponsor              │
│                                       │
│  [Cancel]         [Sign & Execute]    │
└───────────────────────────────────────┘
```

**Step 2: Sign & Execute** (User clicks "Sign & Execute")
- Wallet popup appears for signing
- Transaction executes after signature
- Success confirmation with explorer link

### Why Two Steps?

| Benefit | Explanation |
|---------|-------------|
| **Honest visualization** | Each step is real, not artificially delayed |
| **Teaches mental model** | Sponsorship happens BEFORE signing (key insight!) |
| **Natural pause** | "Transaction Ready" state is perfect moment to view code |
| **Code sync** | Steps 1-4 run on Prepare, Steps 5-6 run on Sign |

### Key Interactions

1. **Tab Switching**
   - Demo tab: Shows only left panel (counter + activity)
   - Code tab: Shows split view (demo left, code right)

2. **Transaction Log ↔ Code Sync**
   - On "Prepare": Log steps 1-4 light up (build → bytes → sponsor)
   - On "Sign & Execute": Log steps 5-6 light up (sign → execute)
   - Clicking a log step navigates to corresponding code step
   - Creates "see the matrix" effect for developers

3. **Code Navigation**
   - Prev/Next buttons step through the 6 code sections
   - Dot indicators show progress (● filled = visited, ○ empty = unvisited)
   - Each step is self-contained with copy button

4. **Prepared State**
   - Shows transaction details before committing
   - Confirms sponsorship is ready
   - User can cancel or proceed to sign

---

## Transaction Log (Developer Visibility)

Show real-time steps when a transaction occurs, aligned with the two-step flow:

**On "Prepare" click:**
```
[1] Building transaction with onlyTransactionKind: true
[2] Transaction bytes: 0x3a8f...
[3] Requesting sponsorship from Enoki...
[4] Sponsor signature received ✓
    ─── Transaction Ready (waiting for user) ───
```

**On "Sign & Execute" click:**
```
[5] User signing... (wallet popup)
[6] Executing sponsored transaction...
[7] Success! Digest: 8xKj2...
```

This two-phase logging makes the sponsorship flow visible:
- **Phase 1 (Prepare)**: Shows that sponsorship happens BEFORE the user signs
- **Phase 2 (Execute)**: Shows the signing and execution are separate from preparation

---

## Enoki Sponsorship Flow (Code Tab Content)

### Step 1: Get API Key
- Link to Enoki portal
- Create project, get API key

### Step 2: Environment Variables
```env
ENOKI_API_KEY=your_api_key_here
```

### Step 3: Build Transaction with `onlyTransactionKind`
```typescript
const tx = new Transaction();
tx.moveCall({
  target: `${PACKAGE_ID}::counter::increment`,
  arguments: [tx.object(COUNTER_ID)],
});

// Key: only build the transaction kind, not a full transaction
const txBytes = await tx.build({ 
  client: suiClient,
  onlyTransactionKind: true 
});
```

### Step 4: Get Sponsored Transaction from Enoki
```typescript
const sponsoredResponse = await enokiClient.createSponsoredTransaction({
  network: 'testnet',
  transactionKindBytes: toBase64(txBytes),
  sender: walletAddress,
});
```

### Step 5: Sign & Execute
```typescript
// User signs the sponsored transaction
const signature = await signTransaction({
  transaction: fromBase64(sponsoredResponse.bytes),
});

// Execute with both signatures (user + sponsor)
const result = await enokiClient.executeSponsoredTransaction({
  digest: sponsoredResponse.digest,
  signature: signature.signature,
});
```

---

## UX Enhancements

### Core Interactions
1. **Transaction Log ↔ Code Sync** - Clicking log steps jumps to corresponding code section
2. **Real-time step highlighting** - As transaction executes, log steps animate in sequence
3. **Copy-paste code blocks** - One-click copy for each code snippet
4. **Explorer links** - Each transaction digest links to Sui explorer

### Visual Feedback
1. **"Gas Sponsored" Badge** - Toast/badge appears after each successful transaction
2. **Step progress indicators** - Dots showing which code steps have been viewed
3. **Active line highlighting** - Key lines (like `onlyTransactionKind: true`) visually emphasized

### Optional Enhancements
1. **Before/After Comparison** (toggle):
   - ❌ Without sponsorship: User pays ~0.003 SUI
   - ✅ With sponsorship: User pays 0 SUI
2. **Keyboard navigation** - Arrow keys to navigate code steps

---

## Tech Stack

- **Frontend:** React + TypeScript + Next.js
- **Sui Integration:** @mysten/dapp-kit, @mysten/sui
- **Enoki:** @mysten/enoki
- **Styling:** Tailwind CSS
- **Network:** Testnet

---

## Design Rationale

### Why Tabbed + Code Highlighting (Not Slideshow)

| Factor | Slideshow | Tabbed + Sync | Winner |
|--------|-----------|---------------|--------|
| Learning style | Passive → Active | Active throughout | Tabbed |
| "Aha" moment | Delayed | Immediate (first click) | Tabbed |
| Developer preference | Can feel patronizing | Respects intelligence | Tabbed |
| Reference value | Code buried in slides | Always accessible | Tabbed |
| Exploration | Fights non-linear | Embraces it | Tabbed |

**Key insight**: Developers learn by reverse engineering. When they see something work, their instinct is "show me the code." The tabbed approach with transaction log sync satisfies that immediately.

---

## Next Steps

- [ ] Research current Enoki SDK API and patterns
- [ ] Set up project scaffolding
- [ ] Deploy simple Move contract to testnet
- [ ] Implement Demo tab (counter + activity feed)
- [ ] Implement Code tab (6-step walkthrough with navigation)
- [ ] Add transaction log with code sync
- [ ] Polish UI/UX
