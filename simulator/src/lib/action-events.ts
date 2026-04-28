/**
 * Lightweight typed pub/sub for action events.
 * useOnChainAction publishes here; useCommandHistory subscribes.
 */

export interface ActionEvent {
  action: string;
  txDigest: string;
  timestamp: number;
  status: 'confirmed' | 'failed';
}

type Listener = (event: ActionEvent) => void;

const listeners = new Set<Listener>();

export function emitActionEvent(event: ActionEvent) {
  for (const fn of listeners) fn(event);
}

export function onActionEvent(fn: Listener): () => void {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}
