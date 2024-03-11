import { InputHTMLAttributes } from "react";
import styles from "./BlockRadio.module.css";
import RadioOn from "./RadioOn";
import RadioOff from "./RadioOff";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function BlockRadio(props: IProps) {
  const { label, ...rest } = props;

  return (
    <label className={styles.container}>
      <span className={styles.label}>{label}</span>
      <input {...rest} type="radio" hidden className={styles.input} />
      <RadioOn className={styles.checked} />
      <RadioOff className={styles.unchecked} />
    </label>
  );
}
