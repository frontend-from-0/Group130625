import { NextRequest, NextResponse } from 'next/server';
// import { headers } from 'next/headers';

import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    // If you only want to allow logged in users to buy items on your website, make sure to add user validation here and return 401 error if the user is not logged in. From the user retention perspective, in real life it's better to allow any user to do the purchase, and just create an account for them in the background. Any friction in the purcase journey would cause loss of income for the company.

    const headersList = await headers();
    const origin = headersList.get('origin');

    const formData = await req.formData();
    // TODO: use zod to validate form data and ensure that price id is a string indeed
    const price = formData.get('price_id') as string;

    if (typeof price !== 'string' ||  price.trim().length < 1) {
      return NextResponse.json(
      { error: `Incorrect price id provided, price id: ${price}` },
      { status:  400},
    );
    }
    console.log(formData, price);


    // Get form data

    console.log('Called checkout route!');

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: price,
          // Provide correct product quantity that user selected
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      // If the user cancels the purchaise on the Stripe end, you can get user back on the page of your choice, you can specify it as cancel_url parameter below.
      cancel_url: `${origin}/?canceled=true`,
    });

    if (session.url) {
      return NextResponse.redirect(session.url, 303);
    } else {
      return NextResponse.json(
        { error: 'Session URL is null' },
        { status: 500 },
      );
    }
    
  } catch (err) {
    let message = 'An unknown error occurred';
    let statusCode = 500;
    if (err && typeof err === 'object' && 'message' in err) {
      message = (err as { message: string }).message;
    }
    if (err && typeof err === 'object' && 'statusCode' in err) {
      statusCode = (err as { statusCode: number }).statusCode || 500;
    }
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
