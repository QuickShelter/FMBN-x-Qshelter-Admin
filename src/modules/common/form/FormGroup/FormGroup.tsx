import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./FormGroup.module.css";

export default function FormGroup(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div {...props} className={`${props.className} ${styles.container}`} />
  );
}
