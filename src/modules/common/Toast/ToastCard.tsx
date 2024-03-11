import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./ToastCard.module.css";
import { IToastType } from "@/types";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type: IToastType,
  show: boolean,
  message: string
}

const styleMap: Record<IToastType, string> = {
  error: styles.error,
  warning: styles.warning,
  success: styles.success,
  clear: styles.clear,
};

/**
   * @usage
   * dispatch(
        setToast({
        message: "Request was approved successfully",
        type: "success",
      })
    )
   * 
   * @param props 
   * @returns 
   */
export default function ToastCard({ type, message, className, show, ...rest }: IProps) {

  return (
    <div
      {...rest}
      className={`${styleMap[type]} ${className} ${styles.container} ${show ? "" : styles.hidden
        }`}
    >
      {/* {type === "success" && <TickCircle />} */}
      <span className={styles.message}>{message}</span>
    </div>
  );
}
