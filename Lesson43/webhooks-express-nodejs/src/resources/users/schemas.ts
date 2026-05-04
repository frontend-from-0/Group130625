import z from 'zod';

export const createUserSchema = z.object({
  email: z.email(),
  firstName: z
    .string()
    .trim()
    .min(2, 'First name should be at least 2 characters long')
    .max(50, 'First name should be maximum 50 characters long'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Last name should be at least 2 characters long')
    .max(50, 'Last name should be maximum 50 characters long'),
  address: z.object({
    line1: z
      .string()
      .trim()
      .min(2, 'Line1 name should be at least 2 characters long')
      .max(100, 'Line1 should be maximum 100 characters long'),
    city: z
      .string()
      .trim()
      .min(2, 'City name should be at least 2 characters long')
      .max(50, 'City name should be maximum 50 characters long'),
    postalCode: z
      .string()
      .trim()
      .min(5, 'Postalcode should be at least 5 characters long')
      .max(16, 'Postalcode should be maximum 16 characters long'),
    country: z
      .string()
      .trim()
      .min(2, 'Country name should be at least 2 characters long')
      .max(50, 'Country name should be maximum 50 characters long'),
  }),
});

export type IncomingUser = z.infer<typeof createUserSchema>;

export type ApiUser = {
  firstName: String;
  lastName: String;
  email: String;
  address: {
    line1: String;
    city: String;
    postalCode: String;
    country: String;
  },
  createdAt: String;
}


// TODO: add time for user param (should be the type of user in Mongo/prisma)
export function toApiUser (user): ApiUser  {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: {
      line1: user.address.line1,
      city: user.address.city,
      postalCode: user.address.postalCode,
      country: user.address.country,
    },
    createdAt: user.createdAt
  }
}
