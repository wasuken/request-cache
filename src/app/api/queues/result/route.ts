import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const queueResults = await prisma.urlInfoQueueResult.findMany({
    include: {
      urlInfo: true,
    },
    take: 10,
  });
  return NextResponse.json({ queueResults });
}
