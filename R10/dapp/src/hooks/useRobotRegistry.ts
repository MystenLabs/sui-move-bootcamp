import { useCurrentClient } from "@mysten/dapp-kit-react";
import { bcs } from "@mysten/sui/bcs";
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
  robotPrices: Record<string, number>;
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

      const robotNames = (fields.robot_names as string[]) || [];

      // Fetch per-robot pricing from the Table's dynamic fields
      const robotPrices: Record<string, number> = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const robotsTableId = (fields.robots as any)?.fields?.id?.id;

      if (robotsTableId) {
        for (const name of robotNames) {
          try {
            const robotField = await client.core.getDynamicField({
              parentId: robotsTableId,
              name: {
                type: "0x1::string::String",
                bcs: bcs.string().serialize(name).toBytes(),
              },
            });
            const fieldObject = await client.core.getObject({
              objectId: robotField.dynamicField.fieldId,
              include: { json: true },
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const fieldJson = fieldObject.object?.json as any;
            if (fieldJson?.value?.price_per_minute != null) {
              robotPrices[name] = Number(fieldJson.value.price_per_minute);
            }
          } catch {
            // If we can't fetch details for a robot, skip it
          }
        }
      }

      return {
        robotNames,
        robotPrices,
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
