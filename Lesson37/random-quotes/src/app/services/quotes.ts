import { auth0 } from '@/lib/auth0';
import { Collections, getDb } from '@/lib/mongo';
import { NewQuoteInput, Quote } from '@/types/quotes';

export async function createQuote(quote: NewQuoteInput): Promise<Quote> {
  const session = await auth0.getSession();
  const user = session?.user;

  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const now = new Date();

  const doc = {
    likedBy: 0,
    createdAt: now,
    updatedAt: now,
    userId: user.sub,
    ...quote
  }

  
  const newQuote = await col.insertOne(doc);
  return ({quote: newQuote.quote, author: newQuote.author, likedBy: newQuote.likedBy});
}