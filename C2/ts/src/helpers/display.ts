import { suiClient } from "../suiClient";
import { Transaction } from "@mysten/sui/transactions";
import { getSigner } from "./getSigner";

export const getHeroWithDisplay = async (id: string) => {
  const objectWithDisplay = await suiClient.getObject({
    id,
    options: {
      showDisplay: true,
    },
  });
  return objectWithDisplay;
};

export const updateHeroDisplay = async (
  id: string,
  key: string,
  value: string,
  senderSecretKey: string
) => {
  const signer = getSigner({ secretKey: senderSecretKey });

  const objectWithDisplay = await getHeroWithDisplay(id);
  const fields = objectWithDisplay.data?.display?.data!;
  fields[key] = value;

  let tx = new Transaction();
  const display = tx.moveCall({
    target: "0x2::display::new_with_fields",
    arguments: [
      tx.object(process.env.PUBLISHER_ID!),
      tx.pure.vector("string", Object.keys(fields)),
      tx.pure.vector("string", Object.values(fields)),
    ],
    typeArguments: [`${process.env.PACKAGE_ID}::hero::Hero`],
  });

  tx.moveCall({
    target: "0x2::display::update_version",
    arguments: [display],
    typeArguments: [`${process.env.PACKAGE_ID}::hero::Hero`],
  });

  tx.transferObjects([display], signer.toSuiAddress());

  return await suiClient.signAndExecuteTransaction({
    transaction: tx,
    options: {
      showObjectChanges: true,
      showEffects: true,
    },
    signer: signer,
  });
};
