/**
 * Blockchain Communication - Read from and write to the Sui blockchain
 *
 * This module handles all blockchain interactions.
 */

import { Transaction } from "@mysten/sui/transactions";
import {
  DEBUG,
  executeTransaction,
  keypair,
  PACKAGE_ADDRESS,
  QUEUE_ID,
  suiClient,
} from "./config";

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface QueuedAction {
  name: string;
  sender: string;
  timestamp: number;
}

export interface QueueState {
  actions: QueuedAction[];
  totalAdded: number;
  totalProcessed: number;
}

// ============================================
// READ QUEUE
// ============================================

/**
 * Read the current state of the action queue from blockchain
 */
export async function readQueue(): Promise<QueueState> {
  const response = await suiClient.getObject({
    objectId: QUEUE_ID,
    include: { json: true },
  });
  const fields = response.object.json as any;
  if (!fields) {
    throw new Error("Failed to read queue from blockchain");
  }

  // Parse actions from the blockchain format
  const actions: QueuedAction[] = (fields.actions || []).map((action: any) => ({
    name: action.name || action.fields?.name || "",
    sender: action.sender || action.fields?.sender || "",
    timestamp: parseInt(action.timestamp || action.fields?.timestamp || "0"),
  }));

  return {
    actions,
    totalAdded: parseInt(fields.total_actions_added || "0"),
    totalProcessed: parseInt(fields.total_actions_processed || "0"),
  };
}

/**
 * Get the next action from the queue (without removing it)
 */
export async function peekNextAction(): Promise<QueuedAction | null> {
  const state = await readQueue();
  return state.actions.length > 0 ? state.actions[0] : null;
}

// ============================================
// POP ACTION
// ============================================

/**
 * Remove the next action from the queue (after executing it)
 */
export async function popAction(): Promise<string | null> {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::robot_queue::pop_action`,
    arguments: [tx.object(QUEUE_ID)],
  });

  try {
    const result = await executeTransaction(tx, keypair, { events: true });

    // Find the processed action from events
    const event = result.events?.find((e) =>
      e.eventType.includes("ActionProcessed"),
    );

    if (event) {
      const data = event.json as { action_name: string };
      return data.action_name;
    }

    return null;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);

    if (message.includes("EQueueEmpty")) {
      if (DEBUG) console.log("Queue is empty");
      return null;
    }

    throw error;
  }
}

// ============================================
// HELPERS
// ============================================

/**
 * Get the number of pending actions
 */
export async function getPendingCount(): Promise<number> {
  const state = await readQueue();
  return state.actions.length;
}
