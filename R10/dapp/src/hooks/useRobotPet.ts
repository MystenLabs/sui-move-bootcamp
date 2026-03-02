import {
  useSignAndExecuteTransaction,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { RobotAction } from "../constants";
import { useNetworkVariable } from "../networkConfig";
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
  const packageId = useNetworkVariable("packageId");
  const robotPetId = useNetworkVariable("robotPetId");
  const { mutateAsync: signAndExecute, isPending } =
    useSignAndExecuteTransaction();
  const { coins, refetch: refetchBalance } = useTreatBalance();

  // Fetch robot pet data
  const {
    data: robotPetObject,
    isLoading,
    refetch: refetchRobotPet,
  } = useSuiClientQuery(
    "getObject",
    {
      id: robotPetId,
      options: {
        showContent: true,
      },
    },
    {
      enabled: !!robotPetId,
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseRobotPetData = (fields: any): RobotPetData | null => {
    if (!fields) return null;

    // Parse action queue - handle nested "fields" structure from Sui
    const rawQueue = fields.action_queue || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actionQueue = rawQueue.map((action: any) => {
      // The action might be wrapped in a "fields" property from Sui's serialization
      const actionFields = action.fields || action;
      return {
        actionName: actionFields.action_name || "",
        sender: actionFields.sender || "",
        timestamp: Number(actionFields.timestamp || 0),
      };
    });

    return {
      name: fields.name,
      actionQueue,
      totalActionsQueued: Number(fields.total_actions_queued || 0),
      totalActionsProcessed: Number(fields.total_actions_processed || 0),
      totalTreatsCollected: Number(fields.total_treats_collected || 0),
      admin: fields.admin,
    };
  };

  const robotPetData: RobotPetData | null =
    robotPetObject?.data?.content?.dataType === "moveObject"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parseRobotPetData(robotPetObject.data.content.fields as any)
      : null;

  const feedRobot = async (actionName: RobotAction) => {
    if (!packageId || !robotPetId) {
      throw new Error("Package ID or Robot Pet ID not configured");
    }

    if (coins.length === 0) {
      throw new Error("No TREAT tokens available. Request from faucet first.");
    }

    const tx = new Transaction();

    // Find a coin with enough balance, or merge coins
    const coinToUse = coins.find((c) => c.balance >= 1n);

    if (!coinToUse) {
      throw new Error("No TREAT tokens available. Request from faucet first.");
    }

    // Split 1 TREAT from the coin for payment
    const [paymentCoin] = tx.splitCoins(tx.object(coinToUse.objectId), [1]);

    tx.moveCall({
      target: `${packageId}::robot_pet::feed`,
      arguments: [
        tx.object(robotPetId),
        paymentCoin,
        tx.pure.string(actionName),
        tx.object("0x6"), // Clock object
      ],
    });

    const result = await signAndExecute({
      transaction: tx,
    });

    // Refetch data after successful transaction
    await Promise.all([refetchBalance(), refetchRobotPet()]);

    return result;
  };

  return {
    robotPetData,
    isLoading,
    feedRobot,
    isPending,
    refetchRobotPet,
  };
}
