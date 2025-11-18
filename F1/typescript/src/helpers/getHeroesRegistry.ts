import { SuiParsedData } from "@mysten/sui/client";
import { ENV } from "../env";
import { suiClient } from "../suiClient";

interface HeroesRegistry {
  ids: string[];
  counter: number;
}
/**
 * Gets the Heroes ids in the Hero Registry.
 * We need to get the Hero Registry object, and return the contents of the ids vector, along with the counter field.
 */
export const getHeroesRegistry = async (): Promise<HeroesRegistry> => {
  // TODO: Implement this function
  return {
    ids: [],
    counter: 0,
  };
};
