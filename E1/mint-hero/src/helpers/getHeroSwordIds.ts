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
  const { dynamicFields } = await suiClient.listDynamicFields({
    parentId: id,
  });

  let swordsIds: string[] = [];

  for (const field of dynamicFields) {
    // quick shorthand to skip non-dynamic object fields, you might want to fully parse it and not checked with "includes"
    if(!field.type.includes("dynamic_object_field")) {
      continue;
    }

    const dof = await suiClient.core.getDynamicObjectField({
      parentId: id,
      name: field.name
    });

    if(dof.object.type === `${ENV.PACKAGE_ID}::blacksmith::Sword`) {
      swordsIds.push(dof.object.objectId);
    }
  }

  return swordsIds;
};
