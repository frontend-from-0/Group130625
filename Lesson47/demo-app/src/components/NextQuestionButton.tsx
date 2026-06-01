'use client';

type NextQuestionButtonProps = {
  visible: boolean;
  isLastQuestion: boolean;
  onClick: () => void;
};

export function NextQuestionButton({
  visible,
  isLastQuestion,
  onClick,
}: NextQuestionButtonProps) {
  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 w-full rounded-lg border border-terminal-accent px-4 py-3 font-mono text-sm text-terminal-accent transition hover:bg-terminal-accent/10"
    >
      {isLastQuestion ? 'View results' : 'Next question'}
    </button>
  );
}
