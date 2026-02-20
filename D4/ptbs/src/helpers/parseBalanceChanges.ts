import { SuiClientTypes } from "@mysten/sui/client";
import { normalizeSuiAddress, SUI_TYPE_ARG } from "@mysten/sui/utils";

interface Args {
  balanceChanges: SuiClientTypes.BalanceChange[];
  senderAddress: string;
  recipientAddress: string;
}

interface Response {
  recipientSUIBalanceChange: number;
  senderSUIBalanceChange: number;
}

/**
 * Parses the balance changes as they are returned by the SDK.
 * Filters out and formats the ones that correspond to SUI tokens and to the defined sender and recipient addresses.
 */
export const parseBalanceChanges = ({
  balanceChanges,
  senderAddress,
  recipientAddress,
}: Args): Response => {
  const rec = balanceChanges.find((balance) => {
    const owner = balance.address;
    return (
      owner === normalizeSuiAddress(recipientAddress) &&
      balance.coinType === SUI_TYPE_ARG
    );
  })?.amount;

  const sender = balanceChanges.find((balance) => {
    const owner = balance.address;
    return (
      owner === senderAddress && balance.coinType === SUI_TYPE_ARG
    );
  })?.amount;

  return {
    recipientSUIBalanceChange: rec ? parseInt(rec) : 0,
    senderSUIBalanceChange: sender ? parseInt(sender) : 0,
  };
};
