'use client';

import { useEffect, useState } from 'react';
import { useSimulator } from '@/hooks/useSimulator';
import { useOnChainAction } from '@/hooks/useOnChainAction';
import { useOnChainQueue } from '@/hooks/useOnChainQueue';
import { ChainIcon, ClockIcon, HardwareIcon } from '@/components/icons';

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
      if (event.repeat) {
        return;
      }

      const target = event.target;
      if (target instanceof HTMLElement) {
        const tagName = target.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea' || target.isContentEditable) {
          return;
        }
      }

      const key = event.code === 'Space' ? 'Space' : event.key.toUpperCase();
      const shortcut = KEYBOARD_SHORTCUTS.find((entry) => entry.key === key);
      if (!shortcut) {
        return;
      }

      event.preventDefault();
      sendActionWithChain(shortcut.code);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sendActionWithChain]);

  return (
    <aside className="surface-panel flex h-full min-h-[380px] flex-col overflow-hidden px-4 py-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="lesson-eyebrow">Control</div>
          <h2 className="font-brand mt-1 text-[16px] font-medium tracking-[-0.03em] text-[#011829]">
            GO1 command surface
          </h2>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d7e6f4] bg-[#f8fbff] px-2.5 py-1 text-[10px] text-[#6f8ba6]">
          Live
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <StatusCard label="Action" value={robotState?.actionLabel ?? 'Idle'} />
        <StatusCard label="Uptime" value={formatUptime(uptime)} />
        <StatusCard label="Commands" value={String(commandsExecuted)} />
        <StatusCard label="Battery" value={`${battery.toFixed(0)}%`} />
      </div>

      <div className="mb-4 rounded-[16px] border border-[#d7e6f4] bg-[#f8fbff] px-3 py-3">
        <div className="mb-2 flex items-center gap-2 text-[12px] text-[#5d7893]">
          <HardwareIcon className="h-4 w-4 text-[#4DA2FF]" />
          Battery envelope
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#4DA2FF_0%,#1f8f6f_100%)]"
            style={{ width: `${battery}%` }}
          />
        </div>
      </div>

      {isOnChainConfigured && (
        <div className="mb-4 rounded-[16px] border border-[#d7e6f4] bg-[#f8fbff] px-3 py-3">
          <div className="mb-2 flex items-center gap-2 text-[12px] text-[#5d7893]">
            <ChainIcon className="h-4 w-4 text-[#4DA2FF]" />
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
            <div className="text-[11px] text-[#6f8ba6]">
              Connect wallet for on-chain mode
            </div>
          )}
        </div>
      )}

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {COMMAND_GROUPS.map((group) => (
          <section key={group.title} className="rounded-[16px] border border-[#d7e6f4] bg-white px-3 py-3">
            <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#6f8ba6]">{group.title}</div>
            <div className="grid grid-cols-2 gap-2">
              {group.commands.map((command) => {
                const active = currentAction === command.code;
                return (
                  <button
                    key={command.code}
                    onClick={() => sendActionWithChain(command.code)}
                    className={`rounded-[14px] border px-3 py-2 text-left text-[12px] font-medium transition ${
                      active
                        ? 'border-[#c9def1] bg-[#f4f8fc] text-[#17324d]'
                        : 'border-[#d7e6f4] bg-[#f8fbff] text-[#5d7893] hover:border-[#bfd6ea] hover:bg-white'
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

      <div className="mt-4 rounded-[16px] border border-[#d7e6f4] bg-white px-3 py-3">
        <button onClick={() => setShowShortcuts((value) => !value)} className="flex w-full items-center justify-between">
          <div className="text-[12px] font-medium text-[#17324d]">Keyboard</div>
          <span className="rounded-full border border-[#d7e6f4] bg-[#f8fbff] px-2.5 py-1 text-[10px] text-[#6f8ba6]">
            {showShortcuts ? 'Hide' : 'Show'}
          </span>
        </button>

        {showShortcuts && (
          <div className="mt-3 space-y-2">
            {KEYBOARD_SHORTCUTS.map((shortcut) => (
              <div key={shortcut.key} className="flex items-center justify-between rounded-[14px] bg-[#f8fbff] px-3 py-2">
                <div className="inline-flex items-center gap-2 text-[12px] text-[#5d7893]">
                  <ClockIcon className="h-3.5 w-3.5 text-[#4DA2FF]" />
                  {shortcut.action}
                </div>
                <kbd className="font-mono-ui rounded-full border border-[#d7e6f4] bg-white px-2.5 py-1 text-[10px] text-[#6f8ba6]">
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
    <div className="rounded-[14px] border border-[#d7e6f4] bg-[#f8fbff] px-3 py-3">
      <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f8ba6]">{label}</div>
      <div className="font-brand mt-1 text-[14px] font-medium text-[#17324d]">{value}</div>
    </div>
  );
}
