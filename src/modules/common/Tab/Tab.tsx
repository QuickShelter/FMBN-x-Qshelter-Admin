import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Tab.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  currentTab: string;
  tabs: {
    label: string;
    value: string;
  }[];
  setTab: (value: string) => void;
}

export default function Tab(props: IProps) {
  const { tabs, setTab, currentTab, ...rest } = props;

  return (
    <div {...rest} className={`${props.className} ${styles.container} px-4 sm:px-6`}>
      {tabs.map(({ label, value }) => {
        return (
          <button
            key={label}
            className={`${styles.button} ${value == currentTab ? styles.active : ""
              }`}
            onClick={() => setTab(value)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
