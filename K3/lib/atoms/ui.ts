import { atom } from 'jotai';

export type AppTab = 'demo' | 'code';

export const activeTabAtom = atom<AppTab>('code');
export const activeCodeStepAtom = atom(0);
export const visitedStepsAtom = atom<Set<number>>(new Set([0]));

// Transaction flow state
export const useEnokiAtom = atom(true);
export const logProgressAtom = atom(0);
export const logActiveStepAtom = atom<number | null>(null);
export const logDigestAtom = atom<string | null>(null);
