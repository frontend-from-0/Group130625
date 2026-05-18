import { z } from "zod";

export const createProductSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Product title is required.")
    .max(120, "Product title must be 120 characters or less."),
  price: z.coerce
    .number({ error: "Price is required." })
    .positive("Price must be greater than 0."),
  images: z
    .array(z.instanceof(File))
    .min(1, "Upload at least one image.")
    .refine(
      (files) => files.every((file) => file.size > 0),
      "One or more selected files are empty.",
    )
    .refine(
      (files) => files.every((file) => file.type.startsWith("image/")),
      "All uploaded files must be images.",
    ),
});

export function getFileName(file: File, index: number): string {
  const fileExtension = file.name.includes(".")
    ? file.name.split(".").pop()?.toLowerCase()
    : undefined;
  const safeExtension = fileExtension
    ? `.${fileExtension.replace(/[^a-z0-9]/g, "")}`
    : "";
  return `products/${Date.now()}-${index}${safeExtension}`;
}
