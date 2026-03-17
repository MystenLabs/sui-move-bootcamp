'use client';

import Link from 'next/link';
import ControlPanel from '@/components/ControlPanel';
import RobotViewport from '@/components/RobotViewport';
import { ArrowRightIcon, ClockIcon, SuiDropletIcon } from '@/components/icons';
import { MODULES } from '@/lib/modules';

export default function PlaygroundPage() {
  return (
    <div className="flex h-full flex-col overflow-y-auto pb-4">
      <section className="surface-panel mb-3 px-4 py-5 sm:px-5 lg:px-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e6f4] bg-white px-3 py-1.5 text-[11px] text-[#5d7893]">
              <SuiDropletIcon className="h-4 w-4 text-[#4DA2FF]" />
              Sui brand surface
            </div>
            <div className="lesson-eyebrow mt-4">Dedicated simulator</div>
            <h1 className="mt-3 max-w-3xl text-[2.2rem] font-medium leading-[0.96] tracking-[-0.07em] text-[#011829] sm:text-[3rem]">
              Drive the Unitree GO1 in a clean, Sui-styled sandbox.
            </h1>
            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-[#5d7893] sm:text-[15px]">
              This page is the focused control surface for the robot itself. Keep the lessons separate, use the same
              simulator state across the R1-R10 track, and test posture, movement, and quick command flows here.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d7e6f4] bg-[#f8fbff] px-3 py-2 text-[11px] text-[#5d7893]">
                <ClockIcon className="h-3.5 w-3.5 text-[#4DA2FF]" />
                {MODULES.length} lessons share this simulator
              </span>
              <span className="rounded-full border border-[#d7e6f4] bg-[#f8fbff] px-3 py-2 text-[11px] text-[#5d7893]">
                Sea / Ocean / Aqua palette
              </span>
            </div>
          </div>

          <div className="surface-muted rounded-[22px] p-4">
            <div className="lesson-eyebrow">Playground route</div>
            <div className="mt-2 text-[15px] font-medium tracking-[-0.03em] text-[#011829]">Use the simulator, then jump back into lessons.</div>
            <div className="mt-3 space-y-2">
              <Link
                href="/module/R1"
                className="inline-flex w-full items-center justify-between rounded-[14px] border border-[#c9def1] bg-white px-4 py-3 text-[13px] font-medium text-[#17324d] transition hover:border-[#9fc9ef]"
              >
                Start with R1
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/modules"
                className="inline-flex w-full items-center justify-between rounded-[14px] border border-[#d7e6f4] bg-white px-4 py-3 text-[13px] font-medium text-[#5d7893] transition hover:border-[#bfd6ea]"
              >
                Back to lessons
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid items-start gap-3 xl:grid-cols-[minmax(0,1fr)_288px]">
        <RobotViewport />
        <ControlPanel />
      </section>
    </div>
  );
}
