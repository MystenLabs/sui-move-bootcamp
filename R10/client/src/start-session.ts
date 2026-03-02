/**
 * Start a rental session
 *
 * Usage: pnpm start-session [robot-name] [minutes]
 *
 * Example:
 *   pnpm start-session Bittle-1 5    # Rent Bittle-1 for 5 minutes
 *
 * This script:
 * 1. Generates Ed25519 keypair for command signing
 * 2. Pays TREAT tokens from your balance
 * 3. Creates a rental session
 * 4. Outputs the session ID and keys for WebSocket control
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  bytesToHex,
  executeTransaction,
  generateCommandKeys,
  getTreatCoins,
  getUserKeypair,
  PACKAGE_ADDRESS,
  REGISTRY_ID,
  suiClient,
  validateConfig,
} from "./config";

async function main() {
  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "REGISTRY_ID"]);

  // Get command line arguments
  const robotName =
    process.argv[2] || process.env.SESSION_ROBOT_NAME || "Bittle-1";
  const minutes = parseInt(
    process.argv[3] || process.env.SESSION_MINUTES || "5",
    10,
  );

  if (minutes < 1 || minutes > 60) {
    console.error("Minutes must be between 1 and 60");
    process.exit(1);
  }

  // Get user keypair (for blockchain transaction)
  const keypair = getUserKeypair();
  const userAddress = keypair.toSuiAddress();

  console.log("=== Start Rental Session ===");
  console.log(`User: ${userAddress}`);
  console.log(`Robot: ${robotName}`);
  console.log(`Duration: ${minutes} minutes`);
  console.log("");

  // Get robot info to calculate price
  const registry = await suiClient.getObject({
    id: REGISTRY_ID,
    options: { showContent: true },
  });

  if (registry.data?.content?.dataType !== "moveObject") {
    console.error("Could not read registry");
    process.exit(1);
  }

  const fields = registry.data.content.fields as any;
  const robotsTableId = fields.robots?.fields?.id?.id;

  // Get robot price
  let pricePerMinute = 2; // Default
  try {
    const robotField = await suiClient.getDynamicFieldObject({
      parentId: robotsTableId,
      name: { type: "0x1::string::String", value: robotName },
    });

    if (robotField.data?.content?.dataType === "moveObject") {
      const robotData = (robotField.data.content.fields as any).value;
      pricePerMinute = parseInt(robotData.price_per_minute, 10);

      if (!robotData.is_available) {
        console.error(`Robot "${robotName}" is not available for rent.`);
        process.exit(1);
      }
    }
  } catch (error) {
    console.error(`Robot "${robotName}" not found in registry.`);
    process.exit(1);
  }

  const totalCost = pricePerMinute * minutes;
  console.log(`Price: ${pricePerMinute} TREAT/min`);
  console.log(`Total Cost: ${totalCost} TREAT`);
  console.log("");

  // Check TREAT balance
  const coins = await getTreatCoins(userAddress);
  const totalBalance = coins.reduce((sum, c) => sum + BigInt(c.balance), 0n);

  if (totalBalance < BigInt(totalCost)) {
    console.error(
      `Insufficient TREAT balance. Have: ${totalBalance}, Need: ${totalCost}`,
    );
    console.error("Run 'pnpm request-tokens' to get more TREAT tokens.");
    process.exit(1);
  }

  // Generate Ed25519 keypair for command signing
  console.log("Generating command signing keys...");
  const { privateKey, publicKey } = await generateCommandKeys();

  // Build transaction
  const tx = new Transaction();

  // Find a coin with enough balance (or merge coins)
  const coinToUse = coins.find((c) => BigInt(c.balance) >= BigInt(totalCost));

  let paymentCoin;
  if (coinToUse) {
    // Split exact amount from this coin
    const [payment] = tx.splitCoins(tx.object(coinToUse.coinObjectId), [
      tx.pure.u64(totalCost),
    ]);
    paymentCoin = payment;
  } else {
    // Need to merge coins first
    // For simplicity, we'll use the first coin and assume it has enough
    // In production, you'd merge multiple coins
    console.error("Please merge your TREAT coins or get a larger single coin.");
    process.exit(1);
  }

  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::rental_session::start_session`,
    arguments: [
      tx.object(REGISTRY_ID),
      tx.pure.string(robotName),
      tx.pure.vector("u8", Array.from(publicKey)),
      paymentCoin,
      tx.pure.u64(minutes),
      tx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  console.log("\nSending transaction...");

  try {
    const result = await executeTransaction(tx, keypair);

    // Find created session object
    const createdSession = result.objectChanges?.find(
      (change) =>
        change.type === "created" &&
        change.objectType.includes("::rental_session::RentalSession"),
    );

    // Parse events
    const sessionEvent = result.events?.find((e) =>
      e.type.includes("::SessionStarted"),
    );

    console.log("\n=== Session Started! ===");
    console.log(`Transaction: ${result.digest}`);

    if (createdSession && createdSession.type === "created") {
      console.log(`\nSession ID: ${createdSession.objectId}`);
    }

    if (sessionEvent) {
      const data = sessionEvent.parsedJson as any;
      console.log(`Robot: ${data.robot_name}`);
      console.log(`Prepaid: ${data.prepaid_minutes} minutes`);
    }

    // Output keys for WebSocket connection
    console.log("\n=== Connection Info (save this!) ===");
    console.log(
      `SESSION_ID=${
        createdSession?.type === "created" ? createdSession.objectId : ""
      }`,
    );
    console.log(`USER_COMMAND_PRIVATE_KEY=0x${bytesToHex(privateKey)}`);
    console.log(`USER_COMMAND_PUBLIC_KEY=0x${bytesToHex(publicKey)}`);
    console.log(
      "\nUse these to connect to the WebSocket server and send commands.",
    );
    console.log("\nTo end the session: pnpm end-session <SESSION_ID>");
  } catch (error: any) {
    console.error("\nTransaction failed:", error.message);

    if (error.message.includes("ERobotNotAvailable")) {
      console.error(`Robot "${robotName}" is not available.`);
    } else if (error.message.includes("EInsufficientPayment")) {
      console.error("Insufficient TREAT tokens.");
    }

    process.exit(1);
  }
}

main();
