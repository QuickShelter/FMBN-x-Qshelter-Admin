import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./SizeNotSupported.module.css";
interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function SizeNotSupported({ className, ...rest }: IProps) {
  return (
    <div {...rest} className={`${styles.container} ${className}`}>
      <div className={styles.content}>
        <h1>This screen size is not supported</h1>
      </div>
    </div>
  );
}
