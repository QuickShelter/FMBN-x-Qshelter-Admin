import { InputHTMLAttributes } from "react";
import styles from "./TextInput.module.css";

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

const MAX_LENGTH = 250

export default function TextInput({ maxLength, ...props }: IProps) {
  return (
    <input {...props} maxLength={maxLength ?? MAX_LENGTH} className={`${props.className} ${styles.container}`} />
  );
}
