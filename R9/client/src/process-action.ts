/**
 * Process (pop) the next action from the queue.
 *
 * This script is admin-only and demonstrates:
 * - Admin-restricted operations
 * - Processing queue items in FIFO order
 * - Real-time event emission for dashboards
 *
 * Usage:
 *   pnpm process-action
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  getKeypair,
  PACKAGE_ADDRESS,
  printConfig,
  QUEUE_ID,
  suiClient,
  validateConfig,
} from "./config";

async function main(): Promise<void> {
  console.log("=".repeat(50));
  console.log("PROCESS ACTION (ADMIN)");
  console.log("=".repeat(50));
  console.log("");

  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "QUEUE_ID"]);
  printConfig();

  // Get keypair
  const keypair = getKeypair();
  const address = keypair.getPublicKey().toSuiAddress();
  console.log(`Your address: ${address}`);
  console.log("");

  // First, check if there are actions to process
  console.log("Checking queue state...");
  const queueResponse = await suiClient.getObject({
    id: QUEUE_ID,
    options: { showContent: true },
  });

  if (queueResponse.data?.content?.dataType === "moveObject") {
    const fields = queueResponse.data.content.fields as Record<string, unknown>;
    const actions = fields.actions as unknown[];
    const admin = fields.admin as string;

    console.log(`  Queue length: ${actions?.length ?? 0}`);
    console.log(`  Admin: ${admin}`);

    if (address !== admin) {
      console.error("");
      console.error("Error: You are not the admin of this queue");
      console.error(`  Your address: ${address}`);
      console.error(`  Admin address: ${admin}`);
      process.exit(1);
    }

    if (!actions || actions.length === 0) {
      console.log("");
      console.log("Queue is empty - nothing to process");
      process.exit(0);
    }

    // Show next action
    const nextAction = actions[0] as Record<string, unknown>;
    console.log("");
    console.log("Next action to process:");
    console.log(
      `  Action: ${(nextAction.fields as Record<string, unknown>)?.action_name}`,
    );
    console.log(
      `  From: ${(nextAction.fields as Record<string, unknown>)?.sender}`,
    );
    console.log(
      `  Priority: ${
        (nextAction.fields as Record<string, unknown>)?.is_priority
      }`,
    );
  }

  console.log("");

  // Build the transaction
  console.log("Building transaction...");
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::multiplayer_queue::process_action`,
    arguments: [tx.object(QUEUE_ID), tx.object(SUI_CLOCK_OBJECT_ID)],
  });

  // Execute the transaction
  console.log("Sending transaction...");
  try {
    const result = await suiClient.signAndExecuteTransaction({
      transaction: tx,
      signer: keypair,
      options: {
        showEffects: true,
        showEvents: true,
      },
    });

    console.log("");
    console.log("Transaction successful!");
    console.log(`  Digest: ${result.digest}`);
    console.log(`  Status: ${result.effects?.status.status}`);

    // Show events
    if (result.events && result.events.length > 0) {
      console.log("");
      console.log("Events:");
      result.events.forEach((event, i) => {
        const eventType = event.type.split("::").pop();
        console.log(`  ${i + 1}. ${eventType}`);
        if (event.parsedJson) {
          const data = event.parsedJson as Record<string, unknown>;
          if (eventType === "ActionProcessed") {
            console.log(`     Action: ${data.action_name}`);
            console.log(`     Wait time: ${Number(data.wait_time_ms) / 1000}s`);
            console.log(`     Remaining: ${data.remaining_in_queue}`);
          }
        }
      });
    }
  } catch (error) {
    console.error("");
    console.error("Transaction failed!");

    const errorMsg = (error as Error).message;
    if (errorMsg.includes("ENotAdmin")) {
      console.error("  Error: You are not the admin of this queue");
    } else if (errorMsg.includes("EQueueEmpty")) {
      console.error("  Error: Queue is empty");
    } else {
      console.error(`  Error: ${errorMsg}`);
    }
    process.exit(1);
  }

  console.log("");
  console.log("=".repeat(50));
}

main().catch(console.error);
