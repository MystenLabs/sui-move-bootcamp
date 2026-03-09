/**
 * Create a new multiplayer queue.
 *
 * This script demonstrates:
 * - Creating a shared object on Sui
 * - Capturing created object IDs from transaction results
 * - Writing configuration for future use
 *
 * Usage:
 *   pnpm create-queue
 */

import { Transaction } from "@mysten/sui/transactions";
import {
  executeTransaction,
  getKeypair,
  PACKAGE_ADDRESS,
  printConfig,
  validateConfig,
} from "./config";

async function main(): Promise<void> {
  console.log("=".repeat(50));
  console.log("CREATE MULTIPLAYER QUEUE");
  console.log("=".repeat(50));
  console.log("");

  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS"]);
  printConfig();

  // Get queue name from command line or use default
  const queueName = process.argv[2] || "Robot Queue";

  // Get keypair
  const keypair = getKeypair();
  const address = keypair.getPublicKey().toSuiAddress();
  console.log(`Your address: ${address}`);
  console.log(`Queue name: ${queueName}`);
  console.log("");

  // Build the transaction
  console.log("Building transaction...");
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::multiplayer_queue::create_queue`,
    arguments: [tx.pure.string(queueName)],
  });

  // Execute the transaction
  console.log("Sending transaction...");
  const result = await executeTransaction(tx, keypair);

  console.log("");
  console.log("Transaction successful!");
  console.log(`  Digest: ${result.digest}`);
  console.log(`  Status: ${result.status.success ? "success" : "failure"}`);

  // Find the created queue object
  const createdObjects = result.effects?.changedObjects
    .filter((c) => c.idOperation === "Created")
    .map((c) => ({
      objectId: c.objectId,
      objectType: result.objectTypes?.[c.objectId] || "",
    }));

  const queueObject = createdObjects?.find((obj) =>
    obj.objectType.includes("::multiplayer_queue::MultiplayerQueue"),
  );

  if (queueObject) {
    console.log("");
    console.log("Queue created!");
    console.log(`  Object ID: ${queueObject.objectId}`);
    console.log("");
    console.log("Add this to your .env file:");
    console.log(`  QUEUE_ID=${queueObject.objectId}`);
  }

  // Show events
  if (result.events && result.events.length > 0) {
    console.log("");
    console.log("Events:");
    result.events.forEach((event, i) => {
      console.log(`  ${i + 1}. ${event.eventType}`);
      if (event.json) {
        console.log(`     ${JSON.stringify(event.json)}`);
      }
    });
  }

  console.log("");
  console.log("=".repeat(50));
}

main().catch(console.error);
