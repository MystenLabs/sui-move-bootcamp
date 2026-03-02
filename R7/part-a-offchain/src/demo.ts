/**
 * Demo: Challenge-Response Authentication Flow
 *
 * This demonstrates the complete authentication flow
 * without needing a server - perfect for understanding!
 */

import * as ed from "@noble/ed25519";
import { randomBytes } from "crypto";

// For Node.js crypto
import { webcrypto } from "crypto";
// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;

async function demo() {
  console.log("=".repeat(60));
  console.log("CHALLENGE-RESPONSE AUTHENTICATION DEMO");
  console.log("=".repeat(60));
  console.log();

  // ========================================
  // SETUP: Generate key pair
  // ========================================
  console.log("STEP 1: Client generates key pair");
  console.log("-".repeat(60));

  const privateKey = ed.utils.randomPrivateKey();
  const publicKey = await ed.getPublicKeyAsync(privateKey);

  console.log(
    "Private Key (SECRET!):",
    Buffer.from(privateKey).toString("hex").slice(0, 32) + "...",
  );
  console.log(
    "Public Key (shared):  ",
    Buffer.from(publicKey).toString("hex").slice(0, 32) + "...",
  );
  console.log();
  console.log("The client shares their PUBLIC key with the server.");
  console.log("The PRIVATE key never leaves the client!");
  console.log();

  // ========================================
  // SERVER: Send challenge
  // ========================================
  console.log("STEP 2: Server sends random challenge");
  console.log("-".repeat(60));

  const challenge = randomBytes(32);
  console.log("Challenge:", challenge.toString("hex"));
  console.log();
  console.log("This is a random 32-byte value.");
  console.log("It's different every time - can't be replayed!");
  console.log();

  // ========================================
  // CLIENT: Sign challenge
  // ========================================
  console.log("STEP 3: Client signs the challenge");
  console.log("-".repeat(60));

  const signature = await ed.signAsync(challenge, privateKey);
  console.log(
    "Signature:",
    Buffer.from(signature).toString("hex").slice(0, 64) + "...",
  );
  console.log();
  console.log("Only someone with the PRIVATE key can create this signature.");
  console.log("The signature is unique to both the challenge AND the key.");
  console.log();

  // ========================================
  // SERVER: Verify signature
  // ========================================
  console.log("STEP 4: Server verifies the signature");
  console.log("-".repeat(60));

  const valid = await ed.verifyAsync(signature, challenge, publicKey);
  console.log("Signature valid?", valid ? "YES!" : "NO!");
  console.log();

  if (valid) {
    console.log("=".repeat(60));
    console.log("AUTHENTICATION SUCCESSFUL!");
    console.log("=".repeat(60));
    console.log();
    console.log("The server now knows:");
    console.log("1. The client owns the private key matching the public key");
    console.log("2. This is not a replay (challenge is fresh)");
    console.log("3. The message wasn't tampered with (signature covers it)");
    console.log();
  }

  // ========================================
  // ATTACK: What if someone tries to cheat?
  // ========================================
  console.log("ATTACK SCENARIO: Wrong private key");
  console.log("-".repeat(60));

  const fakePrivateKey = ed.utils.randomPrivateKey();
  const fakeSignature = await ed.signAsync(challenge, fakePrivateKey);
  const fakeValid = await ed.verifyAsync(fakeSignature, challenge, publicKey);

  console.log("Attacker tries with different private key...");
  console.log("Signature valid?", fakeValid ? "YES (bad!)" : "NO (good!)");
  console.log();
  console.log("The attacker cannot forge a valid signature without");
  console.log("the real private key. Math protects us!");
  console.log();

  // ========================================
  // WHY THIS MATTERS FOR ROBOTS
  // ========================================
  console.log("=".repeat(60));
  console.log("WHY THIS MATTERS FOR ROBOTS");
  console.log("=".repeat(60));
  console.log();
  console.log("Without authentication:");
  console.log("  - Anyone with the URL can control your robot");
  console.log("  - Attackers could damage property or hurt someone");
  console.log("  - No way to know WHO sent a command");
  console.log();
  console.log("With authentication:");
  console.log("  - Only key holders can send commands");
  console.log("  - Each command is cryptographically verified");
  console.log("  - You can audit WHO did WHAT");
  console.log("  - Revoke access by removing public key from allowed list");
  console.log();
}

demo().catch(console.error);
