/**
 * Demo: On-Chain Tunnel Flow
 *
 * This demonstrates the complete tunnel lifecycle WITHOUT
 * actually submitting to blockchain - perfect for understanding!
 *
 * The flow:
 * 1. CREATE tunnel on-chain (both parties deposit)
 * 2. USE tunnel off-chain (sign commands with Ed25519)
 * 3. CLOSE tunnel on-chain (both parties sign settlement)
 */

import * as ed from "@noble/ed25519";
import { randomBytes } from "crypto";

// For Node.js crypto
import { webcrypto } from "crypto";
// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;

async function demo() {
  console.log("=".repeat(70));
  console.log("ON-CHAIN ROBOT TUNNEL DEMO");
  console.log("=".repeat(70));
  console.log();

  // ========================================
  // PHASE 1: SETUP (happens once)
  // ========================================
  console.log("PHASE 1: SETUP");
  console.log("─".repeat(70));
  console.log();

  // Generate Ed25519 keys for both parties
  const userPrivateKey = ed.utils.randomPrivateKey();
  const userPublicKey = await ed.getPublicKeyAsync(userPrivateKey);

  const operatorPrivateKey = ed.utils.randomPrivateKey();
  const operatorPublicKey = await ed.getPublicKeyAsync(operatorPrivateKey);

  console.log("User generates Ed25519 key pair:");
  console.log(
    `  Private: ${Buffer.from(userPrivateKey)
      .toString("hex")
      .slice(0, 32)}... (SECRET!)`,
  );
  console.log(
    `  Public:  ${Buffer.from(userPublicKey).toString("hex").slice(0, 32)}...`,
  );
  console.log();
  console.log("Operator generates Ed25519 key pair:");
  console.log(
    `  Private: ${Buffer.from(operatorPrivateKey)
      .toString("hex")
      .slice(0, 32)}... (SECRET!)`,
  );
  console.log(
    `  Public:  ${Buffer.from(operatorPublicKey)
      .toString("hex")
      .slice(0, 32)}...`,
  );
  console.log();

  // ========================================
  // PHASE 2: CREATE TUNNEL (on-chain)
  // ========================================
  console.log("PHASE 2: CREATE TUNNEL (on-chain transaction)");
  console.log("─".repeat(70));
  console.log();

  const tunnelId = randomBytes(32); // In reality, this comes from Sui
  const userDeposit = 100_000_000; // 0.1 SUI
  const operatorDeposit = 100_000_000; // 0.1 SUI
  const penaltyAmount = 50_000_000; // 0.05 SUI

  console.log("Transaction submitted to Sui blockchain:");
  console.log(`  Function: robot_tunnel::tunnel::create_and_share_tunnel`);
  console.log(`  User Deposit: ${userDeposit / 1e9} SUI`);
  console.log(`  Operator Deposit: ${operatorDeposit / 1e9} SUI`);
  console.log(`  Penalty Amount: ${penaltyAmount / 1e9} SUI`);
  console.log(
    `  User Public Key: ${Buffer.from(userPublicKey)
      .toString("hex")
      .slice(0, 16)}...`,
  );
  console.log(
    `  Operator Public Key: ${Buffer.from(operatorPublicKey)
      .toString("hex")
      .slice(0, 16)}...`,
  );
  console.log();
  console.log(
    `Tunnel created! ID: ${tunnelId.toString("hex").slice(0, 16)}...`,
  );
  console.log();
  console.log("What happened on-chain:");
  console.log("  1. Both deposits locked in tunnel contract");
  console.log("  2. Public keys registered for signature verification");
  console.log("  3. Tunnel is now ACTIVE and shared");
  console.log();

  // ========================================
  // PHASE 3: USE TUNNEL (off-chain!)
  // ========================================
  console.log("PHASE 3: USE TUNNEL (off-chain commands)");
  console.log("─".repeat(70));
  console.log();
  console.log("Now the magic happens - NO MORE BLOCKCHAIN TRANSACTIONS!");
  console.log();

  // Simulate sending commands
  const commands = ["wave", "forward", "sit", "stand"];
  let sequenceNumber = 0;

  for (const command of commands) {
    sequenceNumber++;

    // Build command message
    const commandMessage = Buffer.concat([
      tunnelId,
      Buffer.from([sequenceNumber]),
      Buffer.from(command),
    ]);

    // User signs the command
    const signature = await ed.signAsync(commandMessage, userPrivateKey);

    // Operator verifies the signature
    const valid = await ed.verifyAsync(
      signature,
      commandMessage,
      userPublicKey,
    );

    console.log(`Command ${sequenceNumber}: "${command}"`);
    console.log(
      `  Signed by user: ${Buffer.from(signature)
        .toString("hex")
        .slice(0, 32)}...`,
    );
    console.log(`  Verified by operator: ${valid ? "✓ VALID" : "✗ INVALID"}`);

    if (valid) {
      console.log(`  Robot executes: ${command}`);
    }
    console.log();
  }

  console.log(
    "Notice: These 4 commands required ZERO blockchain transactions!",
  );
  console.log("Each took ~50ms instead of ~5000ms!");
  console.log();

  // ========================================
  // PHASE 4: CLOSE TUNNEL (on-chain)
  // ========================================
  console.log("PHASE 4: CLOSE TUNNEL (on-chain transaction)");
  console.log("─".repeat(70));
  console.log();

  // Build settlement message
  const userFinalBalance = userDeposit; // User gets full deposit back
  const operatorFinalBalance = operatorDeposit; // Operator gets full deposit back

  const settlementMessage = Buffer.concat([
    tunnelId,
    numberToBytes(sequenceNumber, 8),
    numberToBytes(userFinalBalance, 8),
    numberToBytes(operatorFinalBalance, 8),
  ]);

  console.log("Building settlement agreement:");
  console.log(`  Final sequence: ${sequenceNumber}`);
  console.log(`  User gets back: ${userFinalBalance / 1e9} SUI`);
  console.log(`  Operator gets back: ${operatorFinalBalance / 1e9} SUI`);
  console.log();

  // Both parties sign
  const userSettlementSig = await ed.signAsync(
    settlementMessage,
    userPrivateKey,
  );
  const operatorSettlementSig = await ed.signAsync(
    settlementMessage,
    operatorPrivateKey,
  );

  console.log("Both parties sign the settlement:");
  console.log(
    `  User signature: ${Buffer.from(userSettlementSig)
      .toString("hex")
      .slice(0, 32)}...`,
  );
  console.log(
    `  Operator signature: ${Buffer.from(operatorSettlementSig)
      .toString("hex")
      .slice(0, 32)}...`,
  );
  console.log();

  // Verify signatures (what the contract does)
  const userSigValid = await ed.verifyAsync(
    userSettlementSig,
    settlementMessage,
    userPublicKey,
  );
  const opSigValid = await ed.verifyAsync(
    operatorSettlementSig,
    settlementMessage,
    operatorPublicKey,
  );

  console.log("Contract verifies signatures:");
  console.log(`  User signature: ${userSigValid ? "✓ VALID" : "✗ INVALID"}`);
  console.log(`  Operator signature: ${opSigValid ? "✓ VALID" : "✗ INVALID"}`);
  console.log();

  if (userSigValid && opSigValid) {
    console.log("Transaction submitted to Sui blockchain:");
    console.log(`  Function: robot_tunnel::tunnel::close_cooperative`);
    console.log();
    console.log("Tunnel closed successfully!");
    console.log(`  User received: ${userFinalBalance / 1e9} SUI`);
    console.log(`  Operator received: ${operatorFinalBalance / 1e9} SUI`);
  }

  console.log();

  // ========================================
  // SUMMARY
  // ========================================
  console.log("=".repeat(70));
  console.log("SUMMARY: WHY ON-CHAIN TUNNELS MATTER");
  console.log("=".repeat(70));
  console.log();
  console.log("Without tunnel (traditional blockchain):");
  console.log("  - Every command = 1 blockchain transaction");
  console.log("  - 4 commands = 4 transactions");
  console.log("  - Cost: ~0.004 SUI in gas");
  console.log("  - Time: ~20 seconds total");
  console.log();
  console.log("With tunnel (state channel):");
  console.log("  - Open tunnel = 1 transaction");
  console.log("  - 4 commands = 0 transactions (off-chain!)");
  console.log("  - Close tunnel = 1 transaction");
  console.log("  - Cost: ~0.002 SUI in gas");
  console.log("  - Time: ~10 seconds total (but commands were instant!)");
  console.log();
  console.log("Benefits:");
  console.log("  1. SPEED: Commands execute in milliseconds");
  console.log("  2. COST: Pay gas only for open/close");
  console.log("  3. SECURITY: Deposits ensure good behavior");
  console.log("  4. SCALABILITY: Unlimited commands per tunnel");
  console.log();
  console.log("This is how we get REAL-TIME blockchain robot control!");
}

function numberToBytes(n: number, length: number): Buffer {
  const buf = Buffer.alloc(length);
  let remaining = n;
  for (let i = length - 1; i >= 0; i--) {
    buf[i] = remaining & 0xff;
    remaining = Math.floor(remaining / 256);
  }
  return buf;
}

demo().catch(console.error);
