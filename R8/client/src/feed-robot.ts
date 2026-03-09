/**
 * Feed the robot to queue an action.
 *
 * This script demonstrates:
 * - Finding and using owned Coin objects
 * - Splitting coins for exact payment
 * - The pay-per-action model
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
  getKeypair,
  MINT_CAP_ID,
  PACKAGE_ADDRESS,
  printConfig,
  ROBOT_ID,
  suiClient,
  validateConfig,
} from "./config";

// Valid action names (must match contract)
const VALID_ACTIONS = [
  "sit",
  "stand",
  "wave",
  "walk_forward",
  "walk_backward",
  "jump",
  "balance",
  "rest",
  "push_up",
  "play_dead",
];

async function main() {
  console.log("=".repeat(50));
  console.log("FEED ROBOT (Queue Action)");
  console.log("=".repeat(50));
  console.log("");

  // Get action from argument
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

  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "ROBOT_ID", "MINT_CAP_ID", "USER_PHRASE"]);
  printConfig();

  // Get keypair
  const keypair = getKeypair();
  const address = keypair.getPublicKey().toSuiAddress();
  console.log(`Your address: ${address}`);
  console.log(`Action: ${actionName}`);
  console.log("");

  // ============================================
  // 1. Find COOKIE coins to pay with
  // ============================================

  console.log("Checking your COOKIE balance...");

  const coins = await suiClient.listCoins({
    owner: address,
    coinType: `${PACKAGE_ADDRESS}::cookie::COOKIE`,
  });

  const totalBalance = coins.objects.reduce(
    (sum, coin) => sum + BigInt(coin.balance),
    BigInt(0),
  );

  console.log(`  Balance: ${totalBalance} COOKIE`);

  if (totalBalance < 1n) {
    console.log("");
    console.log("Error: You need at least 1 COOKIE to feed the robot!");
    console.log("Run `pnpm request-cookies` to get some from the faucet.");
    process.exit(1);
  }

  console.log("");

  // ============================================
  // 2. Build the transaction
  // ============================================

  console.log("Building transaction...");
  const tx = new Transaction();

  /**
   * Get a coin to pay with.
   *
   * We need exactly 1 COOKIE. If the user's coin has more,
   * we'll split off exactly 1 COOKIE.
   *
   * The Transaction API handles this automatically with tx.splitCoins.
   */

  // Find a coin with enough balance
  const paymentCoin = coins.objects.find((c) => BigInt(c.balance) >= 1n);

  if (!paymentCoin) {
    console.log("Error: No coin with sufficient balance found.");
    process.exit(1);
  }

  // Split exactly 1 COOKIE from the coin
  // This creates a new coin object with exactly 1 COOKIE
  const [payment] = tx.splitCoins(tx.object(paymentCoin.objectId), [
    tx.pure.u64(1), // Split off exactly 1 COOKIE
  ]);

  /**
   * Call robot_pet::feed
   *
   * Parameters:
   * 1. robot: The shared RobotPet object
   * 2. mint_cap: The shared MintCap (for proper token burning)
   * 3. payment: A Coin<COOKIE> with exactly 1 COOKIE
   * 4. action_name: The action to queue (as a String)
   * 5. clock: The Sui system clock
   */
  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::robot_pet::feed`,
    arguments: [
      tx.object(ROBOT_ID), // RobotPet (shared, mutable)
      tx.object(MINT_CAP_ID), // MintCap (shared, for burning)
      payment, // Payment coin (will be consumed/burned)
      tx.pure.string(actionName), // Action name
      tx.object(SUI_CLOCK_OBJECT_ID), // Clock
    ],
  });

  // ============================================
  // 3. Execute the transaction
  // ============================================

  console.log("Sending transaction...");
  const result = await executeTransaction(tx, keypair);

  console.log("");
  console.log("Transaction successful!");
  console.log(`  Digest: ${result.digest}`);
  console.log(`  Status: ${result.status.success ? "success" : "failure"}`);

  // Show the ActionQueued event
  const queuedEvent = result.events?.find((e) =>
    e.eventType.includes("::ActionQueued"),
  );

  if (queuedEvent) {
    const data = queuedEvent.json as any;
    console.log("");
    console.log("Action queued!");
    console.log(`  Action: ${data.action_name}`);
    console.log(`  Position: ${data.queue_position}`);
  }

  // Wait for the transaction to be fully committed before querying balance
  await suiClient.waitForTransaction({
    digest: result.digest,
  });

  // Show remaining balance
  const newCoins = await suiClient.listCoins({
    owner: address,
    coinType: `${PACKAGE_ADDRESS}::cookie::COOKIE`,
  });

  const newBalance = newCoins.objects.reduce(
    (sum, coin) => sum + BigInt(coin.balance),
    BigInt(0),
  );

  console.log("");
  console.log(`Remaining balance: ${newBalance} COOKIE`);
  console.log("");
  console.log("=".repeat(50));
}

main().catch(console.error);
