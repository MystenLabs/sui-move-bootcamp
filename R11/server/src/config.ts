import "dotenv/config";

export const config = {
  network: (process.env.NETWORK || "testnet") as
    | "devnet"
    | "testnet"
    | "mainnet"
    | "localnet",
  packageId: process.env.PACKAGE_ADDRESS || "",
  meterObjectId: process.env.METER_OBJECT_ID || "",
  rewardVaultId: process.env.REWARD_VAULT_ID || "",
  httpHost: process.env.HTTP_HOST || "127.0.0.1",
  httpPort: Number(process.env.HTTP_PORT || "8080"),
  simulateSensor: process.env.SIMULATE_SENSOR !== "false",
  transport: (process.env.TRANSPORT || "serial") as "serial" | "lora",
  autoSubmit: process.env.AUTO_SUBMIT === "true",
  userPhrase: process.env.USER_PHRASE || "",
  userPrivateKey: process.env.USER_PRIVATE_KEY || "",
  graphqlUrl: process.env.SUI_GRAPHQL_URL || "",
} as const;

export function validateConfig(): void {
  const missing: string[] = [];

  if (!config.packageId) {
    missing.push("PACKAGE_ADDRESS");
  }

  if (!config.meterObjectId) {
    missing.push("METER_OBJECT_ID");
  }

  if (config.autoSubmit) {
    if (!config.userPhrase && !config.userPrivateKey) {
      missing.push("USER_PHRASE or USER_PRIVATE_KEY");
    }

    if (!config.rewardVaultId) {
      missing.push("REWARD_VAULT_ID");
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing required configuration: ${missing.join(", ")}`);
  }
}
