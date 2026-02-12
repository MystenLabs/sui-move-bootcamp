import { CoinBalance, getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { getFaucetHost, requestSuiFromFaucetV2 } from "@mysten/sui/faucet";
import { MIST_PER_SUI } from "@mysten/sui/utils";

const mistToSui = (b: CoinBalance) =>
  Number(b.totalBalance) / Number(MIST_PER_SUI);

test("SuiClient: getBalance + faucet (devnet)", async () => {
  // 1) Address to fund (must be a valid Sui address)
  const MY_ADDRESS =
    "0xf38a463604d2db4582033a09db6f8d4b846b113b3cd0a7c4f0d4690b3fe6aa37";

  // 2) Initialize client (devnet)
  const suiClient = new SuiClient({ url: getFullnodeUrl("devnet") });

  // 3) Balance BEFORE
  const before = await suiClient.getBalance({ owner: MY_ADDRESS });

  // 4) Request from faucet (devnet)
  await requestSuiFromFaucetV2({
    host: getFaucetHost("devnet"),
    recipient: MY_ADDRESS,
  });

  // Wait 2 seconds before checking balance
  await new Promise((r) => setTimeout(r, 2000));

  // 5) Balance AFTER (no polling, just one check)
  const after = await suiClient.getBalance({ owner: MY_ADDRESS });

  // 6) Assert it increased
  expect(Number(after.totalBalance)).toBeGreaterThan(
    Number(before.totalBalance)
  );
  console.log(`Before: ${mistToSui(before)} SUI`);
  console.log(`After : ${mistToSui(after)} SUI`);
});
