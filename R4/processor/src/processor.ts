/**
 * Blockchain Robot Processor
 *
 * The main loop that bridges blockchain and physical robot:
 * 1. Poll blockchain for pending actions
 * 2. If action found, execute on robot via serial
 * 3. Mark action as processed on blockchain
 * 4. Repeat
 *
 * This is the "magic" that makes blockchain control a physical robot!
 */

import { popAction, readQueue } from "./blockchain";
import { getCommand, getSupportedActions } from "./commands";
import {
  ACTION_DELAY_MS,
  DEBUG,
  POLL_INTERVAL_MS,
  printConfig,
} from "./config";
import { connect, disconnect, isConnected, sendCommand } from "./serial";

// ============================================
// PROCESSOR STATE
// ============================================

let isRunning = false;
let actionsProcessed = 0;
let lastError: string | null = null;

// ============================================
// MAIN PROCESSING LOOP
// ============================================

async function processNextAction(): Promise<boolean> {
  // Read queue state
  const state = await readQueue();

  if (state.actions.length === 0) {
    if (DEBUG) console.log("Queue empty, waiting...");
    return false;
  }

  // Get the next action
  const action = state.actions[0];
  console.log(`\nProcessing action: "${action.name}"`);
  console.log(`  From: ${action.sender.slice(0, 10)}...`);
  console.log(`  Queue depth: ${state.actions.length}`);

  // Map to Bittle command
  const command = getCommand(action.name);

  if (!command) {
    console.log(`  Unknown action "${action.name}", skipping...`);
    console.log(`  Supported actions: ${getSupportedActions().join(", ")}`);

    // Still pop it from the queue to avoid blocking
    await popAction();
    return true;
  }

  // Execute on robot
  console.log(`  Executing: ${command.code} (${command.description})`);

  try {
    if (isConnected()) {
      await sendCommand(command);
      console.log(`  Done! (${command.duration}ms)`);
    } else {
      console.log(`  [SIMULATED] Robot not connected`);
      // Wait anyway to simulate execution
      await new Promise((r) => setTimeout(r, command.duration));
    }
  } catch (err) {
    console.error(`  Error executing command:`, err);
  }

  // Pop from blockchain queue
  console.log(`  Marking as processed on blockchain...`);
  await popAction();

  actionsProcessed++;
  return true;
}

async function pollLoop() {
  console.log("\nStarting processor loop...");
  console.log(`Polling every ${POLL_INTERVAL_MS / 1000} seconds`);
  console.log("Press Ctrl+C to stop\n");

  while (isRunning) {
    try {
      const processed = await processNextAction();

      // If we processed something, check again quickly
      // Otherwise, wait for the poll interval
      if (processed) {
        await new Promise((r) => setTimeout(r, ACTION_DELAY_MS));
      } else {
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      }

      lastError = null;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message !== lastError) {
        console.error("Error in processing loop:", message);
        lastError = message;
      }

      // Wait before retrying on error
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    }
  }
}

// ============================================
// STARTUP & SHUTDOWN
// ============================================

async function start() {
  console.log("=".repeat(50));
  console.log("BLOCKCHAIN ROBOT PROCESSOR");
  console.log("=".repeat(50));
  console.log();

  printConfig();
  console.log();

  // Try to connect to robot
  const connected = await connect();

  if (!connected) {
    console.log("\nWarning: Robot not connected!");
    console.log(
      "Running in simulation mode (commands will be logged but not executed)",
    );
    console.log("Connect your robot and restart to control it.\n");
  }

  // Check initial queue state
  try {
    const state = await readQueue();
    console.log(`\nQueue state:`);
    console.log(`  Pending actions: ${state.actions.length}`);
    console.log(`  Total added: ${state.totalAdded}`);
    console.log(`  Total processed: ${state.totalProcessed}`);

    if (state.actions.length > 0) {
      console.log(`\nNext action: "${state.actions[0].name}"`);
    }
  } catch (error) {
    console.error("Error reading queue:", error);
    process.exit(1);
  }

  // Start processing
  isRunning = true;
  await pollLoop();
}

async function shutdown() {
  console.log("\n\nShutting down...");
  isRunning = false;

  await disconnect();

  console.log(`\nSession summary:`);
  console.log(`  Actions processed: ${actionsProcessed}`);
  console.log("Goodbye!");

  process.exit(0);
}

// Handle Ctrl+C
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// ============================================
// RUN
// ============================================

start().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
