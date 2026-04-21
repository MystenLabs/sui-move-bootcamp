import { SealClient, type KeyServerConfig } from "@mysten/seal";
import type { SealCompatibleClient } from "@mysten/seal";

interface SealExtensionOptions {
  serverConfigs: KeyServerConfig[];
  verifyKeyServers?: boolean;
  timeout?: number;
}

export function seal<const Name extends string = "seal">(
  options: SealExtensionOptions & { name?: Name },
): { name: Name; register: (client: SealCompatibleClient) => SealClient } {
  const { name, ...rest } = options;
  return {
    name: (name ?? "seal") as Name,
    register: (client) => new SealClient({ suiClient: client, ...rest }),
  };
}
