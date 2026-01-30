'use client';

import clientConfig from '@/lib/env-config-client';
import { networkConfig } from '@/lib/network-config';
import {
  SuiClientProvider,
  WalletProvider,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { isEnokiNetwork, registerEnokiWallets } from '@mysten/enoki';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';
import * as React from 'react';
import { Toaster } from 'sonner';

function RegisterEnokiWallets() {
  const { client, network } = useSuiClientContext();
  React.useEffect(() => {
    if (!isEnokiNetwork(network)) return;
    const { unregister } = registerEnokiWallets({
      apiKey: clientConfig.NEXT_PUBLIC_ENOKI_API_KEY,
      providers: {
        // Provide the client IDs for each of the auth providers you want to use:
        google: {
          clientId: clientConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          redirectUrl: `${window.location.origin}/auth/callback`,
        },
      },
      client,
      network,
    });
    return unregister;
  }, [client, network]);
  return null;
}

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
          },
        },
      }),
  );

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider
          networks={networkConfig}
          defaultNetwork={clientConfig.NEXT_PUBLIC_SUI_NETWORK_NAME}
        >
          <RegisterEnokiWallets />
          <WalletProvider autoConnect>
            <Toaster position="bottom-right" />
            {children}
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
};

export default LayoutWrapper;
