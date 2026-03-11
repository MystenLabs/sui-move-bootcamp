import { useCurrentClient, useDAppKit } from "@mysten/dapp-kit-react";
import { Transaction } from "@mysten/sui/transactions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { RobotAction } from "../constants";
import { PACKAGE_ID, ROBOT_PET_ID } from "../networkConfig";
import { useTreatBalance } from "./useTreatBalance";

interface QueuedAction {
  actionName: string;
  sender: string;
  timestamp: number;
}

interface RobotPetData {
  name: string;
  actionQueue: QueuedAction[];
  totalActionsQueued: number;
  totalActionsProcessed: number;
  totalTreatsCollected: number;
  admin: string;
}

export function useRobotPet() {
  const client = useCurrentClient();
  const dAppKit = useDAppKit();
  const { coins, refetch: refetchBalance } = useTreatBalance();
  const [isPending, setIsPending] = useState(false);

  // Fetch robot pet data
  const {
    data: robotPetData,
    isLoading,
    refetch: refetchRobotPet,
  } = useQuery({
    queryKey: ["robotPet", ROBOT_PET_ID],
    queryFn: async (): Promise<RobotPetData | null> => {
      if (!client || !ROBOT_PET_ID) return null;

      const obj = await client.core.getObject({
        objectId: ROBOT_PET_ID,
        include: { json: true },
      });

      const fields = obj.object?.json as Record<string, unknown> | null;
      if (!fields) return null;

      // Parse action queue
      const rawQueue = (fields.action_queue as unknown[]) || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const actionQueue = rawQueue.map((action: any) => {
        const actionFields = action.fields || action;
        return {
          actionName: actionFields.action_name || "",
          sender: actionFields.sender || "",
          timestamp: Number(actionFields.timestamp || 0),
        };
      });

      return {
        name: fields.name as string,
        actionQueue,
        totalActionsQueued: Number(fields.total_actions_queued || 0),
        totalActionsProcessed: Number(fields.total_actions_processed || 0),
        totalTreatsCollected: Number(fields.total_treats_collected || 0),
        admin: fields.admin as string,
      };
    },
    enabled: !!ROBOT_PET_ID && !!client,
  });

  const feedRobot = async (actionName: RobotAction) => {
    if (!PACKAGE_ID || !ROBOT_PET_ID) {
      throw new Error("Package ID or Robot Pet ID not configured");
    }

    if (coins.length === 0) {
      throw new Error("No TREAT tokens available. Request from faucet first.");
    }

    const coinToUse = coins.find((c) => c.balance >= 1n);
    if (!coinToUse) {
      throw new Error("No TREAT tokens available. Request from faucet first.");
    }

    setIsPending(true);
    try {
      const tx = new Transaction();

      // Split 1 TREAT from the coin for payment
      const [paymentCoin] = tx.splitCoins(tx.object(coinToUse.objectId), [1]);

      tx.moveCall({
        target: `${PACKAGE_ID}::robot_pet::feed`,
        arguments: [
          tx.object(ROBOT_PET_ID),
          paymentCoin,
          tx.pure.string(actionName),
          tx.object("0x6"), // Clock object
        ],
      });

      const result = await dAppKit.signAndExecuteTransaction({
        transaction: tx,
      });

      // Refetch data after successful transaction
      await Promise.all([refetchBalance(), refetchRobotPet()]);

      return result;
    } finally {
      setIsPending(false);
    }
  };

  return {
    robotPetData: robotPetData ?? null,
    isLoading,
    feedRobot,
    isPending,
    refetchRobotPet,
  };
}
