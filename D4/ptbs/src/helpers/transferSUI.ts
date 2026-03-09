import { coinWithBalance, Transaction } from "@mysten/sui/transactions";
import { suiClient } from "../suiClient";
import { getSigner } from "./getSigner";
import { SuiClientTypes } from "@mysten/sui/client";

interface Args {
  amount: number;
  senderSecretKey: string;
  recipientAddress: string;
}

/**
 * Transfers the specified amount of SUI from the sender secret key to the recipient address.
 * Returns the transaction response, as it is returned by the SDK.
 */
export const transferSUI = async ({
  amount,
  senderSecretKey,
  recipientAddress,
}: Args): Promise<SuiClientTypes.TransactionResult> => {
  const tx = new Transaction();

  // TODO: Add the commands to the transaction

  return suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: getSigner({ secretKey: senderSecretKey }),
    include: {
      effects: true,
      balanceChanges: true,
    }
  });
};