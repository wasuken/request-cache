"use client";
import QueueList from "@/_components/QueueList";
import QueueResultList from "@/_components/QueueResultList";
import { Queue, QueueResult } from "@/_const/types";
import { useState, useEffect } from "react";

const Page = () => {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [queueResults, setQueueResults] = useState<QueueResult[]>([]);
  const fetchQueueList = async () => {
    const res = await fetch(`/api/queues`);
    if (res.ok) {
      const resj = await res.json();
      console.log(resj);
      setQueues(
        resj.queues.map((x) => {
          return {
            ...x,
            exec_datetime: new Date(x.exec_datetime),
          };
        })
      );
    }
  };
  const fetchQueueResultList = async () => {
    const res = await fetch(`/api/queues/result`);
    if (res.ok) {
      const resj = await res.json();
      console.log(resj);
      setQueueResults(
        resj.queueResults.map((x) => {
          return {
            ...x,
            exec_datetime: new Date(x.exec_datetime),
          };
        })
      );
    }
  };
  useEffect(() => {
    fetchQueueList().then(() => console.log("fetched queue list."));
    fetchQueueResultList().then(() => console.log("fetched queueResult list."));
  }, []);

  return (
    <>
      <div>
        <a href="/">back</a>
      </div>
      <QueueList queues={queues} title="QueueList" />
      <QueueResultList queueResults={queueResults} title="QueueResultList" />
    </>
  );
};

export default Page;
