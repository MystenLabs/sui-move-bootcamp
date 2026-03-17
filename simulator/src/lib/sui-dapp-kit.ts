import { createDAppKit } from '@mysten/dapp-kit-core';
import { SuiGrpcClient } from '@mysten/sui/grpc';

const GRPC_URLS = {
  testnet: 'https://fullnode.testnet.sui.io:443',
} as const;

function createSuiDAppKit() {
  return createDAppKit({
    defaultNetwork: 'testnet',
    networks: ['testnet'] as const,
    createClient(network) {
      return new SuiGrpcClient({
        network,
        baseUrl: GRPC_URLS[network],
      });
    },
  });
}

let suiDAppKitSingleton: ReturnType<typeof createSuiDAppKit> | null = null;

export function getSuiDAppKit() {
  if (typeof window === 'undefined') {
    throw new Error('Sui dApp Kit must be created in the browser');
  }

  if (!suiDAppKitSingleton) {
    suiDAppKitSingleton = createSuiDAppKit();
  }

  return suiDAppKitSingleton;
}

declare module '@mysten/dapp-kit-react' {
  interface Register {
    dAppKit: ReturnType<typeof getSuiDAppKit>;
  }
}
