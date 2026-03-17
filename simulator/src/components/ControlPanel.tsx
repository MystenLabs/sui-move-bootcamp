'use client';

import { useEffect, useState } from 'react';
import { useSimulator } from '@/hooks/useSimulator';
import { useOnChainAction } from '@/hooks/useOnChainAction';
import { useOnChainQueue } from '@/hooks/useOnChainQueue';
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
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
}

export default function ControlPanel() {
  const { robotState } = useSimulator();
  const { sendActionWithChain, pendingTxCount, isWalletConnected, isOnChainConfigured } = useOnChainAction();
  const queue = useOnChainQueue();
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
        const tagName = target.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea' || target.isContentEditable) return;
      }

      const key = event.code === 'Space' ? 'Space' : event.key.toUpperCase();
      const shortcut = KEYBOARD_SHORTCUTS.find((entry) => entry.key === key);
      if (!shortcut) return;

      event.preventDefault();
      sendActionWithChain(shortcut.code);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sendActionWithChain]);

  return (
    <aside className="flex h-full min-h-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 py-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-400">Control</div>
          <h2 className="mt-1 text-[16px] font-medium tracking-[-0.02em] text-black">
            GO1 command surface
          </h2>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-500">
          Live
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <StatusCard label="Action" value={robotState?.actionLabel ?? 'Idle'} />
        <StatusCard label="Uptime" value={formatUptime(uptime)} />
        <StatusCard label="Commands" value={String(commandsExecuted)} />
        <StatusCard label="Battery" value={`${battery.toFixed(0)}%`} />
      </div>

      <div className="mb-4 rounded-xl bg-gray-50 px-3 py-3">
        <div className="mb-2 flex items-center gap-2 text-[12px] text-gray-500">
          <HardwareIcon className="h-4 w-4 text-[#4da2ff]" />
          Battery
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#4da2ff]"
            style={{ width: `${battery}%` }}
          />
        </div>
      </div>

      {isOnChainConfigured && (
        <div className="mb-4 rounded-xl bg-gray-50 px-3 py-3">
          <div className="mb-2 flex items-center gap-2 text-[12px] text-gray-500">
            <ChainIcon className="h-4 w-4 text-[#4da2ff]" />
            On-chain status
          </div>
          {isWalletConnected ? (
            <div className="grid grid-cols-2 gap-2">
              <StatusCard label="Chain" value="Testnet" />
              <StatusCard label="Queue" value={String(queue.queueLength)} />
              <StatusCard label="On-chain" value={String(queue.totalActionsAdded)} />
              <StatusCard label="Pending" value={String(pendingTxCount)} />
            </div>
          ) : (
            <div className="text-[11px] text-gray-400">
              Connect wallet for on-chain mode
            </div>
          )}
        </div>
      )}

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {COMMAND_GROUPS.map((group) => (
          <section key={group.title} className="rounded-xl border border-gray-200 bg-white px-3 py-3">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-gray-400">{group.title}</div>
            <div className="grid grid-cols-2 gap-2">
              {group.commands.map((command) => {
                const active = currentAction === command.code;
                return (
                  <button
                    key={command.code}
                    onClick={() => sendActionWithChain(command.code)}
                    className={`rounded-lg border px-3 py-2 text-left text-[12px] font-medium transition ${
                      active
                        ? 'border-[#4da2ff] bg-[#4da2ff]/5 text-black'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white'
                    }`}
                  >
                    {command.label}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white px-3 py-3">
        <button onClick={() => setShowShortcuts((v) => !v)} className="flex w-full items-center justify-between">
          <div className="text-[12px] font-medium text-black">Keyboard</div>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-500">
            {showShortcuts ? 'Hide' : 'Show'}
          </span>
        </button>

        {showShortcuts && (
          <div className="mt-3 space-y-1.5">
            {KEYBOARD_SHORTCUTS.map((shortcut) => (
              <div key={shortcut.key} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <div className="text-[12px] text-gray-600">{shortcut.action}</div>
                <kbd className="font-mono-ui rounded bg-white px-2 py-0.5 text-[10px] font-medium text-gray-500 shadow-sm">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-50 px-3 py-2.5">
      <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">{label}</div>
      <div className="mt-0.5 text-[14px] font-medium text-black">{value}</div>
    </div>
  );
}
