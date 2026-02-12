import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { mintHeroWithSword } from "../helpers/mintHeroWithSword";
import { parseCreatedObjectsIds } from "../helpers/parseCreatedObjectsIds";
import { getHeroSwordIds } from "../helpers/getHeroSwordIds";
import { suiClient } from "../suiClient";

describe("Mint a Hero NFT and equip a Sword", () => {
  let txResponse: SuiTransactionBlockResponse;
  let heroId: string | undefined;
  let swordId: string | undefined;

  beforeAll(async () => {
    txResponse = await mintHeroWithSword();
    await suiClient.waitForTransaction({ digest: txResponse.digest });
    console.log("Executed transaction with txDigest:", txResponse.digest);
  });

  test("Transaction Status", () => {
    expect(txResponse.effects).toBeDefined();
    expect(txResponse.effects!.status.status).toBe("success");
  });

  test("Created Hero and Sword", async () => {
    expect(txResponse.objectChanges).toBeDefined();
    const { heroesIds, swordsIds } = parseCreatedObjectsIds({
      objectChanges: txResponse.objectChanges!,
    });
    expect(heroesIds.length).toBe(1);
    expect(swordsIds.length).toBe(1);
    heroId = heroesIds[0];
    swordId = swordsIds[0];
  });

  test("Hero is equiped with a Sword", async () => {
    const heroSwordIds = await getHeroSwordIds(heroId!);
    expect(heroSwordIds.length).toBe(1);
    expect(heroSwordIds[0]).toBe(swordId);
  });
});
