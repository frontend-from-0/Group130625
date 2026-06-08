import { updateCategorySchema } from "@/lib/budget/validation";
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
    const parsed = updateCategorySchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0]?.message ?? "Invalid category update");
    }

    const existing = await prisma.category.findFirst({
      where: { id, userId: user.id },
    });

    if (!existing) {
      return apiError("Category not found", 404);
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: parsed.data.name,
      },
    });

    return Response.json({ category });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update category";
    return apiError(message, 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const user = await getDemoUser();
    const { id } = await context.params;

    const existing = await prisma.category.findFirst({
      where: { id, userId: user.id },
    });

    if (!existing) {
      return apiError("Category not found", 404);
    }

    await prisma.category.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete category";
    return apiError(message, 500);
  }
}
