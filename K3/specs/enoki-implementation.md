# Enoki Transaction Implementation Guide

This document details the complete flow of Enoki-sponsored transactions as implemented in the Mula repository. It covers the architecture from Move contract to frontend hooks, including all nuances required for implementation.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Layer 1: Move Contract (On-Chain)](#layer-1-move-contract-on-chain)
3. [Layer 2: Generated TypeScript SDK](#layer-2-generated-typescript-sdk)
4. [Layer 3: Transaction Builders](#layer-3-transaction-builders)
5. [Layer 4: Enoki Sponsorship Functions](#layer-4-enoki-sponsorship-functions)
6. [Layer 5: React Hooks (Mutations)](#layer-5-react-hooks-mutations)
7. [Layer 6: UI Components](#layer-6-ui-components)
8. [Layer 7: Reading On-Chain Data (Queries)](#layer-7-reading-on-chain-data-queries)
9. [Provider Setup](#provider-setup)
10. [zkLogin Integration](#zklogin-integration)
11. [Environment Configuration](#environment-configuration)
12. [Key Nuances & Gotchas](#key-nuances--gotchas)
13. [Complete Transaction Flow Diagram](#complete-transaction-flow-diagram)

---

## Architecture Overview

The Enoki transaction flow follows a layered architecture with support for both traditional wallets and zkLogin:

```
┌─────────────────────────────────────────────────────────────────────┐
│  Authentication Layer                                                │
│    ├─> Traditional Wallet (Sui Wallet, Suiet, etc.)                  │
│    └─> zkLogin via registerEnokiWallets (Google, Facebook, etc.)     │
│         └─> OAuth flow → Ephemeral key + ZK proof → Sui address      │
├─────────────────────────────────────────────────────────────────────┤
│  UI Components (React)                                               │
│    └─> React Hook (useMutation)                                      │
│         └─> Transaction Builder Function                             │
│              └─> Build TX with `onlyTransactionKind: true`           │
│                   └─> Server Action: getSponsoredTx()                │
│                        └─> EnokiClient.createSponsoredTransaction() │
│                   └─> Sign with signTransaction (unified API)        │
│                        ├─> Wallet: User approves popup               │
│                        └─> zkLogin: Auto-signs (no popup)            │
│                   └─> Server Action: executeSponsoredTx()            │
│                        └─> EnokiClient.executeSponsoredTransaction() │
│                   └─> Wait for Transaction & Parse Results           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Layer 1: Move Contract (On-Chain)

**File:** `contract/sources/poll.move`

The Move contract defines the on-chain logic. Key points:

```move
module mula::Poll;

use std::string::String;
use sui::clock::{Self, Clock};

public struct Poll has key {
    id: UID,
    options: vector<String>,
    name: String,
    votes: vector<u64>,
    creator: address,
    created_at: u64,
    voters: vector<address>,
    ended: bool,
}

// Entry functions that will be called via transactions
public fun create_poll(name: String, options: vector<String>, clock: &Clock, ctx: &mut TxContext);
public fun vote(poll: &mut Poll, option: u64, ctx: &mut TxContext);
public fun end_poll(poll: &mut Poll, ctx: &mut TxContext);
```

**Important:** The `Clock` object (`0x6`) is automatically injected by the generated SDK.

---

## Layer 2: Generated TypeScript SDK

**File:** `frontend/__generated__/mula/Poll.ts`

Generated via `@mysten/codegen` using the config in `sui-codegen.config.ts`:

```ts
// sui-codegen.config.ts
const config: SuiCodegenConfig = {
  output: '__generated__',
  generateSummaries: true,
  prune: true,
  packages: [
    {
      package: '@local-pkg/poll',
      path: '../contract',
    },
  ],
};
```

The generated code provides:

1. **Type-safe struct definitions** using BCS:

```ts
export const Poll = new MoveStruct({
  name: `${$moduleName}::Poll`,
  fields: {
    id: object.UID,
    options: bcs.vector(bcs.string()),
    name: bcs.string(),
    votes: bcs.vector(bcs.u64()),
    creator: bcs.Address,
    created_at: bcs.u64(),
    voters: bcs.vector(bcs.Address),
    ended: bcs.bool(),
  },
});
```

2. **Pure functions** that return transaction builders (curried functions):

```ts
export function createPoll(options: CreatePollOptions) {
  const packageAddress = options.package ?? '@local-pkg/poll';
  const argumentsTypes = [
    '0x...::string::String',
    'vector<0x...::string::String>',
    '0x...::clock::Clock', // Auto-injected!
  ] satisfies string[];
  const parameterNames = ['name', 'options'];

  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: 'Poll',
      function: 'create_poll',
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
```

**Key Utility:** `normalizeMoveArguments` (from `__generated__/utils/index.ts`):

- Auto-injects system objects (Clock, Random, DenyList, etc.)
- Converts raw values to proper `tx.pure()` or `tx.object()` calls
- Handles BCS serialization for pure types

---

## Layer 3: Transaction Builders

**File:** `frontend/lib/poll/poll-transactions.ts`

These are simplified wrappers that create complete `Transaction` objects:

```ts
import { Transaction } from '@mysten/sui/transactions';

export const createPollTransaction = (
  name: string,
  options: string[],
  packageAddress?: string,
): Transaction => {
  const tx = new Transaction();
  tx.moveCall({
    package: packageAddress ?? '@local-pkg/poll',
    module: 'Poll',
    function: 'create_poll',
    arguments: [
      tx.pure.string(name),
      tx.pure.vector('string', options),
      tx.object('0x6'), // Clock object - MUST be explicitly passed
    ],
  });
  return tx;
};

export const voteTransaction = (
  pollId: string,
  option: number | bigint,
  packageAddress?: string,
): Transaction => {
  const tx = new Transaction();
  const optionValue = typeof option === 'bigint' ? option : BigInt(option);
  tx.moveCall({
    package: packageAddress ?? '@local-pkg/poll',
    module: 'Poll',
    function: 'vote',
    arguments: [tx.object(pollId), tx.pure.u64(optionValue)],
  });
  return tx;
};

export const endPollTransaction = (
  pollId: string,
  packageAddress?: string,
): Transaction => {
  const tx = new Transaction();
  tx.moveCall({
    package: packageAddress ?? '@local-pkg/poll',
    module: 'Poll',
    function: 'end_poll',
    arguments: [tx.object(pollId)],
  });
  return tx;
};
```

**Nuance:** When not using the generated pure functions, you must manually include the Clock object (`tx.object('0x6')`) for functions that require it.

---

## Layer 4: Enoki Sponsorship Functions

**File:** `frontend/lib/enoki/get-sponsored-tx.ts`

These are **Next.js Server Actions** (`'use server'`) that interact with the Enoki API:

```ts
'use server';
import serverConfig from '@/lib/env-config-server';
import { getMoveTarget } from '@/lib/helpers-onchain';
import { EnokiClient, EnokiNetwork } from '@mysten/enoki';
import { toBase64 } from '@mysten/sui/utils';

/**
 * Creates a sponsored transaction via Enoki
 * @param txBytes - Transaction bytes built with `onlyTransactionKind: true`
 * @param sender - The sender's wallet address
 */
export const getSponsoredTx = async ({
  txBytes,
  sender,
}: {
  txBytes: Uint8Array<ArrayBuffer>;
  sender: string;
}) => {
  const enokiClient = new EnokiClient({
    apiKey: serverConfig.ENOKI_PRIVATE_KEY, // Server-side only!
  });

  const sponsoredTransaction = await enokiClient.createSponsoredTransaction({
    network: process.env.NEXT_PUBLIC_SUI_NETWORK_NAME as EnokiNetwork,
    transactionKindBytes: toBase64(txBytes), // MUST be base64 encoded
    sender: sender,
    allowedAddresses: [sender],
    allowedMoveCallTargets: [
      // Whitelist of allowed move call targets
      getMoveTarget('Poll', 'create_poll'),
      getMoveTarget('Poll', 'vote'),
      getMoveTarget('Poll', 'end_poll'),
    ],
  });

  return sponsoredTransaction;
};

/**
 * Executes a sponsored transaction after user signs
 * @param digest - The sponsored transaction digest
 * @param signature - User's signature (single signature at this point)
 */
export const executeSponsoredTx = async ({
  digest,
  signature,
}: {
  digest: string;
  signature: string;
}) => {
  const enokiClient = new EnokiClient({
    apiKey: serverConfig.ENOKI_PRIVATE_KEY,
  });

  const result = await enokiClient.executeSponsoredTransaction({
    digest,
    signature,
  });

  return result;
};
```

**Helper Function** (`lib/helpers-onchain.ts`):

```ts
import clientConfig from '@/lib/env-config-client';

export const getMoveTarget = (pkg: string, fun: string) =>
  `${clientConfig.NEXT_PUBLIC_POLL_PACKAGE_ADDRESS}::${pkg}::${fun}`;
```

### Key Points About Enoki Sponsorship:

1. **`allowedMoveCallTargets`**: Whitelist of Move functions the sponsored tx can call
2. **`allowedAddresses`**: Addresses allowed to be involved in the transaction
3. **Transaction bytes must be built with `onlyTransactionKind: true`**
4. **The API key is server-side only** - never expose it to the client

---

## Layer 5: React Hooks (Mutations)

**Files:** `frontend/hooks/poll/*.ts`

### Pattern: Sponsored Transaction Mutation Hook

```ts
import {
  executeSponsoredTx,
  getSponsoredTx,
} from '@/lib/enoki/get-sponsored-tx';
import { createPollTransaction } from '@/lib/poll/poll-transactions';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { useMutation } from '@tanstack/react-query';

export interface CreatePollParams {
  name: string;
  options: string[];
  packageAddress?: string;
}

export const useCreatePollNew = () => {
  const client = useSuiClient();
  const sender = useCurrentAccount();
  const { mutateAsync: signTransaction } = useSignTransaction();

  return useMutation({
    mutationFn: async (params: CreatePollParams) => {
      const { name, options, packageAddress } = params;

      // 1. Validate wallet connection
      if (!sender) {
        throw new Error('Wallet not connected');
      }

      // 2. Build the transaction
      const transaction = createPollTransaction(name, options, packageAddress);

      // 3. Build transaction bytes with `onlyTransactionKind: true`
      //    This is CRITICAL for Enoki sponsorship!
      const txBytes = await transaction.build({
        client: client,
        onlyTransactionKind: true, // <-- IMPORTANT!
      });

      // 4. Get sponsored transaction from server
      const sponsoredTxn = await getSponsoredTx({
        sender: sender.address,
        txBytes: txBytes,
      });

      // 5. Sign the sponsored transaction bytes with user's wallet
      const { signature } = await signTransaction({
        transaction: sponsoredTxn.bytes,
      });

      // 6. Execute the sponsored transaction
      const result = await executeSponsoredTx({
        digest: sponsoredTxn.digest,
        signature: signature,
      });

      // 7. Wait for transaction confirmation with detailed options
      const waitedResultWithChanges = await client.waitForTransaction({
        digest: result.digest,
        options: {
          showObjectChanges: true,
          showEffects: true,
        },
      });

      // 8. Parse the result to extract created object ID
      const createdObject = waitedResultWithChanges.objectChanges?.find(
        (change) => change.type === 'created',
      );

      return {
        result: waitedResultWithChanges,
        objectId: createdObject?.objectId,
      };
    },
  });
};
```

### Dynamic Package Address Resolution

When the package address isn't known upfront, fetch it from the object type:

```ts
export const useSubmitPollOptionNew = () => {
  const client = useSuiClient();
  const sender = useCurrentAccount();
  const { mutateAsync: signTransaction } = useSignTransaction();

  return useMutation({
    mutationFn: async (params: SubmitPollOptionParams) => {
      const { pollId, option, packageAddress } = params;

      if (!sender) {
        throw new Error('Wallet not connected');
      }

      // Dynamically resolve package address from object type
      let actualPackageAddress = packageAddress;
      if (!actualPackageAddress) {
        const objectResponse = await client.getObject({
          id: pollId,
          options: { showType: true },
        });

        if (objectResponse.data?.type) {
          // Extract from "0x...::Poll::Poll"
          const typeParts = objectResponse.data.type.split('::');
          actualPackageAddress = typeParts[0] || undefined;
        }
      }

      const preparedTxn = voteTransaction(pollId, option, actualPackageAddress);
      // ... rest of sponsored transaction flow
    },
  });
};
```

### Why `useSignTransaction` Instead of `useSignAndExecuteTransaction`?

From the codebase comments:

> Using `SignAndExecute` will use the wallet's execution function which doesn't take into account options. The Sign, then Execute approach uses the client's execution function which properly takes into account options like `showObjectChanges`.

---

## Layer 6: UI Components

**Files:** `frontend/components/poll/*.tsx`

### Using the Mutation Hook

```tsx
'use client';

import { useCreatePollNew } from '@/hooks/poll/useCreatePoll';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const FormPollCreateOptions = ({ onSuccess, onFailure }) => {
  const { mutateAsync, isPending, isSuccess } = useCreatePollNew();

  const onSubmit = useCallback((data: FormValues) => {
    mutateAsync({
      name: data.title,
      options: data.options.map((option) => option.value),
      packageAddress: clientConfig.NEXT_PUBLIC_POLL_PACKAGE_ADDRESS,
    })
      .then((result) => {
        toast.success('Poll created successfully');
        onSuccess?.();

        // Use the returned objectId
        const objectId = result.objectId;
        if (objectId) {
          // Store or navigate to the new poll
        }
      })
      .catch((error) => {
        toast.error('Failed to create poll');
        console.error('Transaction error:', error);
        onFailure?.();
      });
  }, [mutateAsync]);

  return (
    <Button disabled={isPending || isSuccess} type="submit">
      Create
    </Button>
  );
};
```

### Query Invalidation After Mutation

```tsx
import { POLL_QUERY_KEYS } from '@/lib/query-keys';
import { useQueryClient } from '@tanstack/react-query';

const Page = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useSubmitPollOptionNew();

  const onSubmit = () => {
    mutateAsync({ pollId: data.id, option: selectedOption })
      .then(() => {
        toast.success('Vote submitted');
        // Wait a bit for chain to process, then refetch
        setTimeout(() => {
          queryClient.refetchQueries({
            queryKey: POLL_QUERY_KEYS.byId(data.id),
          });
        }, 1000);
      });
  };
};
```

---

## Layer 7: Reading On-Chain Data (Queries)

**File:** `frontend/lib/poll/poll-reads.ts`

### Direct RPC Query Function

```ts
import { SuiClient } from '@mysten/sui/client';

export interface PollData {
  id: string;
  name: string;
  options: string[];
  votes: bigint[];
  creator: string;
  createdAt: number;
  voters: string[];
  ended: boolean;
  packageAddress: string;
}

export async function getPollById(
  client: SuiClient,
  objectId: string,
): Promise<PollData | null> {
  try {
    const objectResponse = await client.getObject({
      id: objectId,
      options: {
        showContent: true, // Required to get parsed fields
      },
    });

    if (!objectResponse.data) return null;
    if (objectResponse.data.content?.dataType !== 'moveObject') return null;

    const moveObject = objectResponse.data.content;

    // Type verification
    if (!moveObject.type?.includes('Poll::Poll')) return null;

    // Extract and transform fields
    const fields = moveObject.fields as {
      id: { id: string };
      name: string;
      options: string[];
      votes: string[] | bigint[];
      creator: string;
      voters: string[];
      ended: boolean;
      created_at: number;
    };

    // Convert votes from string to bigint (JSON serialization issue)
    const votes = fields.votes.map((vote) =>
      typeof vote === 'string' ? BigInt(vote) : vote,
    );

    return {
      id: objectId,
      name: fields.name,
      options: fields.options,
      votes,
      creator: fields.creator,
      createdAt: fields.created_at,
      voters: fields.voters,
      ended: fields.ended,
      packageAddress: moveObject.type,
    };
  } catch (error) {
    if (error instanceof Error &&
        (error.message.includes('not found') ||
         error.message.includes('does not exist'))) {
      return null;
    }
    throw error;
  }
}
```

### React Query Hook

```ts
import { useSuiClient } from '@mysten/dapp-kit';
import { useQuery } from '@tanstack/react-query';

export const usePollById = (pollId: string) => {
  const client = useSuiClient();

  return useQuery({
    queryKey: POLL_QUERY_KEYS.byId(pollId),
    queryFn: () => {
      if (!client) {
        throw new Error('SuiClient not initialized');
      }
      return getPollById(client, pollId);
    },
  });
};
```

### Query Keys Pattern

**File:** `frontend/lib/query-keys.tsx`

```ts
export const POLL_QUERY_KEYS = {
  base: ['poll'],
  all: () => [...POLL_QUERY_KEYS.base],
  byId: (pollId: string) => [...POLL_QUERY_KEYS.base, pollId],
};
```

---

## Provider Setup

**File:** `frontend/components/layout-wrapper.tsx`

```tsx
'use client';
import clientConfig from '@/lib/env-config-client';
import { networkConfig } from '@/lib/network-config';
import {
  SuiClientProvider,
  WalletProvider,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { isEnokiNetwork, registerEnokiWallets } from '@mysten/enoki';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

// Register zkLogin as a wallet provider
function RegisterEnokiWallets() {
  const { client, network } = useSuiClientContext();
  React.useEffect(() => {
    if (!isEnokiNetwork(network)) return;
    const { unregister } = registerEnokiWallets({
      apiKey: clientConfig.NEXT_PUBLIC_ENOKI_API_KEY,
      providers: {
        google: {
          clientId: clientConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          redirectUrl: `${window.location.origin}/auth/callback`,
        },
      },
      client,
      network,
    });
    return unregister;
  }, [client, network]);
  return null;
}

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        networks={networkConfig}
        defaultNetwork={clientConfig.NEXT_PUBLIC_SUI_NETWORK_NAME}
      >
        <RegisterEnokiWallets /> {/* Must be inside SuiClientProvider */}
        <WalletProvider autoConnect>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};
```

**Network Config** (`lib/network-config.ts`):

```ts
import { createNetworkConfig } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: { url: getFullnodeUrl('devnet') },
    testnet: { url: getFullnodeUrl('testnet') },
    mainnet: { url: getFullnodeUrl('mainnet') },
  });

export { networkConfig, useNetworkVariable, useNetworkVariables };
```

---

## zkLogin Integration

zkLogin allows users to authenticate using OAuth providers (Google, Facebook, etc.) without managing private keys. The `registerEnokiWallets` function from `@mysten/enoki` integrates zkLogin as a standard wallet in dapp-kit.

### How It Works

1. User clicks "Sign in with Google" in the wallet connect modal
2. Standard OAuth flow redirects to Google
3. After authentication, redirects back to `/auth/callback`
4. Enoki creates an ephemeral key pair and ZK proof
5. User now has a Sui address derived from their Google identity

### OAuth Callback Handler

**File:** `app/auth/callback/page.tsx`

```tsx
'use client';

// The callback page just needs to exist - registerEnokiWallets handles the logic
export default function AuthCallback() {
  return <div>Completing sign in...</div>;
}
```

### Detecting Login Type (Wallet vs zkLogin)

**File:** `hooks/useLoginType.ts`

```ts
'use client';

import { useCurrentWallet } from '@mysten/dapp-kit';
import { useMemo } from 'react';

export type LoginType = 'wallet' | 'zklogin' | null;

/**
 * Detects whether the current connection is via a traditional wallet or zkLogin.
 * Enoki zkLogin wallets are named after OAuth providers (e.g., "Google").
 */
export function useLoginType(): {
  loginType: LoginType;
  isZkLogin: boolean;
  isWallet: boolean;
  walletName: string | null;
} {
  const { currentWallet } = useCurrentWallet();

  return useMemo(() => {
    if (!currentWallet) {
      return {
        loginType: null,
        isZkLogin: false,
        isWallet: false,
        walletName: null,
      };
    }

    const walletName = currentWallet.name.toLowerCase();

    // Enoki zkLogin wallets are named after OAuth providers
    const zkLoginProviders = ['google', 'facebook', 'twitch', 'apple'];
    const isZkLogin = zkLoginProviders.some(
      (provider) =>
        walletName.includes(provider) || walletName.includes('enoki'),
    );

    return {
      loginType: isZkLogin ? 'zklogin' : 'wallet',
      isZkLogin,
      isWallet: !isZkLogin,
      walletName: currentWallet.name,
    };
  }, [currentWallet]);
}
```

### Unified Signing (Works for Both)

The beauty of `registerEnokiWallets` is that zkLogin appears as a standard wallet. All existing code using `useSignTransaction` works seamlessly:

```ts
// This works for BOTH traditional wallets AND zkLogin
const { mutateAsync: signTransaction } = useSignTransaction();

// For wallets: Shows approval popup
// For zkLogin: Auto-signs with ephemeral key (no popup)
const { signature } = await signTransaction({
  transaction: sponsoredTxn.bytes,
});
```

### zkLogin Setup Requirements

1. **Google Cloud Console:**
   - Create OAuth 2.0 Client ID
   - Add redirect URI: `http://localhost:3000/auth/callback`

2. **Enoki Portal:**
   - Add Google OAuth Client ID to Auth Providers section

3. **Environment Variables:**
   ```env
   NEXT_PUBLIC_ENOKI_API_KEY=enoki_public_...
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=...apps.googleusercontent.com
   ```

### Key Differences: Wallet vs zkLogin

| Aspect         | Traditional Wallet       | zkLogin                     |
| -------------- | ------------------------ | --------------------------- |
| Setup          | Install extension        | None (just Google account)  |
| Signing        | User approves popup      | Auto-signs (ephemeral key)  |
| Key Management | User manages seed phrase | Handled by Enoki            |
| Address        | From wallet              | Derived from OAuth identity |

---

## Environment Configuration

### Client-Side Config (`lib/env-config-client.ts`)

```ts
import { z } from 'zod';

const clientConfigSchema = z.object({
  NEXT_PUBLIC_SUI_NETWORK_NAME: z.enum(['mainnet', 'testnet', 'devnet']),
  NEXT_PUBLIC_PACKAGE_ADDRESS: z.string(),
  NEXT_PUBLIC_COUNTER_OBJECT_ID: z.string(),
  // zkLogin configuration
  NEXT_PUBLIC_ENOKI_API_KEY: z.string(),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
});

const clientConfig = clientConfigSchema.safeParse({
  NEXT_PUBLIC_SUI_NETWORK_NAME: process.env.NEXT_PUBLIC_SUI_NETWORK_NAME,
  NEXT_PUBLIC_PACKAGE_ADDRESS: process.env.NEXT_PUBLIC_PACKAGE_ADDRESS,
  NEXT_PUBLIC_COUNTER_OBJECT_ID: process.env.NEXT_PUBLIC_COUNTER_OBJECT_ID,
  NEXT_PUBLIC_ENOKI_API_KEY: process.env.NEXT_PUBLIC_ENOKI_API_KEY,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
});

if (!clientConfig.success) {
  console.error('Invalid environment variables:', clientConfig.error.format());
  throw new Error('Invalid environment variables');
}

export default clientConfig.data;
```

### Server-Side Config (`lib/env-config-server.ts`)

```ts
import { z } from 'zod';

const serverConfigSchema = z.object({
  ENOKI_PRIVATE_KEY: z.string(), // Never expose to client!
});

const serverConfig = serverConfigSchema.safeParse({
  ENOKI_PRIVATE_KEY: process.env.ENOKI_PRIVATE_KEY,
});

if (!serverConfig.success) {
  console.error('Invalid environment variables:', serverConfig.error.format());
  throw new Error('Invalid environment variables');
}

export default serverConfig.data;
```

### Required Environment Variables

```env
# .env.local

# Network configuration
NEXT_PUBLIC_SUI_NETWORK_NAME=testnet
NEXT_PUBLIC_PACKAGE_ADDRESS=0x...
NEXT_PUBLIC_COUNTER_OBJECT_ID=0x...

# zkLogin (client-side)
NEXT_PUBLIC_ENOKI_API_KEY=enoki_public_...   # From Enoki Portal
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...apps.googleusercontent.com  # From Google Cloud Console

# Sponsored Transactions (server-side - KEEP SECRET)
ENOKI_PRIVATE_KEY=enoki_private_...  # From Enoki Portal
```

---

## Key Nuances & Gotchas

### 1. `onlyTransactionKind: true` is CRITICAL

When building transactions for Enoki sponsorship, you MUST use:

```ts
const txBytes = await transaction.build({
  client: client,
  onlyTransactionKind: true, // This is required!
});
```

This builds only the transaction "kind" (the Move calls) without gas payment info, allowing Enoki to add sponsorship.

### 2. Transaction Bytes Must Be Base64 Encoded

```ts
import { toBase64 } from '@mysten/sui/utils';

const sponsoredTransaction = await enokiClient.createSponsoredTransaction({
  transactionKindBytes: toBase64(txBytes), // Convert Uint8Array to base64
  // ...
});
```

### 3. Sign Then Execute vs SignAndExecute

- **`useSignAndExecuteTransaction`**: Wallet handles execution, ignores custom options
- **`useSignTransaction` + `client.executeTransactionBlock`**: Client handles execution, respects options like `showObjectChanges`

For sponsored transactions, you must use the sign-then-execute pattern anyway.

### 4. Clock Object Must Be Explicitly Passed

When not using generated SDK functions:

```ts
tx.moveCall({
  arguments: [
    tx.pure.string(name),
    tx.pure.vector('string', options),
    tx.object('0x6'), // Clock - required for create_poll
  ],
});
```

### 5. BigInt Conversion from JSON

Sui RPC returns large numbers as strings. Convert to BigInt:

```ts
const votes = fields.votes.map((vote) =>
  typeof vote === 'string' ? BigInt(vote) : vote,
);
```

### 6. Wait for Transaction Before Refetching

Add a delay before invalidating queries:

```ts
setTimeout(() => {
  queryClient.refetchQueries({
    queryKey: POLL_QUERY_KEYS.byId(data.id),
  });
}, 1000); // Wait 1 second for chain to process
```

### 7. Package Address Extraction from Object Type

Extract package address dynamically:

```ts
const typeParts = objectResponse.data.type.split('::');
// "0x123...::Poll::Poll" → ["0x123...", "Poll", "Poll"]
const packageAddress = typeParts[0];
```

### 8. Enoki API Key Security

- **Server-side only**: Use `'use server'` directive
- **Never import server config in client components**
- Use Next.js Server Actions to call Enoki

### 9. zkLogin: Google Client ID Must Be in Both Places

For zkLogin to work, the Google OAuth Client ID must be configured in:

1. **`.env.local`** as `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
2. **Enoki Portal** → Auth Providers → Google

If either is missing, you'll get an "invalid client id" error from Enoki.

### 10. zkLogin: Redirect URI Must Match Exactly

The redirect URI must be identical in three places:

1. Google Cloud Console → OAuth Client → Authorized redirect URIs
2. `registerEnokiWallets` → `providers.google.redirectUrl`
3. Your actual callback route (e.g., `/auth/callback`)

Common mistake: Using `http` vs `https`, or missing trailing slash.

### 11. zkLogin Auto-Signing Behavior

With zkLogin, `signTransaction` doesn't show a popup—it auto-signs using the ephemeral key. This means:

- Transaction log should skip/auto-complete the "User signing" step
- Use `useLoginType()` hook to detect and adjust UI accordingly
- UX should indicate that signing is automatic for social login users

---

## Complete Transaction Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        SPONSORED TRANSACTION FLOW                         │
└──────────────────────────────────────────────────────────────────────────┘

1. USER ACTION
   └─> Click "Create Poll" button

2. UI COMPONENT (form-poll-create-options.tsx)
   └─> Call mutation: mutateAsync({ name, options, packageAddress })

3. REACT HOOK (useCreatePoll.ts)
   │
   ├─> 3a. Validate wallet connected (useCurrentAccount)
   │
   ├─> 3b. Build Transaction (poll-transactions.ts)
   │       └─> createPollTransaction(name, options, packageAddress)
   │           └─> Returns: Transaction object with moveCall
   │
   ├─> 3c. Build TX Bytes
   │       └─> transaction.build({ client, onlyTransactionKind: true })
   │           └─> Returns: Uint8Array (transaction kind bytes)
   │
   ├─> 3d. SERVER ACTION: Get Sponsored TX (get-sponsored-tx.ts)
   │       └─> getSponsoredTx({ txBytes, sender })
   │           ├─> EnokiClient({ apiKey: ENOKI_PRIVATE_KEY })
   │           └─> enokiClient.createSponsoredTransaction({
   │                 network: 'testnet',
   │                 transactionKindBytes: toBase64(txBytes),
   │                 sender: sender,
   │                 allowedMoveCallTargets: [...],
   │               })
   │           └─> Returns: { bytes, digest }
   │
   ├─> 3e. Sign with Wallet (useSignTransaction)
   │       └─> signTransaction({ transaction: sponsoredTxn.bytes })
   │           └─> Wallet popup → User approves → Returns { signature }
   │
   ├─> 3f. SERVER ACTION: Execute Sponsored TX
   │       └─> executeSponsoredTx({ digest, signature })
   │           └─> enokiClient.executeSponsoredTransaction({
   │                 digest: sponsoredTxn.digest,
   │                 signature: userSignature,
   │               })
   │           └─> Returns: { digest }
   │
   └─> 3g. Wait for Confirmation
           └─> client.waitForTransaction({
                 digest: result.digest,
                 options: { showObjectChanges: true, showEffects: true },
               })
           └─> Parse created object ID from objectChanges

4. UI UPDATE
   ├─> Show success toast
   ├─> Update local state with new poll ID
   └─> Optionally redirect to poll page

5. QUERY REFETCH (after delay)
   └─> queryClient.refetchQueries({ queryKey: POLL_QUERY_KEYS.byId(pollId) })
```

---

## Dependencies

```json
{
  "@mysten/sui": "latest",
  "@mysten/dapp-kit": "latest",
  "@mysten/enoki": "latest",
  "@mysten/codegen": "latest",
  "@tanstack/react-query": "^5.x",
  "zod": "^3.x"
}
```

---

## Implementation Checklist

### Core Setup

- [ ] Set up environment variables (client + server)
- [ ] Configure network config with `createNetworkConfig`
- [ ] Set up providers (QueryClientProvider, SuiClientProvider, WalletProvider)

### zkLogin Setup

- [ ] Create Google OAuth Client ID (Google Cloud Console)
- [ ] Add redirect URI to Google OAuth: `http://localhost:3000/auth/callback`
- [ ] Add Google Client ID to Enoki Portal → Auth Providers
- [ ] Add `NEXT_PUBLIC_ENOKI_API_KEY` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to env
- [ ] Implement `RegisterEnokiWallets` component with `registerEnokiWallets`
- [ ] Create OAuth callback page (`/auth/callback`)
- [ ] (Optional) Create `useLoginType` hook to detect wallet vs zkLogin

### Sponsored Transactions

- [ ] Create server actions for Enoki (`getSponsoredTx`, `executeSponsoredTx`)
- [ ] Define helper function `getMoveTarget` for allowedMoveCallTargets
- [ ] Create transaction builder functions
- [ ] Create mutation hooks with full sponsored flow

### Data Layer

- [ ] Create query functions + hooks for reading data
- [ ] Set up query keys for cache management
- [ ] Add query invalidation after mutations

### UI

- [ ] Implement UI components with mutation/query hooks
- [ ] Add toast notifications for success/error states
- [ ] Add loading states with spinners
- [ ] Adapt UI based on login type (wallet vs zkLogin)
