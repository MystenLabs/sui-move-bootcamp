import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { getSigner } from "./helpers/getSigner";
import dotenv from "dotenv";

describe("User Registration Tests", () => {
  let client: SuiClient;
  let moduleName: string;
  let packageId: string;
  let usersCounterObjectId: string;

  beforeAll(async () => {
    dotenv.config();
    // Initialize Sui client for testnet
    client = new SuiClient({ url: getFullnodeUrl("testnet") });

    // Get package ID and shared object from environment
    packageId = process.env.PACKAGE_ID || "";
    usersCounterObjectId = process.env.USERS_COUNTER_OBJECT_ID || "";
    moduleName = process.env.MODULE_NAME || "";

    if (!packageId || !usersCounterObjectId) {
      throw new Error(
        "PACKAGE_ID and USERS_COUNTER_OBJECT_ID must be set in environment"
      );
    }
  });

  test("should successfully register a new user", async () => {
    // Arrange
    const userName = `TestUser_${Date.now()}`;
    const tx = new Transaction();

    // Build the moveCall transaction
    tx.moveCall({
      target: `${packageId}::${moduleName}::register_user`,
      arguments: [tx.pure.string(userName), tx.object(usersCounterObjectId)],
    });

    // Act
    const result = await client.signAndExecuteTransaction({
      signer: getSigner({ secretKey: process.env.PRIVATE_KEY! }),
      transaction: tx,
      options: {
        showEffects: true,
        showEvents: true,
        showObjectChanges: true,
      },
    });
    await client.waitForTransaction({ digest: result.digest });

    // Assert
    expect(result).toBeDefined();
    expect(result.effects?.status.status).toBe("success");

    // Log transaction details for debugging
    console.log("Transaction digest:", result.digest);
    console.log("Gas used:", result.effects?.gasUsed);
  });
});
