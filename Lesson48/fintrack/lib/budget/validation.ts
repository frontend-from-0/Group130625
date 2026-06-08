import { z } from "zod";

import { amountLeft } from "@/lib/budget/calculations";

export const categoryAllocationSchema = z.object({
  categoryId: z.string().min(1),
  limitAmount: z.number().positive(),
});

export const createBudgetSchema = z
  .object({
    billingMonth: z.string().regex(/^\d{4}-\d{2}$/),
    totalAmount: z.number().positive(),
    allocations: z.array(categoryAllocationSchema).min(1),
  })
  .superRefine((data, ctx) => {
    const remainder = amountLeft(data.totalAmount, data.allocations);

    if (remainder !== 0) {
      ctx.addIssue({
        code: "custom",
        message: `Category allocations must equal the total budget. Amount left: ${remainder}.`,
        path: ["allocations"],
      });
    }
  });

export const createCategorySchema = z.object({
  name: z.string().trim().min(1).max(50),
  iconKey: z.string().min(1).default("bag"),
  colorToken: z.string().min(1).default("brand"),
});

export const updateCategorySchema = z.object({
  name: z.string().trim().min(1).max(50).optional(),
  limitAmount: z.number().positive().optional(),
  pendingLimitAmount: z.number().positive().optional(),
  pendingEffectiveMonth: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional(),
  applyImmediately: z.boolean().optional(),
});

export const updateBudgetSchema = z.object({
  totalAmount: z.number().positive().optional(),
});

export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
