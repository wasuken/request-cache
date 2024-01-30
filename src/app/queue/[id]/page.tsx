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
  const [total, setTotal] = useState<number>(0);
  const [queueResultLoading, setQueueResultLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const fetchQueueResultList = async (p: number) => {
    setQueueResultLoading(true);
    setPage(p);
    const res = await fetch(`/api/queues/result/${id}?page=${p}`);
    if (res.ok) {
      const resj = await res.json();
      setTotal(resj.total);
      setQueueResults(
        resj.queueResults.map((x: QueueResultAPIResult) => {
          return {
            ...x,
            exec_datetime: new Date(x.exec_datetime),
          };
        }),
      );
    }
    setQueueResultLoading(false);
  };
  const paginate = (pageNumber: number) => {
    fetchQueueResultList(pageNumber).then(() =>
      console.log("fetched queue list."),
    );
  };
  useEffect(() => {
    fetchQueueResultList(1).then(() => console.log("fetched queue list."));
  }, []);

  return (
    <>
      <div>
        <a href="/queue">back</a>
      </div>
      <div>total: {total}</div>
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
