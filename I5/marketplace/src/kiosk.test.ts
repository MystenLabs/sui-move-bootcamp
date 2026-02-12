import { SuiClient, SuiObjectChangeMutated, getFullnodeUrl } from "@mysten/sui/client";
import { PublishSingleton } from "./publish";
import { createKiosk, createPersonalKiosk, placeAndListInKiosk, purchase } from "./kiosk";
import { ADMIN_KEYPAIR, BUYER_KEYPAIR } from "./consts";
import { createSword } from "./create-sword";


describe("Kiosk operations", () => {
    let client: SuiClient;
    const admin = ADMIN_KEYPAIR;
    const buyer = BUYER_KEYPAIR;

    beforeAll(async () => {
        client = new SuiClient({ url: getFullnodeUrl('localnet') });
        await PublishSingleton.publish({client, signer: admin});
        await createKiosk(client, admin);
        await createPersonalKiosk(client, buyer);// TODO personal
    }, 20000);


    it("Lists and purchases from Kiosk", async () => {
        const swordResp = await createSword({
            client,
            signer: admin,
            name: "A Sword",
            damage: 10,
            effects: ["An effect"]
        });
        if (swordResp.effects?.status.status !== 'success') {
            throw new Error(`Something went wrong creating sword:\n${JSON.stringify(swordResp, null, 2)}`)
        }
        const swordId = swordResp.effects?.created?.at(0)?.reference.objectId;
        if (!swordId) {
            throw new Error("Expected one created object-id");
        }

        const listingResp = await placeAndListInKiosk({
            client,
            signer: admin,
            swordId,
            price: 5000
        });
        if (listingResp.effects?.status.status !== 'success') {
            throw new Error(`Something went wrong listing sword:\n${JSON.stringify(listingResp, null, 2)}`)
        }

        const kioskChange = listingResp.objectChanges?.find((chng): chng is SuiObjectChangeMutated => {
            return chng.type === 'mutated' && chng.objectType === '0x2::kiosk::Kiosk';
        });
        if (!kioskChange) {
            throw new Error("Expected Kiosk mutated-object-change");
        }

        const purchaseResp = await purchase({
            client,
            signer: buyer,
            fromKioskObjectId: kioskChange.objectId,
            swordId,
        });
        if (purchaseResp.effects?.status.status !== 'success') {
            throw new Error(`Something went wrong purchasing sword:\n${JSON.stringify(purchaseResp, null, 2)}`)
        }
    }, 20000);
});
