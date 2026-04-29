import { getKeypair, suiClient, wattCoinType } from "./config.js";

async function main() {
  const keypair = getKeypair();
  const address = keypair.toSuiAddress();
  const coins = await suiClient.listCoins({
    owner: address,
    coinType: wattCoinType(),
  });

  const total = coins.objects.reduce(
    (sum, coin) => sum + BigInt(coin.balance),
    0n,
  );

  console.log(`Address: ${address}`);
  console.log(`WATT balance: ${total}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
