import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }) {
  const id = params.id;
  const queueResults = await prisma.urlInfoQueueResult.findMany({
    where: {
      id: id,
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  if (queueResults.length > 0) {
    return NextResponse.json({ queueResults }, { status: 200 });
  } else {
    return NextResponse.json({ msg: "no queueResults" }, { status: 400 });
  }
}
