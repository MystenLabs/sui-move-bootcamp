import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  executeTransaction,
  getKeypair,
  PACKAGE_ADDRESS,
  REWARD_VAULT_ID,
  validateConfig,
} from "./config.js";

async function main() {
  validateConfig(["PACKAGE_ADDRESS", "REWARD_VAULT_ID"]);

  const amount = Number(process.argv[2] || "10");
  if (amount < 1 || amount > 25) {
    throw new Error("Amount must be between 1 and 25");
  }

  const keypair = getKeypair();
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ADDRESS}::watt::request_demo_tokens`,
    arguments: [
      tx.object(REWARD_VAULT_ID),
      tx.pure.u64(amount),
      tx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  const result = await executeTransaction(tx, keypair);
  console.log(`Requested ${amount} WATT`);
  console.log(`Digest: ${result.digest}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
