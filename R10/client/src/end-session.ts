/**
 * End a rental session
 *
 * Usage: pnpm end-session <session-id>
 *
 * This script:
 * 1. Ends the rental session
 * 2. Calculates actual usage
 * 3. Pays operator for used time
 * 4. Refunds user for unused time
 * 5. Creates a rental receipt
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  executeTransaction,
  getUserKeypair,
  PACKAGE_ADDRESS,
  REGISTRY_ID,
  suiClient,
  validateConfig,
} from "./config";

async function main() {
  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "REGISTRY_ID"]);

  // Get session ID from command line or env
  const sessionId = process.argv[2] || process.env.SESSION_ID;

  if (!sessionId) {
    console.error("Usage: pnpm end-session <session-id>");
    console.error("\nOr set SESSION_ID in your .env file");
    process.exit(1);
  }

  // Get keypair
  const keypair = getUserKeypair();
  const address = keypair.toSuiAddress();

  console.log("=== End Rental Session ===");
  console.log(`User: ${address}`);
  console.log(`Session: ${sessionId}`);
  console.log("");

  // Get session info
  try {
    const session = await suiClient.getObject({
      objectId: sessionId,
      include: { json: true },
    });

    const fields = session.object.json as any;
    if (!fields) {
      console.error("Session not found or already ended");
      process.exit(1);
    }

    if (!fields.is_active) {
      console.error("Session is not active");
      process.exit(1);
    }

    console.log(`Robot: ${fields.robot_name}`);
    console.log(`Prepaid: ${fields.prepaid_minutes} minutes`);
    console.log(`Price: ${fields.price_per_minute} TREAT/min`);
    console.log(`Escrowed: ${fields.escrow} TREAT`);

    // Calculate elapsed time
    const startTime = parseInt(fields.start_time, 10);
    const now = Date.now();
    const elapsedMs = now - startTime;
    const elapsedMinutes = Math.ceil(elapsedMs / 60000);

    console.log(`\nElapsed: ~${elapsedMinutes} minutes`);

    const actualMinutes = Math.min(
      elapsedMinutes,
      parseInt(fields.prepaid_minutes, 10),
    );
    const amountPaid = actualMinutes * parseInt(fields.price_per_minute, 10);
    const expectedRefund = parseInt(fields.escrow, 10) - amountPaid;

    console.log(`\nEstimated Settlement:`);
    console.log(`  Actual usage: ${actualMinutes} minutes`);
    console.log(`  Payment to operator: ${amountPaid} TREAT`);
    console.log(`  Refund to user: ${expectedRefund} TREAT`);
  } catch (error: any) {
    console.error("Failed to read session:", error.message);
    process.exit(1);
  }

  // Build transaction
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::rental_session::end_session`,
    arguments: [
      tx.object(sessionId),
      tx.object(REGISTRY_ID),
      tx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  console.log("\nSending transaction...");

  try {
    const result = await executeTransaction(tx, keypair);

    // Parse events
    const endEvent = result.events?.find((e) =>
      e.eventType.includes("::SessionEnded"),
    );

    console.log("\n=== Session Ended! ===");
    console.log(`Transaction: ${result.digest}`);

    if (endEvent) {
      const data = endEvent.json as any;
      console.log(`\nSettlement:`);
      console.log(`  Robot: ${data.robot_name}`);
      console.log(`  Actual minutes: ${data.actual_minutes}`);
      console.log(`  Paid to operator: ${data.amount_paid} TREAT`);
      console.log(`  Refunded to user: ${data.amount_refunded} TREAT`);
    }

    // Find created receipt
    const createdReceipt = result.effects?.changedObjects
      .filter((c) => c.idOperation === "Created")
      .map((c) => ({
        objectId: c.objectId,
        objectType: result.objectTypes?.[c.objectId] || "",
      }))
      .find((o) => o.objectType.includes("::rental_session::RentalReceipt"));

    if (createdReceipt) {
      console.log(`\nReceipt ID: ${createdReceipt.objectId}`);
    }
  } catch (error: any) {
    console.error("\nTransaction failed:", error.message);

    if (error.message.includes("ENotAuthorized")) {
      console.error("Only the user or operator can end this session.");
    } else if (error.message.includes("ESessionNotActive")) {
      console.error("Session is not active (may already be ended).");
    }

    process.exit(1);
  }
}

main();
