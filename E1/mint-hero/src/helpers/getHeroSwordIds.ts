import { ENV } from "../env";
import { suiClient } from "../suiClient";

/**
 * Gets the dynamic object fields attached to a hero object by the object's id.
 * To get the names dynamic fields and dynamic object fields, we use the listDynamicFields method.
 * To get the Object IDs of the dynamic object fields, we use the field "childId".
 * For the scope of this exercise, we ignore pagination, and just fetch the first page.
 * Filters the objects and returns the object ids of the swords.
 */
export const getHeroSwordIds = async (id: string): Promise<string[]> => {
  let swordsIds: string[] = [];

  const { dynamicFields } = await suiClient.listDynamicFields({
    parentId: id,
  });
  
  // in gRPC, dynamicFields can be accessed directly as they are returned top-level by the listDynamicFields, not in "data"."data"
  for (const dfield of dynamicFields) {
    // in gRPC: 'objectType' is under 'valueType' in the response
    // we enforce dfield.childId to be not undefined (!) because we know that Sword is always a dof in this exercise
    if (dfield.valueType === `${ENV.PACKAGE_ID}::blacksmith::Sword`) {
      swordsIds.push(dfield.childId!);
    }
  }

  return swordsIds;
};
