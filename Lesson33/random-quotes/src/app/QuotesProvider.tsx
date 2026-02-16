'use client';

import { quotes as initialQuotes } from '@/quotes';
import { createContext, useContext, useState } from 'react';
import { Quote } from '@/types/quotes';

interface QuotesContexInterface {
  quotes: Quote[];
  currentQuoteIndex: number;
}

const QuotesContex = createContext<QuotesContexInterface>({
  quotes: [],
  currentQuoteIndex: 0,
});
const QuotesDispatchContex = createContext(undefined);

export function QuotesProvider({ children }) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);

  return (
    <QuotesContex.Provider value={{ quotes, currentQuoteIndex }}>
      <QuotesDispatchContex.Provider
        value={{ setQuotes, setCurrentQuoteIndex }}
      >
        {children}
      </QuotesDispatchContex.Provider>
    </QuotesContex.Provider>
  );
}

// custom hooks
export const useQuotes = () => useContext(QuotesContex);
export const useDispatchQuotes = () => useContext(QuotesDispatchContex);
