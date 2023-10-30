"use client";
import QueueList from "@/_components/QueueList";
import QueueResultList from "@/_components/QueueResultList";
import {
  Queue,
  QueueResult,
  QueueAPIResult,
  QueueResultAPIResult,
} from "@/_const/types";
import { useState, useEffect } from "react";
import styles from "./Page.module.css";

const Page = () => {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [queueResults, setQueueResults] = useState<QueueResult[]>([]);
  const [queueLoading, setQueueLoading] = useState<boolean>(false);
  const [queueResultLoading, setQueueResultLoading] = useState<boolean>(false);
  const fetchQueueList = async () => {
    setQueueLoading(true);
    const res = await fetch(`/api/queues`);
    if (res.ok) {
      const resj = await res.json();
      setQueues(
        resj.queues.map((x: QueueResult) => {
          return {
            ...x,
            exec_datetime: new Date(x.exec_datetime),
          };
        })
      );
    }
    setQueueLoading(false);
  };
  const fetchQueueResultList = async () => {
    setQueueResultLoading(true);
    const res = await fetch(`/api/queues/result`);
    if (res.ok) {
      const resj = await res.json();
      console.log(resj);
      setQueueResults(
        resj.queueResults.map((x: QueueResultAPIResult) => {
          return {
            ...x,
            exec_datetime: new Date(x.exec_datetime),
          };
        })
      );
    }
    setQueueResultLoading(false);
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
      {queueLoading ? (
        <div className={styles.loadingSpinner}></div>
      ) : (
        <QueueList queues={queues} title="QueueList" />
      )}
      {queueResultLoading ? (
        <div className={styles.loadingSpinner}></div>
      ) : (
        <QueueResultList queueResults={queueResults} title="QueueResultList" />
      )}
    </>
  );
};

export default Page;
