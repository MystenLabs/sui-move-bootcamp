import { Transaction, TransactionArgument } from "@mysten/sui/transactions";
import { suiClient } from "../suiClient";
import { getSigner } from "./getSigner";
import { ENV } from "../env";

export const createHero = async (name: string, attributes: string[]) => {
  const signer = getSigner({ secretKey: ENV.SECRET_KEY });
  const tx = new Transaction();
  const attributesArgs: TransactionArgument[] = [];

  attributes.forEach((attribute) => {
    attributesArgs.push(
      tx.moveCall({
        target: `${ENV.PACKAGE_ID}::hero::create_attribute`,
        arguments: [tx.pure.string(attribute), tx.pure.u64(100)],
      })
    );
  });

  const attributesVec = tx.makeMoveVec({
    elements: attributesArgs,
    type: `${ENV.PACKAGE_ID}::hero::Attribute`,
  });

  const hero = tx.moveCall({
    target: `${ENV.PACKAGE_ID}::hero::create_hero_3`,
    arguments: [tx.pure.string(name), attributesVec],
  });

  tx.moveCall({
    target: `${process.env.PACKAGE_ID}::hero::transfer_hero`,
    arguments: [hero, tx.pure.address(signer.toSuiAddress())],
  });

  return await suiClient.signAndExecuteTransaction({
    transaction: tx,
    options: {
      showObjectChanges: true,
      showEffects: true,
    },
    signer: signer,
  });
};

export const getHero = async (heroId: string) => {
  const hero = await suiClient.getObject({
    id: heroId,
    options: {
      showContent: true,
    },
  });
  return hero;
};
