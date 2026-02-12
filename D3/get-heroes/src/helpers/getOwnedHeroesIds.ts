import { ENV } from "../env";
import { suiClient } from "../suiClient";

/**
 * Gets all of the Hero NFTs owned by the given address.
 * Returns an array of their Object Ids.
 */
export const getOwnedHeroesIds = async (owner: string) => {
  let allHeroesIds: string[] = [];
  let nextCursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    console.log(`Getting Heroes with cursor: ${nextCursor}`);
    const {
      data,
      hasNextPage: tempHasNextPage,
      nextCursor: tempHasNextCursor,
    } = await suiClient.getOwnedObjects({
      owner,
      filter: {
        StructType: `${ENV.PACKAGE_ID}::hero::Hero`,
      },
      ...(nextCursor ? { cursor: nextCursor } : {}),
    });
    hasNextPage = tempHasNextPage;
    nextCursor = tempHasNextCursor;
    allHeroesIds.push(...data.map((hero) => hero.data!.objectId));
  }

  return allHeroesIds;
};
