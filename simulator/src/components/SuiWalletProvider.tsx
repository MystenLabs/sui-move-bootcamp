'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { DAppKitProvider } from '@mysten/dapp-kit-react';
import { getSuiDAppKit } from '@/lib/sui-dapp-kit';

export default function SuiWalletProvider({ children }: { children: ReactNode }) {
  const [dAppKit, setDAppKit] = useState<ReturnType<typeof getSuiDAppKit> | null>(null);

  useEffect(() => {
    setDAppKit(getSuiDAppKit());
  }, []);

  if (!dAppKit) {
    return <>{children}</>;
  }

  return <DAppKitProvider dAppKit={dAppKit}>{children}</DAppKitProvider>;
}
