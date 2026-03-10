/**
 * Configuration - Load environment variables
 *
 * This module loads and validates all configuration from .env
 */

import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// ============================================
// BLOCKCHAIN CONFIG
// ============================================

const network = (process.env.NETWORK || "testnet") as
  | "devnet"
  | "testnet"
  | "mainnet";

const GRAPHQL_URLS: Record<string, string> = {
  mainnet: "https://sui-mainnet.mystenlabs.com/graphql",
  testnet: "https://sui-testnet.mystenlabs.com/graphql",
  devnet: "https://sui-devnet.mystenlabs.com/graphql",
  localnet: "http://127.0.0.1:9125/graphql",
};

export const suiClient = new SuiGraphQLClient({
  url:
    process.env.SUI_GRAPHQL_URL ||
    GRAPHQL_URLS[network] ||
    GRAPHQL_URLS.testnet,
  network,
});

const phrase = process.env.ADMIN_PHRASE;
if (!phrase) {
  console.error("Error: ADMIN_PHRASE not set in .env");
  process.exit(1);
}

export const keypair = Ed25519Keypair.deriveKeypair(phrase);
export const address = keypair.getPublicKey().toSuiAddress();

export const PACKAGE_ADDRESS = process.env.PACKAGE_ADDRESS || "";
export const QUEUE_ID = process.env.QUEUE_ID || "";

if (!PACKAGE_ADDRESS) {
  console.error("Error: PACKAGE_ADDRESS not set in .env");
  process.exit(1);
}

if (!QUEUE_ID) {
  console.error("Error: QUEUE_ID not set in .env");
  process.exit(1);
}

// ============================================
// ROBOT CONFIG
// ============================================

export const SERIAL_PORT = process.env.SERIAL_PORT || "/dev/ttyACM0";
export const BAUD_RATE = parseInt(process.env.BAUD_RATE || "115200");

// ============================================
// PROCESSOR CONFIG
// ============================================

export const POLL_INTERVAL_MS = parseInt(
  process.env.POLL_INTERVAL_MS || "5000",
);
export const ACTION_DELAY_MS = parseInt(process.env.ACTION_DELAY_MS || "1000");
export const DEBUG = process.env.DEBUG === "true";

// ============================================
// DISPLAY CONFIG
// ============================================

export function printConfig() {
  console.log("Configuration:");
  console.log(`  Network: ${network}`);
  console.log(`  Package: ${PACKAGE_ADDRESS.slice(0, 10)}...`);
  console.log(`  Queue: ${QUEUE_ID.slice(0, 10)}...`);
  console.log(`  Admin: ${address.slice(0, 10)}...`);
  console.log(`  Serial Port: ${SERIAL_PORT}`);
  console.log(`  Baud Rate: ${BAUD_RATE}`);
  console.log(`  Poll Interval: ${POLL_INTERVAL_MS}ms`);
}

/**
 * Execute a transaction, unwrap the result, and return the transaction data.
 * Throws if the transaction fails.
 */
export async function executeTransaction(
  tx: Transaction,
  signer: Ed25519Keypair,
  include?: { effects?: boolean; events?: boolean; objectTypes?: boolean },
) {
  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer,
    include: include || { effects: true, events: true, objectTypes: true },
  });

  if (result.$kind === "FailedTransaction") {
    throw new Error("Transaction failed");
  }

  return result.Transaction;
}
