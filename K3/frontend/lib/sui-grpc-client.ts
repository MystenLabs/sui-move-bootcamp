import { SuiGrpcClient } from '@mysten/sui/grpc';

export type SuiNetworkName = 'mainnet' | 'testnet' | 'devnet';

/**
 * gRPC base URLs per network (F1 pattern from smb2/sui-move-bootcamp/F1).
 * Use these for createClient and write transactions.
 */
export const GRPC_URLS: Record<SuiNetworkName, string> = {
  mainnet: 'https://fullnode.mainnet.sui.io:443',
  testnet: 'https://fullnode.testnet.sui.io:443',
  devnet: 'https://fullnode.devnet.sui.io:443',
};

const grpcClientCache = new Map<SuiNetworkName, SuiGrpcClient>();

/**
 * Creates a Sui gRPC client for the given network (F1-style).
 * Cached per network for reuse (e.g. in execute and waitForTransaction).
 */
export function createSuiGrpcClient(network: SuiNetworkName): SuiGrpcClient {
  let client = grpcClientCache.get(network);
  if (!client) {
    client = new SuiGrpcClient({
      network,
      baseUrl: GRPC_URLS[network],
    });
    grpcClientCache.set(network, client);
  }
  return client;
}
