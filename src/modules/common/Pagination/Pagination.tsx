import { useEffect, useState } from "react";
import styles from "./Pagination.module.css";
import { Link } from "react-router-dom";
import PaginationArrow from "../icons/PaginationArrow";

interface IProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  baseUrl: string;
  nPages: number;
}

const GLOBAL_LIMIT = 8;

/**
 * @description Generate the pagination links array.
 * It will always ensure the current page is visible,
 * and so also it's next and previous neighbour
 *
 * @param {int[]} nPages
 * @param {int} currentPage
 * @returns
 */

const generatePaginationNodes = (
  nPages: number,
  currentPage: number,
  FIRST: number,
  LAST: number
) => {
  // Limit on number of nodes
  const NODE_LIMIT = Math.min(GLOBAL_LIMIT, nPages);

  if (NODE_LIMIT < GLOBAL_LIMIT) {
    return Array(NODE_LIMIT + 1)
      .fill(1)
      .map((_, index) => index)
      .slice(1);
  }

  let pages: Array<number | string>;

  if (currentPage < NODE_LIMIT - 1) {
    pages = Array(currentPage + 1)
      .fill(1)
      .map((_, index) => index)
      .slice(1);

    const remainder = NODE_LIMIT - currentPage;

    if (remainder > 0 && pages && pages.length < NODE_LIMIT) {
      for (
        let index = currentPage + 1;
        index < remainder + currentPage;
        index++
      ) {
        pages.push(index);
      }
    }

    // Trailing ellipse
    if (nPages > NODE_LIMIT) {
      pages.push(...["...", LAST]);
    }

    return pages;
  }

  if (currentPage >= NODE_LIMIT - 1) {
    const pages = [];

    if (currentPage >= GLOBAL_LIMIT) {
      pages.push(FIRST);
    }

    if (currentPage - 1 > 0) {
      pages.push(currentPage - 1);
    }

    pages.push(currentPage);

    if (currentPage < nPages) {
      // pages.push(currentPage + 1);
    }

    const remainder = Math.min(nPages - NODE_LIMIT, NODE_LIMIT - pages.length);

    if (remainder > 0) {
      for (
        let index = currentPage + 1;
        index < remainder + currentPage && index <= nPages;
        index++
      ) {
        pages.push(index);
      }
    }

    // Leading ellipse
    if (nPages > pages[pages.length - 1]) {
      pages.push(...["...", LAST]);
    }

    if (nPages < GLOBAL_LIMIT) {
      // Remove ellipses if nodes are too few
      return pages.filter((page) => page !== FIRST && page !== LAST);
    }

    return pages;
  }
};

export default function Pagination({
  currentPage,
  setCurrentPage,
  baseUrl,
  nPages,
}: IProps) {
  const FIRST = 1;
  const LAST = nPages;

  const _pages = generatePaginationNodes(nPages, currentPage, FIRST, LAST);
  const [pages, setPages] = useState(_pages);

  useEffect(() => {
    const _pages = generatePaginationNodes(nPages, currentPage, FIRST, LAST);
    setPages(_pages);
  }, [LAST, currentPage, nPages, setPages]);

  if (!nPages || nPages < 2) return null;

  return (
    <div className={styles.container}>
      <nav className={styles.nav} aria-label="navigation">
        <ul className={styles.list}>
          <span
            onClick={() => {
              setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
            }}
            className={styles.singleMove}
          >
            <Link to={baseUrl}>
              <PaginationArrow />
            </Link>
          </span>
          {pages?.map((_page: number | string) =>
            typeof _page === "number" && _page > 0 ? (
              <li
                key={_page}
                className={currentPage === _page ? styles.active : ""}
                onClick={() => {
                  setCurrentPage(_page);
                }}
              >
                <Link to={baseUrl}>{_page}</Link>
              </li>
            ) : (
              <li
                key={_page}
                onClick={() => {
                  if (_page === LAST) {
                    setCurrentPage(nPages);
                  } else if (_page === FIRST) {
                    setCurrentPage(1);
                  }
                }}
              >
                <Link to={baseUrl}>{_page}</Link>
              </li>
            )
          )}
          <span
            onClick={() =>
              setCurrentPage(currentPage < nPages ? currentPage + 1 : currentPage)
            }
            className={styles.singleMove}
          >
            <Link to={baseUrl}>
              <PaginationArrow />
            </Link>
          </span>
        </ul>
      </nav>
    </div>
  );
}
