'use client';

import { useMemo, useState } from 'react';
import ModuleCard from '@/components/ModuleCard';
import { getCurriculumPhases, getModuleOrder, MODULES } from '@/lib/modules';

const FILTER_OPTIONS = ['All', 'Fundamentals', 'Integration', 'Security', 'Full-Stack'];

export default function ModulesPage() {
  const [filter, setFilter] = useState('All');

  const groupedModules = useMemo(() => {
    const visibleModules = filter === 'All' ? MODULES : MODULES.filter((module) => module.category === filter);
    return getCurriculumPhases(visibleModules);
  }, [filter]);

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-5">
      <section className="surface-panel mb-4 px-5 py-5 sm:px-6">
        <div className="max-w-3xl">
          <div className="lesson-eyebrow">Lesson index</div>
          <h1 className="font-brand mt-2 text-[1.7rem] font-medium tracking-[-0.05em] text-[#011829] sm:text-[2.05rem]">
            The robotics track, ordered cleanly from R1 to R10.
          </h1>
          <p className="mt-3 text-[14px] leading-6 text-[#5d7893] sm:text-[15px]">
            Use this page as the full curriculum index. Each section preserves the real lesson sequence instead of
            restarting the numbering inside each phase.
          </p>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`shrink-0 rounded-full border px-3 py-2 text-[12px] font-medium transition ${
                filter === option
                  ? 'border-[#c9def1] bg-white text-[#17324d]'
                  : 'border-[#d7e6f4] bg-[#f8fbff] text-[#5d7893]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-4">
        {groupedModules.map(({ category, meta, modules }) => {
          if (modules.length === 0) {
            return null;
          }

          return (
            <section key={category} className="surface-panel px-5 py-5 sm:px-6">
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <div className="lesson-eyebrow">{meta.eyebrow}</div>
                  <h2 className="font-brand mt-1 text-[1.1rem] font-medium tracking-[-0.04em] text-[#011829]">
                    {category}
                  </h2>
                  <p className="mt-1 text-[13px] leading-5 text-[#6f8ba6]">{meta.description}</p>
                </div>
                <div className="rounded-full border border-[#d7e6f4] bg-[#f8fbff] px-3 py-1.5 text-[11px] text-[#6f8ba6]">
                  {modules[0]?.id} to {modules[modules.length - 1]?.id}
                </div>
              </div>

              <div className="grid gap-3 lg:grid-cols-2">
                {modules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    order={getModuleOrder(module.id)}
                    id={module.id}
                    title={module.title}
                    subtitle={module.subtitle}
                    category={module.category}
                    time={module.time}
                    hardware={module.hardware}
                    summary={module.summary}
                    artifact={module.artifact}
                    focus={module.focus}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
