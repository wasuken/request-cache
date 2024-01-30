"use client";
// QueueList.tsx
import React, { useState } from "react";
import styles from "./QueueResultList.module.css";
import Pagination from "./Pagination";
import { QueueResult } from "@/_const/types";

interface IProps {
  title: string;
  queueResults: QueueResult[];
  paginate: (pageNumber: number) => void;
  resultsPerPage: number;
  totalResults: number;
  curPage: number;
}

const QueueResultList: React.FC<IProps> = ({
  queueResults,
  title,
  paginate,
  resultsPerPage,
  totalResults,
  curPage,
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // レスポンスの展開状態を切り替える関数
  const toggleExpand = (id: string) => {
    setExpandedIds((prevExpandedIds) => {
      const newExpandedIds = new Set(prevExpandedIds);
      if (newExpandedIds.has(id)) {
        newExpandedIds.delete(id);
      } else {
        newExpandedIds.add(id);
      }
      return newExpandedIds;
    });
  };
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
            <tr key={queueResult.id}>
              <td>
                {queueResult.urlInfo.title.length > 50
                  ? queueResult.urlInfo.title.substring(0, 47) + "..."
                  : queueResult.urlInfo.title}
              </td>
              <td>{queueResult.urlInfo.url}</td>
              <td>{queueResult.exec_datetime.toLocaleString("ja-JP")}</td>
              <td
                onClick={() => toggleExpand(queueResult.id)}
                style={{ cursor: "pointer" }}
              >
                {expandedIds.has(queueResult.id) ||
                queueResult.response.length <= 200
                  ? queueResult.response
                  : queueResult.response.substring(0, 197) + "..."}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        resultsPerPage={resultsPerPage}
        totalResults={totalResults}
        paginate={paginate}
        curPage={curPage}
      />
    </div>
  );
};

export default QueueResultList;
