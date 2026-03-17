'use client';

import type { ReactNode } from 'react';
import { DAppKitProvider } from '@mysten/dapp-kit-react';
import { getSuiDAppKit } from '@/lib/sui-dapp-kit';

export default function SuiWalletProvider({ children }: { children: ReactNode }) {
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  return <DAppKitProvider dAppKit={getSuiDAppKit()}>{children}</DAppKitProvider>;
}
