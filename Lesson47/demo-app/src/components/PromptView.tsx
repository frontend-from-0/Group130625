'use client';

import { SESSION_LENGTHS, type SessionLength } from '@/lib/schema';

type PromptViewProps = {
  topic: string;
  questionCount: SessionLength;
  onTopicChange: (value: string) => void;
  onQuestionCountChange: (value: SessionLength) => void;
  onSubmit: () => void;
  isLoading: boolean;
  errorMessage?: string;
};

export function PromptView({
  topic,
  questionCount,
  onTopicChange,
  onQuestionCountChange,
  onSubmit,
  isLoading,
  errorMessage,
}: PromptViewProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading && topic.trim()) {
      onSubmit();
    }
  };

  return (
    <section className="w-full max-w-2xl space-y-4">
      <header className="space-y-1">
        <p className="font-mono text-sm text-terminal-muted">micro-learning</p>
        <h1 className="text-2xl font-semibold text-terminal-fg">
          Live Quiz App
        </h1>
        <p className="text-sm text-terminal-muted">
          Short, focused study sessions with a clear finish line—built to help
          you remember, not scroll.
        </p>
      </header>

      <div className="rounded-lg border border-terminal-border bg-terminal-panel p-4 shadow-lg">
        <label htmlFor="topic-input" className="sr-only">
          What do you want to learn?
        </label>
        <div className="flex items-center gap-2 text-sm">
          <span className="shrink-0 font-mono text-terminal-accent select-none">
            Topic
          </span>
          <input
            id="topic-input"
            type="text"
            value={topic}
            onChange={(event) => onTopicChange(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="e.g. React useEffect cleanup, SQL JOIN types, Docker multi-stage builds…"
            className="min-w-0 flex-1 bg-transparent font-mono text-terminal-fg outline-none placeholder:text-terminal-muted disabled:opacity-60"
          />
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className="font-mono text-xs text-terminal-muted">
          Session length
        </legend>
        <div className="flex gap-2" role="radiogroup" aria-label="Session length">
          {SESSION_LENGTHS.map((length) => (
            <label
              key={length}
              className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-center font-mono text-sm transition ${
                questionCount === length
                  ? 'border-terminal-accent bg-terminal-accent/10 text-terminal-accent'
                  : 'border-terminal-border text-terminal-muted hover:border-terminal-accent/40'
              } ${isLoading ? 'pointer-events-none opacity-60' : ''}`}
            >
              <input
                type="radio"
                name="session-length"
                value={length}
                checked={questionCount === length}
                onChange={() => onQuestionCountChange(length)}
                disabled={isLoading}
                className="sr-only"
              />
              {length} questions
            </label>
          ))}
        </div>
      </fieldset>

      {errorMessage ? (
        <p className="text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading || !topic.trim()}
        className="w-full rounded-lg bg-terminal-accent px-4 py-3 font-mono text-sm font-semibold text-terminal-bg transition hover:bg-terminal-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? 'Generating session…' : 'Start study session'}
      </button>
    </section>
  );
}
