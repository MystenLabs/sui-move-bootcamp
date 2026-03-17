'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useSimulator } from '@/hooks/useSimulator';

const NAV_ITEMS = [
  { label: 'Playground', href: '/playground' },
  { label: 'Lessons', href: '/modules' },
];

const NavbarWalletControls = dynamic(() => import('@/components/NavbarWalletControls'), {
  ssr: false,
  loading: () => (
    <div className="rounded-full border border-white/20 px-3 py-1.5 text-[12px] text-white/50">
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
      ? 'bg-[#22c55e]'
      : connectionStatus === 'connecting'
        ? 'bg-[#f59e0b]'
        : 'bg-[#ef4444]';

  return (
    <header className="bg-[#1a1a1a]">
      <div className="mx-auto flex w-full items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center">
          <span className="text-[16px] font-medium tracking-[-0.02em] text-white">SuiBotics</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-lg px-3.5 py-2 text-[14px] font-medium transition ${
                  active ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="inline-flex h-6 w-6 items-center justify-center"
            title={`Simulator ${connectionStatus}`}
          >
            <span className={`h-2 w-2 rounded-full ${statusColor}`} />
          </div>
          <NavbarWalletControls />
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto px-4 pb-3 sm:px-6 md:hidden">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${
                active ? 'bg-white/10 text-white' : 'text-white/50'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
