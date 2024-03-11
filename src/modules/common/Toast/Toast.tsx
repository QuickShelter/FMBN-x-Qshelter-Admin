import { DetailedHTMLProps, HTMLAttributes } from "react";
import ToastCard from "./ToastCard";
import { IToastState } from "@/types";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  toasts: IToastState[]
}

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
export default function Toast({ toasts, className, ...rest }: IProps) {
  return (
    <div
      {...rest}
      className={`z-10 fixed top-5 left-1/2 transform -translate-x-1/2 flex flex-col-reverse gap-4 ${className} ${toasts.length > 0 ? "" : "hidden"
        }`}
    >
      {toasts.map((toast) => {
        const { message, show, type } = toast

        return <ToastCard message={message} type={type} show={show} />
      })}
    </div>
  );
}
