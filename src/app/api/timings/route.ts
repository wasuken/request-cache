import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  const timings = await prisma.urlInfo.findMany();
  return NextResponse.json({ timings });
}
