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
  // TODO: Implement this function
  return {
    swordsIds: [],
    heroesIds: [],
  };
};
