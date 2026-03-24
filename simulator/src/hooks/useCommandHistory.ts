'use client';

import { useEffect, useState } from 'react';
import { onActionEvent, type ActionEvent } from '@/lib/action-events';

const MAX_HISTORY = 20;

export function useCommandHistory(): ActionEvent[] {
  const [history, setHistory] = useState<ActionEvent[]>([]);

  useEffect(() => {
    return onActionEvent((event) => {
      setHistory((prev) => {
        const next = [event, ...prev];
        return next.length > MAX_HISTORY ? next.slice(0, MAX_HISTORY) : next;
      });
    });
  }, []);

  return history;
}
