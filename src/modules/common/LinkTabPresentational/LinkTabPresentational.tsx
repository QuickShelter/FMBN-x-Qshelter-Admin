import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./LinkTabPresentational.module.css";
import { Link } from "react-router-dom";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  tabs: {
    label: string;
    value: string; //IPropertySaleStatus | IRequestType | ITransactionType | IRole | "";
    link: string;
  }[];
  currentValue: string | null | undefined | (string | null)[]
}

export default function LinkTabPresentational({ currentValue, className, tabs, ...rest }: IProps) {

  return (
    <nav {...rest} className={`${className} ${styles.container} px-4 md:px-6 flex-wrap`}>
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
