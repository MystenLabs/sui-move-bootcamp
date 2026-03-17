'use client';

import { useCallback, useContext, useRef, useState } from 'react';
import { DAppKitContext, useWalletConnection, useDAppKit } from '@mysten/dapp-kit-react';
import { Transaction } from '@mysten/sui/transactions';
import { useSimulator } from '@/hooks/useSimulator';
import { SUI_CONTRACT, isOnChainConfigured } from '@/lib/sui-dapp-kit';

const SUI_CLOCK_OBJECT = '0x6';

const FALLBACK = {
  sendActionWithChain: (_action: string) => {},
  pendingTxCount: 0,
  isWalletConnected: false,
  isOnChainConfigured: false,
} as const;

export function useOnChainAction() {
  const hasDAppKit = useContext(DAppKitContext) !== null;

  if (!hasDAppKit) {
    // During SSR or when provider is missing, fall back to local-only
    return { ...FALLBACK, sendActionWithChain: useSimulatorFallback() };
  }

  return useOnChainActionInner();
}

/** Bare local-only fallback that only needs SimulatorProvider */
function useSimulatorFallback() {
  const { sendAction } = useSimulator();
  return useCallback((action: string) => sendAction(action), [sendAction]);
}

/** Full implementation — only called when DAppKitContext is available */
function useOnChainActionInner() {
  const { sendAction, addTerminalLog } = useSimulator();
  const connection = useWalletConnection();
  const dAppKit = useDAppKit();
  const configured = isOnChainConfigured();
  const [pendingTxCount, setPendingTxCount] = useState(0);
  const pendingRef = useRef(0);

  const sendActionWithChain = useCallback(
    (action: string) => {
      // Path A: WebSocket (immediate)
      sendAction(action);

      // Path B: On-chain (async, non-blocking)
      if (!connection.account || !configured) return;

      addTerminalLog('info', `\u26D3 Submitting "${action}"...`);
      pendingRef.current += 1;
      setPendingTxCount(pendingRef.current);

      const tx = new Transaction();
      tx.moveCall({
        target: `${SUI_CONTRACT.packageId}::robot_queue::add_action`,
        arguments: [
          tx.object(SUI_CONTRACT.queueId),
          tx.pure.string(action),
          tx.object(SUI_CLOCK_OBJECT),
        ],
      });

      dAppKit
        .signAndExecuteTransaction({ transaction: tx })
        .then((result) => {
          if (result.$kind === 'FailedTransaction') {
            addTerminalLog('error', `\u2717 Transaction failed on-chain`);
            return;
          }
          const short = result.Transaction.digest.slice(0, 10);
          addTerminalLog('ok', `\u2713 Confirmed: ${short}...`);
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          addTerminalLog('error', `\u2717 Failed: ${msg}`);
        })
        .finally(() => {
          pendingRef.current -= 1;
          setPendingTxCount(pendingRef.current);
        });
    },
    [sendAction, addTerminalLog, connection.account, configured, dAppKit],
  );

  return {
    sendActionWithChain,
    pendingTxCount,
    isWalletConnected: !!connection.account,
    isOnChainConfigured: configured,
  };
}
