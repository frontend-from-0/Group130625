'use server';

import { put as putToBlob } from '@vercel/blob';
import { z } from 'zod';
import type { CreateProductFormState } from '@/app/admin/products/new/form-state';
import { getAdmin } from '@/lib/authz';
import { createProduct } from '@/services/products/data';

const createProductSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Product title is required.')
    .max(120, 'Product title must be 120 characters or less.'),
  price: z.coerce
    .number({ error: 'Price is required.' })
    .positive('Price must be greater than 0.'),
  images: z
    .array(z.instanceof(File))
    .min(1, 'Upload at least one image.')
    .refine(
      (files) => files.every((file) => file.size > 0),
      'One or more selected files are empty.',
    )
    .refine(
      (files) => files.every((file) => file.type.startsWith('image/')),
      'All uploaded files must be images.',
    ),
});

function getFileName(file: File, index: number): string {
  const fileExtension = file.name.includes('.')
    ? file.name.split('.').pop()?.toLowerCase()
    : undefined;
  const safeExtension = fileExtension
    ? `.${fileExtension.replace(/[^a-z0-9]/g, '')}`
    : '';
  return `products/${Date.now()}-${index}${safeExtension}`;
}

export async function createProductAction(
  _prevState: CreateProductFormState,
  formData: FormData,
): Promise<CreateProductFormState> {
  const maybeUser = await getAdmin();
  if (!maybeUser) return ({
      status: 'error',
      message: 'Only admin user is allowed to create a new product.',
      fieldErrors: {}
    });

  const files = formData
    .getAll('images')
    .filter((entry): entry is File => entry instanceof File);
  const parsed = createProductSchema.safeParse({
    title: formData.get('title'),
    price: formData.get('price'),
    images: files,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      status: 'error',
      message: 'Please fix the errors below.',
      fieldErrors: {
        title: errors.title?.[0],
        price: errors.price?.[0],
        images: errors.images?.[0],
      },
    };
  }

  try {
    const uploaded = await Promise.all(
      parsed.data.images.map((file, index) => {
        const filename = getFileName(file, index);
        putToBlob(filename, file, {
          access: 'public',
          addRandomSuffix: true,
        });
      }),
    );
    // TODO: Call stripe here to create a product and price, then add price and product id to the product that we store in Mongo

    await createProduct({title: parsed.data.title, price: parsed.data.price, images: uploaded.map((item) => item.url)});

    return {
      status: 'success',
      message: 'Product created successfully.',
      fieldErrors: {},
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('createProductAction failed:', errorMessage);
    return {
      status: 'error',
      message: `Could not create product. ${errorMessage}`,
      fieldErrors: {},
    };
  }
}
