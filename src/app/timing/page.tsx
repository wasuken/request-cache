"use client";
import InputInfoForm from "@/_components/InputInfoForm";
import TimingList from "@/_components/TimingList";
import { Timing } from "@/_const/types";
import { useState, useEffect } from "react";
import styles from "./Page.module.css";

const Page = () => {
  const [timings, setTimings] = useState<Timing[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (data) => {
    const { title, description, url, timing } = data;
    const res = await fetch(`/api/timing`, {
      method: "POST",
      body: JSON.stringify({ title, description, url, timing }),
    });
    if (res.ok) {
      const resj = await res.json();
      alert(resj.msg);
      fetchTimingList().then(() => console.log("fetched"));
    } else {
      console.error("failed", res);
    }
  };
  const onUpdate = async (
    id: number,
    title: string,
    description: string,
    url: string,
    timing: number
  ) => {
    const res = await fetch(`/api/timing/${id}`, {
      method: "PUT",
      body: JSON.stringify({ id, title, description, url, timing }),
    });
    if (res.ok) {
      const resj = await res.json();
      alert(resj.msg);
      fetchTimingList().then(() => console.log("fetched"));
    } else {
      console.error("failed", res);
    }
  };
  const fetchTimingList = async () => {
    setLoading(true);
    const res = await fetch(`/api/timings`);
    if (res.ok) {
      const resj = await res.json();
      console.log(resj);
      setTimings(resj.timings);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchTimingList().then(() => console.log("fetched"));
  }, []);

  return (
    <>
      <div>
        <a href="/">back</a>
      </div>
      <InputInfoForm handleSubmit={handleSubmit} />

      {loading ? (
        <div className={styles.loadingSpinner}></div>
      ) : (
        <TimingList
          timings={timings}
          pageTitle="TimingList"
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default Page;
