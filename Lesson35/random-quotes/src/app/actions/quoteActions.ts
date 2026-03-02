'use server';

import { NewQuoteFormState } from '@/app/user/quotes/new/page';
import { Quote } from '@/types/quotes';
import z from 'zod';

const NewQuoteSchema = z.object({
  author: z.string().trim().min(2, { message: 'Author name must be at least 2 characters.' }).max(50),
  quote: z.string().trim().min(2).max(300),
});

export async function addQuote(
  currentState: NewQuoteFormState,
  formData: FormData,
): Promise<NewQuoteFormState> {
  console.log('Form data');
  console.log(formData.get('author'));
  console.log(formData.get('quote'));

  const rawData = {
    author: formData.get('author') ?? '',
    quote: formData.get('quote') ?? '',
  };

  const result = NewQuoteSchema.safeParse(rawData);
  console.log('result', result);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      data: {...rawData as Partial<Quote>}
    }
  }

  // data validation
  // store in DB (next lesson)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
      });
    }, 2000);
  });
}
