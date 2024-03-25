import { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";
import styles from "./LinkTab.module.css";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  tabs: {
    label: string;
    value: string; //IPropertySaleStatus | IRequestType | ITransactionType | IRole | "";
    link: string;
  }[];
  field: string;
  check?: "query" | "path";
  defaultPath?: string
}

export default function LinkTab(props: IProps) {
  const { tabs, defaultPath, field, check = "query", ...rest } = props;
  const searchParamsString = useLocation().search;
  const currentPath = useLocation().pathname;
  const queryParamsMap = queryString.parse(searchParamsString);

  const currentValue = useMemo(
    () => {
      if (check === "query") {
        if (Object.keys(queryParamsMap).length < 1) {
          return defaultPath ?? ""
        }

        if (!(field in queryParamsMap)) {
          return defaultPath ?? ""
        }

        return queryParamsMap[field]
      } else if (check === 'path') {
        return currentPath.split("/").at(-1)
      }
    },
    [check, queryParamsMap, field, currentPath, defaultPath]
  );

  return (
    <nav {...rest} className={`${props.className} ${styles.container} px-4 md:px-6 flex-wrap`}>
      {/* <Link
        to=""
        className={`${styles.button} ${currentValue == "" ? styles.active : ""
          }`}
      >
        All
      </Link> */}
      {tabs.map(({ label, value, link }) => {
        return (
          <Link
            key={label}
            to={link}
            className={`${styles.button} ${currentValue === value ? styles.active : ""
              }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
