'use client';

import * as React from 'react';

/**
 * Thin client-only shell that dynamically loads the full provider tree
 * (dapp-kit, react-query, jotai, etc.) to prevent SSR module evaluation
 * of @mysten/dapp-kit-core which references `window` at import time.
 */
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [Providers, setProviders] =
    React.useState<React.ComponentType<{ children: React.ReactNode }> | null>(
      null,
    );

  React.useEffect(() => {
    void import('@/components/layout-wrapper').then((mod) => {
      setProviders(() => mod.default);
    });
  }, []);

  if (!Providers) return null;

  return <Providers>{children}</Providers>;
}
