import clientConfig from '@/lib/env-config-client';

/**
 * Builds a Move function target string for Enoki's allowedMoveCallTargets
 * @param module - The module name (e.g., 'counter')
 * @param fn - The function name (e.g., 'increment')
 * @returns Full target string like "0x123...::counter::increment"
 */
export const getMoveTarget = (module: string, fn: string) =>
  `${clientConfig.NEXT_PUBLIC_PACKAGE_ADDRESS}::${module}::${fn}`;
