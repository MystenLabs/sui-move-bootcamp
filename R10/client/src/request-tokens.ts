/**
 * Request TREAT tokens from the faucet
 *
 * Usage: pnpm request-tokens [amount]
 *
 * Example:
 *   pnpm request-tokens       # Request 10 TREAT (default)
 *   pnpm request-tokens 5     # Request 5 TREAT
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  executeTransaction,
  FAUCET_ID,
  getTreatBalance,
  getUserKeypair,
  PACKAGE_ADDRESS,
  validateConfig,
} from "./config";

async function main() {
  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "FAUCET_ID"]);

  // Get amount from command line (default: 10)
  const amount = parseInt(process.argv[2] || "10", 10);

  if (amount < 1 || amount > 10) {
    console.error("Amount must be between 1 and 10");
    process.exit(1);
  }

  // Get keypair
  const keypair = getUserKeypair();
  const address = keypair.toSuiAddress();

  console.log("=== Request TREAT Tokens ===");
  console.log(`Address: ${address}`);
  console.log(`Amount: ${amount}`);
  console.log(`Network: ${process.env.NETWORK || "testnet"}`);
  console.log("");

  // Check current balance
  const balanceBefore = await getTreatBalance(address);
  console.log(`Balance before: ${balanceBefore} TREAT`);

  // Build transaction
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::treat::request_tokens`,
    arguments: [
      tx.object(FAUCET_ID),
      tx.pure.u64(amount),
      tx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  console.log("\nSending transaction...");

  try {
    const result = await executeTransaction(tx, keypair);

    // Parse events
    const mintEvent = result.events?.find((e) =>
      e.eventType.includes("::TokensMinted"),
    );

    console.log("\n=== Success! ===");
    console.log(`Transaction: ${result.digest}`);

    if (mintEvent) {
      const data = mintEvent.json as any;
      console.log(`Minted: ${data.amount} TREAT`);
      console.log(`Daily total: ${data.new_daily_total}/100`);
    }

    // Check new balance
    const balanceAfter = await getTreatBalance(address);
    console.log(`Balance after: ${balanceAfter} TREAT`);
  } catch (error: any) {
    console.error("\nTransaction failed:", error.message);

    if (error.message.includes("EExceedsDailyLimit")) {
      console.error("You have reached your daily limit (100 TREAT/day)");
    }

    process.exit(1);
  }
}

main();
