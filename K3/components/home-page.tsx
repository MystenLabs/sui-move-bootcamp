'use client';

import CodeSnippet from '@/components/code-snippet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useDecrement } from '@/hooks/counter/useDecrement';
import { useDecrementDirect } from '@/hooks/counter/useDecrementDirect';
import { useIncrement } from '@/hooks/counter/useIncrement';
import { useIncrementDirect } from '@/hooks/counter/useIncrementDirect';
import {
  type AppTab,
  activeCodeStepAtom,
  activeTabAtom,
  logActiveStepAtom,
  logDigestAtom,
  logProgressAtom,
  useEnokiAtom,
  visitedStepsAtom,
} from '@/lib/atoms/ui';
import { useCounterById, useCounterEvents } from '@/lib/counter/counter-reads';
import {
  CODE_STEPS,
  type DemoAction,
  LOG_STEP_DEFS,
} from '@/lib/data/enoki-demo';
import clientConfig from '@/lib/env-config-client';
import { TransactionError } from '@/lib/errors';
import { COUNTER_QUERY_KEYS } from '@/lib/query-keys';
import { cn } from '@/lib/utils';
import {
  ConnectButton,
  useCurrentAccount,
  useSuiClientQuery,
} from '@mysten/dapp-kit';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as React from 'react';
import { toast } from 'sonner';

const NAV_TABS = [
  { id: 'demo', label: 'Demo' },
  { id: 'code', label: 'Code' },
] as const;

const formatAddress = (address: string) => {
  if (address.length <= 10) {
    return address;
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

interface PreparedTx {
  action: DemoAction;
  message: string;
  useEnoki: boolean;
}

const HomePage = () => {
  const activeTab = useAtomValue(activeTabAtom);
  const isCodeTab = activeTab === 'code';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-6 pb-12">
        <div
          className={cn(
            'grid gap-6',
            isCodeTab && 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]',
          )}
        >
          <DemoPanel />
          {isCodeTab ? <CodePanel /> : null}
        </div>
        <TransactionLog />
      </main>
    </div>
  );
};

const Navbar = React.memo(() => {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  const handleTabClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const tab = event.currentTarget.getAttribute('data-tab') as AppTab | null;
      if (!tab) {
        return;
      }

      setActiveTab(tab);
    },
    [setActiveTab],
  );

  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
            Enoki Sponsored Transactions
          </div>
          {/* <nav className="flex items-center gap-1 rounded-none border border-border bg-muted/60 p-0.5 text-xs tracking-wide uppercase">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-tab={tab.id}
                  onClick={handleTabClick}
                  className={cn(
                    'rounded-none px-3 py-1 transition',
                    isActive
                      ? 'bg-background text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                  aria-pressed={isActive}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav> */}
        </div>
        <div className="flex items-center gap-2">
          <ConnectButton connectText="Connect Wallet" />
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

