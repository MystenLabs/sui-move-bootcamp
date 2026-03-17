'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DiagramCanvas from '@/components/DiagramCanvas';
import { CATEGORY_META, getModuleOrder, getOrderedModules, MODULES } from '@/lib/modules';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BridgeIcon,
  ClockIcon,
  CompassIcon,
  HardwareIcon,
  ShieldWaveIcon,
  StackIcon,
} from '@/components/icons';

interface ModuleDetail {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  time: string;
  hardware: boolean;
  simScript: string;
  summary: string;
  artifact: string;
  focus: string[];
  concepts: string[];
  readme?: string;
}

function simpleMarkdown(text: string): string {
  const html = text
    .replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<pre class="my-4 overflow-x-auto rounded-[20px] border border-[#d7e6f4] bg-[#f8fbff] p-4 text-[12px] leading-6 text-[#36526c]"><code>$2</code></pre>',
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="rounded-full border border-[#d7e6f4] bg-white px-2 py-1 text-[12px] text-[#1d79e6]">$1</code>',
    )
    .replace(/^### (.+)$/gm, '<h3 class="font-brand mt-8 text-[18px] font-medium tracking-[-0.03em] text-[#011829]">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-brand mt-10 text-[1.45rem] font-medium tracking-[-0.04em] text-[#011829]">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-brand mt-10 text-[1.7rem] font-medium tracking-[-0.05em] text-[#011829]">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="font-medium text-[#1d79e6] underline underline-offset-4" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    .replace(/^- (.+)$/gm, '<li class="ml-5 list-disc">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal">$1</li>')
    .replace(/^---$/gm, '<hr class="my-8 border-[#d7e6f4]" />')
    .replace(
      /^> (.+)$/gm,
      '<blockquote class="my-4 rounded-r-[20px] border-l-4 border-[#4da2ff] bg-[#f8fbff] px-4 py-3 italic text-[#4b6781]">$1</blockquote>',
    )
    .replace(/\n\n/g, '</p><p class="mt-4 text-[14px] leading-6 text-[#4b6781]">')
    .replace(/\n/g, '<br />');

  return `<p class="text-[14px] leading-6 text-[#4b6781]">${html}</p>`;
}

const CATEGORY_ICONS = {
  Fundamentals: CompassIcon,
  Integration: BridgeIcon,
  Security: ShieldWaveIcon,
  'Full-Stack': StackIcon,
};

