import styles from "./LinkTabPresentational.module.css";
import { Link } from "react-router-dom";

interface IProps {
  tabs: {
    label: string;
    value: string; //IPropertySaleStatus | IRequestType | ITransactionType | IRole | "";
    link: string;
  }[];
  currentValue: string | null | undefined | (string | null)[]
}

export default function LinkTabPresentational({ currentValue, tabs }: IProps) {

  return (
    <>
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
    </>
  );
}
