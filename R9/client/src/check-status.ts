/**
 * Check queue status and user statistics.
 *
 * This script demonstrates:
 * - Reading shared object state
 * - Parsing Move struct data
 * - Reading Table entries (user stats)
 *
 * Usage:
 *   pnpm check-status
 *   pnpm check-status [address]
 */

import {
  getKeypair,
  printConfig,
  QUEUE_ID,
  suiClient,
  validateConfig,
} from "./config";

interface QueuedAction {
  action_name: string;
  sender: string;
  timestamp: string;
  is_priority: boolean;
  original_position: string;
}

async function main(): Promise<void> {
  console.log("=".repeat(50));
  console.log("CHECK QUEUE STATUS");
  console.log("=".repeat(50));
  console.log("");

  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "QUEUE_ID"]);
  printConfig();

  // Get address to check
  let address: string;
  if (process.argv[2]) {
    address = process.argv[2];
  } else {
    try {
      const keypair = getKeypair();
      address = keypair.getPublicKey().toSuiAddress();
    } catch {
      address = "";
    }
  }

  // ============================================
  // 1. Get Queue State
  // ============================================

  console.log("1. Queue State");
  console.log("-".repeat(30));

  const queueResponse = await suiClient.getObject({
    objectId: QUEUE_ID,
    include: { json: true },
  });

  const fields = queueResponse.object.json as Record<string, unknown> | null;

  if (fields) {
    console.log(`   Name: ${fields.name}`);
    console.log(
      `   Queue Length: ${(fields.actions as unknown[])?.length ?? 0}`,
    );
    console.log(`   Unique Users: ${fields.unique_users}`);
    console.log(`   Total Queued: ${fields.total_queued}`);
    console.log(`   Total Processed: ${fields.total_processed}`);
    console.log(`   Max Pending/User: ${fields.max_pending_per_user}`);
    console.log(`   Cooldown: ${Number(fields.cooldown_ms) / 1000}s`);
    console.log(`   Admin: ${fields.admin}`);
    console.log(`   Paused: ${fields.is_paused}`);

    // ============================================
    // 2. Pending Actions
    // ============================================

    console.log("");
    console.log("2. Pending Actions");
    console.log("-".repeat(30));

    const actions = fields.actions as QueuedAction[] | null;
    if (!actions || actions.length === 0) {
      console.log("   Queue is empty");
    } else {
      actions.forEach((a, i) => {
        const sender = a.sender.slice(0, 10) + "...";
        const priority = a.is_priority ? " [PRIORITY]" : "";
        console.log(`   ${i + 1}. ${a.action_name} by ${sender}${priority}`);
      });
    }

    // ============================================
    // 3. User Statistics
    // ============================================

    if (address) {
      console.log("");
      console.log("3. Your Statistics");
      console.log("-".repeat(30));
      console.log(`   Address: ${address}`);

      // Count pending actions for this user
      const pendingCount =
        actions?.filter((a) => a.sender === address).length ?? 0;

      console.log(`   Pending Actions: ${pendingCount}`);

      // Note: To get full user stats, we would need to query the Table
      // which requires knowing the dynamic field ID. For simplicity,
      // we calculate from the actions list.
      console.log(`   (Full stats require Table lookup)`);
    }

    // ============================================
    // 4. Queue Analytics
    // ============================================

    console.log("");
    console.log("4. Queue Analytics");
    console.log("-".repeat(30));

    const totalQueued = Number(fields.total_queued);
    const totalProcessed = Number(fields.total_processed);
    const uniqueUsers = Number(fields.unique_users);

    if (totalQueued > 0) {
      const avgActionsPerUser = (totalQueued / uniqueUsers).toFixed(2);
      const processRate = ((totalProcessed / totalQueued) * 100).toFixed(1);

      console.log(`   Avg Actions/User: ${avgActionsPerUser}`);
      console.log(`   Process Rate: ${processRate}%`);
    } else {
      console.log("   No actions queued yet");
    }

    // Priority action count
    const priorityCount = actions?.filter((a) => a.is_priority).length ?? 0;
    if (actions && actions.length > 0) {
      const priorityPercent = ((priorityCount / actions.length) * 100).toFixed(
        1,
      );
      console.log(
        `   Priority Actions: ${priorityCount} (${priorityPercent}%)`,
      );
    }
  } else {
    console.error("Failed to fetch queue state");
  }

  console.log("");
  console.log("=".repeat(50));
}

main().catch(console.error);
