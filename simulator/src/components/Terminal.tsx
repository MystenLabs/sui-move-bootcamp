'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSimulator, type TerminalEntry } from '@/hooks/useSimulator';
import { useOnChainAction } from '@/hooks/useOnChainAction';
import { TerminalIcon } from '@/components/icons';

const TYPE_COLORS: Record<TerminalEntry['type'], string> = {
  info: 'text-gray-500',
  cmd: 'text-[#4da2ff]',
  ok: 'text-emerald-600',
  error: 'text-red-500',
  event: 'text-blue-600',
  system: 'text-violet-500',
};

export default function Terminal() {
  const { terminalLogs, sendCommand, addTerminalLog, clearTerminalLogs } = useSimulator();
  const { sendActionWithChain } = useOnChainAction();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [terminalLogs]);

  const handleSubmit = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return;

      setHistory((previous) => {
        const next = [...previous, trimmed];
        return next.length > 100 ? next.slice(-100) : next;
      });
      setHistoryIndex(-1);

      if (trimmed.startsWith('k')) {
        sendCommand(trimmed);
      } else if (trimmed === 'clear') {
        clearTerminalLogs();
      } else if (trimmed === 'help') {
        addTerminalLog('system', 'Commands: k<action>, clear, help');
        addTerminalLog('system', 'Actions: sit, balance, up, rest, hi, wkF, bk, trF, jmp, pu, pd, str, bf, wkL, wkR');
      } else {
        sendActionWithChain(trimmed);
      }

      setInput('');
    },
    [addTerminalLog, clearTerminalLogs, sendActionWithChain, sendCommand],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSubmit(input);
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (history.length === 0) return;
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex === -1) return;
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
          return;
        }
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    },
    [handleSubmit, history, historyIndex, input],
  );

  return (
    <section className="px-4 pb-4 pt-3 sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
              <TerminalIcon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-gray-400">Terminal</div>
              <div className="mt-0.5 text-[14px] font-medium text-black">Robot console</div>
            </div>
          </div>
          <button
            onClick={clearTerminalLogs}
            className="rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-medium text-gray-500 transition hover:bg-gray-200"
          >
            Clear
          </button>
        </div>

        <div
          ref={scrollRef}
          className="h-[120px] overflow-y-auto bg-gray-50 px-4 py-3 font-mono-ui text-[11px] leading-5 sm:h-[140px]"
        >
          {terminalLogs.length === 0 && <div className="text-gray-400">Type `help` for the simulator command vocabulary.</div>}

          {terminalLogs.map((entry, index) => (
            <div key={`${entry.time}-${index}`} className="grid grid-cols-[4rem_minmax(0,1fr)] gap-3">
              <span className="text-gray-300">{entry.time}</span>
              <span className={TYPE_COLORS[entry.type]}>{entry.message}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
            <span className="font-mono-ui text-[12px] font-medium text-[#4da2ff]">&gt;</span>
            <input
              data-terminal-input
              type="text"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setHistoryIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter a command or action"
              className="font-mono-ui flex-1 bg-transparent text-[12px] text-black outline-none placeholder:text-gray-400"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
