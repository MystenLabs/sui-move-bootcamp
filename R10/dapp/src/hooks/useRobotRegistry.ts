import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../networkConfig";

export interface RobotInfo {
  name: string;
  description: string;
  robotType: string;
  operator: string;
  operatorPublicKey: string;
  pricePerMinute: number;
  isAvailable: boolean;
  registeredAt: number;
  totalSessions: number;
  totalMinutes: number;
}

interface RegistryData {
  robotNames: string[];
  totalRegistered: number;
  activeCount: number;
}

export function useRobotRegistry() {
  const registryId = useNetworkVariable("registryId");

  // Fetch registry data
  const {
    data: registryObject,
    isLoading,
    refetch: refetchRegistry,
  } = useSuiClientQuery(
    "getObject",
    {
      id: registryId,
      options: {
        showContent: true,
      },
    },
    {
      enabled: !!registryId,
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseRegistryData = (fields: any): RegistryData | null => {
    if (!fields) return null;

    return {
      robotNames: fields.robot_names || [],
      totalRegistered: Number(fields.total_registered || 0),
      activeCount: Number(fields.active_count || 0),
    };
  };

  const registryData: RegistryData | null =
    registryObject?.data?.content?.dataType === "moveObject"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parseRegistryData(registryObject.data.content.fields as any)
      : null;

  return {
    registryData,
    isLoading,
    refetchRegistry,
  };
}
