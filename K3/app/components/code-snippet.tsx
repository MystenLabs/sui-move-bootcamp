'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

interface CodeSnippetProps {
  title: string;
  language?: string;
  code: string;
  highlightLines?: number[];
}

const CodeSnippet = React.memo(
  ({ title, language, code, highlightLines }: CodeSnippetProps) => {
    const [copied, setCopied] = React.useState(false);
    const highlightSet = React.useMemo(
      () => new Set(highlightLines ?? []),
      [highlightLines],
    );
    const lines = React.useMemo(() => code.split('\n'), [code]);

    const handleCopy = React.useCallback(async () => {
      if (!navigator?.clipboard) {
        return;
      }

      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
      } catch {
        setCopied(false);
      }
    }, [code]);

    React.useEffect(() => {
      if (!copied) {
        return;
      }

      const timeout = window.setTimeout(() => setCopied(false), 1500);
      return () => window.clearTimeout(timeout);
    }, [copied]);

    return (
      <div className="overflow-hidden rounded-none border border-white/10 bg-slate-950 text-slate-100">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <div>
            <p className="text-xs font-medium text-slate-100">{title}</p>
            {language && (
              <p className="text-[10px] text-slate-400 uppercase">{language}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-none border border-white/10 bg-white/5 px-2 py-1 text-[10px] tracking-wide text-slate-200 uppercase transition hover:bg-white/10"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="overflow-x-auto px-3 py-3 text-[11px] leading-relaxed">
          {lines.map((line, index) => {
            const lineNumber = index + 1;
            const isHighlighted = highlightSet.has(lineNumber);

            return (
              <div
                key={`${line}-${lineNumber}`}
                className={cn(
                  'flex gap-3 rounded-none px-1 py-0.5 font-mono',
                  isHighlighted && 'bg-amber-400/10 text-amber-100',
                )}
              >
                <span className="w-6 text-slate-500 select-none">
                  {String(lineNumber).padStart(2, '0')}
                </span>
                <code className="whitespace-pre">{line || ' '}</code>
              </div>
            );
          })}
        </pre>
      </div>
    );
  },
);

CodeSnippet.displayName = 'CodeSnippet';

export default CodeSnippet;
