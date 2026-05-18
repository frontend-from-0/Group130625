import { redirect } from 'next/navigation';

import { stripe } from '@/lib/stripe';

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{
    session_id: string;
  }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  // Use the data information to display information about purchaised products on this page.
  console.log(session.line_items?.data);

  if (session.status === 'open') {
    return redirect('/');
  }

  if (session.status === 'complete') {
    return (
      <section id='success'>
        <p>
          We appreciate your business! A confirmation email will be sent to ....
          If you have any questions, please email{' '}
          <a href='mailto:orders@example.com'>orders@example.com</a>.
        </p>
      </section>
    );
  }
}
