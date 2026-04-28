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
      <section className="mb-4 rounded-2xl border border-gray-200 bg-white px-5 py-5 sm:px-6">
        <div className="max-w-3xl">
          <div className="lesson-eyebrow">Lesson index</div>
          <h1 className="mt-2 text-[1.7rem] font-medium tracking-[-0.03em] text-black sm:text-[2.05rem]">
            The robotics track, R1 to R10.
          </h1>
          <p className="mt-3 text-[14px] leading-6 text-gray-500 sm:text-[15px]">
            The full curriculum index. Each section preserves the real lesson sequence.
          </p>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`shrink-0 rounded-full px-3 py-2 text-[12px] font-medium transition ${
                filter === option
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-4">
        {groupedModules.map(({ category, meta, modules }) => {
          if (modules.length === 0) return null;

          return (
            <section key={category} className="rounded-2xl border border-gray-200 bg-white px-5 py-5 sm:px-6">
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <div className="lesson-eyebrow">{meta.eyebrow}</div>
                  <h2 className="mt-1 text-[1.1rem] font-medium tracking-[-0.02em] text-black">
                    {category}
                  </h2>
                  <p className="mt-1 text-[13px] leading-5 text-gray-500">{meta.description}</p>
                </div>
                <div className="rounded-full bg-gray-100 px-3 py-1.5 text-[11px] font-medium text-gray-500">
                  {modules[0]?.id} - {modules[modules.length - 1]?.id}
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
