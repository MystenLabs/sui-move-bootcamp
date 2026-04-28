import type { ModuleInfo } from './types';

export const CATEGORY_ORDER = ['Fundamentals', 'Integration', 'Security', 'Full-Stack'] as const;

export const CATEGORY_META: Record<
  string,
  {
    eyebrow: string;
    description: string;
    accent: 'sea' | 'aqua' | 'ocean' | 'mist';
  }
> = {
  Fundamentals: {
    eyebrow: 'Phase 01',
    description: 'Core protocols, serial basics, Move objects, and real-time transport.',
    accent: 'sea',
  },
  Integration: {
    eyebrow: 'Phase 02',
    description: 'Connect chain events, sockets, and robot command execution into one loop.',
    accent: 'aqua',
  },
  Security: {
    eyebrow: 'Phase 03',
    description: 'Add authentication, signed commands, and token-based access control.',
    accent: 'ocean',
  },
  'Full-Stack': {
    eyebrow: 'Phase 04',
    description: 'Ship multiplayer and rental flows with servers, dApps, and Move contracts.',
    accent: 'mist',
  },
};

export const MODULES: ModuleInfo[] = [
  {
    id: 'R1',
    title: 'Hello Bittle',
    subtitle: 'Serial Basics',
    category: 'Fundamentals',
    time: '1-2 hours',
    simScript: 'cd R1/hello-bittle && pnpm sim',
    hardware: true,
    summary: 'Learn the robot command protocol and send your first motion over a serial-style interface.',
    artifact: 'TypeScript serial client',
    focus: ['Protocol', 'Port discovery', 'Command timing'],
  },
  {
    id: 'R2',
    title: 'My First Move Contract',
    subtitle: 'Blockchain Fundamentals',
    category: 'Fundamentals',
    time: '2-3 hours',
    simScript: 'cd R2/move && sui move build',
    hardware: false,
    summary: 'Model a shared action queue on Sui and learn how on-chain state drives robot behavior later.',
    artifact: 'Move package and CLI client',
    focus: ['Shared objects', 'Move package build', 'Queue reads and writes'],
  },
  {
    id: 'R3',
    title: 'WebSocket Playground',
    subtitle: 'Real-time Basics',
    category: 'Fundamentals',
    time: '2 hours',
    simScript: 'cd R3/server && pnpm start',
    hardware: false,
    summary: 'Expose the robot through WebSocket so browsers can control it with low-latency feedback.',
    artifact: 'WebSocket server and browser UI',
    focus: ['Realtime messaging', 'Browser control', 'Broadcast state'],
  },
  {
    id: 'R4',
    title: 'Blockchain Robot',
    subtitle: 'First Integration',
    category: 'Integration',
    time: '2-3 hours',
    simScript: 'cd R4/processor && pnpm sim',
    hardware: true,
    summary: 'Bridge queued chain actions to actual robot commands and observe the digital-to-physical loop.',
    artifact: 'Polling processor service',
    focus: ['Queue polling', 'Command mapping', 'Processor reliability'],
  },
  {
    id: 'R5',
    title: 'Live Control',
    subtitle: 'WebSocket + Serial',
    category: 'Integration',
    time: '1-2 hours',
    simScript: 'cd R5/server && pnpm sim',
    hardware: true,
    summary: 'Combine sockets with robot I/O so a live control surface can drive the simulator or hardware.',
    artifact: 'Realtime robot control server',
    focus: ['Socket transport', 'Queue behavior', 'Latency-aware control'],
  },
  {
    id: 'R6',
    title: 'Open to the World',
    subtitle: 'Tunneling 101',
    category: 'Integration',
    time: '30 min',
    simScript: 'Uses R5 sim server',
    hardware: false,
    summary: 'Take your local robot endpoint public with a controlled tunnel and operational safety in mind.',
    artifact: 'Operational tunnel scripts',
    focus: ['Remote access', 'Tunnel setup', 'Ops workflow'],
  },
  {
    id: 'R7',
    title: 'Secure the Channel',
    subtitle: 'Authentication',
    category: 'Security',
    time: '2-3 hours',
    simScript: 'cd R7/part-a-offchain && pnpm sim',
    hardware: true,
    summary: 'Add cryptographic identity to robot commands so remote control can be trusted and verified.',
    artifact: 'Authenticated command server',
    focus: ['Ed25519', 'Challenge response', 'Command verification'],
  },
  {
    id: 'R8',
    title: 'Pay to Play',
    subtitle: 'Tokenomics',
    category: 'Security',
    time: '3-4 hours',
    simScript: 'cd R8/client && pnpm demo',
    hardware: false,
    summary: 'Use custom tokens and faucet logic to price robot actions and formalize access economics.',
    artifact: 'Move token and pricing flow',
    focus: ['Coin standard', 'Faucet rules', 'Paid robot actions'],
  },
  {
    id: 'R9',
    title: 'Multiplayer Robot',
    subtitle: 'Shared State',
    category: 'Full-Stack',
    time: '3+ hours',
    simScript: 'cd R9/server && pnpm start',
    hardware: false,
    summary: 'Build a fair multiplayer robot queue with on-chain ordering, server state, and a wallet dApp.',
    artifact: 'Move queue, server, and dApp',
    focus: ['Fair scheduling', 'Shared state', 'Wallet-connected UI'],
  },
  {
    id: 'R10',
    title: 'Robot Rental Platform',
    subtitle: 'Capstone',
    category: 'Full-Stack',
    time: '4+ hours',
    simScript: 'SIMULATE_ROBOT=true cd R10/server && pnpm start',
    hardware: true,
    summary: 'Combine registry, rental sessions, signed commands, and token settlement into a complete platform.',
    artifact: 'Full rental stack',
    focus: ['Session escrow', 'Signed control', 'Production architecture'],
  },
];

