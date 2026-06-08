import { updateBudgetSchema } from "@/lib/budget/validation";
import { apiError } from "@/lib/api/schemas";
import { prisma } from "@/lib/prisma";
import { getDemoUser } from "@/lib/session";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const user = await getDemoUser();
    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateBudgetSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0]?.message ?? "Invalid update payload");
    }

    const budget = await prisma.budget.findFirst({
      where: { id, userId: user.id },
    });

    if (!budget) {
      return apiError("Budget not found", 404);
    }

    if (parsed.data.totalAmount === undefined) {
      return apiError("No supported budget fields provided");
    }

    const updated = await prisma.budget.update({
      where: { id },
      data: { totalAmount: parsed.data.totalAmount },
      include: {
        categoryBudgets: {
          include: { category: true },
        },
      },
    });

    return Response.json({ budget: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update budget";
    return apiError(message, 500);
  }
}
