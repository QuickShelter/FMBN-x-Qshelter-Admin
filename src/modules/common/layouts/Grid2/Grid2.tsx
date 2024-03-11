import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Grid2.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function Grid2(props: IProps) {
  return (
    <div {...props} className={`${props.className} ${styles.container}`} />
  );
}
