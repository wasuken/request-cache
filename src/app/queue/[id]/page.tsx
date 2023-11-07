"use client";
import QueueList from "@/_components/QueueList";
import QueueResultList from "@/_components/QueueResultList";
import { Queue, QueueResult } from "@/_const/types";
import { useState, useEffect } from "react";
import styles from "./Page.module.css";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const [queueResults, setQueueResults] = useState<QueueResult[]>([]);
  const [queueResultLoading, setQueueResultLoading] = useState<boolean>(false);
  const fetchQueueResultList = async () => {
    setQueueResultLoading(true);
    const res = await fetch(`/api/queues/result/${id}`);
    if (res.ok) {
      const resj = await res.json();
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
    fetchQueueResultList().then(() => console.log("fetched queue list."));
  }, []);

  return (
    <>
      <div>
        <a href="/">back</a>
      </div>
      {queueResultLoading ? (
        <div className={styles.loadingSpinner}></div>
      ) : (
        <QueueResultList queueResults={queueResults} title="QueueResultList" />
      )}
    </>
  );
};

export default Page;
