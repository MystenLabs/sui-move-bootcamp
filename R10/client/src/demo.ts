/**
 * Full Platform Demo
 *
 * Demonstrates the complete robot rental flow:
 * 1. Request TREAT tokens from faucet
 * 2. Register a robot (as operator)
 * 3. List available robots
 * 4. Start a rental session (as user)
 * 5. [Simulated] Send robot commands via WebSocket
 * 6. End the session
 *
 * Usage: pnpm demo
 *
 * Note: This demo uses the same keypair as both operator and user for simplicity.
 * In production, these would be different wallets.
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  buildCommandMessage,
  bytesToHex,
  executeTransaction,
  FAUCET_ID,
  generateCommandKeys,
  getTreatBalance,
  getTreatCoins,
  getUserKeypair,
  PACKAGE_ADDRESS,
  REGISTRY_ID,
  signCommand,
  sleep,
  suiClient,
  validateConfig,
} from "./config";

// Demo configuration
const DEMO_ROBOT_NAME = `Demo-Robot-${Date.now() % 10000}`;
const DEMO_ROBOT_PRICE = 1;
const DEMO_RENTAL_MINUTES = 2;

async function main() {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║         ROBOT RENTAL PLATFORM - FULL DEMO                  ║");
  console.log(
    "╚════════════════════════════════════════════════════════════╝\n",
  );

  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "FAUCET_ID", "REGISTRY_ID"]);

  const keypair = getUserKeypair();
  const address = keypair.toSuiAddress();

  console.log(`Wallet: ${address}`);
  console.log(`Network: ${process.env.NETWORK || "testnet"}\n`);

  // ========================================
  // STEP 1: Request TREAT tokens
  // ========================================
  console.log(
    "═══════════════════════════════════════════════════════════════",
  );
  console.log("STEP 1: Request TREAT Tokens from Faucet");
  console.log(
    "═══════════════════════════════════════════════════════════════\n",
  );

  let balance = await getTreatBalance(address);
  console.log(`Current balance: ${balance} TREAT`);

  if (balance < 10n) {
    console.log("Requesting 10 TREAT from faucet...\n");

    const tx1 = new Transaction();
    tx1.moveCall({
      target: `${PACKAGE_ADDRESS}::treat::request_tokens`,
      arguments: [
        tx1.object(FAUCET_ID),
        tx1.pure.u64(10),
        tx1.object(SUI_CLOCK_OBJECT_ID),
      ],
    });

    const result1 = await executeTransaction(tx1, keypair);
    console.log(`Transaction: ${result1.digest}`);

    balance = await getTreatBalance(address);
    console.log(`New balance: ${balance} TREAT\n`);
  } else {
    console.log("Sufficient balance, skipping faucet.\n");
  }

  await sleep(1000);

  // ========================================
  // STEP 2: Register a Robot (as operator)
  // ========================================
  console.log(
    "═══════════════════════════════════════════════════════════════",
  );
  console.log("STEP 2: Register Robot in Registry");
  console.log(
    "═══════════════════════════════════════════════════════════════\n",
  );

  console.log("Generating operator command-signing keys...");
  const operatorKeys = await generateCommandKeys();

  console.log(`Robot name: ${DEMO_ROBOT_NAME}`);
  console.log(`Price: ${DEMO_ROBOT_PRICE} TREAT/min\n`);

  const tx2 = new Transaction();
  tx2.moveCall({
    target: `${PACKAGE_ADDRESS}::robot_registry::register_robot`,
    arguments: [
      tx2.object(REGISTRY_ID),
      tx2.pure.string(DEMO_ROBOT_NAME),
      tx2.pure.string("Demo robot for testing the platform"),
      tx2.pure.string("Virtual Robot"),
      tx2.pure.vector("u8", Array.from(operatorKeys.publicKey)),
      tx2.pure.u64(DEMO_ROBOT_PRICE),
      tx2.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  const result2 = await executeTransaction(tx2, keypair);
  console.log(`Transaction: ${result2.digest}`);
  console.log("Robot registered successfully!\n");

  await sleep(1000);

  // ========================================
  // STEP 3: List Available Robots
  // ========================================
  console.log(
    "═══════════════════════════════════════════════════════════════",
  );
  console.log("STEP 3: List Available Robots");
  console.log(
    "═══════════════════════════════════════════════════════════════\n",
  );

  const registry = await suiClient.getObject({
    objectId: REGISTRY_ID,
    include: { json: true },
  });

  const registryFields = registry.object.json as any;
  if (registryFields) {
    const robotNames = registryFields.robot_names || [];
    console.log(`Found ${robotNames.length} robot(s) in registry:`);
    robotNames.forEach((name: string) => console.log(`  - ${name}`));
    console.log("");
  }

  await sleep(1000);

  // ========================================
  // STEP 4: Start Rental Session (as user)
  // ========================================
  console.log(
    "═══════════════════════════════════════════════════════════════",
  );
  console.log("STEP 4: Start Rental Session");
  console.log(
    "═══════════════════════════════════════════════════════════════\n",
  );

  console.log("Generating user command-signing keys...");
  const userKeys = await generateCommandKeys();

  const totalCost = DEMO_ROBOT_PRICE * DEMO_RENTAL_MINUTES;
  console.log(`Renting: ${DEMO_ROBOT_NAME}`);
  console.log(`Duration: ${DEMO_RENTAL_MINUTES} minutes`);
  console.log(`Cost: ${totalCost} TREAT\n`);

  // Get TREAT coins
  const coins = await getTreatCoins(address);
  const coinToUse = coins.find(
    (c: any) => BigInt(c.balance) >= BigInt(totalCost),
  );

  if (!coinToUse) {
    console.error("No coin with sufficient balance");
    process.exit(1);
  }

  const tx3 = new Transaction();
  const [paymentCoin] = tx3.splitCoins(tx3.object(coinToUse.objectId), [
    tx3.pure.u64(totalCost),
  ]);

  tx3.moveCall({
    target: `${PACKAGE_ADDRESS}::rental_session::start_session`,
    arguments: [
      tx3.object(REGISTRY_ID),
      tx3.pure.string(DEMO_ROBOT_NAME),
      tx3.pure.vector("u8", Array.from(userKeys.publicKey)),
      paymentCoin,
      tx3.pure.u64(DEMO_RENTAL_MINUTES),
      tx3.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  const result3 = await executeTransaction(tx3, keypair);

  // Get session ID from created objects
  const createdSession = result3.effects?.changedObjects
    .filter((c) => c.idOperation === "Created")
    .map((c) => ({
      objectId: c.objectId,
      objectType: result3.objectTypes?.[c.objectId] || "",
    }))
    .find((o) => o.objectType.includes("::rental_session::RentalSession"));

  let sessionId = "";
  if (createdSession) {
    sessionId = createdSession.objectId;
  }

  console.log(`Transaction: ${result3.digest}`);
  console.log(`Session ID: ${sessionId}\n`);

  await sleep(1000);

  // ========================================
  // STEP 5: Simulate Robot Commands
  // ========================================
  console.log(
    "═══════════════════════════════════════════════════════════════",
  );
  console.log("STEP 5: Simulate Robot Commands (Off-Chain Signing)");
  console.log(
    "═══════════════════════════════════════════════════════════════\n",
  );

  console.log(
    "In a real scenario, these signed commands would be sent via WebSocket.\n",
  );

  const commands = ["sit", "wave", "stand", "walk_forward"];
  let sequence = 0;

  for (const command of commands) {
    sequence++;

    // Build command message (same format as Move contract)
    const message = buildCommandMessage(sessionId, sequence, command);

    // Sign with user's private key
    const signature = await signCommand(userKeys.privateKey, message);

    console.log(`Command ${sequence}: "${command}"`);
    console.log(`  Message: ${bytesToHex(message).slice(0, 40)}...`);
    console.log(`  Signature: ${bytesToHex(signature).slice(0, 40)}...`);
    console.log("");

    await sleep(500);
  }

  console.log("The WebSocket server would verify these signatures using");
  console.log("the public key stored in the session.\n");

  await sleep(1000);

  // ========================================
  // STEP 6: End Session
  // ========================================
  console.log(
    "═══════════════════════════════════════════════════════════════",
  );
  console.log("STEP 6: End Rental Session");
  console.log(
    "═══════════════════════════════════════════════════════════════\n",
  );

  // Wait a moment to accumulate some "usage"
  console.log("Waiting 3 seconds to simulate usage time...\n");
  await sleep(3000);

  const tx4 = new Transaction();
  tx4.moveCall({
    target: `${PACKAGE_ADDRESS}::rental_session::end_session`,
    arguments: [
      tx4.object(sessionId),
      tx4.object(REGISTRY_ID),
      tx4.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  const result4 = await executeTransaction(tx4, keypair);

  const endEvent = result4.events?.find((e) =>
    e.eventType.includes("::SessionEnded"),
  );

  console.log(`Transaction: ${result4.digest}\n`);

  if (endEvent) {
    const data = endEvent.json as any;
    console.log("Settlement:");
    console.log(`  Actual minutes used: ${data.actual_minutes}`);
    console.log(`  Paid to operator: ${data.amount_paid} TREAT`);
    console.log(`  Refunded to user: ${data.amount_refunded} TREAT\n`);
  }

  // Final balance
  const finalBalance = await getTreatBalance(address);
  console.log(`Final TREAT balance: ${finalBalance}\n`);

  // ========================================
  // SUMMARY
  // ========================================
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║                     DEMO COMPLETE!                         ║");
  console.log(
    "╚════════════════════════════════════════════════════════════╝\n",
  );

  console.log("This demo showed the complete rental flow:");
  console.log("1. TREAT tokens requested from faucet");
  console.log("2. Robot registered in the registry");
  console.log("3. Available robots listed");
  console.log("4. Rental session started with prepayment");
  console.log("5. Commands signed with Ed25519 (off-chain)");
  console.log("6. Session ended with automatic settlement\n");

  console.log("Key concepts demonstrated:");
  console.log("- Ed25519 keypairs for command authentication");
  console.log("- TREAT token payments via escrow");
  console.log("- Automatic refunds for unused time");
  console.log(
    "- State channel pattern (on-chain open/close, off-chain commands)\n",
  );

  console.log(
    `Note: Demo robot "${DEMO_ROBOT_NAME}" remains registered in the registry.`,
  );
  console.log(
    "To clean up, unregister it via: pnpm unregister-robot <name>\n",
  );
}

main().catch(console.error);
