import { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Select.module.css";
import ChevronDown from "../../icons/ChevronDown";

interface IProps extends InputHTMLAttributes<HTMLSelectElement> {
  disabled?: boolean;
  required?: boolean;
  tralingIcon?: ReactNode;
  testId?: string,
  containerClassName?: string
}

export default function Select(props: IProps) {
  const { disabled, tralingIcon, required = false, testId, ...rest } = props;
  return (
    <label className={`${styles.container} ${props.containerClassName}`}>
      {tralingIcon ? <span className={styles.trailingIcon}>{tralingIcon}</span> : null}
      <select
        {...rest}
        data-test-id={testId}
        required={required}
        disabled={disabled}
        className={`${props.className} ${tralingIcon ? styles.hasTrailingIcon : null}`}
      />
      <ChevronDown className={styles.chevron} />
    </label>
  );
}
