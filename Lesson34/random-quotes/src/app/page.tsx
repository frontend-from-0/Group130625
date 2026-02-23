'use client';

import { getRandomNumber } from '@/utils';
import { Card } from '@/components/Card';
import { TypographyH1 } from '@/components/ui/h1';
import { Body2 } from '@/components/Body2';
import { Button } from '@/components/Button';
import {useQuotes, useDispatchQuotes} from '@/app/QuotesProvider';

export default function Home() {
  const {quotes, currentQuoteIndex} = useQuotes();
  const {setQuotes, setCurrentQuoteIndex} = useDispatchQuotes();
  

  function handleNextQuote() {
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    if (nextIndex === currentQuoteIndex) {
      handleNextQuote();
    } else {
      setCurrentQuoteIndex(nextIndex);
    }
  }

  function handleLike() {
    const currentQuote = quotes[currentQuoteIndex];

    setQuotes((prevQuotes) =>
      prevQuotes.map((quoteObject) => {
        if (quoteObject.quote === currentQuote.quote) {
          return { ...quoteObject, likedBy: quoteObject.likedBy + 1 };
        } else {
          return quoteObject;
        }
      }),
    );
  }

  return (
    // JSX
    <main className='min-h-dvh flex items-center justify-center'>
      <Card>
        <div className='self-end'>
          <Button onClick={handleLike} variant='ghost'>❤️ {quotes[currentQuoteIndex].likedBy}</Button>
        </div>
        
        <TypographyH1>{quotes[currentQuoteIndex].quote}</TypographyH1>
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
