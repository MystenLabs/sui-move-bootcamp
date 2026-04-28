import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons';
import { getCurriculumPhases, getModuleOrder, MODULES } from '@/lib/modules';

const PHASES = getCurriculumPhases(MODULES);

const FEATURES_LEFT = [
  { title: 'No hardware required', desc: 'Virtual Bittle simulator replaces the physical robot for every lesson.' },
  { title: 'Real on-chain transactions', desc: 'Every robot action is signed and submitted to Sui testnet.' },
  { title: 'Full R1-R10 curriculum', desc: '10 sequenced lessons from serial control to rental-platform capstone.' },
  { title: 'TCP serial bridge', desc: 'R modules connect to the simulator via the same serial protocol.' },
];

const FEATURES_RIGHT = [
  { title: '3D robot viewport', desc: 'Three.js animated Unitree GO1 with walk cycles, poses, and physics.' },
  { title: 'Wallet-gated actions', desc: 'Connect any Sui wallet to sign transactions before the robot moves.' },
  { title: 'Live on-chain status', desc: 'Queue length, total actions, and pending transactions in real time.' },
  { title: 'Module browser', desc: 'Architecture diagrams, rendered README content, and run instructions.' },
];

export default function HomePage() {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white px-6 pb-20 pt-16 lg:px-12">
        <div className="text-center">
          <h1 className="text-[3rem] font-medium leading-[0.95] tracking-[-0.04em] text-black sm:text-[4.5rem] lg:text-[5.5rem]">
            Blockchain robotics,<br />built on Sui.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-7 text-gray-500">
            Learn the full R1-R10 robotics track in one workspace. Every robot action is a real
            Sui testnet transaction — no hardware needed.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 rounded-full bg-[#4da2ff] px-6 py-3 text-[14px] font-medium text-white transition hover:bg-[#3b8de6]"
            >
              Open playground
            </Link>
            <Link
              href="/module/R1"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-[14px] font-medium text-black transition hover:border-gray-400"
            >
              Start R1
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/modules"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-[14px] font-medium text-black transition hover:border-gray-400"
            >
              Browse lessons
            </Link>
          </div>
        </div>
      </section>

      {/* Two-column features */}
      <section className="border-b border-gray-200 bg-white">
        <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-gray-200">
          <div className="px-6 py-16 lg:px-12">
            <div className="lesson-eyebrow">The simulator</div>
            <h2 className="mt-4 text-[2rem] font-medium leading-[1.05] tracking-[-0.03em] text-black sm:text-[2.6rem]">
              Why learners use SuiBotics
            </h2>
          </div>
          <div className="px-6 py-16 lg:px-12">
            <div className="lesson-eyebrow">On-chain</div>
            <h2 className="mt-4 text-[2rem] font-medium leading-[1.05] tracking-[-0.03em] text-black sm:text-[2.6rem]">
              How every action hits the chain
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2">
          {FEATURES_LEFT.map((f, i) => (
            <div key={f.title} className={`border-t border-gray-200 px-6 py-6 lg:px-12 ${i % 2 === 1 ? 'lg:border-l' : ''}`}>
              <div className="flex items-start gap-3">
                <span className="mt-1.5 h-[10px] w-[10px] shrink-0 rounded-[2px] bg-[#4da2ff]" />
                <div>
                  <h3 className="text-[16px] font-medium text-black">{f.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-6 text-gray-500">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
          {FEATURES_RIGHT.map((f, i) => (
            <div key={f.title} className={`border-t border-gray-200 px-6 py-6 lg:px-12 ${i % 2 === 0 ? 'lg:border-l' : ''}`}>
              <div className="flex items-start gap-3">
                <span className="mt-1.5 h-[10px] w-[10px] shrink-0 rounded-[2px] bg-[#4da2ff]" />
                <div>
                  <h3 className="text-[16px] font-medium text-black">{f.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-6 text-gray-500">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-gray-200 bg-[#1a1a1a]">
        <div className="grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
          <div className="px-6 py-8 text-center">
            <div className="text-[2.5rem] font-medium tracking-[-0.03em] text-white">{MODULES.length}</div>
            <div className="mt-1 text-[13px] text-white/50">Sequenced lessons</div>
          </div>
          <div className="px-6 py-8 text-center">
            <div className="text-[2.5rem] font-medium tracking-[-0.03em] text-white">{PHASES.length}</div>
            <div className="mt-1 text-[13px] text-white/50">Curriculum phases</div>
          </div>
          <div className="px-6 py-8 text-center">
            <div className="text-[2.5rem] font-medium tracking-[-0.03em] text-white">12</div>
            <div className="mt-1 text-[13px] text-white/50">On-chain actions</div>
          </div>
          <div className="px-6 py-8 text-center">
            <div className="text-[2.5rem] font-medium tracking-[-0.03em] text-[#4da2ff]">Testnet</div>
            <div className="mt-1 text-[13px] text-white/50">Deployed network</div>
          </div>
        </div>
      </section>

      {/* Curriculum phases */}
      <section className="border-b border-gray-200 bg-white px-6 py-16 lg:px-12">
        <div className="text-center">
          <div className="lesson-eyebrow mx-auto w-fit">Curriculum</div>
          <h2 className="mt-4 text-[2rem] font-medium tracking-[-0.03em] text-black sm:text-[2.6rem]">
            Four phases, ten lessons.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map(({ category, meta, modules }) => (
            <div key={category} className="rounded-xl bg-gray-50 p-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-400">{meta.eyebrow}</div>
              <h3 className="mt-2 text-[20px] font-medium tracking-[-0.02em] text-black">{category}</h3>
              <p className="mt-2 text-[13px] leading-5 text-gray-500">{meta.description}</p>
              <div className="mt-4 text-[12px] font-medium text-[#4da2ff]">{modules.length} lessons</div>
            </div>
          ))}
        </div>
      </section>

      {/* All modules grid */}
      <section className="bg-white px-6 py-16 lg:px-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="lesson-eyebrow">All lessons</div>
            <h2 className="mt-3 text-[2rem] font-medium tracking-[-0.03em] text-black sm:text-[2.2rem]">
              Every lesson, in order.
            </h2>
          </div>
          <Link href="/modules" className="text-[13px] font-medium text-[#4da2ff] hover:underline">
            View all
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {MODULES.map((module) => {
            const phase = PHASES.find((entry) => entry.category === module.category);

            return (
              <Link
                key={module.id}
                href={`/module/${module.id}`}
                className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:border-gray-300 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-gray-400">{module.id}</div>
                    <div className="mt-1 text-[17px] font-medium tracking-[-0.02em] text-black">{module.title}</div>
                    <div className="mt-0.5 text-[13px] text-gray-500">{module.subtitle}</div>
                  </div>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[11px] font-medium text-gray-600">
                    {getModuleOrder(module.id)}
                  </div>
                </div>

                <p className="mt-3 text-[14px] leading-6 text-gray-500">{module.summary}</p>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="text-[11px] text-gray-400">
                    {phase?.meta.eyebrow}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[13px] font-medium text-black">
                    Open
                    <ArrowRightIcon className="h-3.5 w-3.5 text-[#4da2ff] transition group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-[#1a1a1a] px-6 py-8 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="text-[13px] text-white/40">
            Built on Sui testnet
          </div>
          <div className="flex gap-4 text-[13px] text-white/40">
            <Link href="/playground" className="hover:text-white/70">Playground</Link>
            <Link href="/modules" className="hover:text-white/70">Lessons</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
