'use client';

type SessionProgressHeaderProps = {
  topic: string;
  questionIndex: number;
  questionCount: number;
};

export function SessionProgressHeader({
  topic,
  questionIndex,
  questionCount,
}: SessionProgressHeaderProps) {
  const current = questionIndex + 1;
  const progressPercent =
    questionCount > 0 ? Math.round((current / questionCount) * 100) : 0;

  return (
    <div className="mb-5 space-y-2 border-b border-terminal-border pb-4">
      <p className="font-mono text-xs text-terminal-muted">
        <span className="text-terminal-accent">{topic}</span>
        <span className="mx-2 text-terminal-border">·</span>
        Question {current} of {questionCount}
      </p>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-terminal-border"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={questionCount}
        aria-label={`Question ${current} of ${questionCount}`}
      >
        <div
          className="h-full rounded-full bg-terminal-accent transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
