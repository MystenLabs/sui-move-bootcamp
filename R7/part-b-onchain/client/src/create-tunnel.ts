/**
 * Create a Robot Tunnel On-Chain
 *
 * This script:
 * 1. Creates a tunnel with deposits from both parties
 * 2. Registers Ed25519 public keys for command signing
 * 3. Returns the tunnel ID for future use
 *
 * The tunnel enables secure off-chain communication!
 */

import { Transaction } from "@mysten/sui/transactions";
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import * as ed from "@noble/ed25519";
import {
  DEFAULT_DEPOSIT_AMOUNT,
  DEFAULT_PENALTY_AMOUNT,
  MODULE_NAME,
  OPERATOR_ED25519_PRIVATE_KEY,
  PACKAGE_ID,
  USER_ED25519_PRIVATE_KEY,
  getOperatorKeypair,
  getUserKeypair,
  executeTransaction,
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

async function createTunnel() {
  console.log("=".repeat(60));
  console.log("CREATING ON-CHAIN ROBOT TUNNEL");
  console.log("=".repeat(60));
  console.log();

  // Get wallet keypairs
  const userKeypair = getUserKeypair();
  const operatorKeypair = getOperatorKeypair();

  console.log("Wallet Addresses:");
  console.log(`  User: ${userKeypair.toSuiAddress()}`);
  console.log(`  Operator: ${operatorKeypair.toSuiAddress()}`);
  console.log();

  // Generate Ed25519 keys for command signing
  // (These are SEPARATE from wallet keys!)
  let userEd25519Private: Uint8Array;
  let operatorEd25519Private: Uint8Array;

  if (USER_ED25519_PRIVATE_KEY && OPERATOR_ED25519_PRIVATE_KEY) {
    userEd25519Private = parseEd25519PrivateKey(USER_ED25519_PRIVATE_KEY);
    operatorEd25519Private = parseEd25519PrivateKey(
      OPERATOR_ED25519_PRIVATE_KEY,
    );
    console.log("Using Ed25519 keys from .env file");
  } else {
    console.log("Generating new Ed25519 keys for command signing...");
    userEd25519Private = ed.utils.randomPrivateKey();
    operatorEd25519Private = ed.utils.randomPrivateKey();
  }

  const userEd25519Public = await ed.getPublicKeyAsync(userEd25519Private);
  const operatorEd25519Public = await ed.getPublicKeyAsync(
    operatorEd25519Private,
  );

  console.log("Ed25519 Public Keys (for command signing):");
  console.log(
    `  User: ${Buffer.from(userEd25519Public).toString("hex").slice(0, 32)}...`,
  );
  console.log(
    `  Operator: ${Buffer.from(operatorEd25519Public)
      .toString("hex")
      .slice(0, 32)}...`,
  );
  console.log();

  // Build transaction
  const tx = new Transaction();

  // Get addresses for the tunnel
  const userAddress = userKeypair.toSuiAddress();
  const operatorAddress = operatorKeypair.toSuiAddress();

  // Split coins for deposits
  const [userDepositCoin] = tx.splitCoins(tx.gas, [DEFAULT_DEPOSIT_AMOUNT]);
  const [operatorDepositCoin] = tx.splitCoins(tx.gas, [DEFAULT_DEPOSIT_AMOUNT]);

  // Create tunnel - arguments must match contract signature:
  // create_and_share_tunnel(
  //   user_address: address,
  //   operator_address: address,
  //   user_deposit: Coin<SUI>,
  //   operator_deposit: Coin<SUI>,
  //   user_public_key: vector<u8>,
  //   operator_public_key: vector<u8>,
  //   penalty_amount: u64,
  // )
  tx.moveCall({
    target: `${PACKAGE_ID}::${MODULE_NAME}::create_and_share_tunnel`,
    arguments: [
      tx.pure.address(userAddress),
      tx.pure.address(operatorAddress),
      userDepositCoin,
      operatorDepositCoin,
      tx.pure.vector("u8", Array.from(userEd25519Public)),
      tx.pure.vector("u8", Array.from(operatorEd25519Public)),
      tx.pure.u64(DEFAULT_PENALTY_AMOUNT),
    ],
  });

  console.log("Transaction Details:");
  console.log(`  User Deposit: ${DEFAULT_DEPOSIT_AMOUNT / 1e9} SUI`);
  console.log(`  Operator Deposit: ${DEFAULT_DEPOSIT_AMOUNT / 1e9} SUI`);
  console.log(`  Penalty Amount: ${DEFAULT_PENALTY_AMOUNT / 1e9} SUI`);
  console.log();

  // Execute transaction
  console.log("Submitting transaction...");

  const result = await executeTransaction(tx, userKeypair, {
    effects: true,
    events: true,
  });

  console.log();
  console.log("=".repeat(60));
  console.log("TUNNEL CREATED!");
  console.log("=".repeat(60));
  console.log();
  console.log(`Transaction: ${result.digest}`);

  // Extract tunnel ID from events
  const tunnelCreatedEvent = result.events?.find((e) =>
    e.eventType.includes("TunnelCreated"),
  );

  if (tunnelCreatedEvent) {
    const tunnelId = (tunnelCreatedEvent.json as any)?.tunnel_id;
    console.log(`Tunnel ID: ${tunnelId}`);
    console.log();
    console.log("Save these values for later:");
    console.log(`  TUNNEL_ID=${tunnelId}`);
    console.log(
      `  USER_ED25519_PRIVATE_KEY=${Buffer.from(userEd25519Private).toString(
        "hex",
      )}`,
    );
    console.log(
      `  OPERATOR_ED25519_PRIVATE_KEY=${Buffer.from(
        operatorEd25519Private,
      ).toString("hex")}`,
    );
  }

  console.log();
  console.log("The tunnel is now ACTIVE!");
  console.log("You can send commands off-chain using Ed25519 signatures.");
}

createTunnel().catch(console.error);
