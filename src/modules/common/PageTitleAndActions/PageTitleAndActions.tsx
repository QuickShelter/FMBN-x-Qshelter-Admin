import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./PageTitleAndActions.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function PageTitleAndActions({ className, ...rest }: IProps) {
  return <div {...rest} className={`${className} ${styles.container}`}></div>;
}
