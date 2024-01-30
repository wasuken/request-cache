import React from "react";
import styles from "./Pagination.module.css"; // スタイルシートをインポート

interface PaginationProps {
  resultsPerPage: number;
  totalResults: number;
  paginate: (pageNumber: number) => void;
  curPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  resultsPerPage,
  totalResults,
  paginate,
  curPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className={styles.paginationContainer}>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.pageItem}>
            <button
              onClick={() => paginate(number)}
              className={
                number == curPage ? styles.pageLinkDisabled : styles.pageLink
              }
              type="button"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
