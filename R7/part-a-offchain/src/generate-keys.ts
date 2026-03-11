/**
 * Generate Ed25519 Key Pair
 *
 * Ed25519 is a modern, fast, and secure digital signature algorithm.
 * It generates:
 * - Private key (32 bytes): Keep this SECRET! Used to sign messages.
 * - Public key (32 bytes): Share this freely. Used to verify signatures.
 *
 * Think of it like:
 * - Private key = Your unique stamp (only you have it)
 * - Public key = Your stamp's pattern (everyone can recognize it)
 */

import * as ed from "@noble/ed25519";
import { writeFileSync } from "fs";

// For Node.js, we need to provide a crypto implementation
import { webcrypto } from "crypto";
// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;

async function generateKeys() {
  console.log("=".repeat(50));
  console.log("GENERATING ED25519 KEY PAIR");
  console.log("=".repeat(50));
  console.log();

  // Generate private key (32 random bytes)
  const privateKey = ed.utils.randomPrivateKey();

  // Derive public key from private key
  const publicKey = await ed.getPublicKeyAsync(privateKey);

  // Convert to hex strings for easy storage/display
  const privateKeyHex = Buffer.from(privateKey).toString("hex");
  const publicKeyHex = Buffer.from(publicKey).toString("hex");

  console.log("Private Key (KEEP SECRET!):");
  console.log(`  ${privateKeyHex}`);
  console.log();
  console.log("Public Key (share with server):");
  console.log(`  ${publicKeyHex}`);
  console.log();

  // Save to .env file
  const envContent = `# Generated Ed25519 Keys
# Run: pnpm generate-keys to regenerate

# Client's private key (KEEP SECRET!)
CLIENT_PRIVATE_KEY=${privateKeyHex}

# Client's public key (share with server)
CLIENT_PUBLIC_KEY=${publicKeyHex}

# Server configuration
PORT=8080
SERIAL_PORT=/dev/ttyACM0
BAUD_RATE=115200
`;

  writeFileSync(".env", envContent);
  console.log("Keys saved to .env file");
  console.log();
  console.log("Next steps:");
  console.log("1. Copy CLIENT_PUBLIC_KEY to server's allowed keys");
  console.log("2. Start server: pnpm server");
  console.log("3. Start client: pnpm client");
}

generateKeys().catch(console.error);
