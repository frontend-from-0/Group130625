'use client';

type SessionOutlinePanelProps = {
  outline: string[];
  isStreaming?: boolean;
};

export function SessionOutlinePanel({
  outline,
  isStreaming = false,
}: SessionOutlinePanelProps) {
  if (outline.length === 0) {
    return null;
  }

  return (
    <section
      className="w-full max-w-2xl rounded-lg border border-terminal-border bg-terminal-panel p-4"
      aria-label="Session outline"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-wide text-terminal-accent">
        This session covers
      </p>
      <ul className="space-y-2">
        {outline.map((item, index) => (
          <li
            key={`${index}-${item}`}
            className="flex gap-2 text-sm text-terminal-fg"
          >
            <span className="font-mono text-terminal-muted">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {isStreaming ? (
        <p className="mt-3 font-mono text-xs text-terminal-muted">
          Generating questions…
        </p>
      ) : null}
    </section>
  );
}
