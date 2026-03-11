import { Transaction } from "@mysten/sui/transactions";
import { ENV } from "../src/config/env";
import { suiClient } from "../src/config/client";
import { getSigner } from "../src/utils/signer";
import {
  extractGasInfo,
  extractGasFromEffects,
} from "../src/utils/gas";
import {
  writeDebugFile,
  appendDebugFile,
  formatHeader,
  formatSection,
  formatGasTable,
} from "../src/utils/debug";
import { GasResult, StoreId } from "../src/types/gas";

// ============================================================================
// CONFIG
// ============================================================================

const signer = getSigner();
const MODULE = `${ENV.PACKAGE_ID}::sample_module`;
const N_VALUES = [20, 50, 100];

// ============================================================================
// INTEGER STORAGE TESTS -> integers.txt
// Compares gas costs of vector<u8> vs vector<u256> for storing, reading, editing
// ============================================================================

describe("Integer Storage Gas Costs (u8 vs u256)", () => {
  const smallVectorIds: StoreId[] = [];
  const bigVectorIds: StoreId[] = [];

  beforeAll(() => {
    writeDebugFile("integers.txt", formatHeader("INTEGER STORAGE GAS COSTS (u8 vs u256)"));
    appendDebugFile("integers.txt", `Generated: ${new Date().toISOString()}\n`);
    appendDebugFile("integers.txt", `Network: ${ENV.SUI_NETWORK}\n`);
    appendDebugFile("integers.txt", `Package: ${ENV.PACKAGE_ID}\n`);
    appendDebugFile("integers.txt", "\nThis demonstrates the gas cost difference between storing\n");
    appendDebugFile("integers.txt", "small integers (u8, 1 byte) vs large integers (u256, 32 bytes)\n");
  });

  test("CREATE SmallVectorObject (vector<u8>) for n=20,50,100", async () => {
    const results: GasResult[] = [];

    for (const n of N_VALUES) {
      const tx = new Transaction();
      tx.moveCall({
        target: `${MODULE}::new_small_vector`,
        arguments: [tx.pure.u64(n)],
      });

      const response = await suiClient.signAndExecuteTransaction({
        transaction: tx,
        signer,
        options: { showEffects: true, showObjectChanges: true },
      });

      expect(response.effects?.status.status).toBe("success");

      const created = response.objectChanges?.find(
        (c) => c.type === "created" && c.objectType.includes("SmallVectorObject")
      );
      if (created && created.type === "created") {
        smallVectorIds.push({ n, id: created.objectId });
      }

      if (response.effects?.gasUsed) {
        results.push({ n, gas: extractGasFromEffects(response.effects.gasUsed) });
      }
    }

    appendDebugFile("integers.txt", formatSection("CREATE SmallVectorObject (vector<u8>)"));
    appendDebugFile("integers.txt", "Stores n u8 values (1 byte each)\n");
    appendDebugFile("integers.txt", formatGasTable(results));

    (global as any).smallVectorIds = smallVectorIds;
  });

  test("CREATE BigVectorObject (vector<u256>) for n=20,50,100", async () => {
    const results: GasResult[] = [];

    for (const n of N_VALUES) {
      const tx = new Transaction();
      tx.moveCall({
        target: `${MODULE}::new_big_vector`,
        arguments: [tx.pure.u64(n)],
      });

      const response = await suiClient.signAndExecuteTransaction({
        transaction: tx,
        signer,
        options: { showEffects: true, showObjectChanges: true },
      });

      expect(response.effects?.status.status).toBe("success");

      const created = response.objectChanges?.find(
        (c) => c.type === "created" && c.objectType.includes("BigVectorObject")
      );
      if (created && created.type === "created") {
        bigVectorIds.push({ n, id: created.objectId });
      }

      if (response.effects?.gasUsed) {
        results.push({ n, gas: extractGasFromEffects(response.effects.gasUsed) });
      }
    }

    appendDebugFile("integers.txt", formatSection("CREATE BigVectorObject (vector<u256>)"));
    appendDebugFile("integers.txt", "Stores n u256 values (32 bytes each)\n");
    appendDebugFile("integers.txt", formatGasTable(results));

    (global as any).bigVectorIds = bigVectorIds;
  });

  test("READ SmallVectorObject - iterate through vector<u8>", async () => {
    const storeIds = (global as any).smallVectorIds as StoreId[] || smallVectorIds;
    if (!storeIds?.length) {
      appendDebugFile("integers.txt", formatSection("READ SmallVectorObject"));
      appendDebugFile("integers.txt", "⚠️ Skipped: No SmallVectorObject objects available\n");
      return;
    }

    const results: GasResult[] = [];

    for (const { n, id } of storeIds) {
      const tx = new Transaction();
      tx.moveCall({
        target: `${MODULE}::read_small_vector`,
        arguments: [tx.object(id)],
      });

      const result = await suiClient.devInspectTransactionBlock({
        sender: getSigner().toSuiAddress(),
        transactionBlock: await tx.build({ client: suiClient, onlyTransactionKind: true }),
      });

      const gas = extractGasInfo(result);
      expect(gas).not.toBeNull();
      if (gas) results.push({ n, gas });
    }

    appendDebugFile("integers.txt", formatSection("READ SmallVectorObject (vector<u8>)"));
    appendDebugFile("integers.txt", "Iterates through all u8 values and sums them\n");
    appendDebugFile("integers.txt", formatGasTable(results));
  });

  test("READ BigVectorObject - iterate through vector<u256>", async () => {
    const storeIds = (global as any).bigVectorIds as StoreId[] || bigVectorIds;
    if (!storeIds?.length) {
      appendDebugFile("integers.txt", formatSection("READ BigVectorObject"));
      appendDebugFile("integers.txt", "⚠️ Skipped: No BigVectorObject objects available\n");
      return;
    }

    const results: GasResult[] = [];

    for (const { n, id } of storeIds) {
      const tx = new Transaction();
      tx.moveCall({
        target: `${MODULE}::read_big_vector`,
        arguments: [tx.object(id)],
      });

      const result = await suiClient.devInspectTransactionBlock({
        sender: getSigner().toSuiAddress(),
        transactionBlock: await tx.build({ client: suiClient, onlyTransactionKind: true }),
      });

      const gas = extractGasInfo(result);
      expect(gas).not.toBeNull();
      if (gas) results.push({ n, gas });
    }

    appendDebugFile("integers.txt", formatSection("READ BigVectorObject (vector<u256>)"));
    appendDebugFile("integers.txt", "Iterates through all u256 values and sums them\n");
    appendDebugFile("integers.txt", formatGasTable(results));
  });

  test("EDIT SmallVectorObject - borrow_mut on vector<u8>", async () => {
    const storeIds = (global as any).smallVectorIds as StoreId[] || smallVectorIds;
    if (!storeIds?.length) {
      appendDebugFile("integers.txt", formatSection("EDIT SmallVectorObject"));
      appendDebugFile("integers.txt", "⚠️ Skipped: No SmallVectorObject objects available\n");
      return;
    }

    const results: GasResult[] = [];

    for (const { n, id } of storeIds) {
      const tx = new Transaction();
      tx.moveCall({
        target: `${MODULE}::edit_small_vector`,
        arguments: [tx.object(id)],
      });

      const response = await suiClient.signAndExecuteTransaction({
        transaction: tx,
        signer,
        options: { showEffects: true },
      });

      expect(response.effects?.status.status).toBe("success");

      if (response.effects?.gasUsed) {
        results.push({ n, gas: extractGasFromEffects(response.effects.gasUsed) });
      }
    }

    appendDebugFile("integers.txt", formatSection("EDIT SmallVectorObject (vector<u8>) - borrow_mut"));
    appendDebugFile("integers.txt", "Iterates and increments each u8 value using borrow_mut\n");
    appendDebugFile("integers.txt", formatGasTable(results));
  });

  test("EDIT BigVectorObject - borrow_mut on vector<u256>", async () => {
    const storeIds = (global as any).bigVectorIds as StoreId[] || bigVectorIds;
    if (!storeIds?.length) {
      appendDebugFile("integers.txt", formatSection("EDIT BigVectorObject"));
      appendDebugFile("integers.txt", "⚠️ Skipped: No BigVectorObject objects available\n");
      return;
    }

    const results: GasResult[] = [];

    for (const { n, id } of storeIds) {
      const tx = new Transaction();
      tx.moveCall({
        target: `${MODULE}::edit_big_vector`,
        arguments: [tx.object(id)],
      });

      const response = await suiClient.signAndExecuteTransaction({
        transaction: tx,
        signer,
        options: { showEffects: true },
      });

      expect(response.effects?.status.status).toBe("success");

      if (response.effects?.gasUsed) {
        results.push({ n, gas: extractGasFromEffects(response.effects.gasUsed) });
      }
    }

    appendDebugFile("integers.txt", formatSection("EDIT BigVectorObject (vector<u256>) - borrow_mut"));
    appendDebugFile("integers.txt", "Iterates and increments each u256 value using borrow_mut\n");
    appendDebugFile("integers.txt", formatGasTable(results));
  });
});

