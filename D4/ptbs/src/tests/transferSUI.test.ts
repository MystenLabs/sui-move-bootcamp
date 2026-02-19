import { MIST_PER_SUI } from "@mysten/sui/utils";
import { ENV } from "../env";
import { transferSUI } from "../helpers/transferSUI";
import { parseBalanceChanges } from "../helpers/parseBalanceChanges";
import { getAddress } from "../helpers/getAddress";
import { SuiClientTypes } from "@mysten/sui/client";

const AMOUNT = 0.01 * Number(MIST_PER_SUI);

describe("Transfer SUI amount", () => {
  let txResult: SuiClientTypes.TransactionResult;
  let txResponse: SuiClientTypes.Transaction;

  beforeAll(async () => {
    txResult = await transferSUI({
      amount: AMOUNT,
      senderSecretKey: ENV.USER_SECRET_KEY,
      recipientAddress: ENV.RECIPIENT_ADDRESS,
    });
    if(!txResult.Transaction) throw new Error("Transaction failed");
    txResponse = txResult.Transaction;
    console.log("Executed transaction with txDigest:", txResponse.digest);
  });

  test("Transaction Status", async () => {
    expect(txResponse.digest).toBeDefined();
    expect(txResponse.status.success).toBe(true);
  });

  test("SUI Balance Changes", async () => {
    expect(txResponse.balanceChanges).toBeDefined();
    const balanceChanges = parseBalanceChanges({
      balanceChanges: txResponse.balanceChanges!,
      senderAddress: getAddress({ secretKey: ENV.USER_SECRET_KEY }),
      recipientAddress: ENV.RECIPIENT_ADDRESS,
    });
    expect(balanceChanges.recipientSUIBalanceChange).toBe(AMOUNT);
    expect(balanceChanges.senderSUIBalanceChange).toBeLessThan(-AMOUNT);
  });
});
