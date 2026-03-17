'use client';

import Link from 'next/link';
import {
  ArrowRightIcon,
  BridgeIcon,
  ClockIcon,
  CompassIcon,
  HardwareIcon,
  ShieldWaveIcon,
  StackIcon,
} from '@/components/icons';

interface ModuleCardProps {
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

const CATEGORY_THEMES = {
  Fundamentals: { icon: CompassIcon, accent: 'text-[#1d79e6]' },
  Integration: { icon: BridgeIcon, accent: 'text-[#0f7eaa]' },
  Security: { icon: ShieldWaveIcon, accent: 'text-[#3459d1]' },
  'Full-Stack': { icon: StackIcon, accent: 'text-[#274965]' },
};

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
  const theme = CATEGORY_THEMES[category as keyof typeof CATEGORY_THEMES] ?? CATEGORY_THEMES.Fundamentals;
  const Icon = theme.icon;

  return (
    <Link
      href={`/module/${id}`}
      className="group rounded-[18px] border border-[#d7e6f4] bg-white px-4 py-4 transition hover:border-[#bfd6ea] hover:shadow-[0_10px_22px_rgba(1,24,41,0.05)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d7e6f4] bg-[#f8fbff] text-[11px] font-medium text-[#17324d]">
            {order}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#6f8ba6]">{id}</span>
              <span className={`inline-flex items-center gap-1 ${theme.accent}`}>
                <Icon className="h-3.5 w-3.5" />
              </span>
            </div>
            <div className="font-brand mt-1 text-[16px] font-medium tracking-[-0.03em] text-[#011829]">{title}</div>
            <div className="mt-1 text-[12px] leading-5 text-[#6f8ba6]">{subtitle}</div>
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-[#d7e6f4] bg-[#f8fbff] px-2.5 py-1 text-[10px] text-[#6f8ba6]">
          {category}
        </span>
      </div>

      <p className="mt-3 text-[13px] leading-5 text-[#5d7893]">{summary}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d7e6f4] bg-[#f8fbff] px-2.5 py-1 text-[10px] text-[#6f8ba6]">
          <ClockIcon className="h-3.5 w-3.5" />
          {time}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d7e6f4] bg-[#f8fbff] px-2.5 py-1 text-[10px] text-[#6f8ba6]">
          {hardware ? <HardwareIcon className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
          {hardware ? 'Simulator' : 'Software'}
        </span>
        <span className="inline-flex items-center rounded-full border border-[#d7e6f4] bg-[#f8fbff] px-2.5 py-1 text-[10px] text-[#6f8ba6]">
          {artifact}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {focus.slice(0, 3).map((item) => (
          <span key={item} className="rounded-full bg-[#f8fbff] px-2.5 py-1 text-[10px] text-[#6f8ba6]">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-[12px] font-medium text-[#17324d]">
        <span>Open lesson</span>
        <ArrowRightIcon className="h-4 w-4 text-[#4DA2FF] transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
