import { InputHTMLAttributes } from "react";
import styles from "./ToggleCheckbox.module.css";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

/**
 * This component is for UI that designed as checkboxes,
 * but behave as radios (single select)
 *
 * @param props
 * @returns
 */
export default function ToggleCheckbox(props: IProps) {
  const { disabled, required = false, id = "toggle", ...rest } = props;

  return (
    <div>
      <input
        {...rest}
        type="checkbox"
        hidden
        id={id}
        required={required}
        disabled={disabled}
        className={styles.input}
      />
      <label htmlFor={id} className={`${styles.container}`}>
        <div className={`${styles.knob}`} />
      </label>
    </div>
  );
}
