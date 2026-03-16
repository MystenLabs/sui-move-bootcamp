/**
 * Feed the robot to queue an action.
 *
 * Usage:
 *   pnpm feed-robot wave
 *   pnpm feed-robot sit
 *   pnpm feed-robot walk_forward
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  executeTransaction,
  getTreatBalance,
  getTreatCoins,
  getUserKeypair,
  PACKAGE_ADDRESS,
  ROBOT_PET_ID,
  validateConfig,
} from "./config";

const VALID_ACTIONS = [
  "sit",
  "stand",
  "wave",
  "walk_forward",
  "walk_backward",
  "turn_left",
  "turn_right",
  "jump",
  "balance",
  "rest",
  "push_up",
  "play_dead",
  "stretch",
  "greeting",
  "sniff",
  "pee",
];

async function main() {
  const actionName = process.argv[2];

  if (!actionName) {
    console.log("Usage: pnpm feed-robot <action>");
    console.log("");
    console.log("Valid actions:");
    VALID_ACTIONS.forEach((a) => console.log(`  - ${a}`));
    process.exit(1);
  }

  if (!VALID_ACTIONS.includes(actionName)) {
    console.log(`Error: "${actionName}" is not a valid action.`);
    console.log("");
    console.log("Valid actions:");
    VALID_ACTIONS.forEach((a) => console.log(`  - ${a}`));
    process.exit(1);
  }

  validateConfig(["PACKAGE_ADDRESS", "ROBOT_PET_ID"]);

  const keypair = getUserKeypair();
  const address = keypair.toSuiAddress();

  console.log("=== Feed Robot (Queue Action) ===");
  console.log(`Address: ${address}`);
  console.log(`Action: ${actionName}`);
  console.log("");

  // Check TREAT balance
  const coins = await getTreatCoins(address);
  const totalBalance = coins.reduce(
    (sum, coin) => sum + BigInt(coin.balance),
    0n,
  );

  console.log(`TREAT balance: ${totalBalance}`);

  if (totalBalance < 1n) {
    console.error(
      "\nInsufficient TREAT tokens. Run `pnpm request-treats` first.",
    );
    process.exit(1);
  }

  // Find a coin with enough balance
  const paymentCoin = coins.find((c) => BigInt(c.balance) >= 1n);
  if (!paymentCoin) {
    console.error("No coin with sufficient balance found.");
    process.exit(1);
  }

  // Build transaction
  const tx = new Transaction();

  // Split exactly 1 TREAT for the action
  const [payment] = tx.splitCoins(tx.object(paymentCoin.objectId), [
    tx.pure.u64(1),
  ]);

  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::robot_pet::feed`,
    arguments: [
      tx.object(ROBOT_PET_ID),
      payment,
      tx.pure.string(actionName),
      tx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  console.log("\nSending transaction...");

  try {
    const result = await executeTransaction(tx, keypair);

    console.log("\n=== Success! ===");
    console.log(`Transaction: ${result.digest}`);

    const queuedEvent = result.events?.find((e) =>
      e.eventType.includes("::ActionQueued"),
    );

    if (queuedEvent) {
      const data = queuedEvent.json as any;
      console.log(`Action: ${data.action_name}`);
      console.log(`Queue position: ${data.queue_position}`);
    }

    const balanceAfter = await getTreatBalance(address);
    console.log(`Balance after: ${balanceAfter} TREAT`);
  } catch (error: any) {
    console.error("\nTransaction failed:", error.message);
    process.exit(1);
  }
}

main();