// ============================================================================
// LOOP TESTS -> loops.txt
// ============================================================================

describe("Loop Gas Costs", () => {
  beforeAll(() => {
    writeDebugFile("loops.txt", formatHeader("LOOP GAS COSTS"));
    appendDebugFile("loops.txt", `Generated: ${new Date().toISOString()}\n`);
    appendDebugFile("loops.txt", `Network: ${ENV.SUI_NETWORK}\n`);
    appendDebugFile("loops.txt", `Package: ${ENV.PACKAGE_ID}\n`);
  });

  test("loop_linear for n=20,50,100", async () => {
    const results: GasResult[] = [];

    for (const n of N_VALUES) {
      const tx = new Transaction();
      tx.moveCall({
        target: `${MODULE}::loop_linear`,
        arguments: [tx.pure.u64(n)],
      });

      const result = await suiClient.devInspectTransactionBlock({
        sender: getSigner().toSuiAddress(),
        transactionBlock: await tx.build({ client: suiClient, onlyTransactionKind: true }),
      });

      const gas = extractGasInfo(result);
      expect(gas).not.toBeNull();
      if (gas) results.push({ n, gas });
    }

    appendDebugFile("loops.txt", formatSection("loop_linear - O(n) complexity"));
    appendDebugFile("loops.txt", "Single loop iterating n times\n");
    appendDebugFile("loops.txt", formatGasTable(results));
  });

  test("loop_quadratic for n=20,50,100", async () => {
    const results: GasResult[] = [];

    for (const n of N_VALUES) {
      const tx = new Transaction();
      tx.moveCall({
        target: `${MODULE}::loop_quadratic`,
        arguments: [tx.pure.u64(n)],
      });

      const result = await suiClient.devInspectTransactionBlock({
        sender: getSigner().toSuiAddress(),
        transactionBlock: await tx.build({ client: suiClient, onlyTransactionKind: true }),
      });

      const gas = extractGasInfo(result);
      expect(gas).not.toBeNull();
      if (gas) results.push({ n, gas });
    }

    appendDebugFile("loops.txt", formatSection("loop_quadratic - O(n²) complexity"));
    appendDebugFile("loops.txt", "Nested loops: outer * inner = n² iterations\n");
    appendDebugFile("loops.txt", formatGasTable(results));
  });
});

