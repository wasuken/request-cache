import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, _res: Response) {
  const data = await req.json();
  console.log("debug", data);
  const { title, url, description, timing } = data;
  await prisma.urlInfo.create({
    data: {
      title,
      url,
      description,
      get_timing_sec: timing,
    },
  });
  return NextResponse.json({ msg: "success" });
}
