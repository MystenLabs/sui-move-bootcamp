import { useCurrentClient, useDAppKit } from "@mysten/dapp-kit-react";
import { Transaction } from "@mysten/sui/transactions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PACKAGE_ID, REGISTRY_ID } from "../networkConfig";
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
  const client = useCurrentClient();
  const dAppKit = useDAppKit();
  const { coins, refetch: refetchBalance } = useTreatBalance();
  const [isPending, setIsPending] = useState(false);

  // Fetch session data if sessionId provided
  const {
    data: sessionData,
    isLoading,
    refetch: refetchSession,
  } = useQuery({
    queryKey: ["rentalSession", sessionId],
    queryFn: async (): Promise<RentalSession | null> => {
      if (!client || !sessionId) return null;

      const obj = await client.core.getObject({
        objectId: sessionId,
        include: { json: true },
      });

      const fields = obj.object?.json as Record<string, unknown> | null;
      if (!fields) return null;

      return {
        id: sessionId,
        robotName: fields.robot_name as string,
        user: fields.user as string,
        userPublicKey: fields.user_public_key as string,
        operator: fields.operator as string,
        operatorPublicKey: fields.operator_public_key as string,
        pricePerMinute: Number(fields.price_per_minute || 0),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        escrowedAmount: Number((fields.escrow as any)?.value || 0),
        prepaidMinutes: Number(fields.prepaid_minutes || 0),
        startTime: Number(fields.start_time || 0),
        lastActivity: Number(fields.last_activity || 0),
        sequenceNumber: Number(fields.sequence_number || 0),
        isActive: fields.is_active as boolean,
      };
    },
    enabled: !!sessionId && !!client,
  });

  const startSession = async (
    robotName: string,
    userPublicKey: Uint8Array,
    minutes: number,
    pricePerMinute?: number,
  ) => {
    if (!PACKAGE_ID || !REGISTRY_ID) {
      throw new Error("Package ID or Registry ID not configured");
    }

    // Use actual price from registry, or fall back to 1 with a warning
    const price = pricePerMinute ?? 1;
    const totalCost = price * minutes;

    // Find coins with enough balance
    const totalBalance = coins.reduce((sum, c) => sum + c.balance, 0n);
    if (totalBalance < BigInt(totalCost)) {
      throw new Error(
        `Insufficient TREAT tokens. Need ${totalCost}, have ${totalBalance}`,
      );
    }

    if (coins.length === 0) {
      throw new Error("No TREAT tokens available");
    }

    setIsPending(true);
    try {
      const tx = new Transaction();

      // Prepare payment coin: merge if multiple, then split exact amount
      const primaryCoinId = coins[0].objectId;
      if (coins.length > 1) {
        tx.mergeCoins(
          tx.object(primaryCoinId),
          coins.slice(1).map((c) => tx.object(c.objectId)),
        );
      }
      const [paymentCoin] = tx.splitCoins(tx.object(primaryCoinId), [
        totalCost,
      ]);

      tx.moveCall({
        target: `${PACKAGE_ID}::rental_session::start_session`,
        arguments: [
          tx.object(REGISTRY_ID),
          tx.pure.string(robotName),
          tx.pure.vector("u8", Array.from(userPublicKey)),
          paymentCoin,
          tx.pure.u64(minutes),
          tx.object("0x6"), // Clock object
        ],
      });

      const result = await dAppKit.signAndExecuteTransaction({
        transaction: tx,
      });

      await refetchBalance();

      return result;
    } finally {
      setIsPending(false);
    }
  };

  const endSession = async (sessionIdToEnd: string) => {
    if (!PACKAGE_ID || !REGISTRY_ID) {
      throw new Error("Package ID or Registry ID not configured");
    }

    setIsPending(true);
    try {
      const tx = new Transaction();

      tx.moveCall({
        target: `${PACKAGE_ID}::rental_session::end_session`,
        arguments: [
          tx.object(sessionIdToEnd),
          tx.object(REGISTRY_ID),
          tx.object("0x6"), // Clock object
        ],
      });

      const result = await dAppKit.signAndExecuteTransaction({
        transaction: tx,
      });

      await refetchBalance();

      return result;
    } finally {
      setIsPending(false);
    }
  };

  return {
    sessionData: sessionData ?? null,
    isLoading,
    startSession,
    endSession,
    isPending,
    refetchSession,
  };
}
