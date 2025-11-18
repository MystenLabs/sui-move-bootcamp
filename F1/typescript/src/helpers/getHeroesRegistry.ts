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
  const registry = await suiClient.getObject({
    id: ENV.HEROES_REGISTRY_ID,
    options: {
      showContent: true,
    },
  });
  if (!registry.data) {
    return {
      ids: [],
      counter: 0,
    };
  }
  const content = registry.data.content as Extract<
    SuiParsedData,
    {
      dataType: "moveObject";
    }
  >;
  const fields = content.fields as {
    ids: string[];
    counter: string;
  };
  return {
    ids: fields.ids,
    counter: parseInt(fields.counter),
  };
};
