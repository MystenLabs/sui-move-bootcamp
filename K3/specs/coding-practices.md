# Coding Practices

This document outlines the coding patterns and conventions used throughout the codebase.

---

## Table of Contents

- [Project Structure](#project-structure)
- [React Patterns](#react-patterns)
- [TypeScript Patterns](#typescript-patterns)
- [Next.js Patterns](#nextjs-patterns)
- [Data Fetching & State Management](#data-fetching--state-management)
- [Form Handling](#form-handling)
- [Styling](#styling)
- [Environment Configuration](#environment-configuration)

---

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                 # Reusable UI primitives (shadcn-style)
│   ├── poll/               # Feature-specific components
│   ├── logo/               # Logo components
│   └── utility/            # Utility components
├── hooks/
│   ├── poll/               # Feature-specific hooks
│   └── *.ts                # General-purpose hooks
├── lib/
│   ├── atoms/              # Jotai atoms for state management
│   ├── enoki/              # Sui/Enoki integration utilities
│   ├── poll/               # Poll feature logic (reads, transactions)
│   └── *.ts                # Utility functions and configs
└── __generated__/          # Auto-generated code (codegen)
```

---

## React Patterns

### Component File Naming
- **PascalCase file names** for components: `button-create-poll.tsx`, `form-poll-create-options.tsx`
- **Kebab-case** is used for filenames with descriptive names
- Each component has a single default export

### Component Definitions
Components are defined as arrow functions with default exports:

```typescript
const ButtonCreatePoll = () => {
  // component logic
  return <div>...</div>;
};

export default ButtonCreatePoll;
```

### Props Interface Pattern
Props interfaces are defined inline or directly above the component:

```typescript
interface PollListProps {
  debouncedSearch: string;
}

const PollList = ({ debouncedSearch }: PollListProps) => {
  // ...
};
```

### Custom Hooks Pattern
Hooks follow the `use` prefix convention and return structured objects:

```typescript
export const usePolls = () => {
  const [polls, setPolls] = useAtom(POLLS);
  return {
    polls,
    setPolls,
  };
};
```

### Callback Memoization
Use `useCallback` for functions passed as props or used in dependency arrays:

```typescript
const handleDebouncedSearchChange = useCallback((value: string) => {
  setDebouncedSearch(value);
}, []);
```

### Memoized Computations
Use `useMemo` for expensive computations:

```typescript
const filteredPolls = useMemo(() => {
  return polls.filter(
    (poll) => debouncedSearch === '' || poll.includes(debouncedSearch),
  );
}, [polls, debouncedSearch]);
```

### Refs for DOM Elements
Use `useRef` with arrays for dynamic element lists:

```typescript
const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

// In render
ref={(el) => {
  inputRefs.current[index] = el;
  if (typeof ref === 'function') {
    ref(el);
  }
}}
```

---

## TypeScript Patterns

### Strict Mode
TypeScript is configured with strict mode enabled (`"strict": true`).

### Interface vs Type
- Use `interface` for object shapes and component props
- Define explicit types for API responses and domain entities

```typescript
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
```

### Generic Hooks
Custom hooks use generics for type flexibility:

```typescript
const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  // ...
  return debouncedValue;
};
```

### Component Props Extension
Extend native HTML props for UI components:

```typescript
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  // ...
}
```

### Path Aliases
The project uses `@/*` path alias for imports:

```typescript
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
```

---

## Next.js Patterns

### App Router
The project uses Next.js App Router with the `/app` directory structure.

### Server vs Client Components
- **Default to Server Components** (no directive needed)
- Use `'use client'` directive for interactive components
- Use `'use server'` directive for server actions

```typescript
// Client component
'use client';
import { useState } from 'react';

export default function Page() {
  const [state, setState] = useState('');
  // ...
}
```

```typescript
// Server action
'use server';
export const getSponsoredTx = async ({ txBytes, sender }) => {
  // ...
};
```

### Layout Pattern
Root layout wraps children with providers:

```typescript
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          <Navbar />
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
```

### Provider Wrapper Component
Client-side providers are wrapped in a dedicated component:

```typescript
'use client';
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({ /* ... */ });
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig}>
        <WalletProvider autoConnect>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};
```

### Dynamic Routes
Dynamic routes use the `[slug]` folder convention:

```
app/poll/[slug]/page.tsx
```

Accessed via `useParams`:

```typescript
const { slug } = useParams();
```

### Metadata Export
Page metadata is exported from layout files:

```typescript
export const metadata: Metadata = {
  title: 'Just Vote',
  description: 'Create polls, vote, have fun.',
};
```

---

## Data Fetching & State Management

### TanStack Query for Server State
Use `useQuery` for fetching data and `useMutation` for mutations:

```typescript
// Queries
export const usePollById = (pollId: string) => {
  const client = useSuiClient();
  return useQuery({
    queryKey: POLL_QUERY_KEYS.byId(pollId),
    queryFn: () => getPollById(client, pollId),
  });
};

// Mutations
export const useCreatePollNew = () => {
  const client = useSuiClient();
  return useMutation({
    mutationFn: async (params: CreatePollParams) => {
      // mutation logic
    },
  });
};
```

### Query Key Factory Pattern
Query keys are centralized for consistency and cache management:

```typescript
export const POLL_QUERY_KEYS = {
  base: ['poll'],
  all: () => [...POLL_QUERY_KEYS.base],
  byId: (pollId: string) => [...POLL_QUERY_KEYS.base, pollId],
};
```

### Query Client Configuration
Default query options are set at the client level:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
```

### Jotai for Client State
Jotai atoms are used for persistent client-side state:

```typescript
import { atomWithStorage } from 'jotai/utils';

export const POLLS = atomWithStorage<string[]>('polls', []);

export const usePolls = () => {
  const [polls, setPolls] = useAtom(POLLS);
  return { polls, setPolls };
};
```

### Cache Invalidation
Refetch queries after mutations:

```typescript
mutateAsync({ pollId })
  .then(() => {
    toast.success('Poll ended successfully');
    setTimeout(() => {
      queryClient.refetchQueries({
        queryKey: POLL_QUERY_KEYS.byId(pollId),
      });
    }, 1000);
  });
```

---

## Form Handling

### React Hook Form
Forms are managed with `react-hook-form`:

```typescript
import { useFieldArray, useForm } from 'react-hook-form';

interface FormValues {
  options: { value: string }[];
  title: string;
}

const {
  register,
  control,
  handleSubmit,
  formState: { errors },
} = useForm<FormValues>({
  defaultValues: {
    title: '',
    options: [{ value: '' }, { value: '' }],
  },
});
```

### Dynamic Field Arrays
Use `useFieldArray` for dynamic form fields:

```typescript
const { fields, append, remove } = useFieldArray({
  control,
  name: 'options',
});
```

### Form Submission Pattern
Handle async submission with proper error handling:

```typescript
const onSubmit = useCallback((data: FormValues) => {
  mutateAsync({
    name: data.title,
    options: data.options.map((option) => option.value),
  })
    .then((result) => {
      toast.success('Poll created successfully');
      onSuccess?.();
    })
    .catch((error) => {
      toast.error('Failed to create poll');
      console.error('Transaction error:', error);
      onFailure?.();
    });
}, [mutateAsync]);
```

---

## Styling

### Tailwind CSS v4
The project uses Tailwind CSS v4 with the new `@theme` directive.

### Class Variance Authority (CVA)
Component variants are managed with CVA:

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "base-classes...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border-border bg-input/30",
        // ...
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-3",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### Utility Class Merging
Use the `cn()` utility for conditional class merging:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
className={cn(
  'base-class',
  selected && 'selected-class',
  disabled && 'disabled-class',
)}
```

### CSS Custom Properties
Design tokens are defined as CSS custom properties:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.51 0.23 277);
  /* ... */
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```

### Data Attributes for Styling
Components use data attributes for state-based styling:

```typescript
<Comp
  data-slot="button"
  data-variant={variant}
  data-size={size}
  className={cn(buttonVariants({ variant, size, className }))}
/>
```

---

## Environment Configuration

### Zod Schema Validation
Environment variables are validated at runtime using Zod:

```typescript
import { z } from 'zod';

const clientConfigSchema = z.object({
  NEXT_PUBLIC_SUI_NETWORK_NAME: z.enum(['mainnet', 'testnet', 'devnet']),
  NEXT_PUBLIC_POLL_PACKAGE_ADDRESS: z.string(),
});

const clientConfig = clientConfigSchema.safeParse({
  NEXT_PUBLIC_SUI_NETWORK_NAME: process.env.NEXT_PUBLIC_SUI_NETWORK_NAME,
  NEXT_PUBLIC_POLL_PACKAGE_ADDRESS: process.env.NEXT_PUBLIC_POLL_PACKAGE_ADDRESS,
});

if (!clientConfig.success) {
  console.error('Invalid environment variables:', clientConfig.error.format());
  throw new Error('Invalid environment variables');
}

export default clientConfig.data;
```

### Separate Client/Server Configs
Environment configs are split into client and server modules:

- `lib/env-config-client.ts` - Public environment variables (prefixed with `NEXT_PUBLIC_`)
- `lib/env-config-server.ts` - Server-only secrets

---

## Additional Patterns

### Toast Notifications
Use `sonner` for toast notifications:

```typescript
import { toast } from 'sonner';

toast.success('Poll created successfully');
toast.error('Failed to create poll');
toast.warning('Please connect your wallet before voting');
```

### Transaction Builders
Blockchain transactions are built using factory functions:

```typescript
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
      tx.object('0x6'),
    ],
  });
  return tx;
};
```

### Keyboard Bindings
Custom keyboard shortcuts use a dedicated hook:

```typescript
useKeyBind({
  key: 'Enter',
  ignoreInputFocus: false,
  onPress: (event) => {
    event.preventDefault();
    // handle key press
  },
});
```

### Debounced Values
Input debouncing uses a reusable hook:

```typescript
const debouncedSearch = useDebounce(searchbar, 500);

useEffect(() => {
  onDebouncedSearchChange(debouncedSearch);
}, [debouncedSearch, onDebouncedSearchChange]);
```

---

## Dependencies Summary

| Category | Library |
|----------|---------|
| Framework | Next.js 16 (App Router) |
| React | React 19 |
| State Management | TanStack Query, Jotai |
| Forms | React Hook Form |
| Styling | Tailwind CSS v4, CVA |
| UI Components | Radix UI primitives |
| Blockchain | @mysten/sui, @mysten/dapp-kit, @mysten/enoki |
| Validation | Zod |
| Notifications | Sonner |
| Icons | Lucide React |
