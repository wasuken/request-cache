import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import dayjs from "dayjs";

// プラグインが必要
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const prisma = new PrismaClient();

export async function POST(req: Request, _res: Response) {
  const data = await req.json();
  const { title, url, description, timing } = data;
  const info = await prisma.urlInfo.create({
    data: {
      title,
      url,
      description,
      get_timing_sec: timing,
    },
  });
  const iTiming = parseInt(timing);
  const edt = dayjs().add(iTiming, "s");
  const urlInfo = await prisma.urlInfoQueue.create({
    data: {
      urlInfoId: info.id,
      exec_datetime: edt.toDate(),
    },
  });
  return NextResponse.json({ msg: "success", urlInfo });
}
