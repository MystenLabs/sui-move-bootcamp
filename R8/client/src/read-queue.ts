/**
 * Read the robot's action queue.
 *
 * This script demonstrates:
 * - Reading shared object state
 * - Parsing Move vector data
 * - Displaying queue contents
 *
 * Usage:
 *   pnpm read-queue
 */

import {
  ROBOT_ID,
  formatAddress,
  printConfig,
  suiClient,
  validateConfig,
} from "./config";

async function main() {
  console.log("=".repeat(50));
  console.log("READ ROBOT QUEUE");
  console.log("=".repeat(50));
  console.log("");

  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "ROBOT_ID"]);
  printConfig();

  // ============================================
  // Fetch the RobotPet object
  // ============================================

  console.log("Fetching robot state...");
  console.log("");

  const response = await suiClient.getObject({
    objectId: ROBOT_ID,
    include: { json: true },
  });

  const fields = response.object.json as any;

  if (!fields) {
    console.log("Error: Could not read robot state");
    process.exit(1);
  }

  // ============================================
  // Display robot info
  // ============================================

  console.log("Robot Info");
  console.log("-".repeat(40));
  console.log(`  Name: ${fields.name}`);
  console.log(`  Admin: ${formatAddress(fields.admin)}`);
  console.log(`  Total Queued: ${fields.total_actions_queued}`);
  console.log(`  Total Processed: ${fields.total_actions_processed}`);
  console.log(`  COOKIEs Collected: ${fields.total_cookies_collected}`);
  console.log("");

  // ============================================
  // Display queue contents
  // ============================================

  const queue = fields.action_queue as any[];

  console.log("Action Queue");
  console.log("-".repeat(40));

  if (!queue || queue.length === 0) {
    console.log("  (empty)");
  } else {
    console.log(`  ${queue.length} pending action(s):`);
    console.log("");

    queue.forEach((action: any, index: number) => {
      const timestamp = new Date(parseInt(action.fields.timestamp));
      console.log(`  ${index + 1}. ${action.fields.action_name}`);
      console.log(`     From: ${formatAddress(action.fields.sender)}`);
      console.log(`     Time: ${timestamp.toLocaleString()}`);
      console.log("");
    });
  }

  console.log("=".repeat(50));
}

main().catch(console.error);
