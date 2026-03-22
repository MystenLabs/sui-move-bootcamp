import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  executeTransaction,
  getKeypair,
  METER_OBJECT_ID,
  PACKAGE_ADDRESS,
  REWARD_VAULT_ID,
  validateConfig,
} from "./config.js";

async function main() {
  validateConfig(["PACKAGE_ADDRESS", "METER_OBJECT_ID"]);

  const watts = Number(process.argv[2] || "500");
  const totalKwhMilli = Number(process.argv[3] || "10");
  const rewardDeltaMilli = Number(process.argv[4] || String(totalKwhMilli));

  const keypair = getKeypair();
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::energy_meter::record_reading`,
    arguments: [
      tx.object(METER_OBJECT_ID),
      tx.pure.u64(watts),
      tx.pure.u64(totalKwhMilli),
      tx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  if (REWARD_VAULT_ID && rewardDeltaMilli > 0) {
    tx.moveCall({
      target: `${PACKAGE_ADDRESS}::watt::reward_for_verified_kwh`,
      arguments: [
        tx.object(REWARD_VAULT_ID),
        tx.pure.address(keypair.toSuiAddress()),
        tx.pure.u64(rewardDeltaMilli),
      ],
    });
  }

  const result = await executeTransaction(tx, keypair);

  console.log("Submitted energy reading");
  console.log(`Digest: ${result.digest}`);
  console.log(`Watts: ${watts}`);
  console.log(`Total kWh milli: ${totalKwhMilli}`);
  console.log(`Reward delta milli: ${rewardDeltaMilli}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
