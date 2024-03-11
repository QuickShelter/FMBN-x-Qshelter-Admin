import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./PageTitle.module.css";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

export default function PageTitle(props: IProps) {
  return <h1 {...props} className={`${props.className} ${styles.container}`} />;
}
