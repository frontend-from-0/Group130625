import { createCategorySchema } from "@/lib/api/schemas";
import { apiError } from "@/lib/api/schemas";
import { prisma } from "@/lib/prisma";
import { getDemoUser } from "@/lib/session";

export async function GET() {
  try {
    const user = await getDemoUser();
    const categories = await prisma.category.findMany({
      where: { userId: user.id },
      orderBy: { name: "asc" },
    });

    return Response.json({ categories });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load categories";
    return apiError(message, 500);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getDemoUser();
    const body = await request.json();
    const parsed = createCategorySchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0]?.message ?? "Invalid category payload");
    }

    const category = await prisma.category.create({
      data: {
        userId: user.id,
        name: parsed.data.name,
        iconKey: parsed.data.iconKey,
        colorToken: parsed.data.colorToken,
        isSystemDefault: false,
      },
    });

    return Response.json({ category }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create category";
    return apiError(message, 500);
  }
}
