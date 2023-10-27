"use client";
import InputInfoForm from "@/_components/InputInfoForm";
import TimingList from "@/_components/TimingList";
import { Timing } from "@/_const/types";
import { useState, useEffect } from "react";

const Page = () => {
  const [timings, setTimings] = useState<Timing[]>([]);
  const handleSubmit = async (
    title: string,
    description: string,
    url: string,
    timing: number
  ) => {
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
  const fetchTimingList = async () => {
    const res = await fetch(`/api/timings`);
    if (res.ok) {
      const resj = await res.json();
      console.log(resj);
      setTimings(resj.timings);
    }
  };
  useEffect(() => {
    fetchTimingList().then(() => console.log("fetched"));
  }, []);

  return (
    <>
      <InputInfoForm handleSubmit={handleSubmit} />
      <TimingList timings={timings} />
    </>
  );
};

export default Page;
