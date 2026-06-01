'use client';

type OptionState = 'default' | 'correct' | 'wrong' | 'dimmed' | 'loading';

type OptionButtonProps = {
  answer?: string;
  optionId: number;
  disabled: boolean;
  state: OptionState;
  onSelect: (optionId: number) => void;
};

function getStateClasses(state: OptionState): string {
  switch (state) {
    case 'correct':
      return 'border-emerald-500 bg-emerald-600 text-white';
    case 'wrong':
      return 'border-red-500 bg-red-600 text-white';
    case 'dimmed':
      return 'border-terminal-border bg-terminal-bg/50 text-terminal-muted opacity-40';
    case 'loading':
      return 'border-terminal-border bg-terminal-bg animate-pulse text-transparent';
    case 'default':
    default:
      return 'border-terminal-border bg-terminal-bg text-terminal-fg hover:border-terminal-accent/50 hover:bg-terminal-accent/5';
  }
}

export function OptionButton({
  answer,
  optionId,
  disabled,
  state,
  onSelect,
}: OptionButtonProps) {
  const isLoading = state === 'loading' || !answer;

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      aria-pressed={state === 'correct' || state === 'wrong'}
      onClick={() => onSelect(optionId)}
      className={`flex w-full items-start justify-between gap-3 rounded-lg border px-4 py-3 text-left font-mono text-sm transition ${getStateClasses(isLoading ? 'loading' : state)} disabled:cursor-not-allowed`}
    >
      <span className="min-w-0 flex-1 wrap-break-word whitespace-pre-wrap">
        {isLoading ? '\u00A0' : answer}
      </span>
      {state === 'correct' ? (
        <svg
          className="h-5 w-5 shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : null}
    </button>
  );
}
