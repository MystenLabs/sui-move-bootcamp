import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { coinWithBalance, Transaction } from "@mysten/sui/transactions";
import { suiClient } from "../suiClient";
import { getSigner } from "./getSigner";

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
}: Args): Promise<SuiTransactionBlockResponse> => {
  const tx = new Transaction();

  // const coin = tx.splitCoins(tx.gas, [amount]);
  tx.transferObjects(
    [
      coinWithBalance({
        type: "0x2::sui::SUI",
        balance: amount,
        useGasCoin: true,
      }),
    ],
    recipientAddress
  );

  return suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: getSigner({ secretKey: senderSecretKey }),
    options: {
      showEffects: true,
      showBalanceChanges: true,
    },
  });
};
