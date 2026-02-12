import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { suiClient } from "../suiClient";
import { getSigner } from "./getSigner";
import { ENV } from "../env";
import { getAddress } from "./getAddress";

/**
 * Builds, signs, and executes a transaction for:
 * * minting a Hero NFT
 * * minting a Sword NFT
 * * attaching the Sword to the Hero
 * * transferring the Hero to the signer
 */
export const mintHeroWithSword =
  async (): Promise<SuiTransactionBlockResponse> => {
    const tx = new Transaction();

    const hero = tx.moveCall({
      target: `${ENV.PACKAGE_ID}::hero::mint_hero`,
      arguments: [],
      typeArguments: [],
    });
    const sword = tx.moveCall({
      target: `${ENV.PACKAGE_ID}::blacksmith::new_sword`,
      arguments: [tx.pure.u64(10)],
      typeArguments: [],
    });
    tx.moveCall({
      target: `${ENV.PACKAGE_ID}::hero::equip_sword`,
      arguments: [hero, sword],
    });
    tx.transferObjects([hero], getAddress({ secretKey: ENV.USER_SECRET_KEY }));

    return suiClient.signAndExecuteTransaction({
      transaction: tx,
      signer: getSigner({ secretKey: ENV.USER_SECRET_KEY }),
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    });
  };
