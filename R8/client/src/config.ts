/**
 * Configuration and Sui client setup for Module 8.
 *
 * This file handles:
 * - Loading environment variables
 * - Creating the Sui client connection
 * - Setting up the user's keypair for signing
 */

import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { config } from "dotenv";

// Load .env file
config();

// ============================================
// NETWORK CONFIGURATION
// ============================================

/**
 * Get the network from environment (default: testnet)
 */
export const NETWORK = (process.env.NETWORK || "testnet") as
  | "testnet"
  | "devnet"
  | "mainnet";

/**
 * Create a Sui client connected to the specified network
 */
export const suiClient = new SuiClient({
  url: getFullnodeUrl(NETWORK),
});

// ============================================
// CONTRACT ADDRESSES
// ============================================

/**
 * The deployed package address
 * Set this after running `sui client publish`
 */
export const PACKAGE_ADDRESS = process.env.PACKAGE_ADDRESS || "";

/**
 * The shared MintCap object ID (created during init)
 */
export const MINT_CAP_ID = process.env.MINT_CAP_ID || "";

/**
 * The shared FaucetManager object ID (created during init)
 */
export const FAUCET_MANAGER_ID = process.env.FAUCET_MANAGER_ID || "";

/**
 * The shared RobotPet object ID (created via create_robot)
 */
export const ROBOT_ID = process.env.ROBOT_ID || "";

// ============================================
// KEYPAIR SETUP
// ============================================

/**
 * Create a keypair from environment variables.
 *
 * Supports two methods:
 * 1. USER_PHRASE: 12 or 24 word mnemonic
 * 2. USER_PRIVATE_KEY: Base64 encoded private key
 */
export function getKeypair(): Ed25519Keypair {
  const phrase = process.env.USER_PHRASE;
  const privateKey = process.env.USER_PRIVATE_KEY;

  if (phrase) {
    return Ed25519Keypair.deriveKeypair(phrase);
  }

  if (privateKey) {
    return Ed25519Keypair.fromSecretKey(privateKey);
  }

  throw new Error(
    "No credentials found. Set USER_PHRASE or USER_PRIVATE_KEY in .env",
  );
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Validate that required environment variables are set.
 */
export function validateConfig(required: string[]): void {
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("Missing required environment variables:");
    missing.forEach((key) => console.error(`  - ${key}`));
    console.error("\nPlease copy .env.example to .env and fill in the values.");
    process.exit(1);
  }
}

/**
 * Print configuration for debugging.
 */
export function printConfig(): void {
  console.log("Configuration:");
  console.log(`  Network: ${NETWORK}`);
  console.log(`  Package: ${PACKAGE_ADDRESS || "(not set)"}`);
  console.log(`  MintCap: ${MINT_CAP_ID || "(not set)"}`);
  console.log(`  FaucetManager: ${FAUCET_MANAGER_ID || "(not set)"}`);
  console.log(`  RobotPet: ${ROBOT_ID || "(not set)"}`);
  console.log("");
}

/**
 * Format a Sui address for display (truncated).
 */
export function formatAddress(address: string): string {
  if (address.length <= 16) return address;
  return `${address.slice(0, 8)}...${address.slice(-6)}`;
}
