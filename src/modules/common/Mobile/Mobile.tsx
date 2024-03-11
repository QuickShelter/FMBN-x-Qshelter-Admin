import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Mobile.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function Mobile({ className, children, ...rest }: IProps) {
  return (
    <div {...rest} className={`${className} ${styles.container}`}>
      {children}
    </div>
  );
}
