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

export const SUI_CONTRACT = {
  packageId: process.env.NEXT_PUBLIC_SUI_PACKAGE_ID ?? '0x27a3292a055a7904753a8c741579d9cdebc17010c8b65d3d1f00da43047962b7',
  queueId: process.env.NEXT_PUBLIC_SUI_QUEUE_ID ?? '0x83ba18609f73b99518b7aaa13ce4a17293c4d18c4e2bab38ce59c7dc0fef355c',
} as const;

export function isOnChainConfigured(): boolean {
  return SUI_CONTRACT.packageId.length > 0 && SUI_CONTRACT.queueId.length > 0;
}

declare module '@mysten/dapp-kit-react' {
  interface Register {
    dAppKit: ReturnType<typeof getSuiDAppKit>;
  }
}
