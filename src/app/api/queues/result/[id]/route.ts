import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: number } },
) {
  const { id } = params;
  const ipage = parseInt(req.nextUrl.searchParams.get("page") || 1) - 1;
  const ilimit = parseInt(req.nextUrl.searchParams.get("limit") || 10);
  const take = ilimit;
  const skip = ilimit * ipage;
  const where = {
    urlInfo: {
      id: parseInt(id),
    },
  };
  const total = await prisma.urlInfoQueueResult.count({ where });
  const totalPage = Math.ceil(total / ilimit);
  if (ipage > totalPage || ipage < 0) {
    let msg = "";
    if (ipage > totalPage) {
      msg = `invalid parameters: page(${ipage + 1}) > totalPage(${totalPage}).`;
    } else {
      msg = `invalid parameters: page(${ipage + 1}) < 1.`;
    }
    return NextResponse.json(
      {
        errorMessage: msg,
      },
      { status: 400 },
    );
  }
  if (ilimit < 1 || ilimit > 10) {
    let msg = "";
    if (ilimit < 1) {
      msg = `invalid parameters: invalid parameters: limit(${ilimit}) < 1.`;
    } else {
      msg = `invalid parameters: invalid parameters: limit(${ilimit}) > 10.`;
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
    take,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(
    { queueResults, totalPage, total, skip, take, ipage, ilimit },
    { status: 200 },
  );
}
