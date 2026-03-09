/**
 * Test Blockchain Connection
 *
 * Tests the connection to the Sui blockchain without the robot.
 * Use this to verify your blockchain configuration is correct.
 *
 * Usage:
 *   pnpm test-blockchain
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import { popAction, readQueue } from "./blockchain";
import {
  address,
  executeTransaction,
  keypair,
  PACKAGE_ADDRESS,
  QUEUE_ID,
} from "./config";

async function main() {
  console.log("=== Blockchain Connection Test ===\n");
  console.log(`Package: ${PACKAGE_ADDRESS}`);
  console.log(`Queue: ${QUEUE_ID}`);
  console.log(`Admin: ${address}`);
  console.log();

  // Test 1: Read queue
  console.log("1. Reading queue state...");
  try {
    const state = await readQueue();
    console.log(`   Pending: ${state.actions.length}`);
    console.log(`   Total added: ${state.totalAdded}`);
    console.log(`   Total processed: ${state.totalProcessed}`);

    if (state.actions.length > 0) {
      console.log(`   Next action: "${state.actions[0].name}"`);
    }
    console.log("   Success!\n");
  } catch (error) {
    console.error("   Failed:", error);
    process.exit(1);
  }

  // Test 2: Add a test action
  console.log("2. Adding test action...");
  try {
    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ADDRESS}::robot_queue::add_action`,
      arguments: [
        tx.object(QUEUE_ID),
        tx.pure.string("wave"),
        tx.object(SUI_CLOCK_OBJECT_ID),
      ],
    });

    const result = await executeTransaction(tx, keypair);

    console.log(`   Transaction: ${result.digest}`);
    console.log("   Success!\n");
  } catch (error) {
    console.error("   Failed:", error);
    process.exit(1);
  }

  // Test 3: Read updated queue
  console.log("3. Reading updated queue...");
  try {
    const state = await readQueue();
    console.log(`   Pending: ${state.actions.length}`);
    if (state.actions.length > 0) {
      console.log(`   Actions: ${state.actions.map((a) => a.name).join(", ")}`);
    }
    console.log("   Success!\n");
  } catch (error) {
    console.error("   Failed:", error);
    process.exit(1);
  }

  // Test 4: Pop action
  console.log("4. Popping action...");
  try {
    const popped = await popAction();
    console.log(`   Popped: "${popped}"`);
    console.log("   Success!\n");
  } catch (error) {
    console.error("   Failed:", error);
    process.exit(1);
  }

  console.log("=== All tests passed! ===");
}

main().catch(console.error);
