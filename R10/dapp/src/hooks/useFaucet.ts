import { useCurrentClient, useDAppKit } from "@mysten/dapp-kit-react";
import { Transaction } from "@mysten/sui/transactions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FAUCET_ID, PACKAGE_ID } from "../networkConfig";
import { useTreatBalance } from "./useTreatBalance";

interface FaucetData {
  totalSupply: bigint;
}

export function useFaucet() {
  const client = useCurrentClient();
  const dAppKit = useDAppKit();
  const { refetch: refetchBalance } = useTreatBalance();
  const [isPending, setIsPending] = useState(false);

  // Fetch faucet data
  const { data: faucetData, refetch: refetchFaucet } = useQuery({
    queryKey: ["faucet", FAUCET_ID],
    queryFn: async (): Promise<FaucetData | null> => {
      if (!client || !FAUCET_ID) return null;

      const obj = await client.core.getObject({
        objectId: FAUCET_ID,
        include: { json: true },
      });

      const fields = obj.object?.json as Record<string, unknown> | null;
      if (!fields) return null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const treasuryCap = fields.treasury_cap as any;
      const totalSupply = BigInt(
        treasuryCap?.fields?.total_supply?.fields?.value ?? "0",
      );

      return { totalSupply };
    },
    enabled: !!FAUCET_ID && !!client,
  });

  const requestTokens = async (amount: number) => {
    if (!PACKAGE_ID || !FAUCET_ID) {
      throw new Error("Package ID or Faucet ID not configured");
    }

    setIsPending(true);
    try {
      const tx = new Transaction();

      tx.moveCall({
        target: `${PACKAGE_ID}::treat::request_tokens`,
        arguments: [
          tx.object(FAUCET_ID),
          tx.pure.u64(amount),
          tx.object("0x6"), // Clock object
        ],
      });

      const result = await dAppKit.signAndExecuteTransaction({
        transaction: tx,
      });

      // Refetch balances after successful transaction
      await Promise.all([refetchBalance(), refetchFaucet()]);

      return result;
    } finally {
      setIsPending(false);
    }
  };

  return {
    requestTokens,
    isPending,
    faucetData: faucetData ?? null,
    refetchFaucet,
  };
}
