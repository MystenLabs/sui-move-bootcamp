import {
  getHeroWithDisplay,
  updateHeroDisplay,
} from "../helpers/display";

const HERO_ID =
  "0xa37b6937895226ee4a48f6543ff81354cc084cd5a26551a62112e8c31aa1e825";

describe("Display Handling", () => {
  it("View display", async () => {
    const objectWithDisplay = await getHeroWithDisplay(HERO_ID);
    const display = objectWithDisplay.data?.display;
    expect(display).toBeDefined();
    expect(display?.data).toBeDefined();
    expect(Object.keys(display?.data!)).toHaveLength(3);
    expect(display?.data?.name).toBe("hero");
    expect(display?.data?.image_url).toBe(
      "https://aggregator.walrus-testnet.walrus.space/v1/blobs/R0CTX3K8d73-nbOmr5dmMTMV5-KaUWIeCsHk4-Sl1-4"
    );
    expect(objectWithDisplay.data?.display?.data?.description).toBe(
      "hero - A true Hero of the Sui ecosystem!"
    );
  });

  it("Update display", async () => {
    const result = await updateHeroDisplay(
      HERO_ID,
      "website",
      "https://superhero.com",
      process.env.USER_SECRET_KEY!
    );
    expect(result.effects?.status?.status).toBe("success");

    const objectWithDisplay = await getHeroWithDisplay(HERO_ID);
    const display = objectWithDisplay.data?.display;
    expect(display).toBeDefined();
    expect(display?.data).toBeDefined();
    expect(Object.keys(display?.data!)).toHaveLength(4);
    expect(display?.data?.website).toBe("https://superhero.com");
  });
});
