import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Status.module.css";
import Indicator from "../Indicator/Indicator";
import StringHelper from "@/helpers/StringHelper";
import { IStatus } from "@/types";
import { StatusHelper } from "@/helpers/StatusHelper";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  indicatorRight?: boolean;
  background?: string;
  indicatorLeft?: boolean;
  indicatorColor?: string;
  status: IStatus;
  statusClassName?: string;
  textColor?: string;
}



export default function Status(props: IProps) {
  const {
    background,
    style,
    indicatorColor,
    indicatorLeft = false,
    indicatorRight = false,
    textColor,
    className,
    statusClassName,
    status,
    ...rest
  } = props;

  return (
    <div
      {...rest}
      className={`${className} ${styles.container}`}
      style={{ ...style, background: background ?? StatusHelper.resolveBackgroundColor(status) }}
    >
      {indicatorLeft && <Indicator color={indicatorColor ?? StatusHelper.resolveBackgroundColor(status)} />}
      <span
        className={`${styles.status} ${statusClassName}`}
        style={{ ...style, background: background ?? StatusHelper.resolveBackgroundColor(status), color: textColor ?? StatusHelper.resolveTextColor(status) }}
      >
        {StringHelper.stripUnderscores(status)}
      </span>
      {indicatorRight && <Indicator color={indicatorColor ?? StatusHelper.resolveBackgroundColor(status)} />}
    </div>
  );
}