// ============================================================================
// VECTOR STORE TESTS -> vectors.txt
// ============================================================================

describe("VectorStore Gas Costs", () => {
  const vectorStoreIds: StoreId[] = [];

  beforeAll(() => {
    writeDebugFile("vectors.txt", formatHeader("VECTOR STORE GAS COSTS"));
    appendDebugFile("vectors.txt", `Generated: ${new Date().toISOString()}\n`);
    appendDebugFile("vectors.txt", `Network: ${ENV.SUI_NETWORK}\n`);
    appendDebugFile("vectors.txt", `Package: ${ENV.PACKAGE_ID}\n`);
  });

  test("create VectorStore for n=20,50,100", async () => {
    const results: GasResult[] = [];

    for (const n of N_VALUES) {
      const tx = new Transaction();
      tx.moveCall({
        target: `${MODULE}::new_vector_store`,
        arguments: [tx.pure.u64(n)],
      });

      const response = await suiClient.signAndExecuteTransaction({
        transaction: tx,
        signer,
        options: { showEffects: true, showObjectChanges: true },
      });

      expect(response.effects?.status.status).toBe("success");

      const created = response.objectChanges?.find(
        (c) => c.type === "created" && c.objectType.includes("VectorStore")
      );
      if (created && created.type === "created") {
        vectorStoreIds.push({ n, id: created.objectId });
      }

      if (response.effects?.gasUsed) {
        results.push({ n, gas: extractGasFromEffects(response.effects.gasUsed) });
      }
    }

    appendDebugFile("vectors.txt", formatSection("CREATE VectorStore"));
    appendDebugFile("vectors.txt", "Creates a vector with n elements (0 to n-1)\n");
    appendDebugFile("vectors.txt", formatGasTable(results));

    (global as any).vectorStoreIds = vectorStoreIds;
  });

  test("find_in_vector_store - O(n) linear search", async () => {
    const storeIds = (global as any).vectorStoreIds as StoreId[] || vectorStoreIds;
    if (!storeIds?.length) {
      appendDebugFile("vectors.txt", formatSection("FIND in VectorStore"));
      appendDebugFile("vectors.txt", "⚠️ Skipped: No VectorStore objects available\n");
      return;
    }

    const results: GasResult[] = [];

    for (const { n, id } of storeIds) {
      const target = n - 1;

      const tx = new Transaction();
      tx.moveCall({
        target: `${MODULE}::find_in_vector_store`,
        arguments: [tx.object(id), tx.pure.u64(target)],
      });

      const result = await suiClient.devInspectTransactionBlock({
        sender: getSigner().toSuiAddress(),
        transactionBlock: await tx.build({ client: suiClient, onlyTransactionKind: true }),
      });

      const gas = extractGasInfo(result);
      expect(gas).not.toBeNull();
      if (gas) results.push({ n, gas });
    }

    appendDebugFile("vectors.txt", formatSection("FIND in VectorStore - O(n) linear search"));
    appendDebugFile("vectors.txt", "Searching for the LAST element (worst case)\n");
    appendDebugFile("vectors.txt", formatGasTable(results));
  });
});

