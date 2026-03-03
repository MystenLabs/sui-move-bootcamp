/**
 * Complete demo of the tokenomics system.
 *
 * This script runs through the entire flow:
 * 1. Request COOKIE tokens from faucet
 * 2. Check balance
 * 3. Feed the robot (queue actions)
 * 4. Read the queue
 * 5. Pop actions (if admin)
 *
 * Usage:
 *   pnpm demo
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  FAUCET_MANAGER_ID,
  MINT_CAP_ID,
  PACKAGE_ADDRESS,
  ROBOT_ID,
  formatAddress,
  getKeypair,
  printConfig,
  suiClient,
  validateConfig,
} from "./config";

// Helper to wait
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log("=".repeat(60));
  console.log("MODULE 8: TOKENOMICS DEMO");
  console.log("=".repeat(60));
  console.log("");

  // Validate configuration
  validateConfig([
    "PACKAGE_ADDRESS",
    "MINT_CAP_ID",
    "FAUCET_MANAGER_ID",
    "ROBOT_ID",
    "USER_PHRASE",
  ]);
  printConfig();

  const keypair = getKeypair();
  const address = keypair.getPublicKey().toSuiAddress();
  console.log(`Your address: ${address}`);
  console.log("");

  // ============================================
  // STEP 1: Check initial balance
  // ============================================

  console.log("─".repeat(60));
  console.log("STEP 1: Check Initial Balance");
  console.log("─".repeat(60));

  let coins = await suiClient.getCoins({
    owner: address,
    coinType: `${PACKAGE_ADDRESS}::cookie::COOKIE`,
  });

  let balance = coins.data.reduce(
    (sum, coin) => sum + BigInt(coin.balance),
    BigInt(0),
  );

  console.log(`  Current COOKIE balance: ${balance}`);
  console.log("");

  // ============================================
  // STEP 2: Request tokens from faucet
  // ============================================

  console.log("─".repeat(60));
  console.log("STEP 2: Request Tokens from Faucet");
  console.log("─".repeat(60));

  const faucetTx = new Transaction();
  faucetTx.moveCall({
    target: `${PACKAGE_ADDRESS}::faucet::request`,
    arguments: [
      faucetTx.object(FAUCET_MANAGER_ID),
      faucetTx.object(MINT_CAP_ID),
      faucetTx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  console.log("  Requesting 10 COOKIE tokens...");
  const faucetResult = await suiClient.signAndExecuteTransaction({
    transaction: faucetTx,
    signer: keypair,
  });
  console.log(`  Transaction: ${faucetResult.digest}`);

  // Wait a moment for indexer
  await sleep(1000);

  // Check new balance
  coins = await suiClient.getCoins({
    owner: address,
    coinType: `${PACKAGE_ADDRESS}::cookie::COOKIE`,
  });

  balance = coins.data.reduce(
    (sum, coin) => sum + BigInt(coin.balance),
    BigInt(0),
  );

  console.log(`  New COOKIE balance: ${balance}`);
  console.log("");

  // ============================================
  // STEP 3: Read initial queue state
  // ============================================

  console.log("─".repeat(60));
  console.log("STEP 3: Read Initial Queue State");
  console.log("─".repeat(60));

  let robotState = await suiClient.getObject({
    id: ROBOT_ID,
    options: { showContent: true },
  });

  let fields = (robotState.data?.content as any)?.fields;
  let queue = fields?.action_queue || [];

  console.log(`  Robot: ${fields?.name}`);
  console.log(`  Queue length: ${queue.length}`);
  console.log(`  Total actions queued: ${fields?.total_actions_queued}`);
  console.log(`  Total actions processed: ${fields?.total_actions_processed}`);
  console.log("");

  // ============================================
  // STEP 4: Feed the robot (queue actions)
  // ============================================

  console.log("─".repeat(60));
  console.log("STEP 4: Feed the Robot (Queue Actions)");
  console.log("─".repeat(60));

  const actionsToQueue = ["sit", "wave", "jump"];

  for (const actionName of actionsToQueue) {
    // Get a coin for payment
    coins = await suiClient.getCoins({
      owner: address,
      coinType: `${PACKAGE_ADDRESS}::cookie::COOKIE`,
    });

    const paymentCoin = coins.data.find((c) => BigInt(c.balance) >= 1n);
    if (!paymentCoin) {
      console.log("  Error: Not enough COOKIE tokens!");
      break;
    }

    const feedTx = new Transaction();
    const [payment] = feedTx.splitCoins(
      feedTx.object(paymentCoin.coinObjectId),
      [feedTx.pure.u64(1)],
    );

    feedTx.moveCall({
      target: `${PACKAGE_ADDRESS}::robot_pet::feed`,
      arguments: [
        feedTx.object(ROBOT_ID),
        feedTx.object(MINT_CAP_ID),
        payment,
        feedTx.pure.string(actionName),
        feedTx.object(SUI_CLOCK_OBJECT_ID),
      ],
    });

    console.log(`  Queueing "${actionName}"...`);
    const feedResult = await suiClient.signAndExecuteTransaction({
      transaction: feedTx,
      signer: keypair,
      options: { showEvents: true },
    });

    const queuedEvent = feedResult.events?.find((e) =>
      e.type.includes("::ActionQueued"),
    );
    if (queuedEvent) {
      const data = queuedEvent.parsedJson as any;
      console.log(`    → Queued at position ${data.queue_position}`);
    }

    await sleep(500);
  }

  console.log("");

  // ============================================
  // STEP 5: Read updated queue
  // ============================================

  console.log("─".repeat(60));
  console.log("STEP 5: Read Updated Queue");
  console.log("─".repeat(60));

  robotState = await suiClient.getObject({
    id: ROBOT_ID,
    options: { showContent: true },
  });

  fields = (robotState.data?.content as any)?.fields;
  queue = fields?.action_queue || [];

  console.log(`  Queue length: ${queue.length}`);
  if (queue.length > 0) {
    console.log("  Pending actions:");
    queue.forEach((action: any, i: number) => {
      console.log(
        `    ${i + 1}. ${action.fields.action_name} (from ${formatAddress(
          action.fields.sender,
        )})`,
      );
    });
  }
  console.log("");

  // ============================================
  // STEP 6: Process actions (if admin)
  // ============================================

  console.log("─".repeat(60));
  console.log("STEP 6: Process Actions (Admin Only)");
  console.log("─".repeat(60));

  const isAdmin = fields?.admin === address;
  console.log(`  Is admin: ${isAdmin}`);

  if (isAdmin && queue.length > 0) {
    console.log("  Processing all actions...");
    console.log("");

    while (queue.length > 0) {
      const popTx = new Transaction();
      popTx.moveCall({
        target: `${PACKAGE_ADDRESS}::robot_pet::pop_action`,
        arguments: [popTx.object(ROBOT_ID), popTx.object(SUI_CLOCK_OBJECT_ID)],
      });

      const popResult = await suiClient.signAndExecuteTransaction({
        transaction: popTx,
        signer: keypair,
        options: { showEvents: true },
      });

      const processedEvent = popResult.events?.find((e) =>
        e.type.includes("::ActionProcessed"),
      );

      if (processedEvent) {
        const data = processedEvent.parsedJson as any;
        console.log(`  ✓ Processed: ${data.action_name}`);
        console.log(`    → Robot command: k${data.action_name}`);
      }

      // Refresh queue
      robotState = await suiClient.getObject({
        id: ROBOT_ID,
        options: { showContent: true },
      });
      fields = (robotState.data?.content as any)?.fields;
      queue = fields?.action_queue || [];

      await sleep(500);
    }
  } else if (!isAdmin) {
    console.log("  Skipping (not admin)");
  } else {
    console.log("  Queue already empty");
  }

  console.log("");

  // ============================================
  // STEP 7: Final state
  // ============================================

  console.log("─".repeat(60));
  console.log("STEP 7: Final State");
  console.log("─".repeat(60));

  robotState = await suiClient.getObject({
    id: ROBOT_ID,
    options: { showContent: true },
  });
  fields = (robotState.data?.content as any)?.fields;

  coins = await suiClient.getCoins({
    owner: address,
    coinType: `${PACKAGE_ADDRESS}::cookie::COOKIE`,
  });
  balance = coins.data.reduce(
    (sum, coin) => sum + BigInt(coin.balance),
    BigInt(0),
  );

  console.log(`  COOKIE balance: ${balance}`);
  console.log(`  Queue length: ${fields?.action_queue?.length || 0}`);
  console.log(`  Total queued: ${fields?.total_actions_queued}`);
  console.log(`  Total processed: ${fields?.total_actions_processed}`);
  console.log(`  COOKIEs collected: ${fields?.total_cookies_collected}`);
  console.log("");

  console.log("=".repeat(60));
  console.log("DEMO COMPLETE");
  console.log("=".repeat(60));
}

main().catch(console.error);
