'use client';

import clientConfig from '@/lib/env-config-client';
import { networkConfig } from '@/lib/network-config';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';
import * as React from 'react';
import { Toaster } from 'sonner';

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
