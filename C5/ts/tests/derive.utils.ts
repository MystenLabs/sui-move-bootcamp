import type { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import type { Transaction } from "@mysten/sui/transactions";
import { getSigner } from "../src/helpers/getSigner";
import { suiClient } from "../src/suiClient";
import type { SuiClientTypes } from "@mysten/sui/client";

/**
 * Collection of utils used by tests
 * @param env configuration from the environment
 * @param signer configuration for signer
 * @dev DERIVED_STRUCT_KEY_SIGNATURE should NOT include the positional arguments, for example:
 * correct: DerivedStructKey
 * invalid: DerivedStructKey(address)
 */
export class TestUtils {
    env: { PARENT_OBJECT_ID: string, PACKAGE_ID: string, USER_SECRET_KEY: string, DERIVED_STRUCT_KEY_SIGNATURE: string };
    signer: { instance: Ed25519Keypair, address: string };

    constructor() {
        if (!process.env.PARENT_OBJECT_ID || !process.env.PACKAGE_ID || !process.env.USER_SECRET_KEY || !process.env.DERIVED_STRUCT_KEY_SIGNATURE) {
            throw new Error("All environment variables must be set");
        }

        this.env = {
            PACKAGE_ID: process.env.PACKAGE_ID,
            PARENT_OBJECT_ID: process.env.PARENT_OBJECT_ID,
            USER_SECRET_KEY: process.env.USER_SECRET_KEY,
            DERIVED_STRUCT_KEY_SIGNATURE: process.env.DERIVED_STRUCT_KEY_SIGNATURE
        }

        const _signer = getSigner({ secretKey: this.env.USER_SECRET_KEY });
        this.signer = {
            instance: _signer,
            address: _signer.getPublicKey().toSuiAddress()
        }
    }

    // Prepare Transaction
    prepareTransaction = (
        tx: Transaction,
        derivedObjectTarget: "incremental" | "address" | "string" | "struct",
        args: any[]
    ) => {
        tx.setGasBudget(1_000_000_0);

        const derivedObject = tx.moveCall({
            target: `${this.env.PACKAGE_ID}::objects::new_derived_${derivedObjectTarget}`,
            arguments: [tx.object(this.env.PARENT_OBJECT_ID), ...args],
        });

        tx.transferObjects([derivedObject], this.signer.address);
    }

    // Send Transaction
    sendTransaction = async (tx: Transaction) => {
        const transaction = await suiClient.signAndExecuteTransaction({
            transaction: tx,
            signer: this.signer.instance,
            include: {
                effects: true,
                objectTypes: true
            }
        });

        if (transaction.FailedTransaction) {
            throw new Error(`Transaction failed: ${transaction.FailedTransaction}`);
        }

        await suiClient.waitForTransaction({ digest: transaction.Transaction.digest });

        return transaction;
    }

    // Find a created derived object in a transaction by its type
    findCreatedDerivedObject = (
        response: SuiClientTypes.TransactionResult<{ effects: true, objectTypes: true }>["Transaction"],
        shortDerivedKeyType: "string" | "address" | "struct" | "incremental"
    ): SuiClientTypes.ChangedObject | undefined => {
        const objectTypeAsDerived = shortDerivedKeyType.charAt(0).toUpperCase() + shortDerivedKeyType.slice(1); // uppercase object type
        const fullObjectType = `${this.env.PACKAGE_ID}::objects::DerivedObject${objectTypeAsDerived}`; // package::module::StructName

        // find the object ID whose type matches
        const entry = Object
            .entries(response!.objectTypes)
            .find(([_, objType]) => objType === fullObjectType);
        if (!entry) return undefined;

        const [objectId] = entry;

        // ensure that specific object was created
        const createdObject = response!.effects.changedObjects.find(
            (obj) => obj.objectId === objectId && obj.idOperation === "Created"
        );
        if (!createdObject) return undefined;

        return createdObject;
    }

    // Get current incremental counter of parent object ID by querying its field
    getCurrentIncrementalCounter = async(): Promise<number> => {
        const response = await suiClient.getObject({
            objectId: this.env.PARENT_OBJECT_ID,
            include: {
                json: true
            }
        });

        return Number((response.object.json as { incremental_counter: string }).incremental_counter);
    }

    // Helper function to get the Full key of `DerivedObjectStruct` derived object
    getDerivedObjectStructKey = () => {
        return `${this.env.PACKAGE_ID}::objects::${this.env.DERIVED_STRUCT_KEY_SIGNATURE}`;
    }
}
