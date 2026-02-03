---
marp: true
paginate: true
footer: "Sui"
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
  background: #000000;
  color: #8B8B8B;
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
  color: #FFFFFF;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 16px 0;
}

section h2 {
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 12px 0;
}

section h3 {
  color: #FFFFFF;
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
  color: #FFFFFF;
  font-weight: 600;
}

section em {
  color: #4DA2FF;
  font-style: normal;
}

section a {
  color: #4DA2FF;
  text-decoration: none;
}

section code {
  background: #1A1A1A;
  color: #4DA2FF;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

section pre {
  background: #0A0A0A;
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
  color: #FFFFFF;
  font-weight: 600;
  text-align: left;
  padding: 10px 16px;
  border-bottom: 2px solid #4DA2FF;
}

section td {
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

/* Stat number styling */
section .stat {
  color: #FFFFFF;
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
}

section .stat-label {
  color: #8B8B8B;
  font-size: 16px;
}

section .stat-large {
  color: #FFFFFF;
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
}

/* Card item for list layouts */
section .card {
  background: #0A0A0A;
  border: 1px solid #1A1A1A;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 8px;
}

section .card h4 {
  color: #FFFFFF;
  margin: 0 0 4px 0;
}

section .card p {
  margin: 0;
  font-size: 16px;
}

/* Product icon container */
section .icon {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
}

section .icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
   LAYOUT: cols-4 — Four Columns with markers + body
   ============================================================ */
section.cols-4 .grid {
  grid-template-columns: repeat(4, 1fr);
  margin-top: 24px;
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
   LAYOUT: cols-4-minimal — Four Columns, headlines only
   ============================================================ */
section.cols-4-minimal .grid {
  grid-template-columns: repeat(4, 1fr);
  margin-top: 40px;
}

section.cols-4-minimal .col {
  padding-top: 24px;
}

section.cols-4-minimal .col p {
  display: none;
}

/* ============================================================
   LAYOUT: fullbleed — Full bleed image, no padding
   ============================================================ */
section.fullbleed {
  padding: 0;
}

section.fullbleed img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ============================================================
   LAYOUT: cols-4-icon — Four Columns with product icons
   ============================================================ */
section.cols-4-icon .grid {
  grid-template-columns: repeat(4, 1fr);
  margin-top: 24px;
}

section.cols-4-icon .col h3::before {
  display: none;
}

/* ============================================================
   LAYOUT: cols-4-stats — Four Columns with large stat numbers
   ============================================================ */
section.cols-4-stats .grid {
  grid-template-columns: repeat(4, 1fr);
  margin-top: 24px;
}

section.cols-4-stats .col {
  text-align: center;
  border-top: none;
  padding-top: 0;
}

section.cols-4-stats .stat {
  font-size: 56px;
  color: #4DA2FF;
}

section.cols-4-stats .stat-label {
  font-size: 18px;
  color: #8B8B8B;
}

/* ============================================================
   LAYOUT: stats-side — Title+body left, stacked stats right
   ============================================================ */
section.stats-side {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

section.stats-side .content {
  display: flex;
  flex-direction: column;
}

section.stats-side .stats {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

section.stats-side .stat-row {
  border-top: 1px dashed #3A3A3A;
  padding-top: 16px;
}

/* ============================================================
   LAYOUT: stats-left — Large stacked stats, left-aligned
   ============================================================ */
section.stats-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

section.stats-left .grid {
  grid-template-columns: 1fr;
  gap: 32px;
}

section.stats-left .stat-large {
  font-size: 80px;
  color: #FFFFFF;
}

section.stats-left .stat-label {
  font-size: 20px;
  color: #8B8B8B;
  margin-top: 4px;
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
   LAYOUT: grid-products — 4×2 product grid with icons
   ============================================================ */
section.grid-products .grid {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 16px;
  margin-top: 24px;
}

section.grid-products .col {
  border-top: none;
  padding-top: 12px;
  text-align: center;
  align-items: center;
}

section.grid-products .col h3::before {
  display: none;
}

section.grid-products .icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 8px auto;
}

/* ============================================================
   LAYOUT: grid-images — 4×2 image placeholder grid
   ============================================================ */
section.grid-images .grid {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
  margin-top: 24px;
  height: calc(100% - 100px);
}

section.grid-images .col {
  border-top: none;
  padding-top: 0;
  background: #0A0A0A;
  border-radius: 8px;
  overflow: hidden;
}

section.grid-images .col img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ============================================================
   PRODUCT HERO SLIDES
   ============================================================ */
section.product-seal,
section.product-deepbook,
section.product-walrus,
section.product-suins,
section.product-sui,
section.product-mysticeti,
section.product-nautilus,
section.product-passkey,
section.product-zklogin,
section.product-move {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

section.product-seal::before,
section.product-deepbook::before,
section.product-walrus::before,
section.product-suins::before,
section.product-sui::before,
section.product-mysticeti::before,
section.product-nautilus::before,
section.product-passkey::before,
section.product-zklogin::before,
section.product-move::before {
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
}

section.product-seal::before { content: 'SEAL'; }
section.product-deepbook::before { content: 'DEEPBOOK'; }
section.product-walrus::before { content: 'WALRUS'; }
section.product-suins::before { content: 'SUINS'; }
section.product-sui::before { content: 'SUI'; font-size: 220px; }
section.product-mysticeti::before { content: 'MYSTICETI'; }
section.product-nautilus::before { content: 'NAUTILUS'; }
section.product-passkey::before { content: 'PASSKEY'; }
section.product-zklogin::before { content: 'ZKLOGIN'; }
section.product-move::before { content: 'MOVE'; font-size: 200px; }

section.product-seal > *,
section.product-deepbook > *,
section.product-walrus > *,
section.product-suins > *,
section.product-sui > *,
section.product-mysticeti > *,
section.product-nautilus > *,
section.product-passkey > *,
section.product-zklogin > *,
section.product-move > * {
  position: relative;
  z-index: 1;
}

section.product-seal h1,
section.product-deepbook h1,
section.product-walrus h1,
section.product-suins h1,
section.product-sui h1,
section.product-mysticeti h1,
section.product-nautilus h1,
section.product-passkey h1,
section.product-zklogin h1,
section.product-move h1 {
  font-size: 56px;
  margin-top: 16px;
}

section.product-seal p,
section.product-deepbook p,
section.product-walrus p,
section.product-suins p,
section.product-sui p,
section.product-mysticeti p,
section.product-nautilus p,
section.product-passkey p,
section.product-zklogin p,
section.product-move p {
  font-size: 22px;
  max-width: 600px;
}

/* ============================================================
   PRODUCT CONTENT SLIDES
   ============================================================ */
section.product-seal-content,
section.product-deepbook-content,
section.product-walrus-content,
section.product-suins-content,
section.product-sui-content,
section.product-mysticeti-content,
section.product-nautilus-content,
section.product-passkey-content,
section.product-zklogin-content,
section.product-move-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

section.product-seal-content .content,
section.product-deepbook-content .content,
section.product-walrus-content .content,
section.product-suins-content .content,
section.product-sui-content .content,
section.product-mysticeti-content .content,
section.product-nautilus-content .content,
section.product-passkey-content .content,
section.product-zklogin-content .content,
section.product-move-content .content {
  display: flex;
  flex-direction: column;
}

section.product-seal-content .illustration,
section.product-deepbook-content .illustration,
section.product-walrus-content .illustration,
section.product-suins-content .illustration,
section.product-sui-content .illustration,
section.product-mysticeti-content .illustration,
section.product-nautilus-content .illustration,
section.product-passkey-content .illustration,
section.product-zklogin-content .illustration,
section.product-move-content .illustration {
  display: flex;
  align-items: center;
  justify-content: center;
}

section.product-seal-content .illustration img,
section.product-deepbook-content .illustration img,
section.product-walrus-content .illustration img,
section.product-suins-content .illustration img,
section.product-sui-content .illustration img,
section.product-mysticeti-content .illustration img,
section.product-nautilus-content .illustration img,
section.product-passkey-content .illustration img,
section.product-zklogin-content .illustration img,
section.product-move-content .illustration img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
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
</style>

<!-- _class: product-seal -->

# Seal

Decentralized secrets management on Sui

---

<!-- _class: product-seal-content -->

<div class="content">

# What Is Seal?

Seal is a decentralized secrets management protocol built on Sui. It encrypts data so that only users who satisfy an **on-chain access policy** can decrypt it.

- No central authority sees the plaintext
- Access rules are programmable Move code
- Decryption keys from independent key servers
- Threshold encryption tolerates failures

</div>

<div class="illustration">

![](../assets/images/product-seal.svg)

</div>

---

<!-- _class: cols-2-center -->

# Core Architecture

<div class="grid">
<div class="col">

### Identity-Based Encryption

Data is encrypted to an *identity string* rather than a public key. Seal maps identities to on-chain namespaces controlled by Move packages.

**Four algorithms:** Setup, Derive, Encrypt, Decrypt -- using Boneh-Franklin IBE on BLS12-381.

</div>
<div class="col">

### How It Differs

Traditional encryption requires knowing the recipient's key upfront. IBE lets you encrypt to *any identity* -- a timestamp, an address, a condition -- and derive the matching key later through policy evaluation.

</div>
</div>

---

<!-- _class: cols-2-center -->

# Two Components

<div class="grid">
<div class="col">

### On-Chain Access Policies

Move packages define `seal_approve*` functions that encode who may decrypt. Each package controls an *identity namespace* tied to its package ID.

Policies can gate on ownership, allowlists, time, subscriptions, or any on-chain state.

</div>
<div class="col">

### Off-Chain Key Servers

Independent services holding IBE master secret keys. They evaluate on-chain policies before releasing derived keys.

Users choose which servers to trust. Servers expose `/v1/service` and `/v1/fetch_key` endpoints.

</div>
</div>

---

<!-- _class: cols-3 -->

# Threshold Encryption

<div class="grid">
<div class="col">

### *t*-out-of-*n* Model

Users encrypt data so that any *t* of *n* chosen key servers must agree to release their portion of the key.

</div>
<div class="col">

### Privacy Guarantee

Data stays secret as long as fewer than *t* servers are compromised. A **2-of-3** setup survives one compromised server.

</div>
<div class="col">

### Liveness Guarantee

Decryption works as long as at least *t* servers remain available. Users select servers across jurisdictions and infrastructure.

</div>
</div>

---

<!-- _class: list-right -->

<div class="content">

# Getting Started

Install the Seal SDK and configure key servers to run your first encrypt/decrypt cycle.

`npm install @mysten/seal`

</div>

<div class="cards">
<div class="card">

#### 1. Choose Key Servers

Select verified Testnet servers by object ID. Open-mode servers work directly; permissioned servers require allowlisting.

</div>
<div class="card">

#### 2. Define Access Policy

Write a Move module with a `seal_approve*` function encoding your access rules. Build and publish via Sui CLI.

</div>
<div class="card">

#### 3. Create SealClient

Initialize with `SuiClient`, server object IDs, weights, and verification settings.

</div>
<div class="card">

#### 4. Encrypt & Store

Call `client.encrypt()` with threshold, package ID, identity, and data. Store encrypted bytes on Walrus, Sui, or any backend.

</div>
</div>

---

# Encryption Flow

Encrypt data using the SDK with your chosen threshold and access policy.

```typescript
const client = new SealClient({
  suiClient,
  serverConfigs: serverObjectIds.map((id) => ({
    objectId: id,
    weight: 1,
  })),
  verifyKeyServers: false,
});

const { encryptedObject: encryptedBytes, key: backupKey } =
  await client.encrypt({
    threshold: 2,
    packageId: fromHEX(packageId),
    id: fromHEX(id),
    data,
  });
```

The `backupKey` is a symmetric key for emergency recovery. Store it securely or discard explicitly.

---

# Decryption Flow

Create a session key, build a transaction calling `seal_approve*`, and decrypt.

```typescript
// 1. Create session key (user approves once in wallet)
const sessionKey = await SessionKey.create({
  address: suiAddress, packageId: fromHEX(packageId),
  ttlMin: 10, suiClient,
});
const msg = sessionKey.getPersonalMessage();
const { signature } = await keypair.signPersonalMessage(msg);
sessionKey.setPersonalMessageSignature(signature);

// 2. Build transaction and decrypt
const tx = new Transaction();
tx.moveCall({
  target: `${packageId}::${moduleName}::seal_approve`,
  arguments: [tx.pure.vector("u8", fromHEX(id))],
});
const txBytes = await tx.build({ client: suiClient, onlyTransactionKind: true });
const decryptedBytes = await client.decrypt({ data: encryptedBytes, sessionKey, txBytes });
```

---

<!-- _class: grid-2x2 -->

# Access Policy Patterns

<div class="grid">
<div class="col">

### Private Data

Single owner controls encrypted content. Transfer the object to transfer decryption rights. Use for private NFTs and credentials.

</div>
<div class="col">

### Allowlist

Share with a defined group. Add or remove members without re-encrypting. Use for partner data rooms and gated access.

</div>
<div class="col">

### Subscription

Time-limited access via paid passes. Passes expire automatically -- no re-encryption needed. Use for premium content and APIs.

</div>
<div class="col">

### Time-Lock & Voting

Content unlocks at a timestamp. Voting ballots stay encrypted until the period ends, then on-chain decryption produces a verifiable tally.

</div>
</div>

---

<!-- _class: list-right -->

<div class="content">

# Security Best Practices

Correct configuration is critical before Mainnet. These five areas require explicit decisions.

</div>

<div class="cards">
<div class="card">

#### Threshold Configuration

Choose *t*-of-*n* carefully. Higher thresholds improve privacy but reduce tolerance for server failures. 2-of-3 is a common starting point.

</div>
<div class="card">

#### Key Server Vetting

Treat provider selection as a trust decision. Diversify across entities, jurisdictions, and infrastructure.

</div>
<div class="card">

#### Envelope Encryption

For large payloads, encrypt data with AES and protect only the symmetric key with Seal. Enables key rotation without re-encrypting content.

</div>
<div class="card">

#### Key & Session Management

Store backup symmetric keys securely. Use short session TTLs. Log all key access and decryption events at the application level.

</div>
</div>

---

<!-- _class: lead -->

# Start Building with Seal

- **SDK:** `npm install @mysten/seal`
- **Docs:** seal-docs.wal.app
- **Patterns:** github.com/MystenLabs/seal
- **Community:** Sui Discord & Forums
