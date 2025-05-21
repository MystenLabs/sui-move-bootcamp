import { suiClient } from "../suiClient";
import { Transaction } from "@mysten/sui/transactions";
import { getSigner } from "./getSigner";

const PUBLISHER_ID =
  "0xbc575f78a6b3931ed76a32b4381910420608429c8f0ad697dae72902852122f3";
const PACKAGE_ID =
  "0xe6c05fa1c873fe007adf194f17f33b5d120f210dd6503a9efb642823117a8d43";

export const getHeroWithDisplay = async (id: string) => {
  // get object with display
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

  const tx = new Transaction();

  const [display] = tx.moveCall({
    target: "0x2::display::new_with_fields",
    arguments: [
      tx.object(PUBLISHER_ID),
      tx.pure.vector("string", Object.keys(fields)),
      tx.pure.vector("string", Object.values(fields)),
    ],
    typeArguments: [`${PACKAGE_ID}::hero::Hero`],
  });

  // update display
  tx.moveCall({
    target: "0x2::display::update_version",
    arguments: [display],
    typeArguments: [`${PACKAGE_ID}::hero::Hero`],
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
