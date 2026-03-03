/**
 * Add Action - Add a new action to the queue
 *
 * This script demonstrates:
 * - Passing arguments to Move functions
 * - Using the Sui Clock object
 * - Reading command-line arguments
 *
 * Usage:
 *   pnpm add-action sit
 *   pnpm add-action walk_forward
 *   pnpm add-action wave
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  keypair,
  requirePackageAddress,
  requireQueueId,
  suiClient,
} from "./config";

// List of valid actions (for validation)
const VALID_ACTIONS = [
  "sit",
  "stand",
  "balance",
  "walk_forward",
  "walk_backward",
  "walk_left",
  "walk_right",
  "wave",
  "jump",
  "push_up",
  "play_dead",
];

async function main() {
  const packageAddress = requirePackageAddress();
  const queueId = requireQueueId();

  // Get action from command line
  const actionName = process.argv[2];

  if (!actionName) {
    console.log("Usage: pnpm add-action <action_name>");
    console.log("\nAvailable actions:");
    VALID_ACTIONS.forEach((a) => console.log(`  - ${a}`));
    process.exit(1);
  }

  console.log(`\n=== Adding Action: ${actionName} ===\n`);

  // ============================================
  // BUILD TRANSACTION
  // ============================================

  const tx = new Transaction();

  // Call add_action with:
  // 1. queue: &mut ActionQueue (shared object)
  // 2. action_name: String
  // 3. clock: &Clock (system object)
  tx.moveCall({
    target: `${packageAddress}::robot_queue::add_action`,
    arguments: [
      // Reference to the shared queue object
      tx.object(queueId),
      // The action name as a string
      tx.pure.string(actionName),
      // Sui's system clock (always at address 0x6)
      tx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  // ============================================
  // EXECUTE
  // ============================================

  console.log("Sending transaction...");

  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: keypair,
    options: {
      showEvents: true,
    },
  });

  console.log(`\nSuccess! Digest: ${result.digest}`);

  // Show the event
  const addedEvent = result.events?.find((e) => e.type.includes("ActionAdded"));

  if (addedEvent) {
    const data = addedEvent.parsedJson as {
      action_name: string;
      sender: string;
      queue_length: string;
    };
    console.log(`\nAction added to queue:`);
    console.log(`  Action: ${data.action_name}`);
    console.log(`  Sender: ${data.sender}`);
    console.log(`  Queue length: ${data.queue_length}`);
  }
}

main().catch(console.error);
