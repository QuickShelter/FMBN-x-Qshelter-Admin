import ColorHelper from "@/helpers/ColorHelper";
import Indicator from "../Indicator/Indicator";
import styles from "./DetailCard.module.css";
import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string;
  value: string | undefined | null | number | ReactElement;
  indicatorColor?: string;
  showIndicator?: boolean;
  underlined?: boolean;
  valueStyle?: string;
  horizontal?: boolean;
  isLoading?: boolean
}

export default function DetailCard(props: IProps) {
  const {
    label,
    value,
    underlined = false,
    showIndicator,
    indicatorColor = ColorHelper.systemSuccess,
    valueStyle,
    isLoading = false,
    horizontal = false,
    ...rest
  } = props;

  return (
    <div
      {...rest}
      className={`${styles.container} ${props.className} ${underlined ? styles.underline : ""
        } ${horizontal ? styles.horizontal : ""}`}
    >
      <span className={styles.label}>{label}</span>
      <div className={styles.bottom}>
        {showIndicator ? <Indicator color={indicatorColor} /> : null}
        <span className={`${valueStyle} ${styles.value}`}>
          {isLoading ? 'Loading' : (value ? value : "N/A")}
        </span>
      </div>
    </div>
  );
}
