import { useCurrentAccount, useCurrentClient } from "@mysten/dapp-kit-react";
import { useQuery } from "@tanstack/react-query";
import { PACKAGE_ID } from "../networkConfig";

export interface TreatCoin {
  objectId: string;
  balance: bigint;
}

export function useTreatBalance() {
  const account = useCurrentAccount();
  const client = useCurrentClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["treatBalance", account?.address, PACKAGE_ID],
    queryFn: async () => {
      if (!account?.address || !client) return { coins: [], totalBalance: 0n };

      const coinType = `${PACKAGE_ID}::treat::TREAT`;
      const result = await client.core.listCoins({
        owner: account.address,
        coinType,
      });

      const coins: TreatCoin[] = (result.objects || []).map((coin) => ({
        objectId: coin.objectId,
        balance: BigInt(coin.balance),
      }));

      const totalBalance = coins.reduce((sum, coin) => sum + coin.balance, 0n);

      return { coins, totalBalance };
    },
    enabled: !!account?.address && !!PACKAGE_ID && !!client,
  });

  return {
    coins: data?.coins ?? [],
    totalBalance: data?.totalBalance ?? 0n,
    isLoading,
    error,
    refetch,
  };
}
