'use client';

import type { ReactNode } from 'react';

type FlashcardShellProps = {
  topic?: string;
  children: ReactNode;
};

export function FlashcardShell({ topic, children }: FlashcardShellProps) {
  return (
    <article className="w-full max-w-2xl overflow-hidden rounded-xl border border-terminal-border bg-terminal-panel shadow-2xl">
      {topic ? (
        <div className="border-b border-terminal-border px-5 py-3">
          <span className="font-mono text-xs uppercase tracking-wide text-terminal-accent">
            {topic}
          </span>
        </div>
      ) : (
        <div className="border-b border-terminal-border px-5 py-3">
          <span className="inline-block h-4 w-32 animate-pulse rounded bg-terminal-border" />
        </div>
      )}
      <div className="p-5">{children}</div>
    </article>
  );
}
