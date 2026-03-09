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
import { executeTransaction, keypair, requirePackageAddress } from "./config";

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

  const result = await executeTransaction(tx, keypair);

  console.log("\nTransaction successful!");
  console.log(`Digest: ${result.digest}`);

  // ============================================
  // STEP 3: Find the Created Queue
  // ============================================

  // Look for the QueueCreated event
  const queueEvent = result.events?.find((e) =>
    e.eventType.includes("QueueCreated"),
  );

  if (queueEvent) {
    const eventData = queueEvent.json as {
      queue_id: string;
      admin: string;
    };
    console.log(`\nQueue created!`);
    console.log(`Queue ID: ${eventData.queue_id}`);
    console.log(`Admin: ${eventData.admin}`);
    console.log(`\n>>> Add this to your .env file:`);
    console.log(`QUEUE_ID=${eventData.queue_id}`);
  }

  // Alternative: Find from effects changedObjects + objectTypes
  const createdObjects = result.effects?.changedObjects
    .filter((c) => c.idOperation === "Created")
    .map((c) => ({
      objectId: c.objectId,
      objectType: result.objectTypes?.[c.objectId] || "",
    }));

  if (createdObjects && createdObjects.length > 0) {
    console.log("\nCreated objects:");
    for (const obj of createdObjects) {
      console.log(`  - ${obj.objectType}`);
      console.log(`    ID: ${obj.objectId}`);
    }
  }
}

main().catch(console.error);
