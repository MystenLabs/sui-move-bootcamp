import { SuiClient, SuiParsedData, SuiTransactionBlockResponse } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { Keypair } from '@mysten/sui/cryptography';
import { deriveDynamicFieldID } from '@mysten/sui/utils';
import { bcs } from '@mysten/sui/bcs';
import { PublishSingleton } from './publish';

type KioskListingFields = {
    id: {
        id: string;
    };
    name: {
        type: "0x2::kiosk::Listing";
        fields: {
            id: string;
            is_exclusive: boolean;
        };
    };
    value: string;
};
type KioskOwnerCapFields = {
    for: string;
    id: {
        id: string;
    };
};
type PersonalKioskCapFields = {
    id: {
        id: string;
    };
    cap: { type: '0x2::kiosk::KioskOwnerCap'; fields: KioskOwnerCapFields; };
};
type RoyaltyRuleConfigDFFields = {
    id: {
        id: string;
    };
    name: {
        type: `0x2::transfer_policy::RuleKey<${string}::royalty_rule::Rule>`;
        fields: { dummy_field: false; };
    };
    value: {
        type: `${string}::royalty_rule::Config`;
        fields: {
            amount_bp: number;
            min_amount: string;
        };
    };
};
type KioskListingParsedData = Extract<SuiParsedData, { dataType: 'moveObject' }> & { fields: KioskListingFields };
type KioskOwnerCapParsedData = Extract<SuiParsedData, { dataType: 'moveObject' }> & { fields: KioskOwnerCapFields };
type PersonalKioskCapParsedData = Extract<SuiParsedData, { dataType: 'moveObject' }> & { fields: PersonalKioskCapFields };
type RoyaltyRuleConfigDFParsedData = Extract<SuiParsedData, { dataType: 'moveObject' }> & { fields: RoyaltyRuleConfigDFFields };

type KioskData = {
    id: string;
    capId: string;
    isPersonal: boolean;
};

export async function createKiosk(client: SuiClient, signer: Keypair): Promise<SuiTransactionBlockResponse> {
    const transaction = new Transaction();
    const [kiosk, cap] = transaction.moveCall({
        target: `0x2::kiosk::new`,
    });

    transaction.moveCall({
        target: `0x2::transfer::public_share_object`,
        arguments: [kiosk],
        typeArguments: ["0x2::kiosk::Kiosk"],
    });

    transaction.transferObjects([cap], signer.toSuiAddress());

    const resp = await client.signAndExecuteTransaction({
        transaction,
        signer,
        options: {
            showEffects: true,
            showObjectChanges: true,
        }
    });
    if (resp.effects?.status.status !== 'success') {
        throw new Error(`Something went wrong creating kiosk:\n${JSON.stringify(resp, null, 2)}`)
    }
    await client.waitForTransaction({ digest: resp.digest });
    return resp;
}

export async function createPersonalKiosk(client: SuiClient, signer: Keypair): Promise<SuiTransactionBlockResponse> {

    const transaction = new Transaction();
    const [kiosk, cap] = transaction.moveCall({
        target: `0x2::kiosk::new`,
    });

    // Task: Make `kiosk` personal.
    const [pcap] = transaction.moveCall({
        target: `${PublishSingleton.rulesPackageId()}::personal_kiosk::new`,
        arguments: [kiosk, cap]
    });

    transaction.moveCall({
        target: `${PublishSingleton.rulesPackageId()}::personal_kiosk::transfer_to_sender`,
        arguments: [pcap]
    });

    transaction.moveCall({
        target: `0x2::transfer::public_share_object`,
        arguments: [kiosk],
        typeArguments: ["0x2::kiosk::Kiosk"],
    });


    const resp = await client.signAndExecuteTransaction({
        transaction,
        signer,
        options: {
            showEffects: true,
            showObjectChanges: true,
        }
    });
    if (resp.effects?.status.status !== 'success') {
        throw new Error(`Something went wrong creating kiosk:\n${JSON.stringify(resp, null, 2)}`)
    }
    await client.waitForTransaction({ digest: resp.digest });
    return resp;
}

