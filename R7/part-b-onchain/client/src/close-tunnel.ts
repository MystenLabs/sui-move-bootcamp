/**
 * Close a Robot Tunnel Cooperatively
 *
 * This script:
 * 1. Builds a settlement message (final balances)
 * 2. Both parties sign the settlement
 * 3. Submits to blockchain
 * 4. Deposits are returned
 *
 * This is the "happy path" - both parties agree!
 */

import { Transaction } from "@mysten/sui/transactions";
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import * as ed from "@noble/ed25519";
import {
  getUserKeypair,
  MODULE_NAME,
  OPERATOR_ED25519_PRIVATE_KEY,
  PACKAGE_ID,
  suiClient,
  USER_ED25519_PRIVATE_KEY,
} from "./config";

// For Node.js crypto
import { webcrypto } from "crypto";
// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;

/**
 * Parse an Ed25519 private key from either bech32 (suiprivkey1...) or hex format
 */
function parseEd25519PrivateKey(key: string): Uint8Array {
  if (key.startsWith("suiprivkey")) {
    // Bech32 format from Sui CLI
    const { secretKey } = decodeSuiPrivateKey(key);
    return secretKey;
  } else {
    // Raw hex format (64 hex chars = 32 bytes)
    return Uint8Array.from(Buffer.from(key, "hex"));
  }
}

// Configuration for this close
const TUNNEL_ID = process.env.TUNNEL_ID || "";
const USER_FINAL_BALANCE = parseInt(
  process.env.USER_FINAL_BALANCE || "100000000",
); // 0.1 SUI
const OPERATOR_FINAL_BALANCE = parseInt(
  process.env.OPERATOR_FINAL_BALANCE || "100000000",
); // 0.1 SUI

/**
 * Build the settlement message that both parties sign
 *
 * Format: tunnel_id (32 bytes) || sequence (8 bytes) || user_balance (8 bytes) || operator_balance (8 bytes)
 */
function buildSettlementMessage(
  tunnelId: string,
  sequence: number,
  userBalance: bigint,
  operatorBalance: bigint,
): Uint8Array {
  const msg = new Uint8Array(32 + 8 + 8 + 8);
  let offset = 0;

  // Tunnel ID (32 bytes, remove 0x prefix)
  const idBytes = Buffer.from(tunnelId.replace("0x", ""), "hex");
  msg.set(idBytes, offset);
  offset += 32;

  // Sequence (8 bytes, big-endian)
  const seqView = new DataView(msg.buffer, offset, 8);
  seqView.setBigUint64(0, BigInt(sequence), false);
  offset += 8;

  // User balance (8 bytes, big-endian)
  const userView = new DataView(msg.buffer, offset, 8);
  userView.setBigUint64(0, userBalance, false);
  offset += 8;

  // Operator balance (8 bytes, big-endian)
  const opView = new DataView(msg.buffer, offset, 8);
  opView.setBigUint64(0, operatorBalance, false);

  return msg;
}

async function closeTunnel() {
  console.log("=".repeat(60));
  console.log("CLOSING ON-CHAIN ROBOT TUNNEL");
  console.log("=".repeat(60));
  console.log();

  if (!TUNNEL_ID) {
    console.error("Error: TUNNEL_ID not set in .env");
    process.exit(1);
  }

  if (!USER_ED25519_PRIVATE_KEY || !OPERATOR_ED25519_PRIVATE_KEY) {
    console.error("Error: Ed25519 private keys not set in .env");
    process.exit(1);
  }

  console.log(`Tunnel ID: ${TUNNEL_ID}`);
  console.log(`User Final Balance: ${USER_FINAL_BALANCE / 1e9} SUI`);
  console.log(`Operator Final Balance: ${OPERATOR_FINAL_BALANCE / 1e9} SUI`);
  console.log();

  // Get tunnel state (in real implementation, would fetch from chain)
  const currentSequence = 0; // Would read from tunnel object

  // Build settlement message
  console.log("Building settlement message...");
  const settlementMsg = buildSettlementMessage(
    TUNNEL_ID,
    currentSequence,
    BigInt(USER_FINAL_BALANCE),
    BigInt(OPERATOR_FINAL_BALANCE),
  );

  console.log(
    `Settlement message: ${Buffer.from(settlementMsg)
      .toString("hex")
      .slice(0, 64)}...`,
  );
  console.log();

  // Sign with both Ed25519 keys
  console.log("Signing settlement...");

  const userPrivate = parseEd25519PrivateKey(USER_ED25519_PRIVATE_KEY);
  const operatorPrivate = parseEd25519PrivateKey(OPERATOR_ED25519_PRIVATE_KEY);

  const userSignature = await ed.signAsync(settlementMsg, userPrivate);
  const operatorSignature = await ed.signAsync(settlementMsg, operatorPrivate);

  console.log(
    `User signature: ${Buffer.from(userSignature)
      .toString("hex")
      .slice(0, 32)}...`,
  );
  console.log(
    `Operator signature: ${Buffer.from(operatorSignature)
      .toString("hex")
      .slice(0, 32)}...`,
  );
  console.log();

  // Build transaction
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::${MODULE_NAME}::close_cooperative`,
    arguments: [
      tx.object(TUNNEL_ID),
      tx.pure.u64(USER_FINAL_BALANCE),
      tx.pure.u64(OPERATOR_FINAL_BALANCE),
      tx.pure.vector("u8", Array.from(userSignature)),
      tx.pure.vector("u8", Array.from(operatorSignature)),
    ],
  });

  // Execute transaction
  console.log("Submitting close transaction...");

  const userKeypair = getUserKeypair();
  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: userKeypair,
    options: {
      showEffects: true,
      showEvents: true,
    },
  });

  console.log();
  console.log("=".repeat(60));
  console.log("TUNNEL CLOSED!");
  console.log("=".repeat(60));
  console.log();
  console.log(`Transaction: ${result.digest}`);
  console.log();
  console.log("Deposits have been returned to both parties.");
}

closeTunnel().catch(console.error);
