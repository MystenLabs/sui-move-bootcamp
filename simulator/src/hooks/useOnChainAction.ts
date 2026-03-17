'use client';

import { useCallback, useContext, useRef, useState } from 'react';
import { DAppKitContext, useWalletConnection, useDAppKit } from '@mysten/dapp-kit-react';
import { Transaction } from '@mysten/sui/transactions';
import { useSimulator } from '@/hooks/useSimulator';
import { SUI_CONTRACT, isOnChainConfigured } from '@/lib/sui-dapp-kit';
import { showToast } from '@/components/Toast';

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
    return { ...FALLBACK, sendActionWithChain: useSimulatorFallback() };
  }

  return useOnChainActionInner();
}

function useSimulatorFallback() {
  const { sendAction } = useSimulator();
  return useCallback((action: string) => sendAction(action), [sendAction]);
}

function useOnChainActionInner() {
  const { sendAction, addTerminalLog } = useSimulator();
  const connection = useWalletConnection();
  const dAppKit = useDAppKit();
  const configured = isOnChainConfigured();
  const [pendingTxCount, setPendingTxCount] = useState(0);
  const pendingRef = useRef(0);

  const sendActionWithChain = useCallback(
    (action: string) => {
      // No wallet or contract not configured — local-only, animate immediately
      if (!connection.account || !configured) {
        sendAction(action);
        return;
      }

      // Wallet connected: sign tx FIRST, then animate on success
      addTerminalLog('info', `\u26D3 Signing "${action}"...`);
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
            showToast('error', `Transaction failed`);
            return;
          }

          // Tx confirmed — now animate the robot
          sendAction(action);
          const short = result.Transaction.digest.slice(0, 10);
          addTerminalLog('ok', `\u2713 Confirmed: ${short}...`);
          showToast('success', `${action} confirmed on-chain`);
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          addTerminalLog('error', `\u2717 Failed: ${msg}`);
          showToast('error', msg.length > 60 ? msg.slice(0, 60) + '...' : msg);
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
