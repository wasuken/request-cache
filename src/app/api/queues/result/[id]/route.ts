import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function validate(ipage: number, ilimit: number, totalPage: number) {
  let msgs = [];
  if (ipage > totalPage || ipage < 0) {
    if (ipage > totalPage) {
      msgs.push(
        `invalid parameters: page(${ipage + 1}) > totalPage(${totalPage}).`,
      );
    } else {
      msgs.push(`invalid parameters: page(${ipage + 1}) < 1.`);
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
      msgs.push(
        `invalid parameters: invalid parameters: limit(${ilimit}) < 1.`,
      );
    } else {
      msgs.push(
        `invalid parameters: invalid parameters: limit(${ilimit}) > 10.`,
      );
    }
  }
  return {
    isValid: msgs.length > 0,
    msgs,
  };
}

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
  const { isValid, msgs } = validate(ipage, ilimit, totalPage);
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
