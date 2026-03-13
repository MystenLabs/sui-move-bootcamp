/**
 * Queue an action in the multiplayer queue.
 *
 * This script demonstrates:
 * - Calling Move functions with multiple shared objects
 * - Using the Clock object for time-based logic
 * - Handling rate limits and cooldowns
 *
 * Usage:
 *   pnpm queue-action wave
 *   pnpm queue-action sit --priority
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  executeTransaction,
  getKeypair,
  isValidAction,
  PACKAGE_ADDRESS,
  printConfig,
  QUEUE_ID,
  VALID_ACTIONS,
  validateConfig,
} from "./config";

async function main(): Promise<void> {
  console.log("=".repeat(50));
  console.log("QUEUE ACTION");
  console.log("=".repeat(50));
  console.log("");

  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "QUEUE_ID"]);
  printConfig();

  // Get action from command line
  const actionArg = process.argv[2];
  const isPriority = process.argv.includes("--priority");

  if (!actionArg) {
    console.log("Usage: pnpm queue-action <action> [--priority]");
    console.log("");
    console.log("Available actions:");
    VALID_ACTIONS.forEach((action) => console.log(`  - ${action}`));
    process.exit(1);
  }

  if (!isValidAction(actionArg)) {
    console.error(`Invalid action: ${actionArg}`);
    console.log("");
    console.log("Available actions:");
    VALID_ACTIONS.forEach((action) => console.log(`  - ${action}`));
    process.exit(1);
  }

  // Get keypair
  const keypair = getKeypair();
  const address = keypair.getPublicKey().toSuiAddress();
  console.log(`Your address: ${address}`);
  console.log(`Action: ${actionArg}`);
  console.log(`Priority: ${isPriority}`);
  console.log("");

  // Build the transaction
  console.log("Building transaction...");
  const tx = new Transaction();

  const functionName = isPriority ? "queue_priority_action" : "queue_action";

  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::multiplayer_queue::${functionName}`,
    arguments: [
      tx.object(QUEUE_ID),
      tx.pure.string(actionArg),
      tx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  // Execute the transaction
  console.log("Sending transaction...");
  try {
    const result = await executeTransaction(tx, keypair);

    console.log("");
    console.log("Transaction successful!");
    console.log(`  Digest: ${result.digest}`);
    console.log(`  Status: ${result.status.success ? "success" : "failure"}`);

    // Show events
    if (result.events && result.events.length > 0) {
      console.log("");
      console.log("Events:");
      result.events.forEach((event, i) => {
        const eventType = event.eventType.split("::").pop();
        console.log(`  ${i + 1}. ${eventType}`);
        if (event.json) {
          const data = event.json as Record<string, unknown>;
          if (data.queue_length) {
            console.log(`     Queue length: ${data.queue_length}`);
          }
          if (data.pending_count !== undefined) {
            console.log(`     Your pending: ${data.pending_count}`);
          }
          if (data.cooldown_remaining_ms !== undefined) {
            const cooldown = Number(data.cooldown_remaining_ms) / 1000;
            console.log(`     Cooldown: ${cooldown}s`);
          }
        }
      });
    }
  } catch (error) {
    console.error("");
    console.error("Transaction failed!");

    // Parse error message for user-friendly output
    const errorMsg = (error as Error).message;
    if (errorMsg.includes("ETooManyPending")) {
      console.error("  Error: You have too many pending actions");
      console.error(
        "  Wait for some actions to be processed before queueing more",
      );
    } else if (errorMsg.includes("EInCooldown")) {
      console.error("  Error: You are in cooldown period");
      console.error(
        "  Wait for the cooldown to expire before queueing another action",
      );
    } else if (errorMsg.includes("EInvalidAction")) {
      console.error(`  Error: Invalid action name: ${actionArg}`);
    } else {
      console.error(`  Error: ${errorMsg}`);
    }
    process.exit(1);
  }

  console.log("");
  console.log("=".repeat(50));
}

main().catch(console.error);
