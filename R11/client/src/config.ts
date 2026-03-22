import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import "dotenv/config";

export const NETWORK = (process.env.NETWORK || "testnet") as
  | "devnet"
  | "testnet"
  | "mainnet"
  | "localnet";
export const PACKAGE_ADDRESS = process.env.PACKAGE_ADDRESS || "";
export const METER_OBJECT_ID = process.env.METER_OBJECT_ID || "";
export const REWARD_VAULT_ID = process.env.REWARD_VAULT_ID || "";

const GRAPHQL_URLS: Record<string, string> = {
  mainnet: "https://graphql.mainnet.sui.io/graphql",
  testnet: "https://graphql.testnet.sui.io/graphql",
  devnet: "https://graphql.devnet.sui.io/graphql",
  localnet: "http://127.0.0.1:9125/graphql",
};

export const suiClient = new SuiGraphQLClient({
  url: process.env.SUI_GRAPHQL_URL || GRAPHQL_URLS[NETWORK] || GRAPHQL_URLS.testnet,
  network: NETWORK,
});

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

export async function executeTransaction(
  tx: Transaction,
  signer: Ed25519Keypair,
) {
  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer,
    include: {
      effects: true,
      events: true,
      objectTypes: true,
    },
  });

  if (result.$kind === "FailedTransaction") {
    throw new Error("Transaction failed");
  }

  return result.Transaction;
}

export function validateConfig(required: string[]): void {
  const missing = required.filter((key) => {
    switch (key) {
      case "PACKAGE_ADDRESS":
        return !PACKAGE_ADDRESS;
      case "METER_OBJECT_ID":
        return !METER_OBJECT_ID;
      case "REWARD_VAULT_ID":
        return !REWARD_VAULT_ID;
      case "USER_PHRASE":
        return !process.env.USER_PHRASE;
      case "USER_PRIVATE_KEY":
        return !process.env.USER_PRIVATE_KEY;
      default:
        return !process.env[key];
    }
  });

  if (missing.length > 0) {
    throw new Error(`Missing required configuration: ${missing.join(", ")}`);
  }
}

export function wattCoinType(): string {
  return `${PACKAGE_ADDRESS}::watt::WATT`;
}
