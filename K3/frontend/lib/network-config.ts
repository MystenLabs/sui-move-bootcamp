import { createNetworkConfig } from '@mysten/dapp-kit';
import { getJsonRpcFullnodeUrl } from '@mysten/sui/jsonRpc';

/**
 * Network config for SuiClientProvider. The actual client is created via
 * createClient in layout-wrapper.tsx using Sui gRPC (see lib/sui-grpc-client.ts
 * and lib/sui-client-wrapper.ts). URLs here remain for config/display.
 */
const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: { network: 'devnet', url: getJsonRpcFullnodeUrl('devnet') },
    testnet: { network: 'testnet', url: getJsonRpcFullnodeUrl('testnet') },
    mainnet: { network: 'mainnet', url: getJsonRpcFullnodeUrl('mainnet') },
  });

export { networkConfig, useNetworkVariable, useNetworkVariables };
