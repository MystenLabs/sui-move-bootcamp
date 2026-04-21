/**
 * Seal Demo — Simplest possible Seal encrypt/decrypt flow.
 *
 * Uses SuiGrpcClient from @mysten/sui/grpc and a custom `seal()` extension
 * registered via `client.$extend(seal(...))` — so Seal lives on the same
 * client handle: `client.seal.encrypt(...)`, `client.seal.decrypt(...)`.
 *
 * Prerequisites:
 *   - Deploy the Move package (cd ../move && sui client publish --gas-budget 100000000)
 *   - Set PACKAGE_ID in ./config.ts to the published package address
 *   - Ensure your active Sui address has testnet SUI (sui client faucet)
 */

import { SuiGrpcClient } from "@mysten/sui/grpc";
import { SessionKey, EncryptedObject } from "@mysten/seal";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

import {
  AGGREGATOR_URL,
  FULLNODE_URL,
  KEY_SERVER_OBJECT_ID,
  NETWORK,
  PACKAGE_ID,
  SEAL_THRESHOLD,
  SESSION_KEY_TTL_MIN,
} from "./config.js";
import { seal } from "./seal-extension.js";
import { buildPrivateApprovePtb, buildPrivateIdentity } from "./helpers.js";

// ─── Setup ───────────────────────────────────────────────────────────────────

const client = new SuiGrpcClient({
  baseUrl: FULLNODE_URL,
  network: NETWORK,
}).$extend(
  seal({
    serverConfigs: [
      {
        objectId: KEY_SERVER_OBJECT_ID,
        weight: 1,
        aggregatorUrl: AGGREGATOR_URL,
      },
    ],
    verifyKeyServers: false,
  }),
);

// Local keypair stands in for a wallet in this CLI demo.
const keypair = Ed25519Keypair.generate();
const address = keypair.getPublicKey().toSuiAddress();

console.log("Seal Demo — Private Data Pattern");
console.log("=================================");
console.log(`Address: ${address}`);

// ─── Step 1: Encrypt ─────────────────────────────────────────────────────────

const id = buildPrivateIdentity(address);
const secretMessage = new TextEncoder().encode(
  "Hello from Seal! This is encrypted.",
);

console.log("\n[1] Encrypting data...");
console.log(`    Identity (id): ${id}`);
console.log(`    Plaintext: "${new TextDecoder().decode(secretMessage)}"`);

const { encryptedObject: encryptedBytes } = await client.seal.encrypt({
  threshold: SEAL_THRESHOLD,
  packageId: PACKAGE_ID,
  id,
  data: secretMessage,
});

console.log(`    Encrypted! (${encryptedBytes.length} bytes)`);

const parsed = EncryptedObject.parse(encryptedBytes);
console.log(`    Package ID in ciphertext: ${parsed.packageId}`);
console.log(`    Threshold: ${parsed.threshold}`);

// ─── Step 2: Create a Session Key ────────────────────────────────────────────

console.log(`\n[2] Creating session key (TTL: ${SESSION_KEY_TTL_MIN} min)...`);

const sessionKey = await SessionKey.create({
  address,
  packageId: PACKAGE_ID,
  ttlMin: SESSION_KEY_TTL_MIN,
  signer: keypair,
  suiClient: client,
});

console.log("    Session key created and signed.");

// ─── Step 3: Build the PTB for seal_approve ──────────────────────────────────

console.log("\n[3] Building PTB for seal_approve...");
const txBytes = await buildPrivateApprovePtb(client, PACKAGE_ID, id);
console.log(`    PTB built (${txBytes.length} bytes)`);

// ─── Step 4: Decrypt ─────────────────────────────────────────────────────────

console.log("\n[4] Decrypting...");
const decryptedBytes = await client.seal.decrypt({
  data: encryptedBytes,
  sessionKey,
  txBytes,
});

const decryptedText = new TextDecoder().decode(decryptedBytes);
console.log(`    Decrypted: "${decryptedText}"`);

if (decryptedText === "Hello from Seal! This is encrypted.") {
  console.log("\nSuccess! Encryption and decryption worked correctly.");
} else {
  console.log("\nMismatch! Something went wrong.");
}

console.log("\n--- Demo complete ---");
