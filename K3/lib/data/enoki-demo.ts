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
    title: 'Get API Key',
    summary: 'Create an Enoki project and copy the API key for your app.',
    language: 'text',
    code: [
      '// 1. Open the Enoki portal',
      '// 2. Create a project',
      '// 3. Copy the API key',
      '// 4. Paste it into your .env file',
    ].join('\n'),
  },
  {
    id: 2,
    title: 'Environment Variables',
    summary: 'Expose the API key and network to the client.',
    language: 'env',
    code: [
      'ENOKI_API_KEY=your_api_key_here',
      'NEXT_PUBLIC_SUI_NETWORK_NAME=testnet',
    ].join('\n'),
  },
  {
    id: 3,
    title: 'Provider Setup',
    summary: 'Wrap your app with the dApp Kit providers.',
    language: 'typescript',
    code: [
      'import { QueryClient, QueryClientProvider } from "@tanstack/react-query"',
      'import {',
      '  createNetworkConfig,',
      '  SuiClientProvider,',
      '  WalletProvider,',
      '} from "@mysten/dapp-kit"',
      'import { getFullnodeUrl } from "@mysten/sui/client"',
      '',
      'const { networkConfig } = createNetworkConfig({',
      '  testnet: { url: getFullnodeUrl("testnet") },',
      '})',
      '',
      'const queryClient = new QueryClient()',
      '',
      'export const AppProviders = ({ children }) => (',
      '  <QueryClientProvider client={queryClient}>',
      '    <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">',
      '      <WalletProvider autoConnect>{children}</WalletProvider>',
      '    </SuiClientProvider>',
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
    summary: 'Send transaction kind bytes to Enoki for sponsorship.',
    language: 'typescript',
    highlightLines: [],
    code: [
      '"use server"',
      '',
      'const sponsoredResponse = await enokiClient.createSponsoredTransaction({',
      '  network: "testnet",',
      '  transactionKindBytes: toBase64(txBytes),',
      '  sender: walletAddress,',
      '})',
    ].join('\n'),
  },
  {
    id: 6,
    title: 'Sign Transaction',
    summary: 'User signs the sponsored transaction bytes with their wallet.',
    language: 'typescript',
    highlightLines: [],
    code: [
      '// Frontend: User signs the sponsored transaction',
      'const { signature } = await signTransaction({',
      '  transaction: sponsoredResponse.bytes,',
      '})',
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
