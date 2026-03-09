/**
 * Configuration for Robot Tunnel Client
 *
 * Environment variables:
 * - SUI_NETWORK: testnet, devnet, or mainnet
 * - PACKAGE_ID: Deployed contract address
 * - USER_PRIVATE_KEY: User's Sui wallet private key (bech32: suiprivkey1...)
 * - OPERATOR_PRIVATE_KEY: Operator's Sui wallet private key (bech32: suiprivkey1...)
 * - USER_ED25519_PRIVATE_KEY: User's Ed25519 key for signing commands (hex or bech32)
 * - OPERATOR_ED25519_PRIVATE_KEY: Operator's Ed25519 key (hex or bech32)
 */

import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import dotenv from "dotenv";

dotenv.config();

// Network configuration
export const NETWORK = (process.env.SUI_NETWORK || "testnet") as
  | "testnet"
  | "devnet"
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
    GRAPHQL_URLS[NETWORK] ||
    GRAPHQL_URLS.testnet,
  network: NETWORK,
});

// Contract configuration
export const PACKAGE_ID = process.env.PACKAGE_ID || "0x...";
export const MODULE_NAME = "tunnel";

/**
 * Parse a private key from either bech32 (suiprivkey1...) or hex format
 */
function parsePrivateKey(key: string): Uint8Array {
  if (key.startsWith("suiprivkey")) {
    // Bech32 format from Sui CLI
    const { secretKey } = decodeSuiPrivateKey(key);
    return secretKey;
  } else {
    // Raw hex format (64 hex chars = 32 bytes)
    return Uint8Array.from(Buffer.from(key, "hex"));
  }
}

// Wallet configuration
export function getUserKeypair(): Ed25519Keypair {
  const privateKey = process.env.USER_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("USER_PRIVATE_KEY not set in .env");
  }
  return Ed25519Keypair.fromSecretKey(parsePrivateKey(privateKey));
}

export function getOperatorKeypair(): Ed25519Keypair {
  const privateKey = process.env.OPERATOR_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("OPERATOR_PRIVATE_KEY not set in .env");
  }
  return Ed25519Keypair.fromSecretKey(parsePrivateKey(privateKey));
}

// Ed25519 keys for command signing (separate from wallet keys!)
export const USER_ED25519_PRIVATE_KEY =
  process.env.USER_ED25519_PRIVATE_KEY || "";
export const OPERATOR_ED25519_PRIVATE_KEY =
  process.env.OPERATOR_ED25519_PRIVATE_KEY || "";

// Tunnel configuration
export const DEFAULT_DEPOSIT_AMOUNT = 100_000_000; // 0.1 SUI
export const DEFAULT_PENALTY_AMOUNT = 50_000_000; // 0.05 SUI

console.log("Configuration loaded:");
console.log(`  Network: ${NETWORK}`);
console.log(`  Package: ${PACKAGE_ID.slice(0, 10)}...`);

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
