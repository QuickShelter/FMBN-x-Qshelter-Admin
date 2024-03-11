import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./FormError.module.css";
import Error from "../../icons/Error";

export default function FormError(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div {...props} className={`${props.className} ${styles.container}`}>
      <Error />
      <span className={styles.text}>{props.children}</span>
    </div>
  );
}
