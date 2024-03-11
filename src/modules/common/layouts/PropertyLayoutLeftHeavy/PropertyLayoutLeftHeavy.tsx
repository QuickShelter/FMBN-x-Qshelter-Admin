import { HTMLAttributes } from "react";
import styles from "./PropertyLayoutLeftHeavy.module.css";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export default function PropertyLayoutLeftHeavy({ children }: IProps) {
  return <div className={styles.wrapper}>{children}</div>;
}
