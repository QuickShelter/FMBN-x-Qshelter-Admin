import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Panel.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function Panel({ className, ...rest }: IProps) {
  return <div {...rest} className={`${className} ${styles.container}`}></div>;
}
