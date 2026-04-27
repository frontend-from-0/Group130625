import Stripe from 'stripe';
import './env';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');
export const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET;