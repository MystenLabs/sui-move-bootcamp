/**
 * Request COOKIE tokens from the faucet.
 *
 * This script demonstrates:
 * - Calling a Move function that modifies shared objects
 * - Using the Sui Clock object
 * - Handling rate-limited resources
 *
 * Usage:
 *   pnpm request-cookies
 */

import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  FAUCET_MANAGER_ID,
  getKeypair,
  MINT_CAP_ID,
  PACKAGE_ADDRESS,
  printConfig,
  suiClient,
  validateConfig,
} from "./config";

async function main() {
  console.log("=".repeat(50));
  console.log("REQUEST COOKIES FROM FAUCET");
  console.log("=".repeat(50));
  console.log("");

  // Validate configuration
  validateConfig([
    "PACKAGE_ADDRESS",
    "MINT_CAP_ID",
    "FAUCET_MANAGER_ID",
    "USER_PHRASE",
  ]);
  printConfig();

  // Get keypair
  const keypair = getKeypair();
  const address = keypair.getPublicKey().toSuiAddress();
  console.log(`Your address: ${address}`);
  console.log("");

  // Build the transaction
  console.log("Building transaction...");
  const tx = new Transaction();

  /**
   * Call faucet::request
   *
   * This function takes three shared objects:
   * 1. FaucetManager - tracks rate limits
   * 2. MintCap - controls minting
   * 3. Clock - provides current timestamp
   */
  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::faucet::request`,
    arguments: [
      tx.object(FAUCET_MANAGER_ID), // FaucetManager (shared, mutable)
      tx.object(MINT_CAP_ID), // MintCap (shared, mutable)
      tx.object(SUI_CLOCK_OBJECT_ID), // Clock (shared, immutable)
    ],
  });

  // Execute the transaction
  console.log("Sending transaction...");
  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: keypair,
    options: {
      showEffects: true,
      showEvents: true,
    },
  });

  console.log("");
  console.log("Transaction successful!");
  console.log(`  Digest: ${result.digest}`);
  console.log(`  Status: ${result.effects?.status.status}`);

  // Show any events
  if (result.events && result.events.length > 0) {
    console.log("");
    console.log("Events:");
    result.events.forEach((event, i) => {
      console.log(`  ${i + 1}. ${event.type}`);
    });
  }

  // Check new balance
  console.log("");
  console.log("Checking your COOKIE balance...");

  const coins = await suiClient.getCoins({
    owner: address,
    coinType: `${PACKAGE_ADDRESS}::cookie::COOKIE`,
  });

  const totalBalance = coins.data.reduce(
    (sum, coin) => sum + BigInt(coin.balance),
    BigInt(0),
  );

  console.log(`  COOKIE balance: ${totalBalance}`);
  console.log("");
  console.log("=".repeat(50));
}

main().catch(console.error);
