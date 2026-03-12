/**
 * Read Queue - View the current state of the action queue
 *
 * This script demonstrates:
 * - Reading object data from the blockchain
 * - Parsing Move struct data in TypeScript
 * - No transaction needed (read-only)
 */

import { requireQueueId, suiClient } from "./config";

// Type definition matching our Move struct
interface ActionQueueData {
  id: { id: string };
  actions: Array<{
    name: string;
    sender: string;
    timestamp: string;
  }>;
  total_actions_added: string;
  total_actions_processed: string;
  admin: string;
}

async function main() {
  const queueId = requireQueueId();

  console.log("\n=== Reading Action Queue ===\n");

  // ============================================
  // FETCH OBJECT DATA
  // ============================================

  // Get the object from the blockchain
  const response = await suiClient.getObject({
    objectId: queueId,
    include: { json: true },
  });

  // ============================================
  // PARSE THE DATA
  // ============================================

  const queueData = response.object.json as ActionQueueData | null;

  if (!queueData) {
    console.error("Queue not found");
    process.exit(1);
  }

  // ============================================
  // DISPLAY RESULTS
  // ============================================

  console.log(`Queue ID: ${queueId}`);
  console.log(`Admin: ${queueData.admin}`);
  console.log(`\nStatistics:`);
  console.log(`  Total added: ${queueData.total_actions_added}`);
  console.log(`  Total processed: ${queueData.total_actions_processed}`);
  console.log(`  Pending: ${queueData.actions.length}`);

  if (queueData.actions.length > 0) {
    console.log(`\nPending Actions:`);
    console.log("-".repeat(60));

    queueData.actions.forEach((action, index) => {
      const timestamp = new Date(parseInt(action.timestamp)).toISOString();
      console.log(`  ${index + 1}. ${action.name}`);
      console.log(`     From: ${action.sender.slice(0, 10)}...`);
      console.log(`     Time: ${timestamp}`);
    });
  } else {
    console.log("\nQueue is empty - no pending actions");
  }
}

main().catch(console.error);
