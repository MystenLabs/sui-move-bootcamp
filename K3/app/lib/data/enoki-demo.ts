export type DemoAction = 'increment' | 'decrement';

export interface CodeStep {
  id: number;
  title: string;
  summary: string;
  language: 'text' | 'env' | 'typescript';
  code: string;
  highlightLines?: number[];
}

export interface LogStepDefinition {
  id: number;
  label: string;
  codeStepIndex: number;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: DemoAction;
  message?: string;
  delta: number;
}

export const CODE_STEPS: CodeStep[] = [
  {
    id: 1,
    title: 'Get API Keys',
    summary:
      'Create an Enoki project and get both public (zkLogin) and private (sponsorship) keys.',
    language: 'text',
    code: [
      '// 1. Open the Enoki portal (portal.enoki.mystenlabs.com)',
      '// 2. Create a project for testnet',
      '// 3. Get API keys:',
      '//    - Public key (enoki_public_...) → for zkLogin',
      '//    - Private key (enoki_private_...) → for sponsorship',
      '// 4. Add Google OAuth Client ID to Auth Providers',
      '// 5. Paste keys into your .env.local file',
    ].join('\n'),
  },
  {
    id: 2,
    title: 'Environment Variables',
    summary:
      'Copy required variables from `.env.example` into `.env.local`, then fill real values.',
    language: 'env',
    code: [
      '# Use the canonical template first',
      'cp .env.example .env.local',
      '',
      '# Then fill all required values in .env.local',
      '# - ENOKI_PRIVATE_KEY',
      '# - NEXT_PUBLIC_ENOKI_API_KEY',
      '# - NEXT_PUBLIC_GOOGLE_CLIENT_ID',
      '# - NEXT_PUBLIC_SUI_NETWORK_NAME',
      '# - NEXT_PUBLIC_APP_URL',
      '# - NEXT_PUBLIC_PACKAGE_ADDRESS',
      '# - NEXT_PUBLIC_COUNTER_OBJECT_ID',
    ].join('\n'),
  },
  {
    id: 3,
    title: 'Provider Setup + zkLogin',
    summary:
      'Create a dApp Kit instance and register Enoki wallet initializers (v2 pattern).',
    language: 'typescript',
    code: [
      'import { createDAppKit, DAppKitProvider } from "@mysten/dapp-kit-react"',
      'import { enokiWalletsInitializer } from "@mysten/enoki"',
      'import { QueryClientProvider } from "@tanstack/react-query"',
      '',
      'const dAppKit = createDAppKit({',
      '  networks: ["testnet"],',
      '  createClient: (network) => createSuiGrpcClient(network),',
      '  walletInitializers: [',
      '    enokiWalletsInitializer({',
      '      apiKey: process.env.NEXT_PUBLIC_ENOKI_API_KEY,',
      '      providers: {',
      '        google: {',
      '          clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,',
      '          redirectUrl: `${window.location.origin}/auth/callback`,',
      '        },',
      '      },',
      '    }),',
      '  ],',
      '})',
      '',
      '// Layout wrapper with Query + dApp Kit providers',
      'const LayoutWrapper = ({ children }) => (',
      '  <QueryClientProvider client={queryClient}>',
      '    <DAppKitProvider dAppKit={dAppKit}>',
      '      {children}',
      '    </DAppKitProvider>',
      '  </QueryClientProvider>',
      ')',
    ].join('\n'),
  },
  {
    id: 4,
    title: 'Build Transaction',
    summary: 'Build a transaction kind only, then request sponsorship.',
    language: 'typescript',
    highlightLines: [],
    code: [
      'import { Transaction } from "@mysten/sui/transactions"',
      '',
      'const tx = new Transaction()',
      'tx.moveCall({',
      '  target: `${PACKAGE_ID}::counter::increment`,',
      '  arguments: [tx.object(COUNTER_ID)],',
      '})',
      '',
      '// Key: only build the transaction kind',
      'const txBytes = await tx.build({',
      '  client: suiClient,',
      '  onlyTransactionKind: true,',
      '})',
    ].join('\n'),
  },
  {
    id: 5,
    title: 'Get Sponsored Transaction',
    summary:
      'Send transaction kind bytes to Enoki and restrict who/what can execute.',
    language: 'typescript',
    highlightLines: [],
    code: [
      '"use server"',
      '',
      'const network = process.env.NEXT_PUBLIC_SUI_NETWORK_NAME',
      'const sponsoredResponse = await enokiClient.createSponsoredTransaction({',
      '  network,',
      '  transactionKindBytes: toBase64(txBytes),',
      '  sender: walletAddress,',
      '  allowedAddresses: [walletAddress],',
      '  allowedMoveCallTargets: [',
      '    getMoveTarget("counter", "increment"),',
      '    getMoveTarget("counter", "decrement"),',
      '  ],',
      '})',
    ].join('\n'),
  },
  {
    id: 6,
    title: 'Sign Transaction',
    summary:
      'User signs sponsored bytes; extension wallets show approval UI, zkLogin may complete without extension popup.',
    language: 'typescript',
    highlightLines: [],
    code: [
      '// Works for both extension wallets and Enoki zkLogin',
      '// - Extension wallet: approval popup',
      '// - zkLogin: signing can complete via Enoki session flow',
      '',
      'const { signature } = await dAppKit.signTransaction({',
      '  transaction: sponsoredTxn.bytes,',
      '})',
      '',
      '// Detect login type if needed:',
      '// const { isZkLogin } = useLoginType();',
    ].join('\n'),
  },
  {
    id: 7,
    title: 'Execute Sponsored Transaction',
    summary: 'Execute the signed transaction via Enoki.',
    language: 'typescript',
    highlightLines: [],
    code: [
      '"use server"',
      '',
      'const result = await enokiClient.executeSponsoredTransaction({',
      '  digest: sponsoredResponse.digest,',
      '  signature: signature,',
      '})',
    ].join('\n'),
  },
];

export const LOG_STEP_DEFS: LogStepDefinition[] = [
  {
    id: 1,
    label: 'Build transaction (onlyTransactionKind: true) [Frontend]',
    codeStepIndex: 3,
  },
  {
    id: 2,
    label: 'Request sponsorship from Enoki [Server]',
    codeStepIndex: 4,
  },
  {
    id: 3,
    label: 'User signing transaction [Frontend]',
    // For zkLogin: signing is automatic (ephemeral key), step is skipped
    codeStepIndex: 5,
  },
  {
    id: 4,
    label: 'Execute sponsored transaction [Server]',
    codeStepIndex: 6,
  },
];

export const ACTIVITY_SEED: ActivityItem[] = [
  {
    id: 'seed-1',
    actor: '0x8f2a...91c',
    action: 'increment',
    message: 'gm',
    delta: 1,
  },
  {
    id: 'seed-2',
    actor: '0x3c1d...ab7',
    action: 'increment',
    message: '',
    delta: 1,
  },
  {
    id: 'seed-3',
    actor: '0x7b90...4f2',
    action: 'decrement',
    message: 'oops',
    delta: -1,
  },
];

export const DEMO_ADDRESSES = [
  '0x8f2a9c4d91c2a1f3b7',
  '0x3c1d00b4ab7f55e920',
  '0x7b90f1a04f2c918e31',
  '0x912fa8018a773bc019',
  '0x5e2b77ac2290c8f14a',
];
