import {
  SuiJsonRpcClient,
  getJsonRpcFullnodeUrl,
} from '@mysten/sui/jsonRpc';

import type { SuiNetworkName } from '@/lib/sui-grpc-client';

const rpcClientCache = new Map<SuiNetworkName, SuiJsonRpcClient>();

/**
 * Temporary RPC client for dAppKit/Enoki compatibility while app logic
 * continues migrating to gRPC/GraphQL.
 */
export function createSuiClientForNetwork(
  network: SuiNetworkName,
): SuiJsonRpcClient {
  let client = rpcClientCache.get(network);
  if (!client) {
    client = new SuiJsonRpcClient({
      network,
      url: getJsonRpcFullnodeUrl(network),
    });
    rpcClientCache.set(network, client);
  }
  return client;
}
