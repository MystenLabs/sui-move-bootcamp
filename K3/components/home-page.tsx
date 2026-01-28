'use client';

import CodeSnippet from '@/components/code-snippet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  type AppTab,
  activeCodeStepAtom,
  activeTabAtom,
  logActiveStepAtom,
  logDigestAtom,
  logProgressAtom,
  visitedStepsAtom,
} from '@/lib/atoms/ui';
import {
  ACTIVITY_SEED,
  type ActivityItem,
  CODE_STEPS,
  DEMO_ADDRESSES,
  type DemoAction,
  LOG_STEP_DEFS,
} from '@/lib/data/enoki-demo';
import { cn } from '@/lib/utils';
import { ConnectButton } from '@mysten/dapp-kit';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as React from 'react';

const NAV_TABS = [
  { id: 'demo', label: 'Demo' },
  { id: 'code', label: 'Code' },
] as const;

const createRandomHex = (length: number) =>
  Array.from({ length }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join('');

const createTxBytes = () => `0x${createRandomHex(32)}`;
const createDigest = () => `0x${createRandomHex(12)}${createRandomHex(12)}`;

const pickRandomAddress = (addresses: string[]) =>
  addresses[Math.floor(Math.random() * addresses.length)] ?? addresses[0];

const formatAddress = (address: string) => {
  if (address.length <= 10) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

interface PreparedTx {
  action: DemoAction;
  message: string;
  bytes: string;
  sponsor: string;
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
          <nav className="flex items-center gap-1 rounded-none border border-border bg-muted/60 p-0.5 text-xs tracking-wide uppercase">
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
          </nav>
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
  const [counter, setCounter] = React.useState(42);
  const [message, setMessage] = React.useState('');
  const [activity, setActivity] = React.useState<ActivityItem[]>(
    () => ACTIVITY_SEED,
  );
  const [preparedTx, setPreparedTx] = React.useState<PreparedTx | null>(null);
  const [isPreparing, setIsPreparing] = React.useState(false);
  const [isExecuting, setIsExecuting] = React.useState(false);
  const [sponsoredAt, setSponsoredAt] = React.useState<number | null>(null);

  const setLogProgress = useSetAtom(logProgressAtom);
  const setLogActiveStep = useSetAtom(logActiveStepAtom);
  const setLogDigest = useSetAtom(logDigestAtom);

  const timeoutsRef = React.useRef<number[]>([]);

  const clearTimers = React.useCallback(() => {
    timeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
    timeoutsRef.current = [];
  }, []);

  React.useEffect(() => () => clearTimers(), [clearTimers]);

  React.useEffect(() => {
    if (!sponsoredAt) {
      return;
    }

    const timeout = window.setTimeout(() => setSponsoredAt(null), 9000);
    return () => window.clearTimeout(timeout);
  }, [sponsoredAt]);

  const schedule = React.useCallback((fn: () => void, delay: number) => {
    const timeout = window.setTimeout(fn, delay);
    timeoutsRef.current.push(timeout);
  }, []);

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
      if (isPreparing || isExecuting || preparedTx) {
        return;
      }

      clearTimers();
      resetLog();

      const messageSnapshot = message.trim();
      const bytes = createTxBytes();
      const sponsor = 'Enoki';

      setIsPreparing(true);

      const durations = [350, 350];
      let elapsed = 0;

      durations.forEach((duration, index) => {
        const step = index + 1;
        schedule(() => setLogActiveStep(step), elapsed);
        schedule(() => {
          setLogProgress(step);
          setLogActiveStep(step < 4 ? step + 1 : null);

          if (step === 2) {
            setIsPreparing(false);
            setPreparedTx({
              action,
              message: messageSnapshot,
              bytes,
              sponsor,
            });
          }
        }, elapsed + duration);
        elapsed += duration;
      });
    },
    [
      clearTimers,
      isPreparing,
      isExecuting,
      message,
      preparedTx,
      resetLog,
      schedule,
      setLogActiveStep,
      setLogProgress,
    ],
  );

  const handleCancelPrepared = React.useCallback(() => {
    clearTimers();
    setPreparedTx(null);
    setIsPreparing(false);
    setIsExecuting(false);
    resetLog();
  }, [clearTimers, resetLog]);

  const handleSignAndExecute = React.useCallback(() => {
    if (!preparedTx || isExecuting) {
      return;
    }

    const preparedSnapshot = preparedTx;
    const digest = createDigest();
    const actor = formatAddress(pickRandomAddress(DEMO_ADDRESSES));

    clearTimers();
    setPreparedTx(null);
    setIsExecuting(true);
    setLogProgress(4);
    setLogDigest(null);
    setLogActiveStep(5);

    schedule(() => {
      setLogProgress(5);
      setLogActiveStep(6);
    }, 350);
    schedule(() => {
      setLogProgress(6);
      setLogActiveStep(null);
      setLogDigest(digest);
      setIsExecuting(false);
      setSponsoredAt(Date.now());
      setMessage('');

      setCounter((prev) =>
        preparedSnapshot.action === 'increment' ? prev + 1 : prev - 1,
      );

      setActivity((prev) => {
        const delta = preparedSnapshot.action === 'increment' ? 1 : -1;
        const nextItem: ActivityItem = {
          id: `tx-${Date.now()}`,
          actor,
          action: preparedSnapshot.action,
          message: preparedSnapshot.message,
          delta,
        };

        return [nextItem, ...prev].slice(0, 6);
      });
    }, 750);
  }, [
    clearTimers,
    isExecuting,
    preparedTx,
    schedule,
    setLogActiveStep,
    setLogDigest,
    setLogProgress,
  ]);

  const isBusy = isPreparing || isExecuting || Boolean(preparedTx);
  const showSponsoredBadge = Boolean(sponsoredAt);

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
            <div className="text-3xl font-semibold">{counter}</div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button
              variant="outline"
              disabled={isBusy}
              onClick={() => handlePrepare('decrement')}
            >
              Prepare -
            </Button>
            <Button
              disabled={isBusy}
              onClick={() => handlePrepare('increment')}
            >
              Prepare +
            </Button>
          </div>
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
          {isPreparing ? (
            <div className="rounded-none border border-dashed border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
              Preparing transaction...
            </div>
          ) : null}
          {preparedTx ? (
            <div className="rounded-none border border-amber-400/40 bg-amber-400/5 px-3 py-3 text-xs">
              <div className="space-y-1">
                <div className="text-xs font-semibold tracking-wide text-foreground uppercase">
                  Transaction Ready
                </div>
                <div className="text-muted-foreground">
                  Sponsorship is confirmed. Review details before signing.
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
                    Transaction bytes
                  </div>
                  <div className="font-mono text-[11px] text-foreground">
                    {preparedTx.bytes}
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="tracking-wide text-muted-foreground uppercase">
                    Sponsor
                  </div>
                  <div>{preparedTx.sponsor}</div>
                </div>
                <div className="grid gap-1">
                  <div className="tracking-wide text-muted-foreground uppercase">
                    Gas
                  </div>
                  <div>Covered by sponsor</div>
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

      <Card>
        <CardHeader className="gap-2 border-b border-border/60">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Live updates from sponsored transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {activity.map((item) => {
              const isIncrement = item.delta > 0;
              return (
                <li
                  key={item.id}
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
                      <div className="text-foreground">{item.actor}</div>
                      {item.message ? (
                        <div className="text-muted-foreground">
                          &quot;{item.message}&quot;
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <span className="text-muted-foreground">
                    {isIncrement ? `+${item.delta}` : item.delta}
                  </span>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
});

DemoPanel.displayName = 'DemoPanel';

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
        <CardTitle>
          Step {activeStep + 1} of {stepCount}: {currentStep.title}
        </CardTitle>
        <CardDescription>{currentStep.summary}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <CodeSnippet
          title={currentStep.title}
          language={currentStep.language}
          code={currentStep.code}
          highlightLines={currentStep.highlightLines}
        />
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={activeStep === 0}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={activeStep === stepCount - 1}
          >
            Next
          </Button>
        </div>
        <div className="flex items-center gap-1.5">
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
      </CardFooter>
    </Card>
  );
});

CodePanel.displayName = 'CodePanel';

const TransactionLog = React.memo(() => {
  const logActiveStep = useAtomValue(logActiveStepAtom);
  const logProgress = useAtomValue(logProgressAtom);
  const logDigest = useAtomValue(logDigestAtom);
  const setActiveStep = useSetAtom(activeCodeStepAtom);
  const setActiveTab = useSetAtom(activeTabAtom);

  const logSteps = React.useMemo(
    () =>
      LOG_STEP_DEFS.map((step) => {
        const isActive = logActiveStep === step.id;
        const isDone = logProgress >= step.id;
        const status = isActive ? 'active' : isDone ? 'done' : 'idle';
        return { ...step, status };
      }),
    [logActiveStep, logProgress],
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

  const showReady = logProgress === 4 && !logDigest && !logActiveStep;
  const isIdle = logProgress === 0 && !logActiveStep && !logDigest;

  return (
    <details className="rounded-none border border-border bg-card" open>
      <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-xs font-semibold tracking-wide uppercase">
        <span>Transaction Log</span>
        <span className="text-muted-foreground">
          {isIdle ? 'Idle' : `Step ${Math.min(logProgress + 1, 6)} of 6`}
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
              )}
            >
              <span
                className={cn(
                  'h-2 w-2 rounded-full',
                  step.status === 'active' && 'bg-amber-400',
                  step.status === 'done' && 'bg-emerald-400',
                  step.status === 'idle' && 'bg-muted-foreground/40',
                )}
              />
              <span className="text-muted-foreground">[{step.id}]</span>
              <span className="flex-1">{step.label}</span>
              {step.status === 'active' ? (
                <span className="text-amber-500">Active</span>
              ) : null}
              {step.status === 'done' ? (
                <span className="text-emerald-500">Done</span>
              ) : null}
            </button>
          ))}
          {showReady ? (
            <div className="rounded-none border border-dashed border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
              Transaction Ready (waiting for user)
            </div>
          ) : null}
          {logDigest ? (
            <div className="rounded-none border border-border bg-muted/20 px-3 py-2 text-xs">
              Success. Digest:{' '}
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
