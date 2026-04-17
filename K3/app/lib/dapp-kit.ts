'use client';
import clientConfig from '@/lib/env-config-client';
import {
  type SuiNetworkName,
  createSuiGrpcClient,
} from '@/lib/sui-grpc-client';
import { createDAppKit } from '@mysten/dapp-kit-react';
import { enokiWalletsInitializer } from '@mysten/enoki';

const NETWORKS: SuiNetworkName[] = ['mainnet', 'testnet', 'devnet'];
export const dAppkit = createDAppKit({
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
          redirectUrl: `${clientConfig.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      },
    }),
  ],
});
