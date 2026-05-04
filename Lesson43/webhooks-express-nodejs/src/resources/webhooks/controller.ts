import { Request, Response, NextFunction } from 'express'
import {STRIPE_ENDPOINT_SECRET, stripe} from '../../common/stripe'

const receiveUpdates = async (request: Request, response: Response, next: NextFunction) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (STRIPE_ENDPOINT_SECRET) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];


    if (!signature) {
      console.error('Stripe signature is missing from the request');
      return response.sendStatus(400);
    }

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        STRIPE_ENDPOINT_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    // charge.succeeded, payment_intent.succeeded, payment_intent.created, checkout.session.completed
    case 'checkout.session.completed':
      const eventData = event.data.object;
      console.log(`Event data`);
      console.log(eventData);
      // Call retrieve checkout session's line itemsfrom stripe (by checkout session eventData.id) https://docs.stripe.com/api/checkout/sessions/line_items => information about what was purchased
      // You can send an email to the customer by using information from eventData.customer_details (email, name etc.)

      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'checkout.session.expired':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
}


  


export default {
  receiveUpdates
}
