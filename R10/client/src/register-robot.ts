/**
 * Register a robot in the registry
 *
 * Usage: pnpm register-robot
 *
 * This registers a robot that can be rented by users.
 * Uses OPERATOR_PHRASE/OPERATOR_PRIVATE_KEY from .env
 *
 * The script:
 * 1. Generates a new Ed25519 keypair for command signing
 * 2. Registers the robot with the public key
 * 3. Saves the private key for use in the WebSocket server
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  bytesToHex,
  executeTransaction,
  generateCommandKeys,
  getOperatorKeypair,
  PACKAGE_ADDRESS,
  REGISTRY_ID,
  validateConfig,
} from "./config";

async function main() {
  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "REGISTRY_ID"]);

  // Get robot configuration from env
  const robotName = process.env.ROBOT_NAME || "Bittle-1";
  const robotDescription =
    process.env.ROBOT_DESCRIPTION || "A friendly robot dog";
  const robotType = process.env.ROBOT_TYPE || "Petoi Bittle X";
  const pricePerMinute = parseInt(
    process.env.ROBOT_PRICE_PER_MINUTE || "2",
    10,
  );

  // Get operator keypair (for blockchain transaction)
  const keypair = getOperatorKeypair();
  const operatorAddress = keypair.toSuiAddress();

  // Generate Ed25519 keypair for command signing
  console.log("Generating Ed25519 keypair for command signing...");
  const { privateKey, publicKey } = await generateCommandKeys();

  console.log("=== Register Robot ===");
  console.log(`Operator: ${operatorAddress}`);
  console.log(`Robot Name: ${robotName}`);
  console.log(`Type: ${robotType}`);
  console.log(`Price: ${pricePerMinute} TREAT/minute`);
  console.log(`Public Key: 0x${bytesToHex(publicKey).slice(0, 16)}...`);
  console.log("");

  // Build transaction
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::robot_registry::register_robot`,
    arguments: [
      tx.object(REGISTRY_ID),
      tx.pure.string(robotName),
      tx.pure.string(robotDescription),
      tx.pure.string(robotType),
      tx.pure.vector("u8", Array.from(publicKey)),
      tx.pure.u64(pricePerMinute),
      tx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  console.log("Sending transaction...");

  try {
    const result = await executeTransaction(tx, keypair);

    // Parse events
    const registerEvent = result.events?.find((e) =>
      e.eventType.includes("::RobotRegistered"),
    );

    console.log("\n=== Success! ===");
    console.log(`Transaction: ${result.digest}`);

    if (registerEvent) {
      const data = registerEvent.json as any;
      console.log(`\nRobot registered:`);
      console.log(`  Name: ${data.name}`);
      console.log(`  Type: ${data.robot_type}`);
      console.log(`  Price: ${data.price_per_minute} TREAT/min`);
    }

    // Output private key for server use
    console.log("\n=== IMPORTANT: Save this private key for your server! ===");
    console.warn(
      "WARNING: The following private key controls your robot's command authentication.",
    );
    console.warn(
      "         Do not share it or leave it in terminal history/logs.",
    );
    console.log(`OPERATOR_COMMAND_PRIVATE_KEY=0x${bytesToHex(privateKey)}`);
    console.log(`OPERATOR_COMMAND_PUBLIC_KEY=0x${bytesToHex(publicKey)}`);
    console.log("\nCopy these values to your server's .env file immediately.");
  } catch (error: any) {
    console.error("\nTransaction failed:", error.message);

    if (error.message.includes("ERobotNameExists")) {
      console.error(`Robot name "${robotName}" is already registered.`);
    }

    process.exit(1);
  }
}

main();
