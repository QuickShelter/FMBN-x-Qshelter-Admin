import { InputHTMLAttributes } from "react";
import styles from "./TextInput.module.css";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function TextInput(props: IProps) {
  return (
    <input {...props} className={`${props.className} ${styles.container}`} />
  );
}
