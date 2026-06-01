'use client';

export function FlashcardSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="h-6 w-3/4 animate-pulse rounded bg-terminal-border" />
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-12 animate-pulse rounded-lg bg-terminal-border/80"
          />
        ))}
      </div>
    </div>
  );
}
