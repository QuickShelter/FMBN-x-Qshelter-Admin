import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Spinner.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export default function Spinner({ className, size = "sm", ...rest }: IProps) {
  return (
    <span
      {...rest}
      className={`${className} ${styles.container} ${sizeMap[size]}`}
    ></span>
  );
}
