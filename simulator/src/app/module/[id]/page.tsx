'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DiagramCanvas from '@/components/DiagramCanvas';
import { CATEGORY_META, getModuleOrder, getOrderedModules, MODULES } from '@/lib/modules';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClockIcon,
  HardwareIcon,
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
      '<pre class="my-4 overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-[12px] leading-6 text-gray-600"><code>$2</code></pre>',
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="rounded bg-gray-100 px-1.5 py-0.5 text-[12px] font-medium text-[#4da2ff]">$1</code>',
    )
    .replace(/^### (.+)$/gm, '<h3 class="mt-8 text-[18px] font-medium tracking-[-0.02em] text-black">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="mt-10 text-[1.45rem] font-medium tracking-[-0.02em] text-black">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="mt-10 text-[1.7rem] font-medium tracking-[-0.03em] text-black">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="font-medium text-[#4da2ff] underline underline-offset-4" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    .replace(/^- (.+)$/gm, '<li class="ml-5 list-disc">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal">$1</li>')
    .replace(/^---$/gm, '<hr class="my-8 border-gray-200" />')
    .replace(
      /^> (.+)$/gm,
      '<blockquote class="my-4 rounded-r-lg border-l-4 border-[#4da2ff] bg-gray-50 px-4 py-3 italic text-gray-500">$1</blockquote>',
    )
    .replace(/\n\n/g, '</p><p class="mt-4 text-[14px] leading-6 text-gray-500">')
    .replace(/\n/g, '<br />');

  return `<p class="text-[14px] leading-6 text-gray-500">${html}</p>`;
}

