'use client';

import { useCurrentWallet } from '@mysten/dapp-kit';
import { useMemo } from 'react';

export type LoginType = 'wallet' | 'zklogin' | null;

/**
 * Detects whether the current connection is via a traditional wallet or zkLogin.
 * Enoki zkLogin wallets are registered with provider names like "Google", "Facebook", etc.
 */
export function useLoginType(): {
  loginType: LoginType;
  isZkLogin: boolean;
  isWallet: boolean;
  walletName: string | null;
} {
  const { currentWallet } = useCurrentWallet();

  return useMemo(() => {
    if (!currentWallet) {
      return {
        loginType: null,
        isZkLogin: false,
        isWallet: false,
        walletName: null,
      };
    }

    const walletName = currentWallet.name.toLowerCase();

    // Enoki zkLogin wallets are named after OAuth providers
    const zkLoginProviders = ['google', 'facebook', 'twitch', 'apple'];
    const isZkLogin = zkLoginProviders.some(
      (provider) =>
        walletName.includes(provider) || walletName.includes('enoki'),
    );

    return {
      loginType: isZkLogin ? 'zklogin' : 'wallet',
      isZkLogin,
      isWallet: !isZkLogin,
      walletName: currentWallet.name,
    };
  }, [currentWallet]);
}
