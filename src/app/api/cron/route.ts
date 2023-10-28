import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  // const qs = await prisma.urlInfoQueue.findMany();
  // console.log(qs.map((x) => x.exec_datetime.toLocaleString()));
  // 実行可能キュー取得
  const queues = await prisma.urlInfoQueue.findMany({
    where: {
      exec_datetime: {
        lte: new Date(),
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
    const res = await fetch(queues[i].urlInfo.url);
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
        exec_datetime: new Date(),
      },
    });
    const sdt = new Date();
    sdt.setSeconds(sdt.getSeconds() + queues[i].urlInfo.get_timing_sec);
    // 実行後更新
    await prisma.urlInfoQueue.update({
      where: {
        id: queues[i].id,
      },
      data: {
        exec_datetime: sdt,
      },
    });
  }

  return NextResponse.json({ msg: "success" });
}
