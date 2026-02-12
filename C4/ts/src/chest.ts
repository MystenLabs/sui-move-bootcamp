import "dotenv/config";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { getSigner } from "./helpers/getSigner";

const PACKAGE_ID = process.env.PACKAGE_ID;

async function main() {
  console.log("\n🎲 Treasure Chest - On-Chain Randomness Demo\n");

  // Load from environment
  const address = process.env.ADDRESS;
  const secretKey = process.env.SECRET_KEY;
  const network = (process.env.NETWORK || "testnet") as
    | "testnet"
    | "mainnet"
    | "devnet";

  if (!address || !secretKey) {
    console.error("❌ Missing environment variables.");
    console.error("   Copy .env.example to .env and fill in your credentials.");
    process.exit(1);
  }

  console.log(`📍 Using address: ${address}`);

  // Connect to network
  const client = new SuiClient({ url: getFullnodeUrl(network) });

  // Check balance
  const balance = await client.getBalance({ owner: address });
  const suiBalance = Number(balance.totalBalance) / 1_000_000_000;
  console.log(`💰 Balance: ${suiBalance.toFixed(4)} SUI`);

  if (suiBalance < 0.01) {
    console.error(
      "\n❌ Insufficient balance. Get testnet SUI from the faucet:"
    );
    console.error("   https://faucet.testnet.sui.io/");
    process.exit(1);
  }

  console.log("\n📦 Creating and opening treasure chest...\n");

  const tx = new Transaction();
  // Create a treasure chest
  const chest = tx.moveCall({
    target: `${PACKAGE_ID}::treasure_chest::create_chest`,
    arguments: [tx.pure.string("")],
  });

  // Open the chest with randomness
  tx.moveCall({
    target: `${PACKAGE_ID}::treasure_chest::open_chest`,
    arguments: [chest, tx.object.random()],
  });

  // Execute transaction
  const result = await client.signAndExecuteTransaction({
    transaction: tx,
    signer: getSigner({ secretKey: secretKey }),
    options: {
      showEvents: true,
      showEffects: true,
    },
  });

  // Parse the event to get sword info
  const event = result.events?.find(
    (e) => e.type === `${PACKAGE_ID}::treasure_chest::ChestOpened`
  );

  if (event && event.parsedJson) {
    const data = event.parsedJson as {
      sword_name: string;
      power: string;
    };

    const swordName = data.sword_name;
    const power = data.power;

    console.log("━".repeat(50));
    console.log(`\n  ✨ You received a ${swordName} with ${power} power! ✨\n`);
    console.log("━".repeat(50));

    // Show rarity
    const rarityMap: Record<string, string> = {
      "Wooden Sword": "⬜ Common (50%) - Power: 1-10",
      "Iron Sword": "🟦 Uncommon (30%) - Power: 10-25",
      "Steel Sword": "🟪 Rare (15%) - Power: 25-50",
      "Legendary Sword": "🟨 Legendary (5%) - Power: 50-100",
    };
    console.log(`\n  Rarity: ${rarityMap[swordName] || "Unknown"}`);
  }

  console.log(
    `\n🔗 Transaction: https://testnet.suivision.xyz/txblock/${result.digest}\n`
  );
}

main().catch(console.error);
