/**
 * Create the Robot Registry (one-time setup)
 *
 * Usage: pnpm create-registry
 *
 * This creates a shared RobotRegistry object that operators can register robots with.
 * Only needs to be called once after contract deployment.
 */

import { Transaction } from "@mysten/sui/transactions";
import {
  executeTransaction,
  getUserKeypair,
  PACKAGE_ADDRESS,
  validateConfig,
} from "./config";

async function main() {
  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS"]);

  // Get keypair
  const keypair = getUserKeypair();
  const address = keypair.toSuiAddress();

  console.log("=== Create Robot Registry ===");
  console.log(`Creator: ${address}`);
  console.log(`Package: ${PACKAGE_ADDRESS}`);
  console.log("");

  // Build transaction
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::robot_registry::create_registry`,
  });

  console.log("Sending transaction...");

  try {
    const result = await executeTransaction(tx, keypair);

    // Find the created registry object
    const createdRegistry = result.effects?.changedObjects
      .filter((c) => c.idOperation === "Created")
      .map((c) => ({
        objectId: c.objectId,
        objectType: result.objectTypes?.[c.objectId] || "",
      }))
      .find((o) => o.objectType.includes("::robot_registry::RobotRegistry"));

    console.log("\n=== Success! ===");
    console.log(`Transaction: ${result.digest}`);

    if (createdRegistry) {
      console.log(`\nRegistry ID: ${createdRegistry.objectId}`);
      console.log("\nAdd this to your .env file:");
      console.log(`REGISTRY_ID=${createdRegistry.objectId}`);
    }
  } catch (error: any) {
    console.error("\nTransaction failed:", error.message);
    process.exit(1);
  }
}

main();
