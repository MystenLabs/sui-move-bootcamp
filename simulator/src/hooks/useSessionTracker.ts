'use client';

import { useEffect, useRef, useState } from 'react';

const SESSION_DURATION_MS = 600_000; // 10 minutes (matches R10 rental)

export interface SessionState {
  sessionId: string;
  startTime: number;
  timeRemainingMs: number;
  sequenceNumber: number;
  commandsUsed: number;
  isActive: boolean;
  pricePerMinute: number;
  estimatedCost: number;
}

const INACTIVE: SessionState = {
  sessionId: '—',
  startTime: 0,
  timeRemainingMs: SESSION_DURATION_MS,
  sequenceNumber: 0,
  commandsUsed: 0,
  isActive: false,
  pricePerMinute: 2,
  estimatedCost: 0,
};

export function useSessionTracker(isWalletConnected: boolean, commandsExecuted: number): SessionState {
  const [state, setState] = useState<SessionState>(INACTIVE);
  const startRef = useRef(0);
  const prevCmdsRef = useRef(0);

  // Start session on first command after wallet connect
  useEffect(() => {
    if (!isWalletConnected) {
      setState(INACTIVE);
      startRef.current = 0;
      prevCmdsRef.current = 0;
      return;
    }

    if (commandsExecuted > prevCmdsRef.current && startRef.current === 0) {
      startRef.current = Date.now();
      // Deterministic session ID from timestamp
      const id = '0x' + startRef.current.toString(16).padStart(16, '0') + 'a'.repeat(48);
      setState((s) => ({ ...s, sessionId: id, startTime: startRef.current, isActive: true }));
    }
    prevCmdsRef.current = commandsExecuted;
  }, [isWalletConnected, commandsExecuted]);

  // Tick countdown + update stats
  useEffect(() => {
    if (!state.isActive) return;
    const id = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(0, SESSION_DURATION_MS - elapsed);
      const minutes = elapsed / 60_000;
      setState((s) => ({
        ...s,
        timeRemainingMs: remaining,
        sequenceNumber: prevCmdsRef.current,
        commandsUsed: prevCmdsRef.current,
        estimatedCost: Math.ceil(minutes) * s.pricePerMinute,
        isActive: remaining > 0,
      }));
    }, 1000);
    return () => clearInterval(id);
  }, [state.isActive]);

  return state;
}
