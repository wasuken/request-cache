import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import dayjs from "dayjs";

// プラグインが必要
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const prisma = new PrismaClient();

export async function GET() {
  // const qs = await prisma.urlInfoQueue.findMany();
  // console.log(
  //   qs.map((x) => dayjs(x.exec_datetime).format("YYYY-MM-DD H:mm:ss"))
  // );
  // 実行可能キュー取得
  const queues = await prisma.urlInfoQueue.findMany({
    where: {
      exec_datetime: {
        lte: dayjs().toDate(),
      },
    },
    include: {
      urlInfo: true,
    },
  });
  // console.log("debug", new Date().toLocaleString());
  // console.log("debug", queues);
  for (let i = 0; i < queues.length; i++) {
    // web page取得
    const res = await fetch(queues[i].urlInfo.url, {
      headers: {
        "Cache-Control": "no-cache",
      },
      next: { revalidate: 1 },
    });
    let text = "";
    if (res.ok) {
      text = await res.text();
    }
    // 実行結果挿入
    await prisma.urlInfoQueueResult.create({
      data: {
        response: text,
        result: res.ok,
        urlInfoId: queues[i].urlInfoId,
        exec_datetime: dayjs().toDate(),
      },
    });
    const sdt = dayjs().add(queues[i].urlInfo.get_timing_sec, "s");
    // 実行後更新
    await prisma.urlInfoQueue.update({
      where: {
        id: queues[i].id,
      },
      data: {
        exec_datetime: sdt.toDate(),
      },
    });
  }

  return NextResponse.json({
    msg: "success",
  });
}
