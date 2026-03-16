/**
 * Configuration and helper functions for Robot Rental Platform client
 *
 * This module provides:
 * - Environment variable loading
 * - SuiClient setup
 * - Keypair management (wallet + Ed25519 command signing)
 * - Common transaction patterns
 */

import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import * as ed from "@noble/ed25519";
import { webcrypto } from "crypto";
import "dotenv/config";

// Enable Ed25519 in Node.js
if (!globalThis.crypto) {
  // @ts-ignore
  globalThis.crypto = webcrypto;
}

// ============================================
// ENVIRONMENT VARIABLES
// ============================================

export const NETWORK = (process.env.NETWORK || "testnet") as
  | "devnet"
  | "testnet"
  | "mainnet"
  | "localnet";
export const PACKAGE_ADDRESS = process.env.PACKAGE_ADDRESS || "";
export const FAUCET_ID = process.env.FAUCET_ID || "";
export const REGISTRY_ID = process.env.REGISTRY_ID || "";
export const ROBOT_PET_ID = process.env.ROBOT_PET_ID || "";

// ============================================
// SUI CLIENT
// ============================================

const GRAPHQL_URLS: Record<string, string> = {
  mainnet: "https://graphql.mainnet.sui.io/graphql",
  testnet: "https://graphql.testnet.sui.io/graphql",
  devnet: "https://graphql.devnet.sui.io/graphql",
  localnet: "http://127.0.0.1:9125/graphql",
};

export const suiClient = new SuiGraphQLClient({
  url:
    process.env.SUI_GRAPHQL_URL ||
    GRAPHQL_URLS[NETWORK] ||
    GRAPHQL_URLS.testnet,
  network: NETWORK,
});

// ============================================
// KEYPAIR MANAGEMENT
// ============================================

/**
 * Get the user's wallet keypair from environment variables.
 * Supports both mnemonic phrase and private key formats.
 */
export function getUserKeypair(): Ed25519Keypair {
  const phrase = process.env.USER_PHRASE;
  const privateKey = process.env.USER_PRIVATE_KEY;

  if (phrase) {
    return Ed25519Keypair.deriveKeypair(phrase);
  }

  if (privateKey) {
    return Ed25519Keypair.fromSecretKey(privateKey);
  }

  throw new Error("USER_PHRASE or USER_PRIVATE_KEY must be set in .env");
}

/**
 * Get the operator's wallet keypair from environment variables.
 */
export function getOperatorKeypair(): Ed25519Keypair {
  const phrase = process.env.OPERATOR_PHRASE;
  const privateKey = process.env.OPERATOR_PRIVATE_KEY;

  if (phrase) {
    return Ed25519Keypair.deriveKeypair(phrase);
  }

  if (privateKey) {
    return Ed25519Keypair.fromSecretKey(privateKey);
  }

  // Fall back to user keypair if operator not set
  return getUserKeypair();
}

// ============================================
// ED25519 COMMAND SIGNING KEYS
// ============================================

/**
 * Generate a new Ed25519 keypair for signing robot commands.
 *
 * IMPORTANT: These are separate from wallet keys!
 * - Wallet keys: Sign blockchain transactions
 * - Command keys: Sign off-chain robot commands
 *
 * Returns both private key (for signing) and public key (for registration)
 */
export async function generateCommandKeys(): Promise<{
  privateKey: Uint8Array;
  publicKey: Uint8Array;
}> {
  const privateKey = ed.utils.randomPrivateKey();
  const publicKey = await ed.getPublicKeyAsync(privateKey);

  return { privateKey, publicKey };
}

/**
 * Sign a robot command message with the private key.
 */
export async function signCommand(
  privateKey: Uint8Array,
  message: Uint8Array,
): Promise<Uint8Array> {
  return await ed.signAsync(message, privateKey);
}

/**
 * Verify a command signature.
 */
export async function verifyCommand(
  signature: Uint8Array,
  message: Uint8Array,
  publicKey: Uint8Array,
): Promise<boolean> {
  return await ed.verifyAsync(signature, message, publicKey);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get TREAT token coin type
 */
export function getTreatCoinType(): string {
  return `${PACKAGE_ADDRESS}::treat::TREAT`;
}

/**
 * Get user's TREAT token balance
 */
export async function getTreatBalance(address: string): Promise<bigint> {
  const coins = await suiClient.listCoins({
    owner: address,
    coinType: getTreatCoinType(),
  });

  return coins.objects.reduce(
    (total, coin) => total + BigInt(coin.balance),
    0n,
  );
}

/**
 * Get all TREAT coins for an address
 */
export async function getTreatCoins(address: string) {
  const coins = await suiClient.listCoins({
    owner: address,
    coinType: getTreatCoinType(),
  });
  return coins.objects;
}

/**
 * Execute a transaction and wait for confirmation
 */
export async function executeTransaction(
  tx: Transaction,
  keypair: Ed25519Keypair,
) {
  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: keypair,
    include: {
      effects: true,
      events: true,
      objectTypes: true,
    },
  });

  if (result.$kind === "FailedTransaction") {
    throw new Error("Transaction failed");
  }

  await suiClient.waitForTransaction({ digest: result.Transaction.digest });
  return result.Transaction;
}

/**
 * Validate required environment variables
 */
export function validateConfig(required: string[]): void {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
    console.error("Please copy .env.example to .env and fill in the values.");
    process.exit(1);
  }
}

/**
 * Format a SUI address for display (shortened)
 */
export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Sleep for a given number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Build a command message for signing (matches Move contract format)
 *
 * Format: session_id (32 bytes) || sequence_number (8 bytes BE) || command
 */
export function buildCommandMessage(
  sessionId: string,
  sequence: number,
  command: string,
): Uint8Array {
  // Remove 0x prefix and convert to bytes
  const idBytes = hexToBytes(sessionId.replace("0x", ""));

  // Sequence as big-endian 8 bytes
  const sequenceBytes = new Uint8Array(8);
  const view = new DataView(sequenceBytes.buffer);
  view.setBigUint64(0, BigInt(sequence), false); // false = big-endian

  // Command as bytes
  const commandBytes = new TextEncoder().encode(command);

  // Concatenate all
  const result = new Uint8Array(idBytes.length + 8 + commandBytes.length);
  result.set(idBytes, 0);
  result.set(sequenceBytes, idBytes.length);
  result.set(commandBytes, idBytes.length + 8);

  return result;
}

/**
 * Convert hex string to bytes
 */
export function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Convert bytes to hex string
 */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
