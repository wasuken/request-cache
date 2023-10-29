import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const queues = await prisma.urlInfoQueue.findMany({
    include: {
      urlInfo: true,
    },
    take: 10,
    orderBy:{
      createdAt: 'desc',
    },
  });
  return NextResponse.json({ queues }, {status: 200});
}
