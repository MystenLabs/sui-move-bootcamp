import { SuiClient, SuiObjectChangeCreated, SuiObjectChangePublished, SuiTransactionBlockResponse, getFullnodeUrl } from '@mysten/sui/client';
import { Keypair } from '@mysten/sui/cryptography';
import { ADMIN_KEYPAIR } from './consts';
import { Transaction } from '@mysten/sui/transactions';

import { execSync } from 'child_process';

export class PublishSingleton {
    private static instance: PublishSingleton | null = null;

    private constructor(
        private readonly publishResp: SuiTransactionBlockResponse,
        private readonly policyResp: SuiTransactionBlockResponse
    ) { }

    public static async publish(client?: SuiClient, signer?: Keypair, packagePath?: string) {
        client ??= new SuiClient({ url: getFullnodeUrl('localnet') });
        signer ??= ADMIN_KEYPAIR;
        packagePath ??= `${__dirname}/../../sword`;
        if (!PublishSingleton.instance) {
            const publishResp = await publishPackage(client, signer, packagePath);
            const packageId = findPublishedPackage(publishResp)?.packageId;
            if (!packageId) {
                throw new Error("Expected to find package published");
            }
            const publisherChng = findObjectChangeCreatedByType(
                publishResp,
                `0x2::package::Publisher`
            );
            if (!publisherChng) {
                throw new Error("Expected to find Publisher created");
            }
            const policyResp = await createPolicy({
                client,
                signer,
                packageId,
                publisherChng
            });
            PublishSingleton.instance = new PublishSingleton(publishResp, policyResp);
        }
    }

    private static getInstance(): PublishSingleton {
        if (!PublishSingleton.instance) {
            throw new Error("Use `async PublishSingleton.publish()` first");
        }
        return PublishSingleton.instance;
    }

    public static publishResponse(): SuiTransactionBlockResponse {
        return this.getInstance().publishResp;
    }

    public static packageId(): string {
        const packageChng = findPublishedPackage(this.publishResponse());
        if (!packageChng) {
            throw new Error("Expected to find package published");
        }
        return packageChng.packageId;
    }

    public static publisherObjectId(): string {
        const publisherChng = findObjectChangeCreatedByType(
            PublishSingleton.publishResponse(),
            `0x2::package::Publisher`
        );
        if (!publisherChng) {
            throw new Error("Expected to find Publisher created");
        }
        return publisherChng.objectId;
    }

    public static policyResponse(): SuiTransactionBlockResponse {
        return this.getInstance().policyResp;
    }

    public static policyId(): string {
        const policyChng = findObjectChangeCreatedByType(
            PublishSingleton.policyResponse(),
            `0x2::transfer_policy::TransferPolicy<${PublishSingleton.packageId()}::sword::Sword>`
        );
        if (!policyChng) {
            throw new Error("Expected to find Policy created-change");
        }
        return policyChng.objectId;
    }

    public static policyCapId(): string {
        const policyCapChng = findObjectChangeCreatedByType(
            PublishSingleton.policyResponse(),
            `0x2::transfer_policy::TransferPolicyCap<${PublishSingleton.packageId()}::sword::Sword>`
        );
        if (!policyCapChng) {
            throw new Error("Expected to find Policy created-change");
        }
        return policyCapChng.objectId;
    }
}

async function publishPackage(client: SuiClient, signer: Keypair, packagePath: string): Promise<SuiTransactionBlockResponse> {
    const transaction = new Transaction();

    const { modules, dependencies } = JSON.parse(
        execSync(`sui move build --dump-bytecode-as-base64 --path ${packagePath}`, {
            encoding: 'utf-8',
        }),
    );

    const upgradeCap = transaction.publish({
        modules,
        dependencies
    });

    transaction.transferObjects([upgradeCap], signer.toSuiAddress());

    const resp = await client.signAndExecuteTransaction({
        transaction,
        signer,
        options: {
            showObjectChanges: true,
            showEffects: true,
        }
    });
    if (resp.effects?.status.status !== 'success') {
        throw new Error(`Failure during publish transaction:\n${JSON.stringify(resp, null, 2)}`);
    }
    await client.waitForTransaction({ digest: resp.digest });
    return resp;
}

async function createPolicy({ client, signer, packageId, publisherChng }: {
    client: SuiClient,
    signer: Keypair,
    packageId: string,
    publisherChng: SuiObjectChangeCreated
}): Promise<SuiTransactionBlockResponse> {
    const transaction = new Transaction();
    transaction.moveCall({
        target: `0x2::transfer_policy::default`,
        arguments: [
            transaction.objectRef(publisherChng)
        ],
        typeArguments: [
            `${packageId}::sword::Sword`
        ]
    });
    const resp = await client.signAndExecuteTransaction({
        transaction,
        signer,
        options: {
            showObjectChanges: true,
            showEffects: true,
        }
    });
    if (resp.effects?.status.status !== 'success') {
        throw new Error(`Failure during polciy creation transaction:\n${JSON.stringify(resp, null, 2)}`);
    }
    await client.waitForTransaction({ digest: resp.digest });
    return resp;
}

function findPublishedPackage(resp: SuiTransactionBlockResponse): SuiObjectChangePublished | undefined {
    return resp.objectChanges?.find(
        (chng): chng is SuiObjectChangePublished =>
            chng.type === 'published'
    );
}

function findObjectChangeCreatedByType(resp: SuiTransactionBlockResponse, type: string): SuiObjectChangeCreated | undefined {
    return resp.objectChanges?.find(
        (chng): chng is SuiObjectChangeCreated =>
            chng.type === 'created' && chng.objectType === type
    );
}
