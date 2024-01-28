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
  const msg = `${res.ok ? "OK" : "NG"}: http://localhost:3000/api/timing`;
  if (res.ok) {
    console.log(msg);
    const resj = await res.json();
    return resj.urlInfo.id;
  } else {
    console.log(msg);
    return false;
  }
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
  const msg = `${res.ok ? "OK" : "NG"}: ${BASE_URL}/timing/${id}`;
  if (res.ok) {
    console.log(msg);
  } else {
    console.error(msg);
  }
  return res.ok;
}

async function assert_200_get_fetch(url: string) {
  const res = await fetch(url);
  const msg = `${res.ok ? "OK" : "NG"}: ${url}`;
  if (res.ok) {
    console.log(msg);
  } else {
    console.error(msg);
  }
  return res.ok;
}

async function assert_get_fetch_result_paginate(
  id: string,
  url: string,
  expectResult: boolean,
) {
  const res = await fetch(url);
  const msg = `${res.ok ? "OK" : "NG"}: ${url}`;
  if (res.ok) {
    console.log(msg);
  } else {
    console.error(msg);
  }
  return res.ok;
}

// とりあえず最低限のrequestをわたして、200をかえしてくれるか確認するテスト
async function test_200() {
  // POST
  console.log("# POST test");
  const iid = await test_200_post_timing();
  if (iid) {
    const id = iid as number;
    console.log("# PUT test");
    // PUT
    const pres = await test_200_put_timing(id);
    console.log("# GET test");
    // GET
    const gres =
      (await assert_200_get_fetch(`${BASE_URL}/queues`)) &&
      (await assert_200_get_fetch(`${BASE_URL}/timings`)) &&
      (await assert_200_get_fetch(`${BASE_URL}/cron`)) &&
      (await assert_200_get_fetch(`${BASE_URL}/queues/result`)) &&
      (await assert_200_get_fetch(`${BASE_URL}/queues/result/${id}`));
    // ページングテスト
    // const pg_res = await assert_get_fetch_result_paginate(
    //   id,
    //   "${BASE_URL}/queues/result/${id}?page=1",
    // );
  } else {
    console.error("failed POST.");
  }
  console.log("================ finish ================");
}

describe("API Route Test", () => {
  it("all test", async () => {
    await clean();
    await test_200();
    await clean();
  });
});
