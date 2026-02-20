import { ENV } from "../env";
import { suiClient } from "../suiClient";

/**
 * Gets the dynamic object fields attached to a hero object by the object's id.
 * To get the names dynamic fields and dynamic object fields, we use the listDynamicFields method.
 * To get the Object IDs of the dynamic object fields, we use the getDynamicObjectField method.
 * For the scope of this exercise, we ignore pagination, and just fetch the first page.
 * Filters the objects and returns the object ids of the swords.
 */
export const getHeroSwordIds = async (id: string): Promise<string[]> => {
  // TODO implement this function
  return [];
};
