/**
 * Demo: Full multiplayer queue workflow.
 *
 * This script demonstrates the complete flow:
 * 1. Check current queue status
 * 2. Queue an action
 * 3. Check updated status
 * 4. Process the action (if admin)
 * 5. Show final status
 *
 * Usage:
 *   pnpm demo
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  getKeypair,
  PACKAGE_ADDRESS,
  printConfig,
  QUEUE_ID,
  suiClient,
  VALID_ACTIONS,
  validateConfig,
} from "./config";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main(): Promise<void> {
  console.log("=".repeat(50));
  console.log("MULTIPLAYER QUEUE DEMO");
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

  // ============================================
  // Step 1: Check Initial Status
  // ============================================

  console.log("Step 1: Initial Queue Status");
  console.log("-".repeat(40));

  const initialState = await getQueueState();
  console.log(`  Queue length: ${initialState.queueLength}`);
  console.log(`  Total queued: ${initialState.totalQueued}`);
  console.log(`  Total processed: ${initialState.totalProcessed}`);
  console.log(`  Is admin: ${address === initialState.admin}`);
  console.log("");

  // ============================================
  // Step 2: Queue an Action
  // ============================================

  console.log("Step 2: Queue an Action");
  console.log("-".repeat(40));

  // Pick a random action
  const randomAction =
    VALID_ACTIONS[Math.floor(Math.random() * VALID_ACTIONS.length)];
  console.log(`  Selected action: ${randomAction}`);

  try {
    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ADDRESS}::multiplayer_queue::queue_action`,
      arguments: [
        tx.object(QUEUE_ID),
        tx.pure.string(randomAction),
        tx.object(SUI_CLOCK_OBJECT_ID),
      ],
    });

    const result = await suiClient.signAndExecuteTransaction({
      transaction: tx,
      signer: keypair,
      options: { showEffects: true, showEvents: true },
    });

    console.log(`  Transaction: ${result.digest}`);
    console.log(`  Status: ${result.effects?.status.status}`);

    // Parse events
    const queuedEvent = result.events?.find((e) =>
      e.type.includes("ActionQueued"),
    );
    if (queuedEvent?.parsedJson) {
      const data = queuedEvent.parsedJson as Record<string, unknown>;
      console.log(`  Position in queue: ${data.position}`);
      console.log(`  New queue length: ${data.queue_length}`);
    }
  } catch (error) {
    const msg = (error as Error).message;
    if (msg.includes("EInCooldown")) {
      console.log("  Skipping - in cooldown period");
    } else if (msg.includes("ETooManyPending")) {
      console.log("  Skipping - too many pending actions");
    } else {
      console.error(`  Error: ${msg}`);
    }
  }

  console.log("");
  await sleep(1000); // Wait for state to update

  // ============================================
  // Step 3: Check Updated Status
  // ============================================

  console.log("Step 3: Updated Queue Status");
  console.log("-".repeat(40));

  const updatedState = await getQueueState();
  console.log(`  Queue length: ${updatedState.queueLength}`);
  console.log(`  Total queued: ${updatedState.totalQueued}`);
  console.log(`  Total processed: ${updatedState.totalProcessed}`);
  console.log("");

  // ============================================
  // Step 4: Process Action (Admin Only)
  // ============================================

  if (address === updatedState.admin && updatedState.queueLength > 0) {
    console.log("Step 4: Process Action (Admin)");
    console.log("-".repeat(40));

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ADDRESS}::multiplayer_queue::process_action`,
      arguments: [tx.object(QUEUE_ID), tx.object(SUI_CLOCK_OBJECT_ID)],
    });

    const result = await suiClient.signAndExecuteTransaction({
      transaction: tx,
      signer: keypair,
      options: { showEffects: true, showEvents: true },
    });

    console.log(`  Transaction: ${result.digest}`);
    console.log(`  Status: ${result.effects?.status.status}`);

    // Parse events
    const processedEvent = result.events?.find((e) =>
      e.type.includes("ActionProcessed"),
    );
    if (processedEvent?.parsedJson) {
      const data = processedEvent.parsedJson as Record<string, unknown>;
      console.log(`  Processed: ${data.action_name}`);
      console.log(`  Wait time: ${Number(data.wait_time_ms) / 1000}s`);
      console.log(`  Remaining: ${data.remaining_in_queue}`);
    }

    console.log("");
    await sleep(1000);
  } else if (address !== updatedState.admin) {
    console.log("Step 4: Process Action");
    console.log("-".repeat(40));
    console.log("  Skipping - you are not the admin");
    console.log("");
  } else {
    console.log("Step 4: Process Action");
    console.log("-".repeat(40));
    console.log("  Skipping - queue is empty");
    console.log("");
  }

  // ============================================
  // Step 5: Final Status
  // ============================================

  console.log("Step 5: Final Queue Status");
  console.log("-".repeat(40));

  const finalState = await getQueueState();
  console.log(`  Queue length: ${finalState.queueLength}`);
  console.log(`  Total queued: ${finalState.totalQueued}`);
  console.log(`  Total processed: ${finalState.totalProcessed}`);
  console.log(`  Unique users: ${finalState.uniqueUsers}`);
  console.log("");

  console.log("=".repeat(50));
  console.log("Demo complete!");
  console.log("=".repeat(50));
}

async function getQueueState(): Promise<{
  queueLength: number;
  totalQueued: number;
  totalProcessed: number;
  uniqueUsers: number;
  admin: string;
  isPaused: boolean;
}> {
  const response = await suiClient.getObject({
    id: QUEUE_ID,
    options: { showContent: true },
  });

  if (response.data?.content?.dataType === "moveObject") {
    const fields = response.data.content.fields as Record<string, unknown>;
    return {
      queueLength: (fields.actions as unknown[])?.length ?? 0,
      totalQueued: Number(fields.total_queued),
      totalProcessed: Number(fields.total_processed),
      uniqueUsers: Number(fields.unique_users),
      admin: fields.admin as string,
      isPaused: fields.is_paused as boolean,
    };
  }

  throw new Error("Failed to fetch queue state");
}

main().catch(console.error);
