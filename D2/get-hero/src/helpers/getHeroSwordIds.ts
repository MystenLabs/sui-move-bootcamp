import { ENV } from "../env";
import { suiClient } from "../suiClient";

/**
 * Gets the dynamic object fields attached to a hero object by the object's id.
 * For the scope of this exercise, we ignore pagination, and just fetch the first page.
 * Filters the objects and returns the object ids of the swords.
 */
export const getHeroSwordIds = async (id: string): Promise<string[]> => {
  const resp = { dynamicFields: [] }; // fetch dynamic fields from the object

  return resp.dynamicFields
      .filter(
      (
          {valueType}) => valueType === `${ENV.PACKAGE_ID}::blacksmith::Sword`
      )
      .map(({fieldId}) => fieldId)
};