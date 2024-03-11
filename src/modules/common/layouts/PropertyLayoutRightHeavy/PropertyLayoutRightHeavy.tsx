import { HTMLAttributes } from "react";
import styles from "./PropertyLayoutRightHeavy.module.css";
import Card from "../../Card";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export default function PropertyLayoutRightHeavy({ children }: IProps) {
  return <Card className={styles.wrapper}>{children}</Card>;
}
