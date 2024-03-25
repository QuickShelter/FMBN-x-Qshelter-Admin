import { DetailedHTMLProps, HTMLAttributes, RefObject, useMemo } from "react";
import styles from "./LinkTabsWithMore.module.css";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import LinkTabPresentational from "../LinkTabPresentational";
import Card from "../Card";
import ChevronDown from "../icons/ChevronDown";
import { useClickAway } from '@uidotdev/usehooks'
import LinkTab from "../LinkTab";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  tabs: {
    label: string;
    value: string; //IPropertySaleStatus | IRequestType | ITransactionType | IRole | "";
    link: string;
  }[];
  field: string;
  threshold: number;
  check?: "query" | "path";
  defaultPath?: string
}

export default function LinkTabWithMore({ defaultPath, ...props }: IProps) {
  const { tabs, field, check = "query", threshold, ...rest } = props;
  const searchParamsString = useLocation().search;
  const currentPath = useLocation().pathname;
  const queryParamsMap = queryString.parse(searchParamsString);

  const ref = useClickAway(() => {
    ref.current.removeAttribute('open')
  });

  const currentValue = useMemo(
    () => {
      if (check === "query") {

        if (Object.keys(queryParamsMap).length < 1) {
          return defaultPath ?? ""
        }

        if (!(field in queryParamsMap)) {
          return defaultPath ?? ""
        }

        const res = queryParamsMap[field] ?? defaultPath
        return res
      } else if (check === 'path') {
        return currentPath.split("/").at(-1)
      }
    },
    [check, queryParamsMap, field, currentPath, defaultPath]
  );

  if (tabs.length < threshold) {
    return <LinkTab {...props} defaultPath={defaultPath} />
  }

  const main = tabs.slice(0, threshold)
  const more = tabs.slice(threshold)

  return (
    <nav {...rest} className={`${props.className} ${styles.container} px-4 md:px-6 flex-wrap`}>
      <div className="flex items-center justify-between w-full">
        <LinkTabPresentational tabs={main} currentValue={currentValue} />
        <details ref={ref as RefObject<HTMLDetailsElement>} className={`${styles.dropdown} relative`}>
          <summary className="cursor-pointer flex items-center gap-1 text-base">More <ChevronDown className={styles.moreIcon} /></summary>
          <Card className={`${styles.moreCard} rounded-none flex flex-col absolute bg-[#fff] z-10 px-4 py-4`}>
            {more.map(({ label, value, link }) => {
              return (
                <Link
                  key={label}
                  to={link}
                  className={`whitespace-nowrap ${styles.button} ${currentValue === value ? styles.active : ""
                    }`}
                >
                  {label}
                </Link>
              );
            })}
          </Card>
        </details>
      </div>
    </nav>
  );
}
