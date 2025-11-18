import { SuiParsedData } from "@mysten/sui/client";
import { suiClient } from "../suiClient";

/**
 * Gets the object id of a Weapon that is attached to a Hero object by the hero's object id.
 * We need to get the Hero object, and find the value of the corresponding nested field.
 */
export const getWeaponIdOfHero = async (
  heroId: string
): Promise<string | undefined> => {
  // TODO: Implement this function
  return undefined;
};
