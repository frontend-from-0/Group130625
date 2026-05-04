import { PrismaClient } from "../../generated/prisma/client";
import './env';

const prisma = new PrismaClient();

export { prisma };