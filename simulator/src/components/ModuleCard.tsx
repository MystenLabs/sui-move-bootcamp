'use client';

import Link from 'next/link';
import { ArrowRightIcon, ClockIcon, HardwareIcon } from '@/components/icons';

export interface ModuleCardProps {
  order: number;
  id: string;
  title: string;
  subtitle: string;
  category: string;
  time: string;
  hardware: boolean;
  summary: string;
  artifact: string;
  focus: string[];
}

export default function ModuleCard({
  order,
  id,
  title,
  subtitle,
  category,
  time,
  hardware,
  summary,
  artifact,
  focus,
}: ModuleCardProps) {
  return (
    <Link
      href={`/module/${id}`}
      className="group rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[11px] font-medium text-gray-600">
            {order}
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-gray-400">{id}</div>
            <div className="mt-1 text-[16px] font-medium tracking-[-0.02em] text-black">{title}</div>
            <div className="mt-0.5 text-[12px] text-gray-500">{subtitle}</div>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-500">
          {category}
        </span>
      </div>

      <p className="mt-3 text-[13px] leading-5 text-gray-500">{summary}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-[10px] font-medium text-gray-500">
          <ClockIcon className="h-3.5 w-3.5" />
          {time}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-[10px] font-medium text-gray-500">
          <HardwareIcon className="h-3.5 w-3.5" />
          {hardware ? 'Simulator' : 'Software'}
        </span>
        <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[10px] font-medium text-gray-500">
          {artifact}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {focus.slice(0, 3).map((item) => (
          <span key={item} className="rounded bg-gray-50 px-2 py-0.5 text-[10px] text-gray-400">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-[12px] font-medium text-black">
        <span>Open lesson</span>
        <ArrowRightIcon className="h-4 w-4 text-[#4da2ff] transition group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