/** Key concepts taught in each module */
export const MODULE_CONCEPTS: Record<string, string[]> = {
  R1: [
    'Serial communication (UART)',
    'Bittle command protocol',
    'Buffer parsing',
    'Hardware abstraction',
  ],
  R2: [
    'Move language basics',
    'Sui object model',
    'Package publishing',
    'On-chain state',
  ],
  R3: [
    'WebSocket protocol',
    'Real-time bidirectional communication',
    'Event-driven architecture',
    'Connection lifecycle',
  ],
  R4: [
    'Blockchain event subscription',
    'Transaction processing',
    'Serial command bridge',
    'On-chain to off-chain flow',
  ],
  R5: [
    'WebSocket server',
    'Serial port forwarding',
    'Live robot control UI',
    'State synchronization',
  ],
  R6: [
    'ngrok tunneling',
    'Public URL exposure',
    'Network address translation',
    'Remote access patterns',
  ],
  R7: [
    'Ed25519 signatures',
    'Challenge-response auth',
    'Sui cryptography',
    'Secure command channels',
  ],
  R8: [
    'SUI token payments',
    'Pay-per-command model',
    'Transaction verification',
    'Token economics',
  ],
  R9: [
    'Shared object state',
    'Multi-user coordination',
    'Consensus and ordering',
    'Real-time multiplayer',
  ],
  R10: [
    'Full platform architecture',
    'Rental smart contracts',
    'Session management',
    'Production deployment',
  ],
};

export function getModuleOrder(id: string): number {
  const match = id.match(/^R(\d+)$/);
  return match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
}

export function getOrderedModules<T extends { id: string }>(modules: readonly T[]): T[] {
  return [...modules].sort((left, right) => getModuleOrder(left.id) - getModuleOrder(right.id));
}

export function getCurriculumPhases<T extends { id: string; category: string }>(modules: readonly T[]) {
  const orderedModules = getOrderedModules(modules);

  return CATEGORY_ORDER.map((category) => ({
    category,
    meta: CATEGORY_META[category],
    modules: orderedModules.filter((module) => module.category === category),
  }));
}
