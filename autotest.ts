import { clean } from "./clean";

async function test_200_post_timing() {
  const title = "test";
  const description = "test desc";
  const url = "http://localhost:3000";
  const timing = 3000;
  const res = await fetch(`http://localhost:3000/api/timing`, {
    method: "POST",
    body: JSON.stringify({ title, description, url, timing }),
  });
  const msg = `${res.ok ? "OK":"NG"}: http://localhost:3000/api/timing`
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
  const url = "http://localhost:3000";
  const timing = 3000;
  const res = await fetch(`http://localhost:3000/api/timing/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, title, description, url, timing }),
  });
  const msg = `${res.ok ? "OK":"NG"}: http://localhost:3000/api/timing/${id}`
  if (res.ok) {
    console.log(msg);
  } else {
    console.error(msg);
  }
  return res.ok;
}

async function assert_200_get_fetch(url: string) {
  const res = await fetch(url);
  const msg = `${res.ok ? "OK":"NG"}: ${url}`
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
      (await assert_200_get_fetch(`http://localhost:3000/api/queues`)) &&
      (await assert_200_get_fetch(`http://localhost:3000/api/timings`)) &&
      (await assert_200_get_fetch(`http://localhost:3000/api/cron`)) &&
      (await assert_200_get_fetch(`http://localhost:3000/api/queues/result`)) &&
      (await assert_200_get_fetch(
	`http://localhost:3000/api/queues/result/${id}`
      ));
  } else {
    console.error("failed POST.");
  }
  console.log("================ finish ================");
}

async function run(){
  await test_200();
  await clean();
}


run().then(() => console.log("finished db clean."));
