'use client';

import { Title } from '@/components/Title';
import { Card } from '@/components/Card';
import { Body2 } from '@/components/Body2';
import {useQuotes} from '@/app/QuotesProvider';

export default function UserQuotes() {
  const { quotes } = useQuotes();

  const likedQuotes = quotes.filter((quote) => quote.likedBy > 0);

  return (
    <main className='min-h-dvh mt-16 mx-auto text-center'>
      <Title>Liked quotes</Title>
      <div className='flex flex-col items-center mt-10 gap-4'>
        {likedQuotes.length > 0 ? (
          likedQuotes.map((quoteObject) => (
            <Card key={quoteObject.quote}>
              <Title>{quoteObject.quote}</Title>
              <Body2 align='right' style='italic' element='span'>
                by {quoteObject.author}
              </Body2>
            </Card>
          ))
        ) : (
          <Body2 element='p'>No quotes were liked yet</Body2>
        )}
      </div>
    </main>
  );
}
