'use client';

type ExplanationPanelProps = {
  visible: boolean;
  selectedExplanation: string;
  correctAnswer: string;
  wasCorrect: boolean;
};

export function ExplanationPanel({
  visible,
  selectedExplanation,
  correctAnswer,
  wasCorrect,
}: ExplanationPanelProps) {
  return (
    <div
      className={`mt-5 overflow-hidden border-t border-terminal-border pt-5 transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      role="region"
      aria-live="polite"
      aria-hidden={!visible}
    >
      <p className="mb-2 font-mono text-xs uppercase tracking-wide text-terminal-accent">
        Explanation
      </p>
      <p className="text-sm leading-relaxed text-terminal-fg">
        {selectedExplanation}
      </p>
      {!wasCorrect ? (
        <p className="mt-3 font-mono text-sm text-terminal-muted">
          Correct answer:{' '}
          <span className="text-terminal-accent">{correctAnswer}</span>
        </p>
      ) : null}
    </div>
  );
}
