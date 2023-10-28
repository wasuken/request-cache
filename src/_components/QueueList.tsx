"use client";
// QueueList.tsx
import React from "react";
import styles from "./QueueList.module.css";
import { Queue } from "@/_const/types";

interface IProps {
  queues: Queue[];
}

const QueueList: React.FC<IProps> = ({ queues }) => {
  return (
    <div className={styles.queueList}>
      <h2 className={styles.title}>API取得タイミング一覧</h2>
      <table className={styles.table}>
	<thead>
	  <tr>
	    <th>タイトル</th>
	    <th>URL</th>
	    <th>取得タイミング（秒）</th>
	    <th>実行日時</th>
	  </tr>
	</thead>
	<tbody>
	  {queues.map((queue) => (
	    <tr key={queue.id}>
	      <td>
		{queue.urlInfo.title.length > 50
		  ? queue.urlInfo.title.substring(0, 47) + "..."
		  : queue.urlInfo.title}
	      </td>
	      <td>{queue.urlInfo.url}</td>
	      <td>{queue.urlInfo.get_queue_sec}</td>
	      <td>{queue.exec_datetime.toLocaleString('ja-JP')}</td>
	    </tr>
	  ))}
	</tbody>
      </table>
    </div>
  );
};

export default QueueList;
