import {
  useSignAndExecuteTransaction,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "../networkConfig";
import { useTreatBalance } from "./useTreatBalance";

interface FaucetData {
  totalSupply: bigint;
}

export function useFaucet() {
  const packageId = useNetworkVariable("packageId");
  const faucetId = useNetworkVariable("faucetId");
  const { mutateAsync: signAndExecute, isPending } =
    useSignAndExecuteTransaction();
  const { refetch: refetchBalance } = useTreatBalance();

  // Fetch faucet data
  const { data: faucetObject, refetch: refetchFaucet } = useSuiClientQuery(
    "getObject",
    {
      id: faucetId,
      options: {
        showContent: true,
      },
    },
    {
      enabled: !!faucetId,
    },
  );

  const faucetData: FaucetData | null =
    faucetObject?.data?.content?.dataType === "moveObject"
      ? {
          totalSupply: BigInt(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (faucetObject.data.content.fields as any)?.treasury_cap?.fields
              ?.total_supply?.fields?.value ?? "0",
          ),
        }
      : null;

  const requestTokens = async (amount: number) => {
    if (!packageId || !faucetId) {
      throw new Error("Package ID or Faucet ID not configured");
    }

    const tx = new Transaction();

    tx.moveCall({
      target: `${packageId}::treat::request_tokens`,
      arguments: [
        tx.object(faucetId),
        tx.pure.u64(amount),
        tx.object("0x6"), // Clock object
      ],
    });

    const result = await signAndExecute({
      transaction: tx,
    });

    // Refetch balances after successful transaction
    await Promise.all([refetchBalance(), refetchFaucet()]);

    return result;
  };

  return {
    requestTokens,
    isPending,
    faucetData,
    refetchFaucet,
  };
}
