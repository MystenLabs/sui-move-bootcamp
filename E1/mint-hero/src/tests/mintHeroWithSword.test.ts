import { mintHeroWithSword } from "../helpers/mintHeroWithSword";
import { parseCreatedObjectsIds } from "../helpers/parseCreatedObjectsIds";
import { getHeroSwordIds } from "../helpers/getHeroSwordIds";
import { suiClient } from "../suiClient";
import { SuiClientTypes } from "@mysten/sui/client";

describe("Mint a Hero NFT and equip a Sword", () => {
  let txResult: SuiClientTypes.TransactionResult<{effects: true}>;
  let txResponse: SuiClientTypes.Transaction<{effects: true}>;
  let heroId: string | undefined;
  let swordId: string | undefined;

  beforeAll(async () => {
    txResult = await mintHeroWithSword();

    if (!txResult.Transaction) {
      throw new Error("Transaction failed");
    }

    txResponse = txResult.Transaction;
    await suiClient.waitForTransaction({ digest: txResponse.digest });
    console.log("Executed transaction with txDigest:", txResponse.digest);
  });

  test("Transaction Status", () => {
    expect(txResponse.effects).toBeDefined();
    expect(txResponse.effects!.status.success).toBe(true);
  });

  test("Created Hero and Sword", async () => {
    expect(txResponse.effects!.changedObjects).toBeDefined();
    const { heroesIds, swordsIds } = parseCreatedObjectsIds({
      objectChanges: txResponse.effects!.changedObjects!,
      objectTypes: txResponse.objectTypes!,
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
