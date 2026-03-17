import Link from 'next/link';
import { ArrowRightIcon, ClockIcon } from '@/components/icons';
import { CATEGORY_ORDER, getCurriculumPhases, getModuleOrder, MODULES } from '@/lib/modules';

const PHASES = getCurriculumPhases(MODULES);

export default function HomePage() {
  return (
    <div className="flex h-full flex-col overflow-y-auto pb-4">
      <section className="surface-panel mb-3 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-8">
          <div className="max-w-5xl">
            <div className="lesson-eyebrow">Sui robotics playground</div>
            <h1 className="mt-3 max-w-4xl text-[2.45rem] font-medium leading-[0.94] tracking-[-0.075em] text-[#011829] sm:text-[3.35rem] lg:text-[4.6rem]">
              Learn the full R1-R10 robotics track in one clean workspace.
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#5d7893] sm:text-[16px]">
              Start with serial control in R1, move into Move contracts and real-time transport, and finish with the
              complete rental-platform capstone in R10. The simulator stays separate so the lessons stay readable.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                href="/module/R1"
                className="inline-flex items-center gap-2 rounded-full border border-[#c9def1] bg-white px-4 py-2.5 text-[13px] font-medium text-[#17324d] transition hover:border-[#9fc9ef]"
              >
                Start R1
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/modules"
                className="inline-flex items-center gap-2 rounded-full border border-[#d7e6f4] bg-[#f8fbff] px-4 py-2.5 text-[13px] font-medium text-[#5d7893] transition hover:border-[#bfd6ea]"
              >
                Browse all lessons
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 rounded-full border border-[#d7e6f4] bg-[#f8fbff] px-4 py-2.5 text-[13px] font-medium text-[#5d7893] transition hover:border-[#bfd6ea]"
              >
                Open playground
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {PHASES.map(({ category, meta, modules }) => (
                <div
                  key={category}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d7e6f4] bg-[#fbfdff] px-3 py-2 text-[11px] text-[#5d7893]"
                >
                  <span className="font-brand text-[11px] font-medium text-[#17324d]">{meta.eyebrow}</span>
                  <span>{category}</span>
                  <span className="text-[#8ca2b8]">·</span>
                  <span>{modules.length} lessons</span>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-muted rounded-[24px] p-4">
            <div className="lesson-eyebrow">At a glance</div>

            <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[16px] border border-[#d7e6f4] bg-white px-3 py-3">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f8ba6]">Track length</div>
                <div className="mt-1 text-[18px] font-medium tracking-[-0.04em] text-[#17324d]">{MODULES.length}</div>
                <div className="mt-1 text-[12px] text-[#6f8ba6]">sequenced lessons</div>
              </div>
              <div className="rounded-[16px] border border-[#d7e6f4] bg-white px-3 py-3">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f8ba6]">Curriculum shape</div>
                <div className="mt-1 text-[18px] font-medium tracking-[-0.04em] text-[#17324d]">{CATEGORY_ORDER.length}</div>
                <div className="mt-1 text-[12px] text-[#6f8ba6]">phases</div>
              </div>
              <div className="rounded-[16px] border border-[#d7e6f4] bg-white px-3 py-3">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f8ba6]">Build mode</div>
                <div className="mt-1 text-[18px] font-medium tracking-[-0.04em] text-[#17324d]">Sim</div>
                <div className="mt-1 text-[12px] text-[#6f8ba6]">simulator-first flow</div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {PHASES.map(({ category, meta, modules }) => (
                <div key={category} className="rounded-[16px] border border-[#d7e6f4] bg-white px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-brand text-[14px] font-medium text-[#17324d]">{category}</div>
                      <div className="mt-1 text-[12px] text-[#6f8ba6]">{meta.eyebrow}</div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] text-[#6f8ba6]">
                      <ClockIcon className="h-3.5 w-3.5" />
                      {modules.length}
                    </div>
                  </div>
                  <p className="mt-2 text-[12px] leading-5 text-[#6f8ba6]">{meta.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="surface-panel px-4 py-4 sm:px-5 lg:px-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="lesson-eyebrow">Curriculum map</div>
            <h2 className="mt-1 text-[1.5rem] font-medium tracking-[-0.05em] text-[#011829] sm:text-[1.85rem]">
              Every lesson, in order.
            </h2>
          </div>
          <Link href="/modules" className="text-[12px] font-medium text-[#1d79e6]">
            Open lesson index
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {MODULES.map((module) => {
            const phase = PHASES.find((entry) => entry.category === module.category);

            return (
              <Link
                key={module.id}
                href={`/module/${module.id}`}
                className="group rounded-[18px] border border-[#d7e6f4] bg-white px-4 py-4 transition hover:border-[#bfd6ea] hover:shadow-[0_10px_22px_rgba(1,24,41,0.05)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f8ba6]">{module.id}</div>
                    <div className="mt-1 text-[18px] font-medium tracking-[-0.045em] text-[#011829]">{module.title}</div>
                    <div className="mt-1 text-[12px] leading-5 text-[#6f8ba6]">{module.subtitle}</div>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d7e6f4] bg-[#f8fbff] text-[11px] font-medium text-[#17324d]">
                    {getModuleOrder(module.id)}
                  </div>
                </div>

                <p className="mt-3 text-[13px] leading-5 text-[#5d7893]">{module.summary}</p>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#edf4fb] pt-3">
                  <div className="text-[11px] text-[#6f8ba6]">
                    {phase?.meta.eyebrow} · {module.category}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#17324d]">
                    Open
                    <ArrowRightIcon className="h-4 w-4 text-[#4DA2FF] transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
