/**
 * Seal Demo — Simplest possible Seal encrypt/decrypt flow.
 *
 * This script demonstrates:
 * 1. Creating a SealClient with testnet key servers
 * 2. Encrypting data to an address-based identity (private_seal pattern)
 * 3. Creating a SessionKey (signed by a local keypair)
 * 4. Building a PTB that calls seal_approve
 * 5. Decrypting the data
 *
 * Prerequisites:
 *   - Deploy the Move package (cd ../move && sui client publish --gas-budget 100000000)
 *   - Set PACKAGE_ID below to the published package address
 *   - Ensure your active Sui address has testnet SUI (sui client faucet)
 */

import { SealClient, SessionKey, EncryptedObject } from "@mysten/seal";
import { SuiJsonRpcClient, getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { fromHex, toHex } from "@mysten/sui/utils";
import { bcs } from "@mysten/sui/bcs";

// ─── Configuration ───────────────────────────────────────────────────────────
const PACKAGE_ID =
  "0x2b5472a9002d97045c8448cda76284aa0de81df3ab902fdfc785feaa2c0b4cc0";

// Testnet key server (aggregator-backed decentralized server)
const KEY_SERVER_OBJECT_ID =
  "0xb012378c9f3799fb5b1a7083da74a4069e3c3f1c93de0b27212a5799ce1e1e98";
const AGGREGATOR_URL = "https://seal-aggregator-testnet.mystenlabs.com";

// ─── Setup ───────────────────────────────────────────────────────────────────

const suiClient = new SuiJsonRpcClient({
  url: getJsonRpcFullnodeUrl("testnet"),
  network: "testnet",
});

const sealClient = new SealClient({
  suiClient,
  serverConfigs: [
    {
      objectId: KEY_SERVER_OBJECT_ID,
      weight: 1,
      aggregatorUrl: AGGREGATOR_URL,
    },
  ],
  verifyKeyServers: false,
});

// Use a local keypair for this demo (in a real app, the wallet provides this)
const keypair = Ed25519Keypair.generate();
const address = keypair.getPublicKey().toSuiAddress();

console.log("Seal Demo — Private Data Pattern");
console.log("=================================");
console.log(`Address: ${address}`);

// ─── Step 1: Encrypt ─────────────────────────────────────────────────────────
// Identity = BCS-encoded owner address (matches what seal_approve checks)
const id = toHex(bcs.Address.serialize(address).toBytes());

const secretMessage = new TextEncoder().encode(
  "Hello from Seal! This is encrypted.",
);

console.log("\n[1] Encrypting data...");
console.log(`    Identity (id): ${id}`);
console.log(`    Plaintext: "${new TextDecoder().decode(secretMessage)}"`);

const { encryptedObject: encryptedBytes } = await sealClient.encrypt({
  threshold: 1,
  packageId: PACKAGE_ID,
  id,
  data: secretMessage,
});

console.log(`    Encrypted! (${encryptedBytes.length} bytes)`);

// Parse the encrypted object to inspect its structure
const parsed = EncryptedObject.parse(encryptedBytes);
console.log(`    Package ID in ciphertext: ${parsed.packageId}`);
console.log(`    Threshold: ${parsed.threshold}`);

// ─── Step 2: Create a Session Key ───────────────────────────────────────────
// Session keys scope dApp access to a single package + time window.
console.log("\n[2] Creating session key (TTL: 10 min)...");

const sessionKey = await SessionKey.create({
  address,
  packageId: PACKAGE_ID,
  ttlMin: 10,
  signer: keypair, // In a browser, the wallet signs instead
  suiClient,
});

console.log("    Session key created and signed.");

// ─── Step 3: Build the PTB for seal_approve ─────────────────────────────────
// The PTB calls our private_seal::seal_approve with the identity bytes.
// Key servers dry-run this to verify access.
console.log("\n[3] Building PTB for seal_approve...");

const tx = new Transaction();
tx.moveCall({
  target: `${PACKAGE_ID}::private_seal::seal_approve`,
  arguments: [tx.pure.vector("u8", fromHex(id))],
});

const txBytes = await tx.build({
  client: suiClient,
  onlyTransactionKind: true,
});

console.log(`    PTB built (${txBytes.length} bytes)`);

// ─── Step 4: Decrypt ─────────────────────────────────────────────────────────
// The SDK contacts key servers, they dry-run the PTB, derive keys, and return
// them encrypted under our ephemeral key. SDK reconstructs and decrypts.
console.log("\n[4] Decrypting...");

const decryptedBytes = await sealClient.decrypt({
  data: encryptedBytes,
  sessionKey,
  txBytes,
});

const decryptedText = new TextDecoder().decode(decryptedBytes);
console.log(`    Decrypted: "${decryptedText}"`);

// ─── Verify ──────────────────────────────────────────────────────────────────
if (decryptedText === "Hello from Seal! This is encrypted.") {
  console.log("\n Success! Encryption and decryption worked correctly.");
} else {
  console.log("\n Mismatch! Something went wrong.");
}

console.log("\n--- Demo complete ---");
