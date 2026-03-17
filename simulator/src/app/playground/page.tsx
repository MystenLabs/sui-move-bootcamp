'use client';

import Link from 'next/link';
import ControlPanel from '@/components/ControlPanel';
import RobotViewport from '@/components/RobotViewport';
import Terminal from '@/components/Terminal';
import { ArrowRightIcon } from '@/components/icons';
import { useOnChainAction } from '@/hooks/useOnChainAction';

export default function PlaygroundPage() {
  const { isWalletConnected } = useOnChainAction();

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-4">
      <section className="mb-3 rounded-2xl border border-gray-200 bg-white px-4 py-5 sm:px-5 lg:px-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="max-w-4xl">
            <div className="lesson-eyebrow">Simulator</div>
            <h1 className="mt-3 max-w-3xl text-[2.2rem] font-medium leading-[0.96] tracking-[-0.04em] text-black sm:text-[3rem]">
              Drive the Unitree GO1.
            </h1>
            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-gray-500 sm:text-[15px]">
              Connect your Sui wallet to control the robot. Every action is a real
              on-chain transaction signed by you.
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-[12px] font-medium uppercase tracking-[0.1em] text-gray-400">Quick links</div>
            <div className="mt-3 space-y-2">
              <Link
                href="/module/R1"
                className="inline-flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-[13px] font-medium text-black transition hover:border-gray-300"
              >
                Start with R1
                <ArrowRightIcon className="h-4 w-4 text-[#4da2ff]" />
              </Link>
              <Link
                href="/modules"
                className="inline-flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-[13px] font-medium text-gray-500 transition hover:border-gray-300"
              >
                Back to lessons
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {isWalletConnected ? (
        <>
          <section className="grid items-start gap-3 xl:grid-cols-[minmax(0,1fr)_288px]">
            <RobotViewport />
            <ControlPanel />
          </section>
          <Terminal />
        </>
      ) : (
        <section className="flex flex-1 items-center justify-center rounded-2xl border border-gray-200 bg-white">
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
            <div className="mt-6 text-[13px] text-gray-400">
              Use the Connect wallet button in the top right
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
