import { HTMLAttributes } from "react";
import styles from "./Progress.module.css";

interface IProps extends HTMLAttributes<HTMLProgressElement> {
  value: number;
  max: number;
}

export default function Progress({ className, ...rest }: IProps) {
  return <progress className={`${className} ${styles.progress}`} {...rest} />;
}