export default function ModuleDetailPage() {
  const params = useParams();
  const id = String(params.id ?? '').toUpperCase();
  const orderedModules = useMemo(() => getOrderedModules(MODULES), []);

  const [module, setModule] = useState<ModuleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/module/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Module not found');
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
      <div className="flex h-full items-center justify-center rounded-2xl border border-gray-200 bg-white">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-[#4da2ff]" />
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-white">
        <p className="text-sm text-gray-500">{error ?? 'Module not found'}</p>
        <Link href="/modules" className="inline-flex items-center gap-2 text-sm font-medium text-[#4da2ff]">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to lessons
        </Link>
      </div>
    );
  }

  const categoryMeta = CATEGORY_META[module.category];

  const simulatorSteps = [
    'Start the simulator from the root with `cd simulator && npm run dev`.',
    'Open `http://localhost:3000` and keep the playground visible.',
    `Run the module path: \`${module.simScript}\`.`,
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-5">
      <section className="mb-4 rounded-2xl border border-gray-200 bg-white px-5 py-5 sm:px-6">
        <Link href="/modules" className="inline-flex items-center gap-2 text-[12px] font-medium text-[#4da2ff]">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to lessons
        </Link>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_280px]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-medium text-gray-500">
                {categoryMeta.eyebrow}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-medium text-gray-500">
                <ClockIcon className="h-3.5 w-3.5" />
                {module.time}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-medium text-gray-500">
                <HardwareIcon className="h-3.5 w-3.5" />
                {module.hardware ? 'Simulator-ready' : 'Software-first'}
              </span>
            </div>

            <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-gray-400">{module.id}</div>
            <h1 className="mt-2 text-[2rem] font-medium leading-[1.02] tracking-[-0.03em] text-black sm:text-[2.35rem]">
              {module.title}
            </h1>
            <div className="mt-2 text-[14px] font-medium text-gray-600 sm:text-[15px]">{module.subtitle}</div>
            <p className="mt-3 max-w-3xl text-[14px] leading-6 text-gray-500 sm:text-[15px]">{module.summary}</p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <div className="lesson-eyebrow">Build surface</div>
            <div className="mt-2 text-[16px] font-medium text-black">{module.artifact}</div>
            <p className="mt-2 text-[13px] leading-5 text-gray-500">{categoryMeta.description}</p>

            <div className="mt-4 space-y-2">
              {module.focus.map((item) => (
                <div key={item} className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-[12px] text-gray-600">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-4 rounded-2xl border border-gray-200 bg-white px-4 py-4 sm:px-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <div className="lesson-eyebrow">Curriculum track</div>
            <h2 className="mt-1 text-[1.05rem] font-medium tracking-[-0.02em] text-black">
              Full R1-R10 sequence
            </h2>
          </div>
          <Link href="/modules" className="text-[12px] font-medium text-[#4da2ff]">
            All lessons
          </Link>
        </div>

        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {orderedModules.map((entry) => {
            const active = entry.id === module.id;
            return (
              <Link
                key={entry.id}
                href={`/module/${entry.id}`}
                className={`rounded-xl border px-3 py-3 transition ${
                  active
                    ? 'border-[#4da2ff] bg-[#4da2ff]/5'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-gray-400">{entry.id}</div>
                    <div className="mt-1 text-[14px] font-medium text-black">{entry.title}</div>
                    <div className="mt-0.5 text-[12px] text-gray-500">{entry.subtitle}</div>
                  </div>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-medium text-gray-600">
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
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-5">
            <div className="mb-3">
              <div className="lesson-eyebrow">Architecture</div>
              <h2 className="mt-1 text-[1.15rem] font-medium tracking-[-0.02em] text-black">
                How this lesson fits the system
              </h2>
            </div>
            <DiagramCanvas moduleId={module.id} />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-5 sm:px-6">
            <div className="mb-4">
              <div className="lesson-eyebrow">Lesson content</div>
              <h2 className="mt-1 text-[1.2rem] font-medium tracking-[-0.02em] text-black sm:text-[1.35rem]">
                Source material and implementation notes
              </h2>
            </div>

            {module.readme ? (
              <div className="prose-light" dangerouslySetInnerHTML={{ __html: simpleMarkdown(module.readme) }} />
            ) : (
              <p className="text-sm text-gray-500">No README content was found for this lesson.</p>
            )}
          </div>

          {navigation.next ? (
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="lesson-eyebrow">Next lesson</div>
                  <h2 className="mt-1 text-[1.1rem] font-medium tracking-[-0.02em] text-black">
                    Continue to {navigation.next.id} · {navigation.next.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-5 text-gray-500">
                    Keep moving through the robotics track.
                  </p>
                </div>
                <Link
                  href={`/module/${navigation.next.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#4da2ff] px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3b8de6]"
                >
                  Go to {navigation.next.id}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-4 xl:sticky xl:top-4">
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4">
            <div className="lesson-eyebrow">Simulator route</div>
            <h3 className="mt-1 text-[15px] font-medium tracking-[-0.02em] text-black">
              Run this lesson
            </h3>
            <div className="mt-3 space-y-2.5">
              {simulatorSteps.map((step, index) => (
                <div key={step} className="rounded-lg bg-gray-50 px-3 py-3">
                  <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-medium text-gray-600 shadow-sm">
                    {index + 1}
                  </div>
                  <p className="text-[12px] leading-5 text-gray-500">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4">
            <div className="lesson-eyebrow">Core concepts</div>
            <h3 className="mt-1 text-[15px] font-medium tracking-[-0.02em] text-black">
              Key takeaways
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {module.concepts.map((concept) => (
                <span key={concept} className="rounded-full bg-gray-100 px-3 py-1.5 text-[11px] font-medium text-gray-600">
                  {concept}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4">
            <div className="lesson-eyebrow">Progression</div>
            <div className="mt-3 grid gap-2.5">
              {navigation.previous ? (
                <Link
                  href={`/module/${navigation.previous.id}`}
                  className="rounded-lg bg-gray-50 px-3 py-3 transition hover:bg-gray-100"
                >
                  <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-gray-400">Previous</div>
                  <div className="mt-1.5 text-[14px] font-medium text-black">
                    {navigation.previous.id} · {navigation.previous.title}
                  </div>
                </Link>
              ) : null}

              {navigation.next ? (
                <Link
                  href={`/module/${navigation.next.id}`}
                  className="rounded-lg bg-gray-50 px-3 py-3 transition hover:bg-gray-100"
                >
                  <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-gray-400">Next</div>
                  <div className="mt-1.5 text-[14px] font-medium text-black">
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
