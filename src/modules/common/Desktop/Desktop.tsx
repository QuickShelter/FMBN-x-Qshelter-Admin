import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Desktop.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function Desktop({ className, children, ...rest }: IProps) {
  return (
    <div {...rest} className={`${className} ${styles.container}`}>
      {children}
    </div>
  );
}