// ============================================================================
// TABLE STORE TESTS -> tables.txt
// ============================================================================

describe("TableStore Gas Costs", () => {
  const tableStoreIds: StoreId[] = [];

  beforeAll(() => {
    writeDebugFile("tables.txt", formatHeader("TABLE STORE GAS COSTS"));
    appendDebugFile("tables.txt", `Generated: ${new Date().toISOString()}\n`);
    appendDebugFile("tables.txt", `Network: ${ENV.SUI_NETWORK}\n`);
    appendDebugFile("tables.txt", `Package: ${ENV.PACKAGE_ID}\n`);
  });

  test("create TableStore for n=20,50,100", async () => {
    const results: GasResult[] = [];

    for (const n of N_VALUES) {
      const tx = new Transaction();
      tx.moveCall({
        target: `${MODULE}::new_table_store`,
        arguments: [tx.pure.u64(n)],
      });

      const response = await suiClient.signAndExecuteTransaction({
        transaction: tx,
        signer,
        options: { showEffects: true, showObjectChanges: true },
      });

      expect(response.effects?.status.status).toBe("success");

      const created = response.objectChanges?.find(
        (c) => c.type === "created" && c.objectType.includes("TableStore")
      );
      if (created && created.type === "created") {
        tableStoreIds.push({ n, id: created.objectId });
      }

      if (response.effects?.gasUsed) {
        results.push({ n, gas: extractGasFromEffects(response.effects.gasUsed) });
      }
    }

    appendDebugFile("tables.txt", formatSection("CREATE TableStore"));
    appendDebugFile("tables.txt", "Creates a table with n key-value pairs (key: 0 to n-1)\n");
    appendDebugFile("tables.txt", formatGasTable(results));

    (global as any).tableStoreIds = tableStoreIds;
  });

  test("find_in_table_store - O(1) direct lookup", async () => {
    const storeIds = (global as any).tableStoreIds as StoreId[] || tableStoreIds;
    if (!storeIds?.length) {
      appendDebugFile("tables.txt", formatSection("FIND in TableStore"));
      appendDebugFile("tables.txt", "⚠️ Skipped: No TableStore objects available\n");
      return;
    }

    const results: GasResult[] = [];

    for (const { n, id } of storeIds) {
      const target = n - 1;

      const tx = new Transaction();
      tx.moveCall({
        target: `${MODULE}::find_in_table_store`,
        arguments: [tx.object(id), tx.pure.u64(target)],
      });

      const result = await suiClient.devInspectTransactionBlock({
        sender: getSigner().toSuiAddress(),
        transactionBlock: await tx.build({ client: suiClient, onlyTransactionKind: true }),
      });

      const gas = extractGasInfo(result);
      expect(gas).not.toBeNull();
      if (gas) results.push({ n, gas });
    }

    appendDebugFile("tables.txt", formatSection("FIND in TableStore - O(1) direct lookup"));
    appendDebugFile("tables.txt", "Searching for the LAST element (should be constant time)\n");
    appendDebugFile("tables.txt", formatGasTable(results));
  });
});

