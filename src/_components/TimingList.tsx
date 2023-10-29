"use client";
// TimingList.tsx
import React, { useState } from "react";
import styles from "./TimingList.module.css";
import { Timing } from "@/_const/types";

interface IProps {
  pageTitle: string;
  timings: Timing[];
  onUpdate: (
    id: number,
    title: string,
    description: string,
    url: string,
    timing: number
  ) => Promise<void>;
}

const TimingList: React.FC<IProps> = ({
  timings,
  pageTitle,
  onUpdate,
}: IProps) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [timing, setTiming] = useState<number>(300);
  const handleEditClick = (i: number) => {
    setEditIndex(i);
    const tm: Timing = timings[i];
    setTitle(tm.title);
    setDescription(tm.description);
    setUrl(tm.url);
    setTiming(tm.get_timing_sec);
  };
  const endEdit = async () => {
    const tm: Timing = timings[editIndex];
    await onUpdate(tm.id, title, description, url, timing);
    setEditIndex(null);
  };
  const cancelEdit = () => {
    setEditIndex(null);
  };
  return (
    <div className={styles.timingList}>
      <h2 className={styles.title}>{pageTitle}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>説明</th>
            <th>URL</th>
            <th>取得タイミング（秒）</th>
          </tr>
        </thead>
        <tbody>
          {timings.map((tm, i) =>
            i === editIndex ? (
              <tr key={tm.id}>
                <td>
                  <button onClick={endEdit}>✔️</button>
                  <button onClick={cancelEdit}>❌</button>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                  />
                </td>
                <td>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={400}
                  ></textarea>
                </td>
                <td>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="500"
                    value={timing}
                    onChange={(e) => setTiming(parseInt(e.target.value))}
                  />
                </td>
              </tr>
            ) : (
              <tr key={tm.id}>
                <td>
                  <button onClick={() => handleEditClick(i)}>✏️</button>
                  {tm.title.length > 50
                    ? tm.title.substring(0, 47) + "..."
                    : tm.title}
                </td>
                <td>
                  {tm.description.length > 50
                    ? tm.description.substring(0, 47) + "..."
                    : tm.description}
                </td>
                <td>{tm.url}</td>
                <td>{tm.get_timing_sec}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TimingList;
