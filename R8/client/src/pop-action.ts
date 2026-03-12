/**
 * Pop (process) the next action from the queue.
 *
 * This is an admin-only operation. In a real system,
 * this would be called by a processor service that
 * executes the action on the physical robot.
 *
 * This script demonstrates:
 * - Admin-restricted functions
 * - Processing queued work
 * - Event handling for off-chain actions
 *
 * Usage:
 *   pnpm pop-action
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  executeTransaction,
  getKeypair,
  PACKAGE_ADDRESS,
  printConfig,
  ROBOT_ID,
  suiClient,
  validateConfig,
} from "./config";

async function main() {
  console.log("=".repeat(50));
  console.log("POP ACTION (Admin Only)");
  console.log("=".repeat(50));
  console.log("");

  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "ROBOT_ID", "USER_PHRASE"]);
  printConfig();

  // Get keypair
  const keypair = getKeypair();
  const address = keypair.getPublicKey().toSuiAddress();
  console.log(`Your address: ${address}`);
  console.log("");

  // ============================================
  // 1. Check current queue state
  // ============================================

  console.log("Checking queue state...");

  const response = await suiClient.getObject({
    objectId: ROBOT_ID,
    include: { json: true },
  });

  const fields = response.object.json as any;
  if (!fields) {
    console.log("Error: Could not read robot state");
    process.exit(1);
  }
  const queue = fields.action_queue as any[];

  if (!queue || queue.length === 0) {
    console.log("Queue is empty. Nothing to pop.");
    process.exit(0);
  }

  // Check if caller is admin
  if (fields.admin !== address) {
    console.log("Error: Only the admin can pop actions.");
    console.log(`  Admin: ${fields.admin}`);
    console.log(`  You: ${address}`);
    process.exit(1);
  }

  const nextAction = queue[0].fields;
  console.log(`  Queue length: ${queue.length}`);
  console.log(`  Next action: ${nextAction.action_name}`);
  console.log(`  From: ${nextAction.sender}`);
  console.log("");

  // ============================================
  // 2. Build and execute transaction
  // ============================================

  console.log("Building transaction...");
  const tx = new Transaction();

  /**
   * Call robot_pet::pop_action
   *
   * This removes the first action from the queue (FIFO)
   * and emits an ActionProcessed event.
   */
  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::robot_pet::pop_action`,
    arguments: [
      tx.object(ROBOT_ID), // RobotPet (shared, mutable)
      tx.object(SUI_CLOCK_OBJECT_ID), // Clock
    ],
  });

  console.log("Sending transaction...");
  const result = await executeTransaction(tx, keypair);

  console.log("");
  console.log("Transaction successful!");
  console.log(`  Digest: ${result.digest}`);
  console.log(`  Status: ${result.status.success ? "success" : "failure"}`);

  // Show the ActionProcessed event
  const processedEvent = result.events?.find((e) =>
    e.eventType.includes("::ActionProcessed"),
  );

  if (processedEvent) {
    const data = processedEvent.json as any;
    console.log("");
    console.log("Action processed!");
    console.log(`  Action: ${data.action_name}`);
    console.log(`  Original sender: ${data.original_sender}`);
    console.log("");
    console.log("In a real system, this would trigger:");
    console.log(`  → Serial command to robot: k${data.action_name}`);
  }

  // Show updated queue state
  const newResponse = await suiClient.getObject({
    objectId: ROBOT_ID,
    include: { json: true },
  });

  const newFields = newResponse.object.json as any;
  if (newFields) {
    const newQueue = newFields.action_queue as any[];
    console.log("");
    console.log(`Remaining in queue: ${newQueue?.length || 0}`);
  }

  console.log("");
  console.log("=".repeat(50));
}

main().catch(console.error);
