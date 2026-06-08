import { prisma } from "@/lib/prisma";

export const DEMO_USER_EMAIL = "parzival@fintrack.demo";

export async function getDemoUser() {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    include: { account: true },
  });

  if (!user) {
    throw new Error(
      "Demo user not found. Run `npm run db:push` and `npm run db:seed` first.",
    );
  }

  return user;
}
