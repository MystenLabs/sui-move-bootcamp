import { SuiGrpcClient } from "@mysten/sui/grpc";
import { Transaction } from "@mysten/sui/transactions";
import dotenv from "dotenv";
import { grpcClient } from "../utils/clients";
import { getSigner } from "./helpers/getSigner";

describe("User Registration Tests", () => {
  let client: SuiGrpcClient;
  let moduleName: string;
  let packageId: string;
  let usersCounterObjectId: string;

  beforeAll(async () => {
    dotenv.config();
    // Initialize Sui client for testnet
    client = grpcClient;

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
      include: {
        effects: true,
        events: true,
        objectChanges: true,
      }
    });
    
    // Assert
    expect(result).toBeDefined();
    expect(result.Transaction).toBeDefined();
    await client.waitForTransaction({ digest: result.Transaction!.digest }); // wait for propagation
    expect(result.FailedTransaction).toBeUndefined();
    expect(result.Transaction?.effects.status.success).toBe(true);

    // Log transaction details for debugging
    console.log("Transaction digest:", result.Transaction!.digest);
    console.log("Gas used:", result.Transaction!.effects.gasUsed);
  });
});
