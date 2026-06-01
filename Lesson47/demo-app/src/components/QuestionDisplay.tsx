'use client';

import { useTypewriter } from '@/hooks/useTypewriter';

type QuestionDisplayProps = {
  question?: string;
  isStreaming: boolean;
};

export function QuestionDisplay({
  question,
  isStreaming,
}: QuestionDisplayProps) {
  const displayed = useTypewriter(question, isStreaming);

  return (
    <h2 className="mb-5 font-mono text-base leading-relaxed text-terminal-fg">
      {displayed || (
        <span className="inline-block h-5 w-48 animate-pulse rounded bg-terminal-border" />
      )}
      {isStreaming && displayed ? (
        <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-terminal-accent" />
      ) : null}
    </h2>
  );
}
