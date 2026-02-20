import { suiClient } from "../suiClient";
import {SuiClientTypes} from "@mysten/sui/client";

/**
 * Uses SuiClient to get a hero object by its ID.
 * Uses the required SDK options to include the content and the type of the object in the response.
 */
export const getHero = async (id: string):
    Promise<SuiClientTypes.GetObjectResponse<any>> => {
  return suiClient.getObject({
    objectId: id,
    include: {
      json: true,
      content: true
    }
  });
};
