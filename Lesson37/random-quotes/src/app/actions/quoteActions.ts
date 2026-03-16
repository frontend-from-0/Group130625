'use server';

import { NewQuoteFormState } from '@/app/user/quotes/new/page';
import { NewQuoteSchema } from '@/schemas/quotes';
import { Quote } from '@/types/quotes';
import { createQuote } from '../services/quotes';

export async function addQuote(
  currentState: NewQuoteFormState,
  formData: FormData,
): Promise<NewQuoteFormState> {
  const rawData = {
    author: formData.get('author') ?? '',
    quote: formData.get('quote') ?? '',
  };

  const result = NewQuoteSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      data: { ...(rawData as Partial<Quote>) },
    };
  }
  
  try {
    await createQuote(result.data);
    return {
      success: true,
      data: result.data,
    };
  } catch (err) {
    console.error('An error occured when saving a new quote to database');
    return {
      success: false,
      message: 'An error occured when saving the quote, try again later.',
      data: result.data,
    };
  }
}
