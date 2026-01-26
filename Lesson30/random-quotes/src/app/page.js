'use client';

import { quotes } from '@/quotes';
import { useState } from 'react';
import { getRandomNumber } from '@/utils';
import { Card } from '@/components/Card';
import { Title } from '@/components/Title';
import { Body2 } from '@/components/Body2';
import { Button } from '@/components/Button';

export default function Home() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(2);

  function handleNextQuote() {
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    if (nextIndex === currentQuoteIndex) {
      handleNextQuote();
    } else {
      setCurrentQuoteIndex(nextIndex);
    }
  }

  return (
    // JSX
    <main className='min-h-dvh flex items-center justify-center'>
      <Card>
        <Title>{quotes[currentQuoteIndex].quote}</Title>
        <Body2 align='right' style='italic' element='span'>
          by {quotes[currentQuoteIndex].author}
        </Body2>
        <div className='self-end'>
          <Button onClick={handleNextQuote}>Next quote</Button>
        </div>
      </Card>
    </main>
  );
}
