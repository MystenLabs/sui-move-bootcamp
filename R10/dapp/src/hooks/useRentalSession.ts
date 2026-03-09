import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "../networkConfig";
import { useTreatBalance } from "./useTreatBalance";

export interface RentalSession {
  id: string;
  robotName: string;
  user: string;
  userPublicKey: string;
  operator: string;
  operatorPublicKey: string;
  pricePerMinute: number;
  escrowedAmount: number;
  prepaidMinutes: number;
  startTime: number;
  lastActivity: number;
  sequenceNumber: number;
  isActive: boolean;
}

export function useRentalSession(sessionId?: string) {
  const packageId = useNetworkVariable("packageId");
  const registryId = useNetworkVariable("registryId");
  const account = useCurrentAccount();
  const client = useSuiClient();
  const { mutateAsync: signAndExecute, isPending } =
    useSignAndExecuteTransaction({
      execute: async ({ bytes, signature }) =>
        await client.executeTransactionBlock({
          transactionBlock: bytes,
          signature,
          options: { showEvents: true, showEffects: true },
        }),
    });
  const { coins, refetch: refetchBalance } = useTreatBalance();

  // Fetch session data if sessionId provided
  const {
    data: sessionObject,
    isLoading,
    refetch: refetchSession,
  } = useSuiClientQuery(
    "getObject",
    {
      id: sessionId ?? "",
      options: {
        showContent: true,
      },
    },
    {
      enabled: !!sessionId,
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseSessionData = (fields: any, id: string): RentalSession | null => {
    if (!fields) return null;

    return {
      id,
      robotName: fields.robot_name,
      user: fields.user,
      userPublicKey: fields.user_public_key,
      operator: fields.operator,
      operatorPublicKey: fields.operator_public_key,
      pricePerMinute: Number(fields.price_per_minute || 0),
      escrowedAmount: Number(fields.escrow?.fields?.value || 0),
      prepaidMinutes: Number(fields.prepaid_minutes || 0),
      startTime: Number(fields.start_time || 0),
      lastActivity: Number(fields.last_activity || 0),
      sequenceNumber: Number(fields.sequence_number || 0),
      isActive: fields.is_active,
    };
  };

  const sessionData: RentalSession | null =
    sessionObject?.data?.content?.dataType === "moveObject" && sessionId
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parseSessionData(sessionObject.data.content.fields as any, sessionId)
      : null;

  const startSession = async (
    robotName: string,
    userPublicKey: Uint8Array,
    minutes: number,
  ) => {
    if (!packageId || !registryId) {
      throw new Error("Package ID or Registry ID not configured");
    }

    if (!account?.address) {
      throw new Error("Wallet not connected");
    }

    // Calculate total cost
    // Note: In a real implementation, you'd fetch the robot's price from the registry
    const pricePerMinute = 1; // Default assumption
    const totalCost = pricePerMinute * minutes;

    // Find coins with enough balance
    const totalBalance = coins.reduce((sum, c) => sum + c.balance, 0n);
    if (totalBalance < BigInt(totalCost)) {
      throw new Error(
        `Insufficient TREAT tokens. Need ${totalCost}, have ${totalBalance}`,
      );
    }

    const tx = new Transaction();

    // If we have multiple coins, merge them first
    if (coins.length > 1) {
      const [primaryCoin, ...restCoins] = coins;
      tx.mergeCoins(
        tx.object(primaryCoin.objectId),
        restCoins.map((c) => tx.object(c.objectId)),
      );
      const [paymentCoin] = tx.splitCoins(tx.object(primaryCoin.objectId), [
        totalCost,
      ]);

      tx.moveCall({
        target: `${packageId}::rental_session::start_session`,
        arguments: [
          tx.object(registryId),
          tx.pure.string(robotName),
          tx.pure.vector("u8", Array.from(userPublicKey)),
          paymentCoin,
          tx.pure.u64(minutes),
          tx.object("0x6"), // Clock object
        ],
      });
    } else if (coins.length === 1) {
      const [paymentCoin] = tx.splitCoins(tx.object(coins[0].objectId), [
        totalCost,
      ]);

      tx.moveCall({
        target: `${packageId}::rental_session::start_session`,
        arguments: [
          tx.object(registryId),
          tx.pure.string(robotName),
          tx.pure.vector("u8", Array.from(userPublicKey)),
          paymentCoin,
          tx.pure.u64(minutes),
          tx.object("0x6"), // Clock object
        ],
      });
    } else {
      throw new Error("No TREAT tokens available");
    }

    const result = await signAndExecute({
      transaction: tx,
    });

    await refetchBalance();

    return result;
  };

  const endSession = async (sessionIdToEnd: string) => {
    if (!packageId || !registryId) {
      throw new Error("Package ID or Registry ID not configured");
    }

    const tx = new Transaction();

    tx.moveCall({
      target: `${packageId}::rental_session::end_session`,
      arguments: [
        tx.object(sessionIdToEnd),
        tx.object(registryId),
        tx.object("0x6"), // Clock object
      ],
    });

    const result = await signAndExecute({
      transaction: tx,
    });

    await refetchBalance();

    return result;
  };

  return {
    sessionData,
    isLoading,
    startSession,
    endSession,
    isPending,
    refetchSession,
  };
}
