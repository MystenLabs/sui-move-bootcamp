/**
 * Configuration - Load environment variables and set up Sui client
 *
 * This file demonstrates:
 * - Loading environment variables
 * - Creating a Sui client connection
 * - Setting up a keypair from a mnemonic phrase
 */

import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// ============================================
// NETWORK CONFIGURATION
// ============================================

// Get network from env (default to testnet for safety)
const network = (process.env.NETWORK || "testnet") as
  | "devnet"
  | "testnet"
  | "mainnet";

// Create Sui client connected to the network
export const suiClient = new SuiClient({
  url: getFullnodeUrl(network),
});

console.log(`Connected to Sui ${network}`);

// ============================================
// WALLET CONFIGURATION
// ============================================

// Create keypair from mnemonic phrase
const phrase = process.env.ADMIN_PHRASE;

if (!phrase) {
  console.error("Error: ADMIN_PHRASE not set in .env file");
  console.error("Please copy .env.example to .env and add your phrase");
  process.exit(1);
}

// Derive keypair from the mnemonic
export const keypair = Ed25519Keypair.deriveKeypair(phrase);

// Get the address from the keypair
export const address = keypair.getPublicKey().toSuiAddress();

console.log(`Wallet address: ${address}`);

// ============================================
// CONTRACT CONFIGURATION
// ============================================

export const PACKAGE_ADDRESS = process.env.PACKAGE_ADDRESS || "";
export const QUEUE_ID = process.env.QUEUE_ID || "";

// Helper to check if contract is configured
export function requirePackageAddress(): string {
  if (!PACKAGE_ADDRESS) {
    console.error("Error: PACKAGE_ADDRESS not set in .env file");
    console.error("Please deploy the contract first: sui client publish");
    process.exit(1);
  }
  return PACKAGE_ADDRESS;
}

export function requireQueueId(): string {
  if (!QUEUE_ID) {
    console.error("Error: QUEUE_ID not set in .env file");
    console.error("Please create a queue first: pnpm create-queue");
    process.exit(1);
  }
  return QUEUE_ID;
}
