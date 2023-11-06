"use client";
import QueueList from "@/_components/QueueList";
import QueueResultList from "@/_components/QueueResultList";
import {
  Queue,
  QueueResult,
} from "@/_const/types";
import { useState, useEffect } from "react";
import styles from "./Page.module.css";
import { useSearchParams } from "next/navigation";


const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id")
  const [queues, setQueues] = useState<Queue[]>([]);
  const [queueLoading, setQueueLoading] = useState<boolean>(false);
  const fetchQueueList = async () => {
    setQueueLoading(true);
    const res = await fetch(`/api/queues?id=${id}`);
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
  useEffect(() => {
    fetchQueueList().then(() => console.log("fetched queue list."));
  }, []);

  return (
    <>
      <div>
	<a href="/">back</a>
      </div>
      {queueLoading ? (
	<div className={styles.loadingSpinner}></div>
      ) : (
	<QueueList queues={queues} title={`QueueList[id=${id}]`} />
      )}
    </>
  );
};

export default Page;
