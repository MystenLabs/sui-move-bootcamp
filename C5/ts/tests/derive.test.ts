import { bcs } from "@mysten/sui/bcs";
import { Transaction } from "@mysten/sui/transactions";
import { deriveObjectIDFromParent } from "../src/helpers/deriveObjectID";
import { getSigner } from "../src/helpers/getSigner";
import { TYPE_TAGS } from "../src/helpers/typeTags";
import { TestUtils } from "./derive.utils";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { suiClient } from "../src/suiClient";

/************************************************
    Configuration
 ************************************************/
let testUtils: TestUtils;

/************************************************
    Test Hooks
 ************************************************/
beforeAll(async () => {
    testUtils = new TestUtils();
});

/************************************************
    Tests
 ************************************************/
describe('Derived Objects', () => {

    it("Should create a new String Derived Object", async () => {
        // derived key, using Date.now().toString() to ensure no duplicate string fields
        const derivedKey = "RANDOM_STRING" + Date.now().toString();

        // determine the expected derived object ID offchain
        const expectedDerivedObjectID = deriveObjectIDFromParent(TYPE_TAGS.STRING, derivedKey, bcs.String);

        // prepare tx
        const tx = new Transaction();
        testUtils.prepareTransaction(tx, "string", [tx.pure.string(derivedKey)]);

        // send tx and get output
        const transaction = await testUtils.sendTransaction(tx);

        // find created object ID and assert
        const createdObject = testUtils.findCreatedDerivedObject(transaction.Transaction, "string");
        expect(createdObject?.objectId).toBe(expectedDerivedObjectID);
    });

    it("Should create a new Address Derived Object", async () => {
        // derived key, using a random address
        const derivedKey = new Ed25519Keypair().getPublicKey().toSuiAddress();

        // determine the expected derived object ID offchain
        const expectedDerivedObjectID = deriveObjectIDFromParent(TYPE_TAGS.ADDRESS, derivedKey, bcs.Address);

        // prepare tx
        const tx = new Transaction();
        testUtils.prepareTransaction(tx, "address", [tx.pure.address(derivedKey)]);

        // send tx and get output
        const transaction = await testUtils.sendTransaction(tx);

        // find created object ID and assert
        const createdObject = testUtils.findCreatedDerivedObject(transaction.Transaction, "address");
        expect(createdObject?.objectId).toBe(expectedDerivedObjectID);
    });

    it("Should create a new Incremental(u64) Derived Object", async () => {
        // derived key, using the current incremental counter of the parent object as it is in the contract
        const derivedKey = await testUtils.getCurrentIncrementalCounter();

        // determine the expected derived object ID offchain
        const expectedDerivedObjectID = deriveObjectIDFromParent(TYPE_TAGS.U64, derivedKey, bcs.U64);

        // prepare tx
        const tx = new Transaction();
        testUtils.prepareTransaction(tx, "incremental", []);

        // send tx and get output
        const transaction = await testUtils.sendTransaction(tx);

        // find created object ID and assert
        const createdObject = testUtils.findCreatedDerivedObject(transaction.Transaction, "incremental");
        expect(createdObject?.objectId).toBe(expectedDerivedObjectID);
    });

    it("Should create a new Derived Object Struct with Key", async () => {
        // derived key, using a random address
        const derivedKey = new Ed25519Keypair().getPublicKey().toSuiAddress();

        // determine the expected derived object ID offchain
        const expectedDerivedObjectID = deriveObjectIDFromParent(testUtils.getDerivedObjectStructKey(), derivedKey, bcs.Address);

        // prepare tx
        const tx = new Transaction();
        testUtils.prepareTransaction(tx, "struct", [tx.pure.address(derivedKey)]);

        // send tx and get output
        const transaction = await testUtils.sendTransaction(tx);

        // find created object ID and assert
        const createdObject = testUtils.findCreatedDerivedObject(transaction.Transaction, "struct");
        expect(createdObject?.objectId).toBe(expectedDerivedObjectID);
    });

    // Additional test to showcase how derivedObjects could be used for reverse search (desc. order) on Incremental Indexes, e.g. for indexing
    it("Should search for Derived Incremental Objects in reversing(descending) order", async () => {
        // get the current incremental counter of the parent object
        const currentIncrementalCounter = await testUtils.getCurrentIncrementalCounter();
        if (currentIncrementalCounter == 0) { return; }

        // prepare loop items: max items to query, and lastItem index
        const maxItemsToQuery = Math.min(10, currentIncrementalCounter);
        const lastItem = currentIncrementalCounter - 1;

        // find derived keys: (parentId + itemIndex)
        const derivedKeys = Array.from({ length: maxItemsToQuery }, (_, k) => {
            return deriveObjectIDFromParent(TYPE_TAGS.U64, lastItem - k, bcs.U64)
        });
        
        // query objects and catching errors if any
        // note: this test wouldn't pass if items have been deleted, in that case a custom error handling
        // should be performed
        const queriedObjects = await suiClient.getObjects({
            objectIds: derivedKeys,
        });
        const validObjects = queriedObjects.objects.filter((obj) => !(obj instanceof Error));
        expect(validObjects.length).toBe(maxItemsToQuery);
    });

});
