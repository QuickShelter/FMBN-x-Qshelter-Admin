import { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

interface IProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value"> {
  value: string | undefined | null;
  testId?: string;
}

const MAX_LENGTH = 750

export default function TextArea(props: IProps) {
  const { rows, disabled, maxLength, required = false, testId, ...rest } = props;
  return (
    <textarea
      {...rest}
      maxLength={maxLength ?? MAX_LENGTH}
      data-test-id={testId}
      value={props.value ?? undefined}
      rows={rows}
      required={required}
      disabled={disabled}
      className={`${props.className} ${styles.container}`}
    />
  );
}
