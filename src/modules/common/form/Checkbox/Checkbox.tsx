import { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";
import Checked from "../../icons/Checked";
import UnChecked from "../../icons/UnChecked";
import ColorHelper from "@/helpers/ColorHelper";

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

export default function Checkbox(props: IProps) {
  return (
    <div className={styles.container}>
      <input {...props} type="checkbox" hidden className={styles.input} />
      <Checked fill={ColorHelper.darkBlue400} className={styles.checked} />
      <UnChecked className={styles.unchecked} />
    </div>
  );
}
