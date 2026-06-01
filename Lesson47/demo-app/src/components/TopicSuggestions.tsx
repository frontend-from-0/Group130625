'use client';

type TopicSuggestionsProps = {
  message: string;
  topics: string[];
  onSelect: (topic: string) => void;
};

export function TopicSuggestions({
  message,
  topics,
  onSelect,
}: TopicSuggestionsProps) {
  return (
    <div
      className="w-full max-w-2xl rounded-lg border border-terminal-border bg-terminal-panel p-4"
      role="region"
      aria-label="Suggested topics"
    >
      <p className="mb-3 text-sm text-terminal-muted">{message}</p>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => onSelect(topic)}
            className="rounded-full border border-terminal-accent/40 bg-terminal-accent/10 px-3 py-1.5 font-mono text-xs text-terminal-accent transition hover:bg-terminal-accent/20"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
