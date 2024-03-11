import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./TopCard.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string;
  value: string | number;
  shadow?: boolean;
  subValue?: string | number;
}

export default function TopCard(props: IProps) {
  const { label, value, shadow, className, subValue, ...rest } = props;

  return (
    <div
      {...rest}
      className={`${styles.container} ${className} ${
        shadow ? styles.shadow : ""
      }`}
    >
      <h3>{label}</h3>
      {subValue ? (
        <div className={styles.valueSection}>
          <span className={styles.value}>{value}</span>
          <span className={styles.subValue}>{subValue}</span>
        </div>
      ) : (
        <span className={styles.value}>{value}</span>
      )}
    </div>
  );
}
