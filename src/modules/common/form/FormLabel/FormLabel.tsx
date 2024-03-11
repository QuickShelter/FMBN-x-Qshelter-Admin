import { DetailedHTMLProps, LabelHTMLAttributes } from "react";
import styles from "./FormLabel.module.css";

export default function FormLabel(
  props: DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
) {
  return (
    <label {...props} className={`${props.className} ${styles.container}`} />
  );
}