export default function ModuleDetailPage() {
  const params = useParams();
  const id = String(params.id ?? '').toUpperCase();
  const orderedModules = useMemo(() => getOrderedModules(MODULES), []);

  const [module, setModule] = useState<ModuleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(`/api/module/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Module not found');
        }
        return response.json();
      })
      .then((data) => {
        setModule(data);
        setLoading(false);
      })
      .catch((fetchError: Error) => {
        setError(fetchError.message);
        setLoading(false);
      });
  }, [id]);

  const navigation = useMemo(() => {
    const index = orderedModules.findIndex((entry) => entry.id === id);
    return {
      previous: index > 0 ? orderedModules[index - 1] : null,
      next: index >= 0 && index < orderedModules.length - 1 ? orderedModules[index + 1] : null,
      index,
    };
  }, [id, orderedModules]);

  if (loading) {
    return (
      <div className="surface-panel flex h-full items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#bfd6ea] border-t-[#4da2ff]" />
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="surface-panel flex h-full flex-col items-center justify-center gap-4">
        <p className="text-sm text-[#5d7893]">{error ?? 'Module not found'}</p>
        <Link href="/modules" className="inline-flex items-center gap-2 text-sm font-medium text-[#1d79e6]">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to lessons
        </Link>
      </div>
    );
  }

  const categoryMeta = CATEGORY_META[module.category];
  const CategoryIcon = CATEGORY_ICONS[module.category as keyof typeof CATEGORY_ICONS] ?? CompassIcon;

  const simulatorSteps = [
    'Start the simulator from the root with `cd simulator && npm run dev`.',
    'Open `http://localhost:3000` and keep the playground visible.',
    `Run the module path: \`${module.simScript}\`.`,
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-5">
      <section className="surface-panel mb-4 px-5 py-5 sm:px-6">
        <Link href="/modules" className="inline-flex items-center gap-2 text-[12px] font-medium text-[#1d79e6]">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to lessons
        </Link>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_280px]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="lesson-chip text-[10px]">
                <CategoryIcon className="h-4 w-4" />
                {categoryMeta.eyebrow}
              </span>
              <span className="lesson-chip text-[10px]">
                <ClockIcon className="h-4 w-4" />
                {module.time}
              </span>
              <span className="lesson-chip text-[10px]">
                {module.hardware ? <HardwareIcon className="h-4 w-4" /> : <CategoryIcon className="h-4 w-4" />}
                {module.hardware ? 'Simulator-ready' : 'Software-first'}
              </span>
            </div>

            <div className="mt-4 text-[10px] uppercase tracking-[0.22em] text-[#6f8ba6]">{module.id}</div>
            <h1 className="font-brand mt-2 text-[2rem] font-medium leading-[1.02] tracking-[-0.05em] text-[#011829] sm:text-[2.35rem]">
              {module.title}
            </h1>
            <div className="mt-2 text-[14px] font-medium text-[#36526c] sm:text-[15px]">{module.subtitle}</div>
            <p className="mt-3 max-w-3xl text-[14px] leading-6 text-[#5d7893] sm:text-[15px]">{module.summary}</p>
          </div>

          <div className="surface-muted rounded-[20px] p-4">
            <div className="lesson-eyebrow">Build surface</div>
            <div className="font-brand mt-2 text-[16px] font-medium text-[#011829]">{module.artifact}</div>
            <p className="mt-2 text-[13px] leading-5 text-[#5d7893]">{categoryMeta.description}</p>

            <div className="mt-4 space-y-2">
              {module.focus.map((item) => (
                <div key={item} className="rounded-[14px] border border-[#d7e6f4] bg-white px-3 py-2.5 text-[12px] text-[#36526c]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="surface-panel mb-4 px-4 py-4 sm:px-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <div className="lesson-eyebrow">Curriculum track</div>
            <h2 className="font-brand mt-1 text-[1.05rem] font-medium tracking-[-0.04em] text-[#011829]">
              Keep the full R1-R10 sequence visible
            </h2>
          </div>
          <Link href="/modules" className="text-[12px] font-medium text-[#1d79e6]">
            Open lesson index
          </Link>
        </div>

        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
          {orderedModules.map((entry) => {
            const active = entry.id === module.id;
            const stateClassName = active
              ? 'border-[#b7d5f1] bg-[#f4f9ff]'
              : 'border-[#d7e6f4] bg-white hover:border-[#bfd6ea]';

            return (
              <Link
                key={entry.id}
                href={`/module/${entry.id}`}
                className={`rounded-[16px] border px-3 py-3 transition ${stateClassName}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f8ba6]">{entry.id}</div>
                    <div className="font-brand mt-1 text-[14px] font-medium text-[#17324d]">{entry.title}</div>
                    <div className="mt-1 text-[12px] leading-5 text-[#6f8ba6]">{entry.subtitle}</div>
                  </div>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d7e6f4] bg-[#f8fbff] text-[10px] font-medium text-[#17324d]">
                    {getModuleOrder(entry.id)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-4 grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <div className="surface-panel px-5 py-5">
            <div className="mb-3">
              <div className="lesson-eyebrow">Architecture</div>
              <h2 className="font-brand mt-1 text-[1.15rem] font-medium tracking-[-0.04em] text-[#011829]">
                How this lesson fits the system
              </h2>
            </div>
            <DiagramCanvas moduleId={module.id} />
          </div>

          <div className="surface-panel px-5 py-5 sm:px-6">
            <div className="mb-4">
              <div className="lesson-eyebrow">Lesson content</div>
              <h2 className="font-brand mt-1 text-[1.2rem] font-medium tracking-[-0.04em] text-[#011829] sm:text-[1.35rem]">
                Source material and implementation notes
              </h2>
            </div>

            {module.readme ? (
              <div className="prose-light" dangerouslySetInnerHTML={{ __html: simpleMarkdown(module.readme) }} />
            ) : (
              <p className="text-sm text-[#5d7893]">No README content was found for this lesson.</p>
            )}
          </div>

          {navigation.next ? (
            <div className="surface-panel px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="lesson-eyebrow">Next lesson</div>
                  <h2 className="font-brand mt-1 text-[1.1rem] font-medium tracking-[-0.04em] text-[#011829]">
                    Continue to {navigation.next.id} · {navigation.next.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-5 text-[#6f8ba6]">
                    Keep moving through the robotics track in order.
                  </p>
                </div>
                <Link
                  href={`/module/${navigation.next.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#c9def1] bg-white px-4 py-2.5 text-[13px] font-medium text-[#17324d] transition hover:border-[#9fc9ef]"
                >
                  Go to {navigation.next.id}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-4 xl:sticky xl:top-4">
          <div className="surface-panel px-4 py-4">
            <div className="lesson-eyebrow">Simulator route</div>
            <h3 className="font-brand mt-1 text-[15px] font-medium tracking-[-0.03em] text-[#011829]">
              Run this lesson cleanly
            </h3>
            <div className="mt-3 space-y-2.5">
              {simulatorSteps.map((step, index) => (
                <div key={step} className="rounded-[14px] border border-[#d7e6f4] bg-[#f8fbff] px-3 py-3">
                  <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#d7e6f4] bg-white text-[10px] font-medium text-[#17324d]">
                    {index + 1}
                  </div>
                  <p className="text-[12px] leading-5 text-[#4b6781]">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel px-4 py-4">
            <div className="lesson-eyebrow">Core concepts</div>
            <h3 className="font-brand mt-1 text-[15px] font-medium tracking-[-0.03em] text-[#011829]">
              What to understand before moving on
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {module.concepts.map((concept) => (
                <span key={concept} className="rounded-full border border-[#d7e6f4] bg-[#f8fbff] px-3 py-1.5 text-[11px] text-[#36526c]">
                  {concept}
                </span>
              ))}
            </div>
          </div>

          <div className="surface-panel px-4 py-4">
            <div className="lesson-eyebrow">Progression</div>
            <div className="mt-3 grid gap-2.5">
              {navigation.previous ? (
                <Link
                  href={`/module/${navigation.previous.id}`}
                  className="rounded-[14px] border border-[#d7e6f4] bg-[#f8fbff] px-3 py-3 transition hover:border-[#bfd6ea]"
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f8ba6]">Previous</div>
                  <div className="font-brand mt-1.5 text-[14px] font-medium text-[#011829]">
                    {navigation.previous.id} · {navigation.previous.title}
                  </div>
                </Link>
              ) : null}

              {navigation.next ? (
                <Link
                  href={`/module/${navigation.next.id}`}
                  className="rounded-[14px] border border-[#d7e6f4] bg-[#f8fbff] px-3 py-3 transition hover:border-[#bfd6ea]"
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f8ba6]">Next</div>
                  <div className="font-brand mt-1.5 text-[14px] font-medium text-[#011829]">
                    {navigation.next.id} · {navigation.next.title}
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
