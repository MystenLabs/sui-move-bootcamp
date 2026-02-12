import { Transaction } from "@mysten/sui/transactions";
import { suiClient } from "../suiClient";
import { getSigner } from "./getSigner";
import { ENV } from "../env";

export const adminCreateHero = async (name: string) => {
  const adminSigner = getSigner({ secretKey: ENV.ADMIN_SECRET_KEY });
  const userSigner = getSigner({ secretKey: ENV.USER_SECRET_KEY });
  const tx = new Transaction();

  const hero = tx.moveCall({
    target: `${ENV.PACKAGE_ID}::df_hero::create_hero`,
    arguments: [
      tx.object(ENV.ADMIN_CAP_ID),
      tx.pure.string(name),
      tx.pure.u64(100),
    ],
  });

  tx.moveCall({
    target: `0x2::transfer::public_transfer`,
    arguments: [hero, tx.pure.address(userSigner.toSuiAddress())],
    typeArguments: [`${ENV.PACKAGE_ID}::df_hero::Hero`],
  });

  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    options: {
      showObjectChanges: true,
      showEffects: true,
    },
    signer: adminSigner,
  });

  await suiClient.waitForTransaction({
    digest: result.digest,
  });

  return result;
};

export const adminCreateArena = async () => {
  const adminSigner = getSigner({ secretKey: ENV.ADMIN_SECRET_KEY });
  const tx = new Transaction();

  tx.moveCall({
    target: `${ENV.PACKAGE_ID}::df_hero::create_arena`,
    arguments: [tx.object(ENV.ADMIN_CAP_ID)],
  });

  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    options: {
      showObjectChanges: true,
      showEffects: true,
    },
    signer: adminSigner,
  });

  await suiClient.waitForTransaction({
    digest: result.digest,
  });

  return result;
};

export const userAddHeroToTheArena = async (
  arenaId: string,
  heroId: string
) => {
  const userSigner = getSigner({ secretKey: ENV.USER_SECRET_KEY });
  const tx = new Transaction();

  tx.moveCall({
    target: `${ENV.PACKAGE_ID}::df_hero::add_hero_to_arena`,
    arguments: [
      tx.object(arenaId),
      tx.pure.address(userSigner.toSuiAddress()),
      tx.object(heroId),
    ],
  });

  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    options: {
      showObjectChanges: true,
      showEffects: true,
    },
    signer: userSigner,
  });

  await suiClient.waitForTransaction({
    digest: result.digest,
  });

  return result;
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

export const getHeroFromArena = async (arenaId: string) => {
  const arenaDFs = await suiClient.getDynamicFields({
    parentId: arenaId,
  });
  const hero = await suiClient.getDynamicFieldObject({
    parentId: arenaId,
    name: arenaDFs.data[0].name,
  });
  return hero;
};
