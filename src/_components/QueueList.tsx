"use client";
// QueueList.tsx
import React from "react";
import styles from "./QueueList.module.css";
import { Queue } from "@/_const/types";

interface IProps {
  title: string;
  queues: Queue[];
}

const QueueList: React.FC<IProps> = ({ queues, title }: IProps) => {
  return (
    <div className={styles.queueList}>
      <h2 className={styles.title}>{title}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>URL</th>
            <th>取得タイミング（秒）</th>
            <th>実行日時</th>
          </tr>
        </thead>
        <tbody>
          {queues.map((queue: Queue) => (
            <tr key={queue.id}>
              <td>
                <a href={`/queue/${queue.id}`}>{queue.id}</a>
              </td>
              <td>
                {queue.urlInfo.title.length > 50
                  ? queue.urlInfo.title.substring(0, 47) + "..."
                  : queue.urlInfo.title}
              </td>
              <td>{queue.urlInfo.url}</td>
              <td>{queue.urlInfo.get_timing_sec}</td>
              <td>{queue.exec_datetime.toLocaleString("ja-JP")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueueList;
