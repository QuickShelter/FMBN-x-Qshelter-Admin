import { InputHTMLAttributes } from "react";
import styles from "./DateInput.module.css";
import TextInput from "../TextInput";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function DateInput({ className, ...rest }: IProps) {
  return (
    <TextInput
      {...rest}
      className={`${styles.container} ${className}`}
      type="date"
    />
  );
}
