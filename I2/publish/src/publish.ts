import { SuiClient, SuiObjectChangeCreated, SuiObjectChangePublished, SuiTransactionBlockResponse, getFullnodeUrl } from '@mysten/sui/client';
import { Keypair } from '@mysten/sui/cryptography';
import { ADMIN_KEYPAIR } from './consts';
import { Transaction } from '@mysten/sui/transactions';

import { execSync } from 'child_process';

export class PublishSingleton {
    private static instance: PublishSingleton | null = null;
    private publishResp: SuiTransactionBlockResponse;

    private constructor(publishResp: SuiTransactionBlockResponse) {
        this.publishResp = publishResp;
    }

    public static async publish(client?: SuiClient, keypair?: Keypair, packagePath?: string) {
        if (!client) {
            client = new SuiClient({ url: getFullnodeUrl('localnet') });
        }
        if (!keypair) {
            keypair = ADMIN_KEYPAIR;
        }
        if (!packagePath) {
            packagePath = `${__dirname}/../../fixed_supply`;
        }
        if (!PublishSingleton.instance) {
            const resp = await publishPackage(client, keypair, packagePath);
            PublishSingleton.instance = new PublishSingleton(resp);
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

    public static packageId(): string | undefined {
        return this.publishResponse().objectChanges?.find(
            (chng): chng is SuiObjectChangePublished =>
                chng.type === 'published'
        )?.packageId
    }

    public static freezer(): SuiObjectChangeCreated | undefined {
        return this.publishResponse().objectChanges?.find(
            (chng): chng is SuiObjectChangeCreated =>
                chng.type === 'created' && chng.objectType === `${this.packageId()}::silver::Freezer`
        );
    }

    public static treasuryCap(): SuiObjectChangeCreated | undefined {
        return this.publishResponse().objectChanges?.find(
            (chng): chng is SuiObjectChangeCreated =>
                chng.type === 'created' && chng.objectType === `0x2::coin::TreasuryCap<${this.packageId()}::silver::SILVER>`
        );
    }
}

export async function publishPackage(client: SuiClient, signer: Keypair, packagePath: string): Promise<SuiTransactionBlockResponse> {
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

    // Burn upgradeCap
    transaction.moveCall({
        target: "0x2::package::make_immutable",
        arguments: [upgradeCap]
    });

    return await client.signAndExecuteTransaction({
        transaction,
        signer,
        options: {
            showObjectChanges: true,
            showEffects: true,
        }
    });
}
