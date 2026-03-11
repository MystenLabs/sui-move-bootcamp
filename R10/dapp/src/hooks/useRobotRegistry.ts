import { useCurrentClient } from "@mysten/dapp-kit-react";
import { useQuery } from "@tanstack/react-query";
import { REGISTRY_ID } from "../networkConfig";

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
  const client = useCurrentClient();

  const {
    data: registryData,
    isLoading,
    refetch: refetchRegistry,
  } = useQuery({
    queryKey: ["registry", REGISTRY_ID],
    queryFn: async (): Promise<RegistryData | null> => {
      if (!client || !REGISTRY_ID) return null;

      const obj = await client.core.getObject({
        objectId: REGISTRY_ID,
        include: { json: true },
      });

      const fields = obj.object?.json as Record<string, unknown> | null;
      if (!fields) return null;

      return {
        robotNames: (fields.robot_names as string[]) || [],
        totalRegistered: Number(fields.total_registered || 0),
        activeCount: Number(fields.active_count || 0),
      };
    },
    enabled: !!REGISTRY_ID && !!client,
  });

  return {
    registryData: registryData ?? null,
    isLoading,
    refetchRegistry,
  };
}
