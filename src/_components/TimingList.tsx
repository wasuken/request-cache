"use client";
// TimingList.tsx
import React from "react";
import styles from "./TimingList.module.css";
import { Timing } from "@/_const/types";

interface IProps {
  title: string;
  timings: Timing[];
}

const TimingList: React.FC<IProps> = ({ timings, title }) => {
  return (
    <div className={styles.timingList}>
      <h2 className={styles.title}>{title}</h2>
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
	  {timings.map((timing) => (
	    <tr key={timing.id}>
	      <td>
		{timing.title.length > 50
		  ? timing.title.substring(0, 47) + "..."
		  : timing.title}
	      </td>
	      <td>
		{timing.description.length > 50
		  ? timing.description.substring(0, 47) + "..."
		  : timing.description}
	      </td>
	      <td>{timing.url}</td>
	      <td>{timing.get_timing_sec}</td>
	    </tr>
	  ))}
	</tbody>
      </table>
    </div>
  );
};

export default TimingList;
