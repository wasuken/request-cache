"use client";
// QueueList.tsx
import React from "react";
import styles from "./QueueResultList.module.css";
import { QueueResult } from "@/_const/types";

interface IProps {
  title: string;
  queueResults: QueueResult[];
}

const QueueResultList: React.FC<IProps> = ({ queueResults, title }) => {
  return (
    <div className={styles.queueResultList}>
      <h2 className={styles.title}>{title}</h2>
      <table className={styles.table}>
	<thead>
	  <tr>
	    <th>タイトル</th>
	    <th>URL</th>
	    <th>実行日時</th>
      <th>実行結果内容</th>
	  </tr>
	</thead>
	<tbody>
	  {queueResults.map((queueResult) => (
	    <tr key={queue.id}>
	      <td>
		{queueResult.title.length > 50
		  ? queueResult.urlInfo.title.substring(0, 47) + "..."
		  : queueResult.urlInfo.title}
	      </td>
	      <td>{queueResult.urlInfo.url}</td>
	      <td>{queueResult.exec_datetime.toLocaleString('ja-JP')}</td>
	      <td>{queueResult.response}</td>
	    </tr>
	  ))}
	</tbody>
      </table>
    </div>
  );
};

export default QueueResultList;
