import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Hr.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function Hr(props: IProps) {
  return <hr {...props} className={`${props.className} ${styles.container}`} />;
}
