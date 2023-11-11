import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function clean() {
  await prisma.urlInfoQueueResult.deleteMany({});
  await prisma.urlInfoQueue.deleteMany({});
  await prisma.urlInfo.deleteMany({});
}
