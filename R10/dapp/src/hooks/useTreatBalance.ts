import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../networkConfig";

export interface TreatCoin {
  objectId: string;
  balance: bigint;
}

export function useTreatBalance() {
  const account = useCurrentAccount();
  const packageId = useNetworkVariable("packageId");

  const { data, isLoading, error, refetch } = useSuiClientQuery(
    "getCoins",
    {
      owner: account?.address ?? "",
      coinType: `${packageId}::treat::TREAT`,
    },
    {
      enabled: !!account?.address && !!packageId,
    },
  );

  const coins: TreatCoin[] =
    data?.data.map((coin) => ({
      objectId: coin.coinObjectId,
      balance: BigInt(coin.balance),
    })) ?? [];

  const totalBalance = coins.reduce((sum, coin) => sum + coin.balance, 0n);

  return {
    coins,
    totalBalance,
    isLoading,
    error,
    refetch,
  };
}
