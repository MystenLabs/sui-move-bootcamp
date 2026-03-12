/**
 * Configuration - Load environment variables and set up Sui client
 *
 * This file demonstrates:
 * - Loading environment variables
 * - Creating a Sui client connection
 * - Setting up a keypair from a mnemonic phrase
 */

import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
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

const GRAPHQL_URLS: Record<string, string> = {
  mainnet: "https://graphql.mainnet.sui.io/graphql",
  testnet: "https://graphql.testnet.sui.io/graphql",
  devnet: "https://graphql.devnet.sui.io/graphql",
  localnet: "http://127.0.0.1:9125/graphql",
};

// Create Sui GraphQL client connected to the network
export const suiClient = new SuiGraphQLClient({
  url:
    process.env.SUI_GRAPHQL_URL ||
    GRAPHQL_URLS[network] ||
    GRAPHQL_URLS.testnet,
  network,
});

console.log(`Connected to Sui ${network}`);

// ============================================
// WALLET CONFIGURATION
// ============================================

// Create keypair from mnemonic phrase or private key
const phrase = process.env.ADMIN_PHRASE;
const privateKey = process.env.ADMIN_PRIVATE_KEY;

if (!phrase && !privateKey) {
  console.error(
    "Error: ADMIN_PHRASE or ADMIN_PRIVATE_KEY not set in .env file",
  );
  console.error("Please copy .env.example to .env and add your credentials");
  console.error(
    "  Export private key: sui keytool export --key-identity <ADDRESS>",
  );
  process.exit(1);
}

// Derive keypair from mnemonic or private key
export const keypair = phrase
  ? Ed25519Keypair.deriveKeypair(phrase)
  : Ed25519Keypair.fromSecretKey(decodeSuiPrivateKey(privateKey!).secretKey);

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
