import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Card.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  shadow?: boolean;
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function Card({ className, shadow, ...rest }: IProps) {
  return (
    <div
      {...rest}
      className={`${className} ${styles.container} ${shadow ? styles.shadow : ""
        }`}
    />
  );
}
