import z from 'zod';

export const NewQuoteSchema = z.object({
  author: z.string().trim().min(2, { message: 'Author name must be at least 2 characters.' }).max(50),
  quote: z.string().trim().min(2).max(300),
});