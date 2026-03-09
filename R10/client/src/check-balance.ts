/**
 * Check TREAT token balance
 *
 * Usage: pnpm check-balance
 */

import {
  FAUCET_ID,
  getTreatBalance,
  getTreatCoins,
  getUserKeypair,
  suiClient,
  validateConfig,
} from "./config";

async function main() {
  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "FAUCET_ID"]);

  // Get keypair and address
  const keypair = getUserKeypair();
  const address = keypair.toSuiAddress();

  console.log("=== TREAT Token Balance ===");
  console.log(`Address: ${address}`);
  console.log(`Network: ${process.env.NETWORK || "testnet"}`);
  console.log("");

  // Get balance
  const balance = await getTreatBalance(address);
  console.log(`Total Balance: ${balance} TREAT`);

  // Get individual coins
  const coins = await getTreatCoins(address);
  if (coins.length > 0) {
    console.log(`\nCoins (${coins.length} total):`);
    coins.forEach((coin, i) => {
      console.log(
        `  ${i + 1}. ${coin.objectId.slice(0, 10)}... = ${coin.balance} TREAT`,
      );
    });
  }

  // Get faucet stats
  try {
    const faucet = await suiClient.getObject({
      objectId: FAUCET_ID,
      include: { json: true },
    });

    const faucetFields = faucet.object.json as any;
    if (faucetFields) {
      const totalSupply =
        faucetFields.treasury_cap?.fields?.total_supply?.fields?.value;
      if (totalSupply) {
        console.log(`\nFaucet Total Supply: ${totalSupply} TREAT`);
      }
    }
  } catch (error) {
    // Ignore faucet read errors
  }
}

main();
