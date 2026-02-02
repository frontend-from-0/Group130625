'use client';

import { quotes as initialQuotes } from '@/quotes';
import {createContext, useContext, useState} from 'react';



const QuotesContex = createContext([]);
const QuotesDispatchContex = createContext(undefined);


export function QuotesProvider ({children}) {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);


  return (
    <QuotesContex.Provider value={{quotes, currentQuoteIndex}}>
      <QuotesDispatchContex.Provider value={{setQuotes, setCurrentQuoteIndex}}>
      {children}
      </QuotesDispatchContex.Provider>
    </QuotesContex.Provider>
  )
}


// custom hooks
export const useQuotes = () => useContext(QuotesContex);
export const useDispatchQuotes = () => useContext(QuotesDispatchContex);