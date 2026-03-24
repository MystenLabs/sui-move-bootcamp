'use client';

import { useState } from 'react';
import Link from 'next/link';
import ControlPanel from '@/components/ControlPanel';
import RobotViewport from '@/components/RobotViewport';
import Terminal from '@/components/Terminal';
import { ArrowRightIcon } from '@/components/icons';
import { useOnChainAction } from '@/hooks/useOnChainAction';
import { MODULES, MODULE_CONCEPTS, CATEGORY_META } from '@/lib/modules';

export default function PlaygroundPage() {
  const { isWalletConnected } = useOnChainAction();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const selected = activeModule ? MODULES.find((m) => m.id === activeModule) : null;
  const concepts = activeModule ? MODULE_CONCEPTS[activeModule] ?? [] : [];

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Top bar — lesson selector */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-gray-200 bg-white px-4 py-2">
        <button
          onClick={() => setActiveModule(null)}
          className={`shrink-0 rounded-lg px-3 py-1.5 text-[12px] font-medium transition ${
            !activeModule ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Free Play
        </button>
        {MODULES.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-[12px] font-medium transition ${
              activeModule === m.id ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {m.id}
          </button>
        ))}
      </div>

      {/* Lesson context bar */}
      {selected && (
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 bg-gray-50 px-4 py-2.5">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.1em] text-gray-400">
              {CATEGORY_META[selected.category]?.eyebrow}
            </span>
            <span className="truncate text-[13px] font-medium text-black">
              {selected.id}: {selected.title}
            </span>
            <span className="hidden truncate text-[12px] text-gray-400 sm:inline">
              {selected.subtitle}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {concepts.slice(0, 2).map((c) => (
              <span key={c} className="hidden rounded bg-white px-2 py-0.5 text-[9px] font-medium text-gray-500 lg:inline">
                {c}
              </span>
            ))}
            <Link
              href={`/module/${selected.id}`}
              className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-[11px] font-medium text-[#4da2ff] shadow-sm transition hover:shadow"
            >
              Open lesson
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Main content */}
      {isWalletConnected ? (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-3">
          {/* Lesson description card */}
          {selected && (
            <div className="mb-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[13px] leading-5 text-gray-500">{selected.summary}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selected.focus.map((f) => (
                      <span key={f} className="rounded bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-500">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-[10px] font-medium text-gray-400">{selected.time}</div>
                  <div className="mt-0.5 text-[10px] text-gray-300">{selected.artifact}</div>
                </div>
              </div>
              {selected.simScript && (
                <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2">
                  <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-gray-400">Run command</div>
                  <code className="mt-0.5 block font-mono-ui text-[11px] text-gray-600">{selected.simScript}</code>
                </div>
              )}
            </div>
          )}

          <section className="grid min-h-0 flex-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_288px]">
            <div className="flex min-h-0 flex-col gap-3">
              <RobotViewport />
              <Terminal />
            </div>
            <ControlPanel />
          </section>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center bg-white">
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-gray-400">
                <rect x="2" y="6" width="20" height="14" rx="3" />
                <path d="M2 10h20" />
                <path d="M6 14h.01" />
              </svg>
            </div>
            <h2 className="mt-5 text-[1.4rem] font-medium tracking-[-0.02em] text-black">
              Connect your wallet to begin
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-[14px] leading-6 text-gray-500">
              The robot simulator requires a connected Sui wallet. Every action you
              perform is signed and submitted as a real testnet transaction.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {MODULES.slice(0, 5).map((m) => (
                <span key={m.id} className="rounded-full bg-gray-50 px-3 py-1.5 text-[11px] text-gray-400">
                  {m.id}: {m.title}
                </span>
              ))}
              <span className="rounded-full bg-gray-50 px-3 py-1.5 text-[11px] text-gray-400">
                +{MODULES.length - 5} more
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
