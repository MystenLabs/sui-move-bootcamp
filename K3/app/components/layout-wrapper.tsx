'use client';

import { dAppkit } from '@/lib/dapp-kit';
import { DAppKitProvider } from '@mysten/dapp-kit-react';
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
        <DAppKitProvider dAppKit={dAppkit}>
          <Toaster position="bottom-right" />
          {children}
        </DAppKitProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
};

export default LayoutWrapper;
