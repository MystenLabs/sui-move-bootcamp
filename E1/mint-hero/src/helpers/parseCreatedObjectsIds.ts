import { SuiClientTypes } from "@mysten/sui/client";
import { ENV } from "../env";

interface Args {
  objectChanges: SuiClientTypes.TransactionEffects["changedObjects"];
  objectTypes: Record<string, string>;
  // example output of objectTypes:
  // {
  // 'objectId': 'package::module::StructName'
  // 'objectId2': 'package::module::StructName2'
  // ...
  // }
}

interface Response {
  swordsIds: string[];
  heroesIds: string[];
}

/**
 * Parses the provided SuiObjectChange[].
 * Extracts the IDs of the created Heroes and Swords NFTs, filtering by objectType.
 * Optimized to keep O(n) complexity.
 */
export const parseCreatedObjectsIds = ({ objectChanges, objectTypes }: Args): Response => {
  const SWORD_TYPE = `${ENV.PACKAGE_ID}::blacksmith::Sword`;
  const HERO_TYPE = `${ENV.PACKAGE_ID}::hero::Hero`;

  let swordsIds: string[] = [];
  let heroesIds: string[] = [];

  // look for created objects which are swords or heroes
  for (const objectChange of objectChanges) {
    if (objectChange.idOperation !== "Created") {
      // skip non-created objects
      continue;
    }

    // Get the object id and type
    // all the objects in effects.changedObjects are always included in objectTypes, so no need to check if it exists
    // and could not throw error, but we leave the optional check for readability and better handling
    const objectId = objectChange.objectId;
    const objectType = objectTypes?.[objectId];

    // check(filter) if the object is a sword or a hero, and push
    if(objectType === SWORD_TYPE) {
      swordsIds.push(objectId);
    } else if(objectType === HERO_TYPE) {
      heroesIds.push(objectId);
    }
  }

  return {
    swordsIds,
    heroesIds
  };
};
