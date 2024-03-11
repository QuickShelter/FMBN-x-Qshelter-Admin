import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Spinner.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  className?: string;
  srcString?: string;
  text?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export default function EmptyState({ className, size = "sm", srcString, text }: IProps) {
  return (
    <>
      <img
        // {...rest}
        className={`${className} ${styles.container} ${sizeMap[size]}`}
        src={srcString ? srcString : '/property.svg'}
        alt='Empty State'
      />
      <p
        style={{
          textAlign: 'center'
        }}
      >{text ? text : "No search result."}</p>
    </>
  );
}
