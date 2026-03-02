/**
 * Create Queue - Deploy a new ActionQueue shared object
 *
 * This script demonstrates:
 * - Building a transaction
 * - Calling a Move function
 * - Signing and executing a transaction
 * - Reading transaction results
 */

import { Transaction } from "@mysten/sui/transactions";
import { keypair, requirePackageAddress, suiClient } from "./config";

async function main() {
  const packageAddress = requirePackageAddress();

  console.log("\n=== Creating New Action Queue ===\n");

  // ============================================
  // STEP 1: Build the Transaction
  // ============================================

  // Create a new transaction block
  const tx = new Transaction();

  // Call the create_queue function from our contract
  // Format: package::module::function
  tx.moveCall({
    target: `${packageAddress}::robot_queue::create_queue`,
    arguments: [], // No arguments needed
  });

  console.log("Transaction built");

  // ============================================
  // STEP 2: Sign and Execute
  // ============================================

  console.log("Signing and executing...");

  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: keypair,
    options: {
      // Request additional data in the response
      showEffects: true,
      showEvents: true,
      showObjectChanges: true,
    },
  });

  console.log("\nTransaction successful!");
  console.log(`Digest: ${result.digest}`);

  // ============================================
  // STEP 3: Find the Created Queue
  // ============================================

  // Look for the QueueCreated event
  const queueEvent = result.events?.find((e) =>
    e.type.includes("QueueCreated"),
  );

  if (queueEvent) {
    const eventData = queueEvent.parsedJson as {
      queue_id: string;
      admin: string;
    };
    console.log(`\nQueue created!`);
    console.log(`Queue ID: ${eventData.queue_id}`);
    console.log(`Admin: ${eventData.admin}`);
    console.log(`\n>>> Add this to your .env file:`);
    console.log(`QUEUE_ID=${eventData.queue_id}`);
  }

  // Alternative: Find from object changes
  const createdObjects = result.objectChanges?.filter(
    (change) => change.type === "created",
  );

  if (createdObjects && createdObjects.length > 0) {
    console.log("\nCreated objects:");
    for (const obj of createdObjects) {
      if (obj.type === "created") {
        console.log(`  - ${obj.objectType}`);
        console.log(`    ID: ${obj.objectId}`);
      }
    }
  }
}

main().catch(console.error);
