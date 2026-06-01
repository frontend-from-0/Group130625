'use client';

import type { SessionResults } from '@/lib/schema';

type SessionResultsViewProps = {
  topic: string;
  results: SessionResults;
  onNewTopic: () => void;
  onRetry: () => void;
};

export function SessionResultsView({
  topic,
  results,
  onNewTopic,
  onRetry,
}: SessionResultsViewProps) {
  const { score, total, correctConcepts, missedConcepts } = results;
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <section
      className="w-full max-w-2xl space-y-5 rounded-xl border border-terminal-border bg-terminal-panel p-6 shadow-2xl"
      aria-label="Session results"
    >
      <header className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-wide text-terminal-accent">
          Session complete
        </p>
        <h2 className="text-xl font-semibold text-terminal-fg">{topic}</h2>
      </header>

      <div className="rounded-lg border border-terminal-border bg-terminal-bg px-5 py-4 text-center">
        <p className="font-mono text-3xl font-semibold text-terminal-accent">
          {score}/{total}
        </p>
        <p className="mt-1 text-sm text-terminal-muted">{percent}% correct</p>
      </div>

      {correctConcepts.length > 0 ? (
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-wide text-terminal-accent">
            Strengths
          </p>
          <ul className="space-y-1">
            {correctConcepts.map((concept) => (
              <li key={concept} className="text-sm text-terminal-fg">
                {concept}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {missedConcepts.length > 0 ? (
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-wide text-red-400">
            Review these
          </p>
          <ul className="space-y-1">
            {missedConcepts.map((concept) => (
              <li key={concept} className="text-sm text-terminal-fg">
                {concept}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-col gap-2 pt-2 sm:flex-row">
        <button
          type="button"
          onClick={onRetry}
          className="flex-1 rounded-lg border border-terminal-accent px-4 py-3 font-mono text-sm text-terminal-accent transition hover:bg-terminal-accent/10"
        >
          Try again
        </button>
        <button
          type="button"
          onClick={onNewTopic}
          className="flex-1 rounded-lg bg-terminal-accent px-4 py-3 font-mono text-sm font-semibold text-terminal-bg transition hover:bg-terminal-accent/90"
        >
          New topic
        </button>
      </div>
    </section>
  );
}
