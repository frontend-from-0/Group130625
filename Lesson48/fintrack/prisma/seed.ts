import { PrismaClient, TransactionDirection } from "@prisma/client";

const prisma = new PrismaClient();

const DEMO_USER_EMAIL = "parzival@fintrack.demo";

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.categoryBudget.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: "Parzival",
      email: DEMO_USER_EMAIL,
      account: {
        create: {
          balance: 18987.67,
          currency: "USD",
        },
      },
    },
  });

  const categories = await Promise.all(
    [
      { name: "General", iconKey: "graph", colorToken: "violet", isSystemDefault: true },
      {
        name: "Transportation",
        iconKey: "truck",
        colorToken: "blue",
        isSystemDefault: true,
      },
      { name: "Charity", iconKey: "heart", colorToken: "rose", isSystemDefault: true },
    ].map((category) =>
      prisma.category.create({
        data: {
          userId: user.id,
          ...category,
        },
      }),
    ),
  );

  const [general, transportation, charity] = categories;

  const now = new Date();

  await prisma.transaction.createMany({
    data: [
      {
        userId: user.id,
        categoryId: general.id,
        merchantName: "Fitness first",
        amount: 50,
        direction: TransactionDirection.OUTFLOW,
        occurredAt: now,
      },
      {
        userId: user.id,
        categoryId: transportation.id,
        merchantName: "Transfer wise",
        amount: 50,
        direction: TransactionDirection.INFLOW,
        occurredAt: now,
      },
      {
        userId: user.id,
        categoryId: transportation.id,
        merchantName: "Transfer wise",
        amount: 50,
        direction: TransactionDirection.INFLOW,
        occurredAt: now,
      },
      {
        userId: user.id,
        categoryId: charity.id,
        merchantName: "Transfer wise",
        amount: 500,
        direction: TransactionDirection.OUTFLOW,
        occurredAt: now,
      },
    ],
  });

  console.log("Seeded demo user:", user.email);
  console.log("Balance: $18,987.67 USD");
  console.log("Categories:", categories.map((c) => c.name).join(", "));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
