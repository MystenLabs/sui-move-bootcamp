/**
 * Configuration for the multiplayer robot client.
 *
 * Loads environment variables and provides helpers
 * for connecting to the Sui network.
 */

import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import "dotenv/config";

// ============================================
// Environment Variables
// ============================================

export const PACKAGE_ADDRESS = process.env.PACKAGE_ADDRESS || "";
export const QUEUE_ID = process.env.QUEUE_ID || "";

// ============================================
// Sui Client
// ============================================

const GRAPHQL_URLS: Record<string, string> = {
  mainnet: "https://sui-mainnet.mystenlabs.com/graphql",
  testnet: "https://sui-testnet.mystenlabs.com/graphql",
  devnet: "https://sui-devnet.mystenlabs.com/graphql",
  localnet: "http://127.0.0.1:9125/graphql",
};

// Derive network from RPC URL or default to testnet
const SUI_NETWORK = (process.env.SUI_NETWORK || "testnet") as string;

export const suiClient = new SuiGraphQLClient({
  url:
    process.env.SUI_GRAPHQL_URL ||
    GRAPHQL_URLS[SUI_NETWORK] ||
    GRAPHQL_URLS.testnet,
  network: SUI_NETWORK,
});

// ============================================
// Keypair Functions
// ============================================

/**
 * Get keypair from environment variables.
 *
 * Supports:
 * - USER_PHRASE: 12-word mnemonic
 * - USER_PRIVATE_KEY: suiprivkey1... format
 */
export function getKeypair(): Ed25519Keypair {
  const phrase = process.env.USER_PHRASE;
  const privateKey = process.env.USER_PRIVATE_KEY;

  if (phrase) {
    return Ed25519Keypair.deriveKeypair(phrase);
  }

  if (privateKey) {
    const { secretKey } = decodeSuiPrivateKey(privateKey);
    return Ed25519Keypair.fromSecretKey(secretKey);
  }

  throw new Error("Please set USER_PHRASE or USER_PRIVATE_KEY in .env");
}

// ============================================
// Validation Functions
// ============================================

/**
 * Validate that required config values are set.
 */
export function validateConfig(required: string[]): void {
  const missing: string[] = [];

  for (const key of required) {
    const value = getConfigValue(key);
    if (!value) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    console.error("Missing required configuration:");
    missing.forEach((key) => console.error(`  - ${key}`));
    console.error("");
    console.error("Please set these in your .env file");
    process.exit(1);
  }
}

function getConfigValue(key: string): string | undefined {
  switch (key) {
    case "PACKAGE_ADDRESS":
      return PACKAGE_ADDRESS;
    case "QUEUE_ID":
      return QUEUE_ID;
    case "USER_PHRASE":
      return process.env.USER_PHRASE;
    case "USER_PRIVATE_KEY":
      return process.env.USER_PRIVATE_KEY;
    default:
      return process.env[key];
  }
}

/**
 * Print current configuration.
 */
export function printConfig(): void {
  console.log("Configuration:");
  console.log(`  Package: ${PACKAGE_ADDRESS || "(not set)"}`);
  console.log(`  Queue ID: ${QUEUE_ID || "(not set)"}`);
  console.log(`  Network: ${SUI_NETWORK}`);
  console.log("");
}

// ============================================
// Valid Actions
// ============================================

export const VALID_ACTIONS = [
  "sit",
  "stand",
  "wave",
  "walk_forward",
  "walk_backward",
  "turn_left",
  "turn_right",
  "jump",
  "balance",
  "push_up",
] as const;

export type ValidAction = (typeof VALID_ACTIONS)[number];

/**
 * Check if an action name is valid.
 */
export function isValidAction(action: string): action is ValidAction {
  return VALID_ACTIONS.includes(action as ValidAction);
}

// ============================================
// Transaction Helper
// ============================================

/**
 * Execute a transaction, unwrap the result, and return the transaction data.
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
