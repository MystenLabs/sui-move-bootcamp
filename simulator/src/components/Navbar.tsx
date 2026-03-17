'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useSimulator } from '@/hooks/useSimulator';
import {
  CurriculumIcon,
  PlaygroundIcon,
} from '@/components/icons';

const NAV_ITEMS = [
  { label: 'Playground', href: '/playground', icon: PlaygroundIcon },
  { label: 'Lessons', href: '/modules', icon: CurriculumIcon },
];

const NavbarWalletControls = dynamic(() => import('@/components/NavbarWalletControls'), {
  ssr: false,
  loading: () => (
    <div className="rounded-full border border-[#d7e6f4] bg-white px-3 py-2 text-[11px] text-[#6f8ba6]">
      Wallet
    </div>
  ),
});

export default function Navbar() {
  const pathname = usePathname();
  const { connectionStatus } = useSimulator();

  function isActive(href: string): boolean {
    return pathname.startsWith(href);
  }

  const statusColor =
    connectionStatus === 'connected'
      ? 'bg-[#1f8f6f]'
      : connectionStatus === 'connecting'
        ? 'bg-[#f4a34f]'
        : 'bg-[#d15b64]';

  return (
    <header className="border-b border-[#d7e6f4] bg-[rgba(255,255,255,0.86)] backdrop-blur-xl">
      <div className="flex w-full items-center justify-between gap-4 px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="min-w-0">
            <div className="truncate text-[18px] font-medium tracking-[-0.045em] text-[#011829]">SuiBotics</div>
            <div className="truncate text-[11px] text-[#6f8ba6]">R1-R10 robotics lessons</div>
          </Link>
        </div>

        <nav className="hidden items-center gap-1.5 md:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const className = `inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[12px] font-medium transition ${
              active
                ? 'border-[#c9def1] bg-white text-[#17324d]'
                : 'border-transparent text-[#5d7893] hover:border-[#d7e6f4] hover:bg-white'
            }`;

            return (
              <Link key={item.label} href={item.href} className={className}>
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="inline-flex h-8 w-8 items-center justify-center"
            title={`Simulator ${connectionStatus}`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${statusColor}`} />
          </div>
          <NavbarWalletControls />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto px-3 pb-2.5 sm:px-4 md:hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const className = `inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[12px] font-medium transition ${
            active
              ? 'border-[#c9def1] bg-white text-[#17324d]'
              : 'border-[#d7e6f4] bg-white/80 text-[#5d7893]'
          }`;

          return (
            <Link key={item.label} href={item.href} className={className}>
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
