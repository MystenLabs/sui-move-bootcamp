import { SuiObjectResponse } from "@mysten/sui/client";

export interface Hero {
  id: string;
  health: string;
  stamina: string;
}

interface HeroContent {
  fields: {
    id: { id: string };
    health: string;
    stamina: string;
  };
}

/**
 * Parses the content of a hero object in a SuiObjectResponse.
 * Maps it to a Hero object.
 */
export const parseHeroContent = (objectResponse: SuiObjectResponse): Hero => {
  const content = objectResponse.data?.content as unknown as HeroContent;
  const fields = content.fields;

  return {
    id: fields.id.id,
    health: fields.health,
    stamina: fields.stamina,
  } as Hero;
};
