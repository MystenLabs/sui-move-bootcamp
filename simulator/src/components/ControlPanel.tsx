'use client';

import { useEffect, useState } from 'react';
import { useSimulator } from '@/hooks/useSimulator';
import { useOnChainAction } from '@/hooks/useOnChainAction';
import { useOnChainQueue } from '@/hooks/useOnChainQueue';
import { useSessionTracker } from '@/hooks/useSessionTracker';
import { useCommandHistory } from '@/hooks/useCommandHistory';
import { ChainIcon, HardwareIcon } from '@/components/icons';

interface CommandButton {
  code: string;
  label: string;
}

interface CommandGroup {
  title: string;
  commands: CommandButton[];
}

const COMMAND_GROUPS: CommandGroup[] = [
  {
    title: 'Posture',
    commands: [
      { code: 'sit', label: 'Sit' },
      { code: 'balance', label: 'Stand' },
      { code: 'up', label: 'Up' },
      { code: 'rest', label: 'Rest' },
    ],
  },
  {
    title: 'Action',
    commands: [
      { code: 'hi', label: 'Wave' },
      { code: 'jmp', label: 'Jump' },
      { code: 'pu', label: 'Push-up' },
      { code: 'str', label: 'Stretch' },
    ],
  },
  {
    title: 'Motion',
    commands: [
      { code: 'wkF', label: 'Forward' },
      { code: 'bk', label: 'Back' },
      { code: 'wkL', label: 'Left' },
      { code: 'wkR', label: 'Right' },
    ],
  },
];