export async function placeAndListInKiosk({ client, signer, kiosk, swordId, price }: {
    client: SuiClient;
    signer: Keypair;
    kiosk?: {
        id: string;
        capId: string;
    };
    swordId: string;
    price: number;
}): Promise<SuiTransactionBlockResponse> {

    // Find owned kiosk if not given
    if (!kiosk) {
        kiosk = await getKiosk(client, signer.toSuiAddress(), false);
    }
    if (!kiosk) {
        throw new Error(`No kiosk for address ${signer.toSuiAddress()}`);
    }

    const transaction = new Transaction();

    transaction.moveCall({
        target: `0x2::kiosk::place_and_list`,
        arguments: [
            transaction.object(kiosk.id),
            transaction.object(kiosk.capId),
            transaction.object(swordId),
            transaction.pure.u64(price)
        ],
        typeArguments: [`${PublishSingleton.packageId()}::sword::Sword`]
    });

    const resp = await client.signAndExecuteTransaction({
        transaction,
        signer,
        options: {
            showEffects: true,
            showObjectChanges: true
        }
    });
    if (resp.effects?.status.status !== 'success') {
        throw new Error(`Something went wrong placing and listing:\n${JSON.stringify(resp, null, 2)}`)
    }
    await client.waitForTransaction({ digest: resp.digest });
    return resp;
}

