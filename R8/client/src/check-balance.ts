/**
 * Check COOKIE token balance and faucet allowance.
 *
 * This script demonstrates:
 * - Reading coin balances
 * - Reading shared object state
 * - Parsing Move struct data
 *
 * Usage:
 *   pnpm check-balance
 */

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
  console.log("CHECK COOKIE BALANCE");
  console.log("=".repeat(50));
  console.log("");

  // Validate configuration
  validateConfig(["PACKAGE_ADDRESS", "MINT_CAP_ID", "FAUCET_MANAGER_ID"]);
  printConfig();

  // Get address (doesn't require signing)
  let address: string;
  try {
    const keypair = getKeypair();
    address = keypair.getPublicKey().toSuiAddress();
  } catch {
    // If no keypair, prompt for address
    address = process.argv[2];
    if (!address) {
      console.log("Usage: pnpm check-balance [address]");
      console.log("Or set USER_PHRASE in .env");
      process.exit(1);
    }
  }

  console.log(`Checking balance for: ${address}`);
  console.log("");

  // ============================================
  // 1. Check COOKIE balance
  // ============================================

  console.log("1. COOKIE Token Balance");
  console.log("-".repeat(30));

  const coins = await suiClient.listCoins({
    owner: address,
    coinType: `${PACKAGE_ADDRESS}::cookie::COOKIE`,
  });

  if (coins.objects.length === 0) {
    console.log("   No COOKIE tokens found");
  } else {
    let totalBalance = BigInt(0);
    coins.objects.forEach((coin, i) => {
      console.log(`   Coin ${i + 1}: ${coin.balance} COOKIE`);
      totalBalance += BigInt(coin.balance);
    });
    console.log(`   ─────────────────────`);
    console.log(`   Total: ${totalBalance} COOKIE`);
  }

  console.log("");

  // ============================================
  // 2. Check MintCap state (total supply)
  // ============================================

  console.log("2. Token Supply Info");
  console.log("-".repeat(30));

  const mintCapResponse = await suiClient.getObject({
    objectId: MINT_CAP_ID,
    include: { json: true },
  });

  const mintCapFields = mintCapResponse.object.json as any;
  if (mintCapFields) {
    const maxSupply = mintCapFields.max_supply;

    // Get total supply from TreasuryCap
    const treasuryCapFields = mintCapFields.treasury_cap?.fields;
    const totalSupply = treasuryCapFields?.total_supply?.fields?.value || "0";

    console.log(`   Max Supply: ${maxSupply}`);
    console.log(`   Current Supply: ${totalSupply}`);
    console.log(`   Remaining: ${BigInt(maxSupply) - BigInt(totalSupply)}`);
  }

  console.log("");

  // ============================================
  // 3. Check FaucetManager state
  // ============================================

  console.log("3. Faucet Info");
  console.log("-".repeat(30));

  const faucetResponse = await suiClient.getObject({
    objectId: FAUCET_MANAGER_ID,
    include: { json: true },
  });

  const faucetFields = faucetResponse.object.json as any;
  if (faucetFields) {
    const totalDistributed = faucetFields.total_distributed;

    console.log(`   Total Distributed: ${totalDistributed} COOKIE`);
    console.log(`   Daily Limit: 100 COOKIE per address`);
    console.log(`   Per Request: 10 COOKIE`);
  }

  console.log("");
  console.log("=".repeat(50));
}

main().catch(console.error);
