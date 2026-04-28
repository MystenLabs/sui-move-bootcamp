'use client';

import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { DAppKitContext, useWalletConnection, useCurrentClient } from '@mysten/dapp-kit-react';
import { SUI_CONTRACT, isOnChainConfigured } from '@/lib/sui-dapp-kit';

interface QueueState {
  queueLength: number;
  totalActionsAdded: number;
  totalActionsProcessed: number;
  isLoading: boolean;
}

const POLL_INTERVAL = 5000;

const DEFAULT_STATE: QueueState = {
  queueLength: 0,
  totalActionsAdded: 0,
  totalActionsProcessed: 0,
  isLoading: false,
};

export function useOnChainQueue(): QueueState {
  const hasDAppKit = useContext(DAppKitContext) !== null;

  if (!hasDAppKit) {
    return DEFAULT_STATE;
  }

  return useOnChainQueueInner();
}

function useOnChainQueueInner(): QueueState {
  const [state, setState] = useState<QueueState>(DEFAULT_STATE);
  const connection = useWalletConnection();
  const client = useCurrentClient();
  const configured = isOnChainConfigured();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchQueue = useCallback(async () => {
    if (!configured || !client) return;

    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const result = await client.getObject({
        objectId: SUI_CONTRACT.queueId,
        include: { json: true },
      });

      const fields = result.object.json;
      if (fields) {
        const actions = fields.actions;
        setState({
          queueLength: Array.isArray(actions) ? actions.length : 0,
          totalActionsAdded: Number(fields.total_actions_added ?? 0),
          totalActionsProcessed: Number(fields.total_actions_processed ?? 0),
          isLoading: false,
        });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [configured, client]);

  useEffect(() => {
    if (!configured || !connection.account) return;

    fetchQueue();
    timerRef.current = setInterval(fetchQueue, POLL_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [configured, connection.account, fetchQueue]);

  return state;
}