export async function purchase({ client, signer, fromKioskObjectId, swordId }: {
    client: SuiClient;
    signer: Keypair;
    fromKioskObjectId: string;
    swordId: string;
}): Promise<SuiTransactionBlockResponse> {
    // Get the signer Kiosk to lock the sword at
    const buyerKiosk = await getKiosk(client, signer.toSuiAddress(), true);
    if (!buyerKiosk) {
        throw new Error("You need a PersonalKiosk to buy this item");
    }
    // Find the kiosk Listing
    const dfKey = bcs.struct(
        '0x2::kiosk::Listing',
        { id: bcs.Address, is_exclusive: bcs.bool() }
    ).serialize({
        id: swordId,
        is_exclusive: false
    }).toBytes();
    const dfId = deriveDynamicFieldID(fromKioskObjectId, '0x2::kiosk::Listing', dfKey);

    const dfResp = await client.getObject({
        id: dfId,
        options: {
            showContent: true
        }
    });
    if (!dfResp.data) {
        throw new Error(`Could not find Listing for item ${swordId} under kiosk ${fromKioskObjectId}`);
    }
    const content = dfResp.data.content as KioskListingParsedData;
    const price = parseInt(content.fields.value);

    // Royalties
    const ruleConfigKeyType = `0x2::transfer_policy::RuleKey<${PublishSingleton.rulesPackageId()}::royalty_rule::Rule>`;
    const royaltiesConfigKey = bcs.struct(
        ruleConfigKeyType,
        { dummy_field: bcs.bool() }
    ).serialize({ dummy_field: false }).toBytes();
    const royaltyDfId = deriveDynamicFieldID(PublishSingleton.policyId(), ruleConfigKeyType, royaltiesConfigKey);
    const royaltyConfigResp = await client.getObject({
        id: royaltyDfId,
        options: {
            showContent: true
        }
    });
    if (!royaltyConfigResp.data) {
        throw new Error(`Could not find royalty rule config in policy: ${PublishSingleton.policyId()}`);
    }
    const royaltyContent = royaltyConfigResp.data.content as RoyaltyRuleConfigDFParsedData;
    const royalties_ = royaltyContent.fields.value.fields;
    const royalties = {
        basisPoints: royalties_.amount_bp,
        minRoyaltiesAmount: royalties_.min_amount
    };
    const royaltiesAmount = Math.max(price * royalties.basisPoints / 10000, parseInt(royalties.minRoyaltiesAmount));

    const transaction = new Transaction();

    const [payment, royaltiesPayment] = transaction.splitCoins(transaction.gas, [price.toString(), royaltiesAmount]);
    const [sword, request] = transaction.moveCall({
        target: '0x2::kiosk::purchase',
        arguments: [
            transaction.object(fromKioskObjectId),
            transaction.pure.address(swordId),
            payment
        ],
        typeArguments: [`${PublishSingleton.packageId()}::sword::Sword`]
    });

    // Task: Solve the rules regarding Sword purchases by
    // 1. Putting the sword in your PersonalKiosk (personal_kiosk_rule)
    // 2. Locking the sword in there (kiosk_lock_rule)
    // 3. Paying royalties (royalty_rule)

    // Lock the sword in our personal kiosk
    const personalCapArg = transaction.object(buyerKiosk.capId);
    const [cap, potato] = transaction.moveCall({
        target: `${PublishSingleton.rulesPackageId()}::personal_kiosk::borrow_val`,
        arguments: [personalCapArg]
    });

    const buyerKioskArg = transaction.object(buyerKiosk.id);
    transaction.moveCall({
        target: '0x2::kiosk::lock',
        arguments: [
            buyerKioskArg,
            cap,
            transaction.object(PublishSingleton.policyId()),
            sword
        ],
        typeArguments: [`${PublishSingleton.packageId()}::sword::Sword`]
    });

    transaction.moveCall({
        target: `${PublishSingleton.rulesPackageId()}::personal_kiosk::return_val`,
        arguments: [
            personalCapArg,
            cap,
            potato
        ],
    });

    // Prove lock rule
    transaction.moveCall({
        target: `${PublishSingleton.rulesPackageId()}::kiosk_lock_rule::prove`,
        arguments: [
            request,
            buyerKioskArg,
        ],
        typeArguments: [`${PublishSingleton.packageId()}::sword::Sword`]
    });

    // Prove personal kiosk rule
    transaction.moveCall({
        target: `${PublishSingleton.rulesPackageId()}::personal_kiosk_rule::prove`,
        arguments: [
            buyerKioskArg,
            request
        ],
        typeArguments: [`${PublishSingleton.packageId()}::sword::Sword`]
    });

    // Pay royalties
    transaction.moveCall({
        target: `${PublishSingleton.rulesPackageId()}::royalty_rule::pay`,
        arguments: [
            transaction.object(PublishSingleton.policyId()),
            request,
            royaltiesPayment
        ],
        typeArguments: [`${PublishSingleton.packageId()}::sword::Sword`]
    });


    // Resolve TransferRequest
    transaction.moveCall({
        target: '0x2::transfer_policy::confirm_request',
        arguments: [
            transaction.object(PublishSingleton.policyId()),
            request
        ],
        typeArguments: [`${PublishSingleton.packageId()}::sword::Sword`]
    });

    const resp = await client.signAndExecuteTransaction({
        transaction,
        signer,
        options: {
            showEffects: true,
            showObjectChanges: true,
        },
    });
    if (resp.effects?.status.status !== 'success') {
        throw new Error(`Something went wrong purchasing:\n${JSON.stringify(resp, null, 2)}`)
    }
    await client.waitForTransaction({ digest: resp.digest });
    return resp;
}

export async function getKiosk(client: SuiClient, owner: string, isPersonal: boolean): Promise<KioskData | undefined> {
    const StructType = isPersonal ? `${PublishSingleton.rulesPackageId()}::personal_kiosk::PersonalKioskCap` : "0x2::kiosk::KioskOwnerCap";

    let resp = await client.getOwnedObjects({
        owner,
        filter: {
            StructType
        },
        limit: 1,
        options: {
            showContent: true,
        },
    });
    const data = resp.data.at(0)?.data;
    if (!data) { return undefined; }

    const content = data.content as PersonalKioskCapParsedData | KioskOwnerCapParsedData;
    return {
        id: isPersonal
            ? (content as PersonalKioskCapParsedData).fields.cap.fields.for
            : (content as KioskOwnerCapParsedData).fields.for,
        capId: data.objectId,
        isPersonal
    };
}