const KEYBOARD_SHORTCUTS = [
  { action: 'Forward', code: 'wkF', key: 'W' },
  { action: 'Back', code: 'bk', key: 'S' },
  { action: 'Left', code: 'wkL', key: 'A' },
  { action: 'Right', code: 'wkR', key: 'D' },
  { action: 'Jump', code: 'jmp', key: 'Space' },
];

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function formatMs(ms: number): string {
  const m = Math.floor(ms / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function ControlPanel() {
  const { robotState, connectedClients } = useSimulator();
  const { sendActionWithChain, pendingTxCount, isWalletConnected, isOnChainConfigured } = useOnChainAction();
  const queue = useOnChainQueue();
  const session = useSessionTracker(isWalletConnected, robotState?.commandsExecuted ?? 0);
  const history = useCommandHistory();
  const [showShortcuts, setShowShortcuts] = useState(false);

  const currentAction = robotState?.action ?? 'idle';
  const battery = robotState?.battery ?? 100;
  const commandsExecuted = robotState?.commandsExecuted ?? 0;
  const uptime = robotState?.uptime ?? 0;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat) return;
      const target = event.target;
      if (target instanceof HTMLElement) {
        const t = target.tagName.toLowerCase();
        if (t === 'input' || t === 'textarea' || target.isContentEditable) return;
      }
      const key = event.code === 'Space' ? 'Space' : event.key.toUpperCase();
      const shortcut = KEYBOARD_SHORTCUTS.find((e) => e.key === key);
      if (!shortcut) return;
      event.preventDefault();
      sendActionWithChain(shortcut.code);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sendActionWithChain]);

  return (
    <aside className="flex h-full min-h-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 py-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-400">Control</div>
          <h2 className="mt-1 text-[16px] font-medium tracking-[-0.02em] text-black">GO1 command surface</h2>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-500">
          Live
        </div>
      </div>

      {/* Robot status */}
      <div className="mb-3 grid grid-cols-2 gap-2">
        <Stat label="Action" value={robotState?.actionLabel ?? 'Idle'} />
        <Stat label="Uptime" value={formatUptime(uptime)} />
        <Stat label="Commands" value={String(commandsExecuted)} />
        <Stat label="Battery" value={`${battery.toFixed(0)}%`} />
      </div>

      {/* Battery bar */}
      <div className="mb-3 rounded-xl bg-gray-50 px-3 py-2.5">
        <div className="mb-1.5 flex items-center gap-2 text-[11px] text-gray-500">
          <HardwareIcon className="h-3.5 w-3.5 text-[#4da2ff]" />
          Battery
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full rounded-full bg-[#4da2ff]" style={{ width: `${battery}%` }} />
        </div>
      </div>

      {/* On-chain status (R2) */}
      {isOnChainConfigured && (
        <Section title="On-chain (R2)" icon={<ChainIcon className="h-3.5 w-3.5 text-[#4da2ff]" />}>
          {isWalletConnected ? (
            <div className="grid grid-cols-2 gap-1.5">
              <Stat label="Chain" value="Testnet" />
              <Stat label="Queue" value={String(queue.queueLength)} />
              <Stat label="On-chain" value={String(queue.totalActionsAdded)} />
              <Stat label="Pending" value={String(pendingTxCount)} />
            </div>
          ) : (
            <div className="text-[11px] text-gray-400">Connect wallet for on-chain mode</div>
          )}
        </Section>
      )}

      {/* Session (R10) */}
      {isWalletConnected && session.isActive && (
        <Section title="Session (R10)" badge={formatMs(session.timeRemainingMs)}>
          <div className="grid grid-cols-2 gap-1.5">
            <Stat label="Sequence" value={String(session.sequenceNumber)} />
            <Stat label="Commands" value={String(session.commandsUsed)} />
            <Stat label="Cost" value={`${session.estimatedCost} TREAT`} />
            <Stat label="Rate" value={`${session.pricePerMinute}/min`} />
          </div>
          <div className="mt-1.5 font-mono-ui text-[8px] text-gray-300 break-all">
            {session.sessionId.slice(0, 24)}...
          </div>
        </Section>
      )}

      {/* Multiplayer (R9) */}
      <Section title="Multiplayer (R9)">
        <div className="grid grid-cols-2 gap-1.5">
          <Stat label="Clients" value={String(connectedClients)} />
          <Stat label="Your cmds" value={String(commandsExecuted)} />
        </div>
      </Section>

      {/* Command buttons */}
      <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto pr-1">
        {COMMAND_GROUPS.map((group) => (
          <section key={group.title} className="rounded-xl border border-gray-200 bg-white px-3 py-2.5">
            <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">{group.title}</div>
            <div className="grid grid-cols-2 gap-1.5">
              {group.commands.map((cmd) => {
                const active = currentAction === cmd.code;
                return (
                  <button
                    key={cmd.code}
                    onClick={() => sendActionWithChain(cmd.code)}
                    className={`rounded-lg border px-3 py-2 text-left text-[12px] font-medium transition ${
                      active
                        ? 'border-[#4da2ff] bg-[#4da2ff]/5 text-black'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white'
                    }`}
                  >
                    {cmd.label}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Recent tx history (R2/R4) */}
      {history.length > 0 && (
        <div className="mt-2.5 rounded-xl bg-gray-50 px-3 py-2.5">
          <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-gray-400">
            Recent txns (R4)
          </div>
          <div className="max-h-[72px] space-y-1 overflow-y-auto">
            {history.slice(0, 5).map((h, i) => (
              <div key={i} className="flex items-center justify-between text-[9px]">
                <span className={h.status === 'confirmed' ? 'text-emerald-500' : 'text-red-400'}>
                  {h.action}
                </span>
                {h.txDigest ? (
                  <a
                    href={`https://suiscan.xyz/testnet/tx/${h.txDigest}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-ui text-[#4da2ff] hover:underline"
                  >
                    {h.txDigest.slice(0, 8)}...
                  </a>
                ) : (
                  <span className="text-gray-300">failed</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard shortcuts */}
      <div className="mt-2.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5">
        <button onClick={() => setShowShortcuts((v) => !v)} className="flex w-full items-center justify-between">
          <div className="text-[12px] font-medium text-black">Keyboard</div>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-500">
            {showShortcuts ? 'Hide' : 'Show'}
          </span>
        </button>
        {showShortcuts && (
          <div className="mt-2 space-y-1">
            {KEYBOARD_SHORTCUTS.map((s) => (
              <div key={s.key} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-1.5">
                <div className="text-[11px] text-gray-600">{s.action}</div>
                <kbd className="font-mono-ui rounded bg-white px-2 py-0.5 text-[10px] font-medium text-gray-500 shadow-sm">
                  {s.key}
                </kbd>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-50 px-2.5 py-2">
      <div className="text-[9px] font-medium uppercase tracking-[0.12em] text-gray-400">{label}</div>
      <div className="mt-0.5 text-[13px] font-medium text-black">{value}</div>
    </div>
  );
}

function Section({ title, badge, icon, children }: { title: string; badge?: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-3 rounded-xl bg-gray-50 px-3 py-2.5">
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-gray-400">
          {icon}
          {title}
        </div>
        {badge && (
          <span className="font-mono-ui rounded bg-gray-200 px-1.5 py-0.5 text-[9px] text-gray-600">{badge}</span>
        )}
      </div>
      {children}
    </div>
  );
}
