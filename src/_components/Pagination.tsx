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
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
    pageNumbers.push(i);
  }
  if (pageNumbers.length > 20) {
    pageNumbers = [
      ...Array.from(
        new Set([
          ...pageNumbers.slice(0, 10),
          ...pageNumbers.slice(curPage - 10, curPage + 10),
          ...pageNumbers.slice(pageNumbers.length - 10, pageNumbers.length),
        ]),
      ),
    ];
  }

  return (
    <div>
      <ul className={styles.paginationContainer}>
        <li className={styles.pageItem}>
          <button
            onClick={() => paginate(1)}
            className={curPage == 1 ? styles.pageLinkDisabled : styles.pageLink}
            type="button"
          >
            {"<<"}
          </button>
        </li>
        <li className={styles.pageItem}>
          <button
            onClick={() => paginate(curPage - 1)}
            className={curPage == 1 ? styles.pageLinkDisabled : styles.pageLink}
            type="button"
          >
            {"<"}
          </button>
        </li>
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
        <li className={styles.pageItem}>
          <button
            onClick={() => paginate(curPage + 1)}
            className={
              curPage == Math.max(...pageNumbers)
                ? styles.pageLinkDisabled
                : styles.pageLink
            }
            type="button"
          >
            {">"}
          </button>
        </li>
        <li className={styles.pageItem}>
          <button
            onClick={() => paginate(Math.max(...pageNumbers))}
            className={
              curPage == Math.max(...pageNumbers)
                ? styles.pageLinkDisabled
                : styles.pageLink
            }
            type="button"
          >
            {">>"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
