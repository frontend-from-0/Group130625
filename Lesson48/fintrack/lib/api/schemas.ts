export { createBudgetSchema, createCategorySchema, updateCategorySchema } from "@/lib/budget/validation";

export function apiError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}
