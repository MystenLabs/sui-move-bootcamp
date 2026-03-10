'use client';
import clientConfig from '@/lib/env-config-client';
import {
  type SuiNetworkName,
  createSuiGrpcClient,
} from '@/lib/sui-grpc-client';
import { createDAppKit } from '@mysten/dapp-kit-react';
import { enokiWalletsInitializer } from '@mysten/enoki';

const NETWORKS: SuiNetworkName[] = ['mainnet', 'testnet', 'devnet'];
const ENOKI_REDIRECT_PATH = '/auth/callback';
export type AppDAppKit = ReturnType<typeof createHybridDAppKit>;
let dAppKitSingleton: AppDAppKit | null = null;

function createHybridDAppKit() {
  if (typeof window === 'undefined') {
    throw new Error('dAppKit must be initialized in the browser');
  }

  const redirectUrl = `${window.location.origin}${ENOKI_REDIRECT_PATH}`;

  return createDAppKit({
    networks: NETWORKS,
    defaultNetwork: clientConfig.NEXT_PUBLIC_SUI_NETWORK_NAME,
    // Provider client uses gRPC for Enoki and app transaction flows.
    createClient: (network) => createSuiGrpcClient(network as SuiNetworkName),
    walletInitializers: [
      enokiWalletsInitializer({
        apiKey: clientConfig.NEXT_PUBLIC_ENOKI_API_KEY,
        providers: {
          google: {
            clientId: clientConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            redirectUrl,
          },
        },
      }),
    ],
  });
}

export function getDAppKit(): AppDAppKit {
  if (!dAppKitSingleton) {
    dAppKitSingleton = createHybridDAppKit();
  }
  return dAppKitSingleton;
}

declare module '@mysten/dapp-kit-react' {
  interface Register {
    dAppKit: AppDAppKit;
  }
}
