import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: number; num: number } }
) {
  const { id, num } = params;
  const queueResults = await prisma.urlInfoQueueResult.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      urlInfo: true,
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json({ queueResults }, { status: 200 });
}
