import { apiError } from "@/lib/api/schemas";
import { prisma } from "@/lib/prisma";
import { getDemoUser } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const user = await getDemoUser();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Number.parseInt(limitParam, 10) : undefined;

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        ...(categoryId ? { categoryId } : {}),
      },
      orderBy: { occurredAt: "desc" },
      ...(limit ? { take: limit } : {}),
      include: { category: true },
    });

    return Response.json({ transactions });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load transactions";
    return apiError(message, 500);
  }
}
