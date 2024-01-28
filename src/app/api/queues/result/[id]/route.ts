import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: number } },
) {
  const { id, page = "1", ppage = "10" } = params;
  const ipage = parseInt(page);
  const ippage = parseInt(ppage);
  const skip = ipage * (ipage - 1);
  const where = {
    urlInfo: {
      id: parseInt(id),
    },
  };
  const total = await prisma.urlInfoQueueResult.count({ where });
  const totalPage = Math.ceil(total / ippage);
  if (ipage > totalPage) {
    return NextResponse.json(
      {
        errorMessage: `invalid parameters: page(${page}) > totalPage(${totalPage}).`,
      },
      { status: 400 },
    );
  }
  if (ippage < 1 || ippage > 10) {
    let msg = "";
    if (ippage < 1) {
      msg = `invalid parameters: invalid parameters: ppage < 1.`;
    } else {
      msg = `invalid parameters: invalid parameters: ppage > 10.`;
    }
    return NextResponse.json(
      {
        errorMessage: msg,
      },
      { status: 400 },
    );
  }
  const queueResults = await prisma.urlInfoQueueResult.findMany({
    where,
    include: {
      urlInfo: true,
    },
    take: ippage,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json({ queueResults, totalPage, total }, { status: 200 });
}
