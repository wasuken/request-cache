// tests/api.test.ts
import { PrismaClient } from "@prisma/client";

const BASE_URL = "http://localhost:3000/api";

const prisma = new PrismaClient();

export async function clean() {
  await prisma.urlInfoQueueResult.deleteMany({});
  await prisma.urlInfoQueue.deleteMany({});
  await prisma.urlInfo.deleteMany({});
}

async function test_200_post_timing() {
  const title = "test";
  const description = "test desc";
  const timing = 3000;
  const url = "http://localhost:3000";
  const res = await fetch(`${BASE_URL}/timing`, {
    method: "POST",
    body: JSON.stringify({ title, description, url, timing }),
  });
  if (res.ok) {
    const resj = await res.json();
    return resj.urlInfo.id;
  }
  return false;
}

async function test_200_put_timing(id: number) {
  const title = "test edit";
  const description = "test desc edit";
  const timing = 3000;
  const url = "http://localhost:3000/edit";
  const res = await fetch(`${BASE_URL}/timing/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, title, description, url, timing }),
  });
  return res.ok;
}

// とりあえず最低限のrequestをわたして、200をかえしてくれるか確認するテスト
async function test_200() {
  // POST
  const iid = await test_200_post_timing();
  expect(iid).toBeTruthy();
  if (iid) {
    const id = iid as number;
    // PUT
    expect(await test_200_put_timing(id)).toBeTruthy();
    // GET
    expect((await fetch(`${BASE_URL}/queues`)).ok).toBeTruthy();
    expect((await fetch(`${BASE_URL}/timings`)).ok).toBeTruthy();
    expect((await fetch(`${BASE_URL}/cron`)).ok).toBeTruthy();
    expect((await fetch(`${BASE_URL}/queues/result`)).ok).toBeTruthy();
    expect((await fetch(`${BASE_URL}/queues/result/${id}`)).ok).toBeTruthy();
    // ページングテスト
    // const pg_res = await assert_get_fetch_result_paginate(
    //   id,
    //   "${BASE_URL}/queues/result/${id}?page=1",
    // );
  } else {
    console.error("failed POST.");
  }
}

describe("API Route Test", () => {
  it("all 200 test", async () => {
    await clean();
    await test_200();
    await clean();
  });
});
