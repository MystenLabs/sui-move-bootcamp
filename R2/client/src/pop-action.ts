/**
 * Pop Action - Remove and process the next action from the queue
 *
 * This script demonstrates:
 * - Admin-only functions
 * - Processing queued items
 *
 * Only the admin (queue creator) can call this function.
 */

import { Transaction } from "@mysten/sui/transactions";
import {
  keypair,
  requirePackageAddress,
  requireQueueId,
  suiClient,
} from "./config";

async function main() {
  const packageAddress = requirePackageAddress();
  const queueId = requireQueueId();

  console.log("\n=== Popping Next Action ===\n");

  // ============================================
  // BUILD AND EXECUTE
  // ============================================

  const tx = new Transaction();

  tx.moveCall({
    target: `${packageAddress}::robot_queue::pop_action`,
    arguments: [tx.object(queueId)],
  });

  console.log("Processing next action...");

  try {
    const result = await suiClient.signAndExecuteTransaction({
      transaction: tx,
      signer: keypair,
      options: {
        showEvents: true,
      },
    });

    console.log(`\nSuccess! Digest: ${result.digest}`);

    // Show what was processed
    const processedEvent = result.events?.find((e) =>
      e.type.includes("ActionProcessed"),
    );

    if (processedEvent) {
      const data = processedEvent.parsedJson as {
        action_name: string;
        original_sender: string;
        queue_length: string;
      };
      console.log(`\nProcessed action:`);
      console.log(`  Action: ${data.action_name}`);
      console.log(`  Original sender: ${data.original_sender}`);
      console.log(`  Remaining in queue: ${data.queue_length}`);
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes("EQueueEmpty")) {
      console.log("Queue is empty - nothing to pop!");
    } else if (errorMessage.includes("ENotAuthorized")) {
      console.log("Error: Only the admin can pop actions");
    } else {
      throw error;
    }
  }
}

main().catch(console.error);
