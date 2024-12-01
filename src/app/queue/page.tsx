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
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const paginate = (pageNumber: number) => {
    fetchQueueResultList(pageNumber).then(() =>
      console.log("fetched queue list."),
    );
  };
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
  const fetchQueueResultList = async (p: number) => {
    setQueueResultLoading(true);
    setPage(p);
    const res = await fetch(`/api/queues/result?page=${page}`);
    if (res.ok) {
      const resj = await res.json();
      setTotal(resj.total);
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
        <QueueResultList
          queueResults={queueResults}
          title="QueueResultList"
          paginate={paginate}
          resultsPerPage={10}
          totalResults={total}
          curPage={page}
        />
      )}
    </>
  );
};

export default Page;
