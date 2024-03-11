import { InputHTMLAttributes } from "react";
import styles from "./CheckRadio.module.css";
import Checked from "../../icons/Checked";
import UnChecked from "../../icons/UnChecked";
import ColorHelper from "@/helpers/ColorHelper";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

/**
 * This component is for UI that designed as checkboxes,
 * but behave as radios (single select)
 *
 * @param props
 * @returns
 */
export default function CheckRadio(props: IProps) {
  const { className, ...rest } = props;
  return (
    <div className={`${className} ${styles.container}`}>
      <input {...rest} type="radio" hidden className={styles.input} />
      <Checked fill={ColorHelper.darkBlue400} className={styles.checked} />
      <UnChecked className={styles.unchecked} />
    </div>
  );
}
