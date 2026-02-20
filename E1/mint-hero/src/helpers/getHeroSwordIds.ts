import { SuiJsonRpcClient } from "@mysten/sui/jsonRpc";
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
  let swordsIds: string[] = [];

  // fallback to JsonRpc for this method as currently gRPC does not include the underlying objectId("childId")
  // will be fixed in the future
  const suiJsonRpcClient = new SuiJsonRpcClient({
    url: `https://fullnode.${ENV.SUI_NETWORK}.sui.io:443`,
    network: ENV.SUI_NETWORK,
  });

  // will be replaced by the listDynamicFields method in gRPC
  // const { dynamicFields } = suiClient.listDynamicFields({ parentId: id });
  const data = await suiJsonRpcClient.getDynamicFields({
    parentId: id,
  });
  
  // in gRPC, dynamicFields can be accessed directly as they are returned top-level by the listDynamicFields, not in "data"."data"
  for (const dfield of data.data) {
    // in gRPC: 'objectType' will be 'valueType' in the response
    if (dfield.objectType === `${ENV.PACKAGE_ID}::blacksmith::Sword`) {
      swordsIds.push(dfield.objectId);
    }
  }

  return swordsIds;
};
