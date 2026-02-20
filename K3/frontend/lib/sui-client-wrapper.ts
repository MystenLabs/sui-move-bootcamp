import { getJsonRpcFullnodeUrl, SuiJsonRpcClient } from '@mysten/sui/jsonRpc';
import type { SuiNetworkName } from '@/lib/sui-grpc-client';

/**
 * Returns the Sui client used by dapp-kit (useSuiClient) for this network.
 *
 * We use JSON-RPC (SuiClient) here, not gRPC, because K3 uses transaction.build({ client })
 * and the SDK’s builder calls client.core.resolveTransactionPlugin(). The gRPC core’s
 * resolveTransactionPlugin() is a stub (Promise<never>), so build() would fail with a
 * pure SuiGrpcClient. D3 can use gRPC because it only uses the client for reads
 * (e.g. listOwnedObjects) and does not call transaction.build() with that client.
 *
 * Write path (F1-style): Direct counter hooks use gRPC for execute and wait via
 * createGrpcExecuteForNetwork() and createSuiGrpcClient().core.waitForTransaction()
 * (see lib/grpc-execute.ts and hooks/counter/use*Direct.ts). Sponsored hooks use
 * gRPC for wait only; execute is via Enoki server.
 */
export function createSuiClientForNetwork(
  network: SuiNetworkName,
): SuiJsonRpcClient {
  return new SuiJsonRpcClient({
    network,
    url: getJsonRpcFullnodeUrl(network),
  });
}
