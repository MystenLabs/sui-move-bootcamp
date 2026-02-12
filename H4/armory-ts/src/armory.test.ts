import { SuiClient, SuiParsedData, SuiTransactionBlockResponse, getFullnodeUrl } from "@mysten/sui/client";
import { Keypair } from "@mysten/sui/cryptography";
import { Transaction } from "@mysten/sui/transactions";
import { PublishSingleton } from "./publish";
import { ADMIN_KEYPAIR } from "./consts";

export async function mintSwordsInArmory({ client, signer, nSwords, attack }: {
    client: SuiClient,
    signer: Keypair,
    armoryId: string,
    nSwords: number,
    attack: number,
}): Promise<SuiTransactionBlockResponse> {
    const txb = new Transaction();

    txb.moveCall({
        target: `${PublishSingleton.packageId()}::armory::mint_swords`,
        arguments: [
            txb.object(PublishSingleton.armoryId()),
            txb.pure.u64(nSwords),
            txb.pure.u64(attack),
        ]
    });

    txb.setGasBudget(50_000_000_000n);
    const resp = await client.signAndExecuteTransaction({
        transaction: txb,
        signer,
        options: {
            showObjectChanges: true,
            showEffects: true,
        }
    });

    if (resp.effects?.status.status !== 'success') {
        throw new Error(`Failure during mass mint transaction:\n${JSON.stringify(resp, null, 2)}`);
    }
    await client.waitForTransaction({ digest: resp.digest });
    return resp;
}

describe("Armory", () => {
    let client: SuiClient;
    const admin = ADMIN_KEYPAIR;
    const swordsToMint = 6000;

    beforeAll(async () => {
        client = new SuiClient({ url: getFullnodeUrl('localnet') });
        await PublishSingleton.publish(client, admin);
    }, 10000);

    it(`Mint ${swordsToMint} or more Swords`, async () => {

        // Task 1: Resolve max-new-objects per tx limit
        // Task 2: Resolve max-object-size for Armory
        // Task 3: Resolve max cache objects (max dynamic field creations)
        const swordsPerMint = 1000;
        for (let i = 0; i < swordsToMint / swordsPerMint + (swordsToMint % swordsPerMint === 0 ? 0 : 1); i++) {
            const swordResp = await mintSwordsInArmory({
                client,
                signer: admin,
                armoryId: PublishSingleton.armoryId(),
                nSwords: swordsPerMint,
                attack: 10,
            });
            if (swordResp.effects?.status.status !== 'success') {
                throw new Error(`Something went wrong creating sword:\n${JSON.stringify(swordResp, null, 2)}`)
            }
            // console.log(`Minted ${swordsPerMint} swords`);
        }
    }, 60000);

    // Task 4: Claim storage rebate before dropping table.
    it(`Destroy Armory`, async () => {
        type MoveObjectParsedData = Extract<SuiParsedData, { dataType: 'moveObject' }>;
        type ArmoryObjectParsedData = MoveObjectParsedData & {
            fields: {
                id: { id: string };
                swords: MoveObjectParsedData & {
                    fields: {
                        id: { id: string };
                        size: string;
                    };
                };
                index: string;
            };
        };

        let idx = 0;
        const step = 1000;
        const armoryObj = await client.getObject({
            id: PublishSingleton.armoryId(),
            options: {
                showContent: true
            }
        });
        const content = armoryObj.data?.content as ArmoryObjectParsedData;
        const nSwords = parseInt(content.fields.swords.fields.size);
        while (idx < nSwords) {
            const end_idx = idx + step > nSwords ? nSwords : idx + step;

            const txb = new Transaction();
            txb.moveCall({
                target: `${PublishSingleton.packageId()}::armory::destroy_sword_entries`,
                arguments: [
                    txb.object(PublishSingleton.armoryId()),
                    txb.pure.u64(idx),
                    txb.pure.u64(end_idx),
                ]
            });
            const rebateResp = await client.signAndExecuteTransaction({
                transaction: txb,
                signer: admin,
                options: {
                    showEffects: true,
                    showBalanceChanges: true,
                    showObjectChanges: true,
                }
            });
            if (rebateResp.effects?.status.status !== 'success') {
                throw new Error(`Something went wrong removing sword entries:\n${JSON.stringify(rebateResp, null, 2)}`)
            }
            await client.waitForTransaction({ digest: rebateResp.digest });

            idx = end_idx;
        }

        const emptyArmory = await client.getObject({
            id: PublishSingleton.armoryId(),
            options: {
                showContent: true
            }
        });
        const newContent = emptyArmory.data?.content as ArmoryObjectParsedData;
        const newSwords = parseInt(newContent.fields.swords.fields.size);
        expect(newSwords).toBe(0);

        const txb = new Transaction();
        txb.moveCall({
            target: `${PublishSingleton.packageId()}::armory::destroy`,
            arguments: [txb.object(PublishSingleton.armoryId())]
        });
        const destroyResp = await client.signAndExecuteTransaction({
            transaction: txb,
            signer: admin,
            options: {
                showEffects: true,
                showBalanceChanges: true,
                showObjectChanges: true,
            }
        });
        if (destroyResp.effects?.status.status !== 'success') {
            throw new Error(`Something went wrong removing sword entries:\n${JSON.stringify(destroyResp, null, 2)}`)
        }
    }, 60000);
});