const DemoPanel = React.memo(() => {
  const queryClient = useQueryClient();
  const account = useCurrentAccount();
  const [message, setMessage] = React.useState('');
  const [preparedTx, setPreparedTx] = React.useState<PreparedTx | null>(null);
  const [sponsoredAt, setSponsoredAt] = React.useState<number | null>(null);
  const [useEnoki, setUseEnoki] = useAtom(useEnokiAtom);

  // Real hook for counter data
  const { data: counterData, isLoading: isCounterLoading } = useCounterById(
    clientConfig.NEXT_PUBLIC_COUNTER_OBJECT_ID,
  );

  // Fetch SUI balance for connected wallet
  const { data: balanceData } = useSuiClientQuery(
    'getBalance',
    { owner: account?.address ?? '', coinType: '0x2::sui::SUI' },
    { enabled: Boolean(account?.address) },
  );

  // Sponsored mutation hooks (Enoki)
  const incrementMutation = useIncrement();
  const decrementMutation = useDecrement();

  // Direct mutation hooks (user pays gas)
  const incrementDirectMutation = useIncrementDirect();
  const decrementDirectMutation = useDecrementDirect();

  // Log state atoms
  const setLogProgress = useSetAtom(logProgressAtom);
  const setLogActiveStep = useSetAtom(logActiveStepAtom);
  const setLogDigest = useSetAtom(logDigestAtom);

  // Clear sponsored badge after timeout
  React.useEffect(() => {
    if (!sponsoredAt) return;
    const timeout = window.setTimeout(() => setSponsoredAt(null), 9000);
    return () => window.clearTimeout(timeout);
  }, [sponsoredAt]);

  const resetLog = React.useCallback(() => {
    setLogActiveStep(null);
    setLogProgress(0);
    setLogDigest(null);
  }, [setLogActiveStep, setLogDigest, setLogProgress]);

  const handleMessageChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(event.target.value);
    },
    [],
  );

  const handlePrepare = React.useCallback(
    (action: DemoAction) => {
      if (!account) {
        toast.warning('Please connect your wallet first');
        return;
      }

      if (
        preparedTx ||
        incrementMutation.isPending ||
        decrementMutation.isPending ||
        incrementDirectMutation.isPending ||
        decrementDirectMutation.isPending
      ) {
        return;
      }

      resetLog();
      const messageSnapshot = message.trim();
      const useEnokiSnapshot = useEnoki;

      // Step 1: Build transaction
      setLogActiveStep(1);
      setLogProgress(1);

      if (useEnokiSnapshot) {
        // Step 2: Request sponsorship (simulated delay for UI feedback)
        setTimeout(() => {
          setLogActiveStep(2);
          setLogProgress(2);
          setPreparedTx({
            action,
            message: messageSnapshot,
            useEnoki: useEnokiSnapshot,
          });
        }, 300);
      } else {
        // No sponsorship step for direct transactions
        setTimeout(() => {
          setPreparedTx({
            action,
            message: messageSnapshot,
            useEnoki: useEnokiSnapshot,
          });
        }, 200);
      }
    },
    [
      account,
      decrementDirectMutation.isPending,
      decrementMutation.isPending,
      incrementDirectMutation.isPending,
      incrementMutation.isPending,
      message,
      preparedTx,
      resetLog,
      setLogActiveStep,
      setLogProgress,
      useEnoki,
    ],
  );

  const handleCancelPrepared = React.useCallback(() => {
    setPreparedTx(null);
    resetLog();
  }, [resetLog]);

  const handleSignAndExecute = React.useCallback(async () => {
    if (!preparedTx) return;

    const preparedSnapshot = preparedTx;
    setPreparedTx(null);

    // Update log to show signing step
    setLogProgress(3);
    setLogActiveStep(3);

    // Select the appropriate mutation based on Enoki toggle
    const mutation = preparedSnapshot.useEnoki
      ? preparedSnapshot.action === 'increment'
        ? incrementMutation
        : decrementMutation
      : preparedSnapshot.action === 'increment'
        ? incrementDirectMutation
        : decrementDirectMutation;

    try {
      // Step 4: Execute
      setLogProgress(4);
      setLogActiveStep(4);

      const result = await mutation.mutateAsync({
        note: preparedSnapshot.message,
      });

      // Success
      setLogProgress(4);
      setLogActiveStep(null);
      setLogDigest(result.digest);
      if (preparedSnapshot.useEnoki) {
        setSponsoredAt(Date.now());
      }
      setMessage('');

      toast.success(
        `Counter ${preparedSnapshot.action === 'increment' ? 'incremented' : 'decremented'} successfully!${preparedSnapshot.useEnoki ? '' : ' (You paid gas)'}`,
      );

      // Refetch data after a short delay
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: COUNTER_QUERY_KEYS.value(
            clientConfig.NEXT_PUBLIC_COUNTER_OBJECT_ID,
          ),
        });
        queryClient.invalidateQueries({
          queryKey: COUNTER_QUERY_KEYS.events(),
        });
      }, 1000);
    } catch (error) {
      console.error('Transaction error:', error);

      if (error instanceof TransactionError) {
        switch (error.step) {
          case 'wallet':
            toast.warning(error.message);
            break;
          case 'sign':
            // User cancelled signing - show info toast, not error
            if (error.message.includes('cancelled')) {
              toast.info('Transaction cancelled');
            } else {
              toast.error(error.message);
            }
            break;
          case 'sponsor':
            toast.error('Sponsorship failed. Please try again.');
            break;
          case 'execute':
            toast.error('Transaction execution failed. Please try again.');
            break;
          case 'confirm':
            toast.warning(
              'Transaction submitted but confirmation timed out. Check your wallet.',
            );
            break;
          case 'build':
          default:
            toast.error(error.message);
        }
      } else {
        toast.error(
          error instanceof Error ? error.message : 'Transaction failed',
        );
      }

      resetLog();
    }
  }, [
    preparedTx,
    incrementMutation,
    decrementMutation,
    incrementDirectMutation,
    decrementDirectMutation,
    queryClient,
    setLogActiveStep,
    setLogDigest,
    setLogProgress,
    resetLog,
  ]);

  const isBusy =
    incrementMutation.isPending ||
    decrementMutation.isPending ||
    incrementDirectMutation.isPending ||
    decrementDirectMutation.isPending ||
    Boolean(preparedTx);
  const showSponsoredBadge = Boolean(sponsoredAt);

  const handleToggleEnoki = React.useCallback(() => {
    setUseEnoki((prev) => !prev);
  }, [setUseEnoki]);

  const counterValue = counterData?.value ?? BigInt(0);

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-visible">
        <CardHeader className="gap-2 border-b border-border/60">
          <CardTitle>Global Counter</CardTitle>
          <CardDescription>
            Anyone can increment or decrement with sponsored gas.
          </CardDescription>
          <CardAction>
            {showSponsoredBadge ? (
              <Badge variant="secondary">Gas Sponsored</Badge>
            ) : null}
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-none border border-border bg-muted/40 px-4 py-5">
            <div className="text-xs tracking-wide text-muted-foreground uppercase">
              Counter
            </div>
            <div className="text-3xl font-semibold">
              {isCounterLoading ? '...' : counterValue.toString()}
            </div>
          </div>
          {account && (
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleToggleEnoki}
                disabled={Boolean(preparedTx)}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-none border px-3 py-1.5 text-xs transition',
                  useEnoki
                    ? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-600'
                    : 'border-amber-400/60 bg-amber-400/10 text-amber-600',
                  Boolean(preparedTx) && 'cursor-not-allowed opacity-50',
                )}
              >
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    useEnoki ? 'bg-emerald-400' : 'bg-amber-400',
                  )}
                />
                {useEnoki ? 'Enoki Sponsored' : 'Pay Gas Yourself'}
              </button>
              <div className="inline-flex items-center gap-2 rounded-none px-3 py-1.5 text-xs">
                <span className="text-muted-foreground">
                  {clientConfig.NEXT_PUBLIC_SUI_NETWORK_NAME}
                </span>
                <span className="text-muted-foreground">SUI Balance:</span>
                <span className="font-mono font-medium text-foreground">
                  {balanceData
                    ? (Number(balanceData.totalBalance) / 1e9).toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 4 },
                      )
                    : '—'}
                </span>
              </div>
            </div>
          )}
          <div className="grid gap-2 sm:grid-cols-2">
            <Button
              variant="outline"
              disabled={isBusy || !account || counterValue === BigInt(0)}
              onClick={() => handlePrepare('decrement')}
            >
              Prepare -
            </Button>
            <Button
              disabled={isBusy || !account}
              onClick={() => handlePrepare('increment')}
            >
              Prepare +
            </Button>
          </div>
          {!account && (
            <div className="rounded-none border border-dashed border-amber-400/40 bg-amber-400/5 px-3 py-2 text-xs text-amber-600">
              Connect your wallet to interact with the counter
            </div>
          )}
          <div className="space-y-2">
            <div className="text-xs tracking-wide text-muted-foreground uppercase">
              Optional message
            </div>
            <Textarea
              value={message}
              onChange={handleMessageChange}
              placeholder="Leave a short note"
              rows={2}
              maxLength={72}
            />
            <div className="text-[10px] tracking-wide text-muted-foreground uppercase">
              {message.length}/72
            </div>
          </div>
          {(incrementMutation.isPending ||
            decrementMutation.isPending ||
            incrementDirectMutation.isPending ||
            decrementDirectMutation.isPending) &&
          !preparedTx ? (
            <div className="rounded-none border border-dashed border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
              Processing transaction...
            </div>
          ) : null}
          {preparedTx ? (
            <div
              className={cn(
                'rounded-none border px-3 py-3 text-xs',
                preparedTx.useEnoki
                  ? 'border-amber-400/40 bg-amber-400/5'
                  : 'border-rose-400/40 bg-rose-400/5',
              )}
            >
              <div className="space-y-1">
                <div className="text-xs font-semibold tracking-wide text-foreground uppercase">
                  Transaction Ready
                </div>
                <div className="text-muted-foreground">
                  {preparedTx.useEnoki
                    ? 'Click Sign & Execute to submit the sponsored transaction.'
                    : 'Click Sign & Execute to submit. You will pay gas fees.'}
                </div>
              </div>
              <div className="mt-3 space-y-3 text-muted-foreground">
                <div className="grid gap-1 text-foreground">
                  <div className="tracking-wide text-muted-foreground uppercase">
                    Action
                  </div>
                  <div>
                    {preparedTx.action === 'increment'
                      ? 'Increment counter'
                      : 'Decrement counter'}
                  </div>
                </div>
                <Separator />
                <div className="grid gap-1">
                  <div className="tracking-wide text-muted-foreground uppercase">
                    Sponsor
                  </div>
                  <div>{preparedTx.useEnoki ? 'Enoki' : 'None'}</div>
                </div>
                <div className="grid gap-1">
                  <div className="tracking-wide text-muted-foreground uppercase">
                    Gas
                  </div>
                  <div>
                    {preparedTx.useEnoki ? 'Covered by sponsor' : 'Paid by you'}
                  </div>
                </div>
                {preparedTx.message ? (
                  <div className="grid gap-1">
                    <div className="tracking-wide text-muted-foreground uppercase">
                      Message
                    </div>
                    <div>&quot;{preparedTx.message}&quot;</div>
                  </div>
                ) : null}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button variant="outline" onClick={handleCancelPrepared}>
                  Cancel
                </Button>
                <Button onClick={handleSignAndExecute}>Sign & Execute</Button>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <ActivityCard />
    </div>
  );
});

