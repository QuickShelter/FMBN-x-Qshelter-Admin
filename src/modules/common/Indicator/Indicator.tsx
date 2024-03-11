import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Indicator.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLDivElement> {
  color: string;
}

export default function Indicator(props: IProps) {
  const { color, style, ...rest } = props;
  return (
    <span
      {...rest}
      className={`${props.className} ${styles.container}`}
      style={{ ...style, background: color }}
    />
  );
}
