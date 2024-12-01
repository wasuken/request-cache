import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { queryResultValidate } from "@/_const/validate"

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
  const { isValid, msgs } = queryResultValidate(ipage, ilimit, totalPage);
  if (isValid) {
    return NextResponse.json(
      {
        errorMessage: msgs,
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
