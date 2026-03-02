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
  getKeypair,
  PACKAGE_ADDRESS,
  printConfig,
  suiClient,
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
  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: keypair,
    options: {
      showEffects: true,
      showEvents: true,
      showObjectChanges: true,
    },
  });

  console.log("");
  console.log("Transaction successful!");
  console.log(`  Digest: ${result.digest}`);
  console.log(`  Status: ${result.effects?.status.status}`);

  // Find the created queue object
  const createdObjects = result.objectChanges?.filter(
    (change) => change.type === "created",
  );

  const queueObject = createdObjects?.find(
    (obj) =>
      obj.type === "created" &&
      obj.objectType.includes("::multiplayer_queue::MultiplayerQueue"),
  );

  if (queueObject && queueObject.type === "created") {
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
      console.log(`  ${i + 1}. ${event.type}`);
      if (event.parsedJson) {
        console.log(`     ${JSON.stringify(event.parsedJson)}`);
      }
    });
  }

  console.log("");
  console.log("=".repeat(50));
}

main().catch(console.error);
