'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

// ── Types ─────────────────────────────────────────────────────

export interface JointAngles {
  headPitch: number;
  headYaw: number;
  tailWag: number;
  frontLeftHip: number;
  frontLeftKnee: number;
  frontRightHip: number;
  frontRightKnee: number;
  backLeftHip: number;
  backLeftKnee: number;
  backRightHip: number;
  backRightKnee: number;
}

export interface RobotState {
  action: string;
  actionLabel: string;
  joints: JointAngles;
  bodyHeight: number;
  bodyPitch: number;
  bodyRoll: number;
  moving: boolean;
  walkCycle: number;
  mood: string;
  battery: number;
  uptime: number;
  commandsExecuted: number;
}

export interface RobotEvent {
  type: string;
  action?: string;
  message: string;
  timestamp: number;
}

export interface TerminalEntry {
  type: 'info' | 'cmd' | 'ok' | 'error' | 'event' | 'system';
  message: string;
  time: string;
}

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

interface SimulatorContextValue {
  robotState: RobotState | null;
  connectionStatus: ConnectionStatus;
  terminalLogs: TerminalEntry[];
  sendCommand: (cmd: string) => void;
  sendAction: (action: string) => void;
  addTerminalLog: (type: TerminalEntry['type'], message: string) => void;
  clearTerminalLogs: () => void;
}

// ── Default state ─────────────────────────────────────────────

const DEFAULT_JOINTS: JointAngles = {
  headPitch: 0,
  headYaw: 0,
  tailWag: 0,
  frontLeftHip: 0,
  frontLeftKnee: 0,
  frontRightHip: 0,
  frontRightKnee: 0,
  backLeftHip: 0,
  backLeftKnee: 0,
  backRightHip: 0,
  backRightKnee: 0,
};

const DEFAULT_STATE: RobotState = {
  action: 'idle',
  actionLabel: 'Idle',
  joints: { ...DEFAULT_JOINTS },
  bodyHeight: 0,
  bodyPitch: 0,
  bodyRoll: 0,
  moving: false,
  walkCycle: 0,
  mood: 'neutral',
  battery: 100,
  uptime: 0,
  commandsExecuted: 0,
};

// ── Context ───────────────────────────────────────────────────

const SimulatorContext = createContext<SimulatorContextValue | null>(null);

function formatTime(): string {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// ── Provider ──────────────────────────────────────────────────

export function SimulatorProvider({ children }: { children: ReactNode }) {
  const [robotState, setRobotState] = useState<RobotState | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [terminalLogs, setTerminalLogs] = useState<TerminalEntry[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptRef = useRef(0);

  const addTerminalLog = useCallback((type: TerminalEntry['type'], message: string) => {
    setTerminalLogs((prev) => {
      const next = [...prev, { type, message, time: formatTime() }];
      // Keep the last 500 entries
      if (next.length > 500) return next.slice(-500);
      return next;
    });
  }, []);

  const clearTerminalLogs = useCallback(() => {
    setTerminalLogs([]);
  }, []);

  const connect = useCallback(() => {
    // Determine WebSocket URL based on current location
    const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = typeof window !== 'undefined' ? window.location.host : 'localhost:3000';
    const wsUrl = `${protocol}//${host}/ws`;

    setConnectionStatus('connecting');
    addTerminalLog('system', `Connecting to ${wsUrl}...`);

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus('connected');
      reconnectAttemptRef.current = 0;
      addTerminalLog('system', 'Connected to simulator server');
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        if (msg.type === 'state') {
          setRobotState(msg.data);
          if (msg.event) {
            const evt = msg.event as RobotEvent;
            if (evt.type === 'error') {
              addTerminalLog('error', evt.message);
            } else if (evt.type === 'state_change') {
              addTerminalLog('event', evt.message);
            } else {
              addTerminalLog('info', evt.message);
            }
          } else {
            addTerminalLog('info', 'Received initial state');
          }
        } else if (msg.type === 'event') {
          setRobotState(msg.state);
          if (msg.event) {
            const evt = msg.event as RobotEvent;
            if (evt.type === 'error') {
              addTerminalLog('error', evt.message);
            } else if (evt.type === 'state_change') {
              addTerminalLog('event', evt.message);
            } else {
              addTerminalLog('info', evt.message);
            }
          }
        } else if (msg.type === 'ack' || msg.type === 'command_ack') {
          addTerminalLog('ok', msg.result);
        } else if (msg.type === 'error') {
          addTerminalLog('error', msg.message);
        }
      } catch {
        // Non-JSON messages
        addTerminalLog('info', event.data);
      }
    };

    ws.onclose = () => {
      setConnectionStatus('disconnected');
      wsRef.current = null;
      addTerminalLog('system', 'Disconnected from server');

      // Auto-reconnect with exponential backoff
      const delay = Math.min(1000 * Math.pow(2, reconnectAttemptRef.current), 10000);
      reconnectAttemptRef.current++;
      addTerminalLog('system', `Reconnecting in ${(delay / 1000).toFixed(1)}s...`);
      reconnectTimerRef.current = setTimeout(connect, delay);
    };

    ws.onerror = () => {
      addTerminalLog('error', 'WebSocket error');
    };
  }, [addTerminalLog]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  const sendCommand = useCallback(
    (cmd: string) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        addTerminalLog('cmd', `> ${cmd}`);
        wsRef.current.send(JSON.stringify({ type: 'command', command: cmd }));
      } else {
        addTerminalLog('error', 'Not connected to server');
      }
    },
    [addTerminalLog]
  );

  const sendAction = useCallback(
    (action: string) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        addTerminalLog('cmd', `action: ${action}`);
        wsRef.current.send(JSON.stringify({ type: 'action', action }));
      } else {
        addTerminalLog('error', 'Not connected to server');
      }
    },
    [addTerminalLog]
  );

  return (
    <SimulatorContext.Provider
      value={{
        robotState: robotState ?? DEFAULT_STATE,
        connectionStatus,
        terminalLogs,
        sendCommand,
        sendAction,
        addTerminalLog,
        clearTerminalLogs,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────

export function useSimulator(): SimulatorContextValue {
  const ctx = useContext(SimulatorContext);
  if (!ctx) {
    throw new Error('useSimulator must be used within a SimulatorProvider');
  }
  return ctx;
}
