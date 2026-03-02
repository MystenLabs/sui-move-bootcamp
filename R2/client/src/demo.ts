/**
 * Demo - Full workflow demonstration
 *
 * This script shows the complete flow:
 * 1. Read current queue state
 * 2. Add several actions
 * 3. Read updated state
 * 4. Pop actions one by one
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  keypair,
  requirePackageAddress,
  requireQueueId,
  suiClient,
} from "./config";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function readQueue(queueId: string) {
  const response = await suiClient.getObject({
    id: queueId,
    options: { showContent: true },
  });

  if (
    !response.data?.content ||
    response.data.content.dataType !== "moveObject"
  ) {
    throw new Error("Failed to read queue");
  }

  const fields = response.data.content.fields as any;

  // The actions field is a vector, which gets returned as an array
  const actions = fields.actions || [];

  // Extract action names from the action objects
  const actionNames = actions.map((action: any) => {
    // Each action has name, sender, and timestamp fields
    return action.name || action.fields?.name || "";
  });

  return {
    pending: actions.length,
    actions: actionNames,
    totalAdded: parseInt(fields.total_actions_added),
    totalProcessed: parseInt(fields.total_actions_processed),
  };
}

async function addAction(
  packageAddress: string,
  queueId: string,
  actionName: string,
) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${packageAddress}::robot_queue::add_action`,
    arguments: [
      tx.object(queueId),
      tx.pure.string(actionName),
      tx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  await suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: keypair,
  });
}

async function popAction(packageAddress: string, queueId: string) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${packageAddress}::robot_queue::pop_action`,
    arguments: [tx.object(queueId)],
  });

  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: keypair,
    options: { showEvents: true },
  });

  const event = result.events?.find((e) => e.type.includes("ActionProcessed"));
  if (event) {
    const data = event.parsedJson as { action_name: string };
    return data.action_name;
  }
  return null;
}

async function main() {
  const packageAddress = requirePackageAddress();
  const queueId = requireQueueId();

  console.log("\n" + "=".repeat(50));
  console.log("ACTION QUEUE DEMO");
  console.log("=".repeat(50) + "\n");

  // ============================================
  // STEP 1: Read Initial State
  // ============================================

  console.log("1. Reading initial queue state...\n");
  let state = await readQueue(queueId);
  console.log(`   Pending actions: ${state.pending}`);
  console.log(`   Total added: ${state.totalAdded}`);
  console.log(`   Total processed: ${state.totalProcessed}`);

  // ============================================
  // STEP 2: Add Actions
  // ============================================

  const actionsToAdd = ["sit", "wave", "walk_forward", "jump"];

  console.log("\n2. Adding actions to queue...\n");
  for (const action of actionsToAdd) {
    process.stdout.write(`   Adding "${action}"... `);
    await addAction(packageAddress, queueId, action);
    console.log("done");
    await wait(500); // Small delay between transactions
  }

  // ============================================
  // STEP 3: Read Updated State
  // ============================================

  console.log("\n3. Reading updated queue state...\n");
  state = await readQueue(queueId);
  console.log(`   Pending actions: ${state.pending}`);
  console.log(`   Queue contents: [${state.actions.join(", ")}]`);

  // ============================================
  // STEP 4: Process Actions
  // ============================================

  console.log("\n4. Processing actions (FIFO order)...\n");

  while (state.pending > 0) {
    const processed = await popAction(packageAddress, queueId);
    console.log(`   Processed: "${processed}"`);

    // Simulate robot execution time
    await wait(1000);

    state = await readQueue(queueId);
  }

  // ============================================
  // STEP 5: Final State
  // ============================================

  console.log("\n5. Final queue state...\n");
  state = await readQueue(queueId);
  console.log(`   Pending actions: ${state.pending}`);
  console.log(`   Total added: ${state.totalAdded}`);
  console.log(`   Total processed: ${state.totalProcessed}`);

  console.log("\n" + "=".repeat(50));
  console.log("DEMO COMPLETE");
  console.log("=".repeat(50) + "\n");
}

main().catch(console.error);