DemoPanel.displayName = 'DemoPanel';

const ActivityCard = React.memo(() => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const { data: events, isLoading, dataUpdatedAt } = useCounterEvents(6);

  // Scroll to top when data is refetched
  React.useEffect(() => {
    if (dataUpdatedAt && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [dataUpdatedAt]);

  return (
    <Card className="gap-0 pb-0">
      <CardHeader className="gap-2 border-b border-border/60">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Live updates from sponsored transactions.
        </CardDescription>
      </CardHeader>
      <CardContent ref={scrollContainerRef} className="h-36 overflow-y-auto">
        {isLoading ? (
          <div className="py-4 text-center text-xs text-muted-foreground">
            Loading activity...
          </div>
        ) : !events || events.length === 0 ? (
          <div className="py-4 text-center text-xs text-muted-foreground">
            No activity yet. Be the first to interact!
          </div>
        ) : (
          <ul className="space-y-3 py-4">
            {events.map((event) => {
              const isIncrement = event.type === 'increment';
              return (
                <li
                  key={event.id}
                  className="flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        'flex h-5 w-5 items-center justify-center rounded-none border text-[10px] font-semibold',
                        isIncrement
                          ? 'border-emerald-400/40 text-emerald-500'
                          : 'border-rose-400/40 text-rose-500',
                      )}
                    >
                      {isIncrement ? '+' : '-'}
                    </span>
                    <div className="space-y-1">
                      <div className="text-foreground">
                        {formatAddress(event.by)}
                      </div>
                      {event.note ? (
                        <div className="text-muted-foreground">
                          &quot;{event.note}&quot;
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <span className="text-muted-foreground">
                    → {event.newValue.toString()}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
});

ActivityCard.displayName = 'ActivityCard';

const CodePanel = React.memo(() => {
  const [activeStep, setActiveStep] = useAtom(activeCodeStepAtom);
  const visitedSteps = useAtomValue(visitedStepsAtom);
  const setVisitedSteps = useSetAtom(visitedStepsAtom);

  const stepCount = CODE_STEPS.length;
  const currentStep = React.useMemo(
    () => CODE_STEPS[activeStep] ?? CODE_STEPS[0],
    [activeStep],
  );

  React.useEffect(() => {
    setVisitedSteps((prev) => {
      if (prev.has(activeStep)) {
        return prev;
      }
      const next = new Set(prev);
      next.add(activeStep);
      return next;
    });
  }, [activeStep, setVisitedSteps]);

  const handlePrev = React.useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  }, [setActiveStep]);

  const handleNext = React.useCallback(() => {
    setActiveStep((prev) => Math.min(prev + 1, stepCount - 1));
  }, [setActiveStep, stepCount]);

  const dots = React.useMemo(
    () =>
      CODE_STEPS.map((step, index) => ({
        key: step.id,
        isActive: index === activeStep,
        isVisited: visitedSteps.has(index),
      })),
    [activeStep, visitedSteps],
  );

  return (
    <Card className="h-full">
      <CardHeader className="gap-2 border-b border-border/60">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>
              Step {activeStep + 1} of {stepCount}: {currentStep.title}
            </CardTitle>
            <CardDescription>{currentStep.summary}</CardDescription>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={activeStep === 0}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={activeStep === stepCount - 1}
            >
              Next
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-1.5 pt-2">
          {dots.map((dot) => (
            <span
              key={dot.key}
              className={cn(
                'h-2 w-2 rounded-full border border-border',
                dot.isActive
                  ? 'bg-primary'
                  : dot.isVisited
                    ? 'bg-muted-foreground/50'
                    : 'bg-muted',
              )}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CodeSnippet
          title={currentStep.title}
          language={currentStep.language}
          code={currentStep.code}
          highlightLines={currentStep.highlightLines}
        />
      </CardContent>
    </Card>
  );
});

CodePanel.displayName = 'CodePanel';

type LogStepStatus = 'idle' | 'active' | 'done' | 'skipped';

const TransactionLog = React.memo(() => {
  const logActiveStep = useAtomValue(logActiveStepAtom);
  const logProgress = useAtomValue(logProgressAtom);
  const logDigest = useAtomValue(logDigestAtom);
  const useEnoki = useAtomValue(useEnokiAtom);
  const setActiveStep = useSetAtom(activeCodeStepAtom);
  const setActiveTab = useSetAtom(activeTabAtom);

  const logSteps = React.useMemo(
    () =>
      LOG_STEP_DEFS.map((step) => {
        const isActive = logActiveStep === step.id;
        const isDone = logProgress >= step.id;

        // Step 2 (Request sponsorship) should be "skipped" when not using Enoki
        const isSponsorshipStep = step.id === 2;
        const shouldSkip = isSponsorshipStep && !useEnoki && logProgress > 0;

        let status: LogStepStatus;
        if (shouldSkip) {
          status = 'skipped';
        } else if (isActive) {
          status = 'active';
        } else if (isDone) {
          status = 'done';
        } else {
          status = 'idle';
        }

        return { ...step, status };
      }),
    [logActiveStep, logProgress, useEnoki],
  );

  const handleLogStepClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const stepIndex = Number(
        event.currentTarget.getAttribute('data-step-index'),
      );
      if (Number.isNaN(stepIndex)) {
        return;
      }

      setActiveTab('code');
      setActiveStep(stepIndex);
    },
    [setActiveStep, setActiveTab],
  );

  const isIdle = logProgress === 0 && !logActiveStep && !logDigest;

  // Calculate effective step count (3 steps when not using Enoki)
  const effectiveStepCount = useEnoki ? 4 : 3;
  const effectiveProgress = useEnoki
    ? logProgress
    : logProgress > 1
      ? logProgress - 1
      : logProgress;

  return (
    <details className="rounded-none border border-border bg-card" open>
      <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-xs font-semibold tracking-wide uppercase">
        <span>Transaction Log</span>
        <span className="text-muted-foreground">
          {isIdle
            ? 'Idle'
            : logDigest
              ? 'Complete'
              : `Step ${effectiveProgress} of ${effectiveStepCount}`}
        </span>
      </summary>
      <div className="border-t border-border/60 px-4 py-4 text-xs">
        <div className="grid gap-2">
          {logSteps.map((step) => (
            <button
              key={step.id}
              type="button"
              data-step-index={step.codeStepIndex}
              onClick={handleLogStepClick}
              className={cn(
                'flex items-center gap-3 rounded-none border border-border/60 bg-background px-3 py-2 text-left transition hover:bg-muted/40',
                step.status === 'active' &&
                  'border-amber-400/60 bg-amber-400/5',
                step.status === 'done' &&
                  'border-emerald-400/40 bg-emerald-400/5',
                step.status === 'skipped' &&
                  'border-muted-foreground/30 bg-muted/20 opacity-60',
              )}
            >
              <span
                className={cn(
                  'h-2 w-2 rounded-full',
                  step.status === 'active' && 'bg-amber-400',
                  step.status === 'done' && 'bg-emerald-400',
                  step.status === 'idle' && 'bg-muted-foreground/40',
                  step.status === 'skipped' && 'bg-muted-foreground/30',
                )}
              />
              <span className="text-muted-foreground">[{step.id}]</span>
              <span
                className={cn(
                  'flex-1',
                  step.status === 'skipped' && 'line-through',
                )}
              >
                {step.label}
              </span>
              {step.status === 'active' ? (
                <span className="text-amber-500">Active</span>
              ) : null}
              {step.status === 'done' ? (
                <span className="text-emerald-500">Done</span>
              ) : null}
              {step.status === 'skipped' ? (
                <span className="text-muted-foreground">Skipped</span>
              ) : null}
            </button>
          ))}
          {logDigest ? (
            <div className="rounded-none border border-emerald-400/40 bg-emerald-400/5 px-3 py-2 text-xs">
              Success! Digest:{' '}
              <span className="font-mono text-[11px] text-foreground">
                {logDigest}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </details>
  );
});

TransactionLog.displayName = 'TransactionLog';

export default HomePage;
