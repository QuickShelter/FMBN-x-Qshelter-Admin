import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./AuthLayout.module.css";

export default function AuthLayout(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div {...props} className={`${props.className} ${styles.container}`}>
      <div className={styles.card}>{props.children}</div>
    </div>
  );
}
