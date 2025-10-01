import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { getFaucetHost, requestSuiFromFaucetV2 } from "@mysten/sui/faucet";
import { Transaction } from "@mysten/sui/transactions";
import { ENV } from "../env";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

test("Simple JSON RPC CLient Limits - Testnet", async () => {
  const keypair = new Ed25519Keypair();
  console.log("My address:", keypair.getPublicKey().toSuiAddress());

  // create a new SuiClient object pointing to the network you want to use
  const suiClient = new SuiClient({ url: getFullnodeUrl("devnet") });

  await requestSuiFromFaucetV2({
    // use getFaucetHost to make sure you're using correct faucet address
    // you can also just use the address (see Sui TypeScript SDK Quick Start for values)
    host: getFaucetHost("devnet"),
    recipient: keypair.getPublicKey().toSuiAddress(),
  });

  const tx = new Transaction();
  
  let hero = tx.moveCall({
    target: `${ENV.PACKAGE_ID}::hero::mint_hero`,
    arguments: [tx.pure.string("My Hero")],
  });

  let req = tx.moveCall({
    target: `${ENV.PACKAGE_ID}::hero::level_up_request`,
    arguments: [],
  })

  //TODO: Collect the payment proof
  let [coin] = tx.splitCoins(tx.gas, [1_000_000_000]);
  tx.moveCall({
    target: `${ENV.PACKAGE_ID}::hero::collect_payment_proof`,
    arguments: [req, tx.object(ENV.POLICY_ID), coin]
  })

  //TODO: Collect the level bonus proof
  tx.moveCall({
    target: `${ENV.PACKAGE_ID}::hero::collect_level_bonus_proof`,
    arguments: [req, hero]
  })

  //TODO: Confirm the level up
  tx.moveCall({
    target: `${ENV.PACKAGE_ID}::hero::confirm_level_up`,
    arguments: [req, tx.object(ENV.POLICY_ID), hero]
  })

  tx.transferObjects([hero], keypair.getPublicKey().toSuiAddress());

  const response = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: keypair,
    options: { 
      showEffects: true,
      showObjectChanges: true
    }
  })

  console.log("Transaction response:", response);

  expect(response.effects?.status.status).toBe("success");
});
