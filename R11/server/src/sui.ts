import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import { config } from "./config.js";
import type { EnergyReading } from "./types.js";

export function readingCallTarget(packageId: string): string {
  return `${packageId}::energy_meter::record_reading`;
}

const GRAPHQL_URLS: Record<string, string> = {
  mainnet: "https://graphql.mainnet.sui.io/graphql",
  testnet: "https://graphql.testnet.sui.io/graphql",
  devnet: "https://graphql.devnet.sui.io/graphql",
  localnet: "http://127.0.0.1:9125/graphql",
};

export const suiClient = new SuiGraphQLClient({
  url: config.graphqlUrl || GRAPHQL_URLS[config.network] || GRAPHQL_URLS.testnet,
  network: config.network,
});

export function getKeypair(): Ed25519Keypair {
  if (config.userPhrase) {
    return Ed25519Keypair.deriveKeypair(config.userPhrase);
  }

  if (config.userPrivateKey) {
    const { secretKey } = decodeSuiPrivateKey(config.userPrivateKey);
    return Ed25519Keypair.fromSecretKey(secretKey);
  }

  throw new Error("USER_PHRASE or USER_PRIVATE_KEY is required when AUTO_SUBMIT=true");
}

export function createReadingTransaction(
  reading: EnergyReading,
  rewardDeltaMilli: number,
  recipient: string,
): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: readingCallTarget(config.packageId),
    arguments: [
      tx.object(config.meterObjectId),
      tx.pure.u64(reading.watts),
      tx.pure.u64(reading.totalKwhMilli),
      tx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  if (config.rewardVaultId && rewardDeltaMilli > 0) {
    tx.moveCall({
      target: `${config.packageId}::watt::reward_for_verified_kwh`,
      arguments: [
        tx.object(config.rewardVaultId),
        tx.pure.address(recipient),
        tx.pure.u64(rewardDeltaMilli),
      ],
    });
  }

  return tx;
}

export async function submitReading(
  reading: EnergyReading,
  rewardDeltaMilli: number,
): Promise<string> {
  const signer = getKeypair();
  const tx = createReadingTransaction(
    reading,
    rewardDeltaMilli,
    signer.toSuiAddress(),
  );

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

  return result.Transaction.digest;
}

export function describeSubmission(
  reading: EnergyReading,
  packageId: string,
  meterObjectId: string,
  rewardDeltaMilli: number,
): Record<string, string | number> {
  return {
    target: readingCallTarget(packageId),
    meterObjectId,
    rewardVaultId: config.rewardVaultId,
    meterId: reading.meterId,
    watts: reading.watts,
    totalKwhMilli: reading.totalKwhMilli,
    timestampMs: reading.timestampMs,
    rewardDeltaMilli,
  };
}
