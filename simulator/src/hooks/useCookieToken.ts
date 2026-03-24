'use client';

import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { DAppKitContext, useWalletConnection, useCurrentClient, useDAppKit } from '@mysten/dapp-kit-react';
import { Transaction } from '@mysten/sui/transactions';
import { COOKIE_CONTRACT } from '@/lib/sui-dapp-kit';
import { showToast } from '@/components/Toast';

const SUI_CLOCK = '0x6';

interface CookieState {
  balance: number;
  isMinting: boolean;
  isLoading: boolean;
  mint: (amount?: number) => void;
}

const FALLBACK: CookieState = {
  balance: 0,
  isMinting: false,
  isLoading: false,
  mint: () => {},
};

export function useCookieToken(): CookieState {
  const hasDAppKit = useContext(DAppKitContext) !== null;
  if (!hasDAppKit) return FALLBACK;
  return useCookieTokenInner();
}

function useCookieTokenInner(): CookieState {
  const connection = useWalletConnection();
  const client = useCurrentClient();
  const dAppKit = useDAppKit();
  const [balance, setBalance] = useState(0);
  const [isMinting, setIsMinting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!connection.account || !client) return;
    try {
      setIsLoading(true);
      const coins = await client.listCoins({
        owner: connection.account.address,
        coinType: COOKIE_CONTRACT.coinType,
      });
      const total = coins.objects.reduce((sum: number, c) => sum + Number(c.balance), 0);
      setBalance(total);
    } catch {
      // Token might not exist for this user yet
    } finally {
      setIsLoading(false);
    }
  }, [connection.account, client]);

  useEffect(() => {
    if (!connection.account) return;
    fetchBalance();
    timerRef.current = setInterval(fetchBalance, 10_000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [connection.account, fetchBalance]);

  const mint = useCallback(
    (amount = 100) => {
      if (!connection.account || isMinting) return;
      setIsMinting(true);

      const tx = new Transaction();
      tx.moveCall({
        target: `${COOKIE_CONTRACT.packageId}::cookie::mint`,
        arguments: [
          tx.object(COOKIE_CONTRACT.faucetId),
          tx.pure.u64(amount),
          tx.object(SUI_CLOCK),
        ],
      });

      dAppKit
        .signAndExecuteTransaction({ transaction: tx })
        .then((result) => {
          if (result.$kind === 'FailedTransaction') {
            showToast('error', 'Mint failed');
            return;
          }
          showToast('success', `Minted ${amount} COOKIE`);
          setTimeout(fetchBalance, 2000);
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          showToast('error', msg.length > 50 ? msg.slice(0, 50) + '...' : msg);
        })
        .finally(() => setIsMinting(false));
    },
    [connection.account, isMinting, dAppKit, fetchBalance],
  );

  return { balance, isMinting, isLoading, mint };
}
