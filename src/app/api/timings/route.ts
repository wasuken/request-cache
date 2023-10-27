import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const timings = await prisma.urlInfo.findMany();
  return NextResponse.json({ timings });
}
