/**
 * Create a new RobotPet.
 *
 * This script demonstrates:
 * - Calling a function that creates a shared object
 * - Passing string arguments to Move
 * - Finding created objects in transaction effects
 *
 * Usage:
 *   pnpm create-robot
 *   pnpm create-robot "MyRobotName"
 */

import { Transaction } from "@mysten/sui/transactions";
import {
  executeTransaction,
  getKeypair,
  PACKAGE_ADDRESS,
  printConfig,
  validateConfig,
} from "./config";

async function main() {
  console.log("=".repeat(50));
  console.log("CREATE ROBOT PET");
  console.log("=".repeat(50));
  console.log("");

  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "USER_PHRASE"]);
  printConfig();

  // Get robot name from argument or use default
  const robotName = process.argv[2] || "Bittle";

  // Get keypair
  const keypair = getKeypair();
  const address = keypair.getPublicKey().toSuiAddress();
  console.log(`Your address: ${address}`);
  console.log(`Robot name: ${robotName}`);
  console.log("");

  // Build the transaction
  console.log("Building transaction...");
  const tx = new Transaction();

  /**
   * Call robot_pet::create_robot
   *
   * This creates a new RobotPet shared object.
   * The caller becomes the admin of the robot.
   */
  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::robot_pet::create_robot`,
    arguments: [
      tx.pure.string(robotName), // Robot name as a Move String
    ],
  });

  // Execute the transaction
  console.log("Sending transaction...");
  const result = await executeTransaction(tx, keypair);

  console.log("");
  console.log("Transaction successful!");
  console.log(`  Digest: ${result.digest}`);
  console.log(`  Status: ${result.status.success ? "success" : "failure"}`);

  // Find the created RobotPet object
  const createdObjects = result.effects?.changedObjects
    .filter((c) => c.idOperation === "Created")
    .map((c) => ({
      objectId: c.objectId,
      objectType: result.objectTypes?.[c.objectId] || "",
    }));

  const robotPet = createdObjects?.find((obj) =>
    obj.objectType.includes("::robot_pet::RobotPet"),
  );

  if (robotPet) {
    console.log("");
    console.log("Robot created!");
    console.log(`  Object ID: ${robotPet.objectId}`);
    console.log("");
    console.log("Add this to your .env file:");
    console.log(`  ROBOT_ID=${robotPet.objectId}`);
  }

  console.log("");
  console.log("=".repeat(50));
}

main().catch(console.error);
