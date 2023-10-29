import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, _res: Response) {
  const data = await req.json();
  const { id, title, url, description, timing } = data;
  await prisma.urlInfo.update({
    where: {
      id: id as number,
    },
    data: {
      title,
      url,
      description,
      get_timing_sec: timing,
    },
  };)
  return NextResponse.json({ msg: "success" });
}
