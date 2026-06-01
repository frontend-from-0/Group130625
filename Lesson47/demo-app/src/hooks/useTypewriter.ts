'use client';

import { useEffect, useState } from 'react';

export function useTypewriter(text: string | undefined, active: boolean): string {
  const target = text ?? '';
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCharIndex((index) => {
        if (index >= target.length) {
          return index;
        }
        return index + 1;
      });
    }, 18);

    return () => window.clearInterval(intervalId);
  }, [active, target]);

  if (!active) {
    return target;
  }

  if (charIndex === 0 && target.length > 0) {
    return target.slice(0, 1);
  }

  return target.slice(0, charIndex);
}
