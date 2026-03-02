/**
 * Configuration - Load environment variables
 *
 * This module loads and validates all configuration from .env
 */

import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
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

export const suiClient = new SuiClient({
  url: getFullnodeUrl(network),
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
