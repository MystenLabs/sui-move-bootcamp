---
marp: true
paginate: true
footer: "Seal Theory"
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
  background: #000000 !important;
  color: #8B8B8B !important;
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
  color: #FFFFFF !important;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 16px 0;
}

section h2 {
  color: #FFFFFF !important;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 12px 0;
}

section h3 {
  color: #FFFFFF !important;
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
  color: #FFFFFF !important;
  font-weight: 600;
}

section em {
  color: #4DA2FF !important;
  font-style: normal;
}

section a {
  color: #4DA2FF;
  text-decoration: none;
}

section code {
  background: #1A1A1A !important;
  color: #4DA2FF !important;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

section pre {
  background: #0A0A0A !important;
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
  color: #FFFFFF !important;
  background: #000000 !important;
  font-weight: 600;
  text-align: left;
  padding: 10px 16px;
  border-bottom: 2px solid #4DA2FF;
}

section td {
  background: #000000 !important;
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

/* Card item for list layouts */
section .card {
  background: #0A0A0A !important;
  border: 1px solid #1A1A1A;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 8px;
}

section .card h4 {
  color: #FFFFFF !important;
  margin: 0 0 4px 0;
}

section .card p {
  margin: 0;
  font-size: 16px;
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
   PRODUCT HERO SLIDES
   ============================================================ */
section.product-seal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

section.product-seal::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 160px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.03);
  text-transform: uppercase;
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
  content: 'SEAL';
}

section.product-seal > *:not(footer):not(header) {
  position: relative;
  z-index: 1;
}

section.product-seal h1 {
  font-size: 56px;
  margin-top: 16px;
}

section.product-seal p {
  font-size: 22px;
  max-width: 600px;
}

/* ============================================================
   PRODUCT CONTENT SLIDES
   ============================================================ */
section.product-seal-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

section.product-seal-content .content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

section.product-seal-content .illustration {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

/* ============================================================
   LAYOUT: toc — Table of Contents
   ============================================================ */
section.toc {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

section.toc h1 {
  margin-bottom: 24px;
}

section.toc ol {
  font-size: 20px;
  padding-left: 32px;
  columns: 2;
  column-gap: 60px;
}

section.toc li {
  margin-bottom: 10px;
  break-inside: avoid;
}

/* ============================================================
   LAYOUT: flow — Step-by-step flow diagrams
   ============================================================ */
section .flow .steps {
  display: flex;
  gap: 8px;
  align-items: stretch;
  margin-top: 16px;
}

section .flow .step {
  flex: 1;
  background: #0A0A0A;
  border: 1px solid #1A1A1A;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
}

section .flow .step strong {
  font-size: 13px;
  color: #4DA2FF;
  margin-bottom: 4px;
}

section .flow .step p {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

/* Arrow between steps */
section .flow .arrow {
  display: flex;
  align-items: center;
  color: #4DA2FF;
  font-size: 18px;
  flex: 0 0 auto;
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
section .highlight-box {
  background: rgba(77, 162, 255, 0.08);
  border: 1px solid rgba(77, 162, 255, 0.25);
  border-radius: 8px;
  padding: 14px 18px;
  margin: 12px 0;
}
section .diagram {
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: #4DA2FF;
  font-size: 16px;
  text-align: center;
  padding: 16px;
  background: #0A0A0A;
  border: 1px solid #1A1A1A;
  border-radius: 8px;
  margin: 12px 0;
  line-height: 1.8;
}
</style>

<!-- ============================================================
     SLIDE 1 — Title
     ============================================================ -->

<!-- _class: product-seal -->
<!-- _paginate: false -->

# Seal

Decentralized Secrets Management for Sui

---

<!-- ============================================================
     SLIDE 2 — Table of Contents
     ============================================================ -->

<!-- _class: toc -->
<!-- _header: "Overview" -->

# Table of Contents

1. Introduction — the encryption gap, Seal's solution, and use cases
2. Identity-Based Encryption — IBE foundations, crypto primitives, and architecture
3. Access Policies — identity model, `seal_approve`, patterns, and composition
4. Key Servers & Threshold — threshold trade-offs and Seal's chain of trust
5. Inside the Encryption — encrypt and decrypt flows, session keys
6. Move Integration — `seal_approve` in detail, the TypeScript SDK, and full stack
7. User Flow — end-to-end walkthrough and verification model
8. Developer Workflow — getting started and key server operations
9. Security & Limitations
10. Key Takeaways + Resources

---

<!-- ============================================================
     SLIDE 3 — The Encryption Gap
     ============================================================ -->

<!-- _header: "Introduction" -->

# The Encryption Gap

Blockchains solve **authentication** — proving *who you are* and *what you own*. But they lack native **encryption** — controlling *who can read* data.

| Aspect | Authentication | Encryption |
|---|---|---|
| **Status** | Solved | Missing |
| **Mechanism** | Signatures, zkLogin, Passkeys | No standard |
| **Controls** | Who can write/transfer | Who can read |
| **Tooling** | Wallets, SDKs, standards | Ad hoc, centralized |

Today's workarounds: ephemeral keys shared via side channels, one-off KMS systems, centralized services that defeat the purpose of decentralization.

> How do we get *programmable encryption* without centralized trust?

---

<!-- ============================================================
     SLIDE 4 — Seal: The Solution
     ============================================================ -->

<!-- _header: "Introduction" -->

<!-- _class: cols-3 -->

# Seal: The Solution

Programmable encryption with on-chain access policies and decentralized key servers.

<div class="grid">
<div class="col">

### Programmable

Access policies are **Move smart contracts** you control. Define who can decrypt what — and when — using the full expressiveness of Move.

</div>
<div class="col">

### Decentralized

**Threshold encryption** across multiple independent key servers. No single server can break privacy. Choose your own trust set.

</div>
<div class="col">

### Client-Side

Data is encrypted and decrypted **locally**. Key servers derive identity keys on demand but never see your plaintext.

</div>
</div>

---

<!-- ============================================================
     SLIDE 5 — Real World Use Cases
     ============================================================ -->

<!-- _header: "Introduction" -->

<!-- _class: cols-3 -->

# Real World Use Cases

<div class="grid">
<div class="col">

### Gated Content & Subscriptions

Encrypt premium content on Walrus. Subscribers get time-limited decryption rights enforced by Move. Expiry is automatic — no re-encryption needed.

</div>
<div class="col">

### Secure Voting & MEV Protection

Keep ballots and orders encrypted until a future timestamp. Prevents frontrunning and premature reveals. Tally on-chain after the deadline.

</div>
<div class="col">

### Private Storage & Messaging

Encrypt personal data to your own address. End-to-end messaging using Sui addresses as identities — no key exchange protocol needed.

</div>
</div>

---

<!-- ============================================================
     SLIDE 6 — What Is Identity-Based Encryption?
     ============================================================ -->

<!-- _header: "Identity-Based Encryption" -->

# What Is Identity-Based Encryption?

A cryptographic scheme where **any string** serves as a public key — no key exchange needed.

> *A mailbox anyone can drop letters into, but only the named recipient can open — and the recipient doesn't need to exist yet when you send the letter.*

**Four operations define IBE:**

<div class="diagram">

Setup(λ) → (mpk, msk)&emsp;│&emsp;Encrypt(mpk, id, msg) → ciphertext&emsp;│&emsp;Derive(msk, id) → sk&emsp;│&emsp;Decrypt(sk, ct) → msg

</div>

- **Setup** — Generate a master public key (`mpk`) and master secret key (`msk`)
- **Encrypt** — Anyone encrypts using `mpk` + an identity string. No contact with key holder.
- **Derive** — The master key holder derives a secret key for any identity on demand
- **Decrypt** — The derived secret key decrypts the ciphertext

---

<!-- ============================================================
     SLIDE 8 — Seal's Architecture: Two Pillars
     ============================================================ -->

<!-- _header: "Identity-Based Encryption" -->

<!-- _class: cols-2-center -->

# Seal's Architecture: Two Pillars

<div class="grid">
<div class="col">

### On-Chain Pillar

Access policies live in **Move smart contracts**. `seal_approve*` functions define who can decrypt. Evaluated **read-only** via `dry_run` — no gas, no state changes.

The Move package address (`PackageId`) acts as the **identity namespace** — it controls all IBE identities that start with `[PackageId]`.

</div>
<div class="col">

### Off-Chain Pillar

Key servers hold **IBE master secret keys**. They are stateless — only `msk` + a Sui full node connection. Derive identity keys on demand. Horizontally scalable.

Philosophy: *"The less a key server stores, the easier it is to secure."*

</div>
</div>

<div class="diagram">

Move Package (access policy) ←── IBE Identity: [PackageId][id] ──→ Key Server (key derivation)

</div>

---

<!-- ============================================================
     SLIDE 9 — The IBE Identity Model
     ============================================================ -->

<!-- _header: "Access Policies" -->

<!-- _class: product-seal-content -->

<div class="content">

# The IBE Identity Model

Every encrypted object targets a specific IBE identity:

**Identity = `[PackageId] || [id]`**

- **`PackageId`** — Namespace isolation. The Move package address. Different packages have completely separate identity spaces.
- **`id`** — Policy-specific identifier. An address, a timestamp, an object ID — any bytes the policy needs.

> *PackageId is the zip code (which post office handles it); id is the specific mailbox.*

Properties: deterministic, unbounded domain, no interaction needed to construct.

</div>

<div class="illustration">

| Pattern | What id Encodes |
|---------|-----------------|
| Private data | `bcs::to_bytes(owner_address)` |
| Time-lock | `bcs::to_bytes(unlock_timestamp)` |
| Allowlist | `bcs::to_bytes(list_object_id)` |
| Subscription | `bcs::to_bytes(service_id)` |
| Voting | `bcs::to_bytes(vote_id)` |

</div>

---

<!-- ============================================================
     SLIDE 10 — The seal_approve Interface
     ============================================================ -->

<!-- _header: "Access Policies" -->

# The `seal_approve` Interface

Move entry functions that act as **gatekeepers** — if they don't abort, the key server releases the decryption key.

> *A bouncer who checks credentials using rules the club owner wrote — can't change the club, only decides who gets in.*

**Five conventions:**

1. **Name prefix** — Must start with `seal_approve` (e.g., `seal_approve`, `seal_approve_with_nft`)
2. **First parameter** — `id: vector<u8>` — the requested identity (without package prefix)
3. **Non-public entry** — Declared as `entry fun` (not `public`) for upgradeability
4. **Abort on denial** — Successful return = access approved. Abort = access denied.
5. **Side-effect free** — Evaluated via `dry_run` — read-only, no state changes

```move
entry fun seal_approve(id: vector<u8>, ctx: &TxContext) {
    let caller_bytes = bcs::to_bytes(&ctx.sender());
    assert!(id == caller_bytes, ENoAccess);
}
```

---

<!-- ============================================================
     SLIDE 11 — Five Access Control Patterns
     ============================================================ -->

<!-- _header: "Access Policies" -->

# Five Access Control Patterns

| Pattern | Identity Encodes | Use Case | Access Model |
|---------|-----------------|----------|-------------|
| **Private Data** | Owner address | Personal storage, private NFTs | Single owner; transfer moves rights |
| **Allowlist** | List object ID | Partner data rooms, gated drops | Shared object; update without re-encrypting |
| **Subscription** | Service ID | Premium content, paid APIs | Time-limited pass; auto-expires |
| **Time-Lock** | Unlock timestamp | Voting, auctions, MEV protection | No access before; open after deadline |
| **Secure Voting** | Vote ID | DAO governance, sealed bids | Encrypted ballots; threshold decryption for tally |

These are reference implementations — starting points you can customize and extend. Since access logic is just Move code, the combinatorial space is unbounded.

---

<!-- ============================================================
     SLIDE 12 — Composing Patterns
     ============================================================ -->

<!-- _header: "Access Policies" -->

# Composing Patterns

Since these are **standard Move functions**, you can combine them freely.

**Example:** Pre-signed URL = time check + allowlist check

```move
entry fun seal_approve(
    id: vector<u8>,
    list: &Allowlist,
    c: &clock::Clock,
    ctx: &TxContext,
) {
    let mut prepared: BCS = bcs::new(id);
    let expiry = prepared.peel_u64();
    assert!(c.timestamp_ms() <= expiry, EExpired);
    assert!(allowlist::contains(list, ctx.sender()), ENoAccess);
}
```

<div class="highlight-box">

**Key insight:** Composition is free because access logic is just Move code. No special framework, no plugin system — combine time checks, ownership checks, token balances, oracle data, or any on-chain state into a single gatekeeper function.

</div>

---

<!-- ============================================================
     SLIDE 13 — Key Servers & Threshold Encryption
     ============================================================ -->

<!-- _header: "Key Servers & Threshold" -->

<!-- _class: product-seal-content -->

<div class="content">

# Key Servers & Threshold Encryption

A **key server** holds an IBE master secret key and connects to a Sui full node. Two endpoints:

- `/v1/service` — Server info (object ID, public key, URL)
- `/v1/fetch_key` — Key derivation (evaluates policy, returns derived key)

Threshold works at **two independent levels**:

1. **Across servers** — Multiple independent key servers; the SDK combines responses. *Like needing 2 of 3 independent notaries to sign off.*
2. **Within a server (committee)** — A single logical server backed by an MPC committee; an aggregator combines partial shares via Lagrange interpolation. *Like a single notary office run by a committee that must internally agree.*

</div>

<div class="illustration">

### Threshold Trade-offs

| Config | Privacy | Liveness |
|--------|---------|----------|
| **1-of-1** | None | None |
| **2-of-3** | Tolerates 1 | Tolerates 1 |
| **3-of-5** | Tolerates 2 | Tolerates 2 |

*Privacy* = compromised servers tolerated
*Liveness* = unavailable servers tolerated

**2-of-3** is the recommended default. *Applies at both levels independently.*

</div>

---

<!-- ============================================================
     SLIDE 14 — Seal's Chain of Trust
     ============================================================ -->

<!-- _header: "Key Servers & Threshold" -->

<!-- _class: cols-2-center -->

# Seal's Chain of Trust

<div class="grid">
<div class="col">

### Seal Trusts

- **Key server integrity** — threshold subset is honest
- **Full node integrity** — accurate chain state for policy evaluation
- **Correct access policy** — your Move code expresses your intended rules

*"Your Move code IS the security policy. If `seal_approve` is wrong, Seal faithfully enforces the wrong rules."*

</div>
<div class="col">

### Seal Does NOT Trust

- **Storage layer** — encrypted data is safe at rest regardless
- **Network transport** — derived keys are encrypted under ephemeral keys
- **dApp code** — session keys limit exposure to a single package + TTL

</div>
</div>

<div class="diagram">

User Wallet → Session Key → dApp → PTB → Key Server → Full Node (dry run) → Approve / Deny

</div>

---

<!-- ============================================================
     SLIDE 15 — Inside the Encryption: The 7-Step Flow
     ============================================================ -->

<!-- _header: "Inside the Encryption" -->

# Inside the Encryption: The 7-Step Flow

Encryption is **entirely local** — no key server contact needed.

> *Put a letter in a safe, then cut the safe key into pieces and put each piece in a different locked mailbox.*

<div class="flow">
<div class="steps">
<div class="step">

**1. Policy**

Choose package + construct identity `id`

</div>
<div class="arrow">→</div>
<div class="step">

**2. Servers**

Select *n* key servers + threshold *t*

</div>
<div class="arrow">→</div>
<div class="step">

**3. k_sym**

Generate random symmetric key

</div>
<div class="arrow">→</div>
<div class="step">

**4. AES**

Encrypt data with k_sym (AES-256-GCM)

</div>
<div class="arrow">→</div>
<div class="step">

**5. Shamir**

Split k_sym into *n* shares (threshold *t*)

</div>
<div class="arrow">→</div>
<div class="step">

**6. IBE**

Encrypt each share under server's `mpk`

</div>
<div class="arrow">→</div>
<div class="step">

**7. Bundle**

Package into `EncryptedObject`

</div>
</div>
</div>

---

<!-- ============================================================
     SLIDE 16 — The Decryption Process
     ============================================================ -->

<!-- _header: "Inside the Encryption" -->

# The Decryption Process

Decryption **requires** key server interaction and policy evaluation.

<div class="flow">
<div class="steps">
<div class="step">

**1. Build PTB**

Construct transaction calling `seal_approve*` with identity + required objects (Clock, NFTs, etc.)

</div>
<div class="arrow">→</div>
<div class="step">

**2. Request Keys**

SDK sends PTB to ≥*t* key servers. Each server dry-runs the PTB on its full node.

</div>
<div class="arrow">→</div>
<div class="step">

**3. Derive & Return**

If policy approves, each server returns its derived key — encrypted under the requester's ephemeral key.

</div>
<div class="arrow">→</div>
<div class="step">

**4. Reconstruct & Decrypt**

SDK combines *t* derived keys → reconstructs k_sym → AES-GCM decrypts the data.

</div>
</div>
</div>

<div class="spacer"></div>

**Why ephemeral encryption matters:** Derived keys in transit are encrypted to the requester only. Even if the transport is intercepted, the attacker cannot use the keys. Only the session that requested them can decrypt.

---

<!-- ============================================================
     SLIDE 17 — Session Keys: The User Consent Layer
     ============================================================ -->

<!-- _header: "Inside the Encryption" -->

# Session Keys: The User Consent Layer

**Problem:** Decryption keys are returned to the dApp's web page. How do we ensure user consent?

**Solution:** Time-limited, package-scoped session keys.

> *A visitor badge at a secure building — gets you through doors in one department for a limited time, then expires.*

```typescript
const sessionKey = await SessionKey.create({
  address: suiAddress,
  packageId: fromHEX(packageId),
  ttlMin: 10,                    // expires in 10 minutes
  suiClient,
});

const message = sessionKey.getPersonalMessage();
const { signature } = await wallet.signPersonalMessage(message);
sessionKey.setPersonalMessageSignature(signature);
// Session key is now active — reuse for multiple decryptions
```

**Properties:** Scoped to one package. Expires automatically. Storable in `localStorage` / `IndexedDB` for cross-tab persistence.

---

<!-- ============================================================
     SLIDE 18 — Move Integration: seal_approve in Detail
     ============================================================ -->

<!-- _header: "Move Integration" -->

# Move Integration: `seal_approve` in Detail

Three elements a developer writes in Move:

**1. The `seal_approve*` function** — gatekeeper logic
**2. Identity construction** — BCS encoding of policy conditions
**3. Shared objects** — Allowlists, Subscriptions, or other state the policy reads

**Canonical example: Time-lock encryption**

```move
entry fun seal_approve(id: vector<u8>, c: &clock::Clock) {
    let mut prepared: BCS = bcs::new(id);    // Decode the identity bytes
    let t = prepared.peel_u64();              // Extract the unlock timestamp
    let leftovers = prepared.into_remainder_bytes();
    assert!(
        (leftovers.length() == 0) &&          // No extra bytes (strict parsing)
        (c.timestamp_ms() >= t),              // Current time >= unlock time
        ENoAccess,
    );
}
```

The `Clock` object is passed by the key server in the PTB. The `id` is `bcs::to_bytes(timestamp)` — constructed by the encrypting client.

---

<!-- ============================================================
     SLIDE 19 — The TypeScript SDK
     ============================================================ -->

<!-- _header: "Move Integration" -->

<!-- _class: cols-2-center -->

# The TypeScript SDK

`@mysten/seal` — the primary interface for encryption and decryption.

<div class="grid">
<div class="col">

### Encrypt (local)

```typescript
const {
  encryptedObject,
  key: backupKey,
} = await client.encrypt({
  threshold: 2,
  packageId: fromHEX(packageId),
  id: fromHEX(id),
  data,
});
```

No key server contact. Returns encrypted bytes + optional backup key for disaster recovery.

</div>
<div class="col">

### Decrypt (interactive)

```typescript
const tx = new Transaction();
tx.moveCall({
  target: `${pkg}::mod::seal_approve`,
  arguments: [
    tx.pure.vector("u8", fromHEX(id)),
  ],
});
const txBytes = await tx.build({
  client: suiClient,
  onlyTransactionKind: true,
});

const decrypted = await client.decrypt({
  data: encryptedObject,
  sessionKey,
  txBytes,
});
```

</div>
</div>

---

<!-- ============================================================
     SLIDE 20 — Putting It Together
     ============================================================ -->

<!-- _header: "Move Integration" -->

<!-- _class: cols-3 -->

# Putting It Together

<div class="grid">
<div class="col">

### Application Stack

**Move Package** — Access policy (`seal_approve*`)

**TypeScript dApp** — Encrypt/decrypt via `@mysten/seal`

**Key Servers** — Derive identity keys on demand

**Sui Blockchain** — Hosts policies, objects, identity model

</div>
<div class="col">

### Envelope Encryption

For large data: encrypt content with your own AES key, then encrypt *that key* with Seal.

**Benefits:**
- Rotate servers without re-encrypting content
- Decouple storage from key management
- Only the small symmetric key touches Seal's threshold system

</div>
<div class="col">

### Batch Decryption

For galleries, feeds, or multi-file scenarios: use `fetchKeys()` with a multi-command PTB.

```typescript
await client.fetchKeys({
  ids: [id1, id2, id3],
  txBytes,
  sessionKey,
  threshold: 2,
});
```

Groups requests to reduce key server round trips.

</div>
</div>

---

<!-- ============================================================
     SLIDE 21 — User Flow Overview
     ============================================================ -->

<!-- _header: "User Flow" -->

<!-- _class: cols-2-center -->

# User Flow Overview

<div class="grid">
<div class="col">

### Encryption (local)

1. Developer deploys Move package with `seal_approve*`
2. App selects key servers + threshold
3. SDK encrypts **locally** using server public keys
4. Store ciphertext anywhere — Walrus, Sui, S3, IPFS

**No arrows to key servers.** Encryption is purely local.

</div>
<div class="col">

### Decryption (interactive)

1. User authorizes session key (wallet signature)
2. dApp builds PTB calling `seal_approve*`
3. SDK contacts ≥*t* key servers
4. Each server dry-runs PTB on full node
5. Servers return derived keys (encrypted to requester)
6. SDK reconstructs k_sym + decrypts

**Multi-party exchange** — but transparent to the user.

</div>
</div>

---

<!-- ============================================================
     SLIDE 22 — What Gets Verified Where
     ============================================================ -->

<!-- _header: "User Flow" -->

# What Gets Verified Where

**At encryption time:** No verification — encryption is a local operation using server public keys from the chain.

**At decryption time:**

| Check | Verified By |
|-------|-------------|
| Session key signature is valid | Key server |
| PTB calls only `seal_approve*` functions | Key server |
| `seal_approve*` doesn't abort (policy passes) | Full node (dry run) |
| Derived key encrypted to requester only | Key server (ephemeral key) |
| Threshold reconstruction is consistent | SDK (client-side) |
| AES-GCM decryption succeeds (integrity check) | SDK (client-side) |

<div class="highlight-box">

Every actor in the chain verifies only what it is responsible for. No single entity sees the full picture — this is separation of concerns by design.

</div>

---

<!-- ============================================================
     SLIDE 23 — Getting Started: Build & Deploy
     ============================================================ -->

<!-- _header: "Developer Workflow" -->

<!-- _class: list-right -->

<div class="content">

# Getting Started

Four steps from zero to decrypting your first secret on testnet.

</div>

<div class="cards">
<div class="card">

#### 1. Install the SDK

`npm install @mysten/seal`

</div>
<div class="card">

#### 2. Choose Key Servers

Select from verified testnet providers. Six servers available with open access, operated by independent organizations.

</div>
<div class="card">

#### 3. Write & Deploy Access Policy

Write a `seal_approve*` function in Move. Build with `sui move build`. Publish with `sui client publish`.

</div>
<div class="card">

#### 4. Encrypt & Decrypt

`client.encrypt()` to seal data (local). `client.decrypt()` to retrieve it (interactive with key servers).

</div>
</div>

---

<!-- ============================================================
     SLIDE 24 — Key Server Operations & Providers
     ============================================================ -->

<!-- _header: "Developer Workflow" -->

<!-- _class: cols-2-center -->

# Key Server Operations & Providers

<div class="grid">
<div class="col">

### Three Operational Modes

| Aspect | Open | Permissioned | Committee |
|--------|------|-------------|-----------|
| **Access** | Any package | Allowlisted | Via aggregator |
| **Key model** | Single key | Per-client derived | DKG shares (no full key) |
| **Isolation** | None | Full | Distributed trust |
| **Use case** | Testing, public | B2B, commercial | High-security |

**Committee mode** adds an **aggregator** (client gateway) and requires a **DKG ceremony**. Membership is rotatable.

</div>
<div class="col">

### Verified Testnet Providers

| Provider | Operator |
|----------|----------|
| testnet-1 | Mysten Labs |
| testnet-2 | Mysten Labs |
| Ruby Nodes | Independent |
| NodeInfra | Independent |
| Studio Mirai | Independent |
| Overclock | Independent |

Servers register on-chain `KeyServer` objects. The SDK discovers them by object ID. Infrastructure: horizontal scaling, full node dependency, master key in KMS/vault.

</div>
</div>

---

<!-- ============================================================
     SLIDE 25 — Security & Limitations
     ============================================================ -->

<!-- _header: "Security & Limitations" -->

<!-- _class: cols-2-center -->

# Security & Limitations

<div class="grid">
<div class="col">

### Protects Against

- **Unauthorized decryption** — threshold policies + Move access control
- **Data at rest** — client-side AES-256-GCM
- **Key server collusion** — fewer than *t* compromised = safe
- **Transport interception** — ephemeral key encryption
- **Non-malleability** — ciphertexts cannot be transformed into valid related ciphertexts

</div>
<div class="col">

### Does NOT Protect Against

- **Buggy access policies** — code review is on you
- **Decryption key leaks** — client-side risk after decryption
- **All *t*+ servers compromised** — threshold is the trust bound
- **Metadata / size leakage** — Seal does not conceal message sizes
- **Server set is fixed** — cannot change servers for existing ciphertexts
- **No on-chain audit trail** — key delivery isn't logged to chain

</div>
</div>

---

<!-- ============================================================
     SLIDE 26 — Key Takeaways + Resources
     ============================================================ -->

<!-- _header: "Wrap Up" -->

<!-- _class: lead -->

# Key Takeaways

**IBE removes key exchange** — encrypt to any identity string, no recipient interaction needed
**Move IS the policy** — transparent, on-chain, composable access control you write yourself
**Threshold distributes trust** — no single key server can break privacy
**Client-side encryption** — key servers never see your data
**Trust is configurable** — choose your servers, your threshold, your policies

**SDK** — `npm install @mysten/seal`  ·  **Docs** — seal-docs.wal.app  ·  **GitHub** — github.com/MystenLabs/seal  ·  **Discord** — Seal channel on Sui Discord
