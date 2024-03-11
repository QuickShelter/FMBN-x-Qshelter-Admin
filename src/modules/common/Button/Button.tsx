import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from "react";
import styles from "./Button.module.css";
import Spinner from "../Spinner";

type variants = "primary" | "clear" | "secondary" | "outline" | "outline-danger";

interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: variants;
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
  stretch?: boolean;
  testId?: string;
  isLoading?: boolean
}

const styleMap = {
  primary: styles.primary,
  secondary: styles.secondary,
  clear: styles.clear,
  outline: styles.outline,
  "outline-danger": styles.outlineDanger
};

export default function Button(props: IProps) {
  const {
    variant = "primary",
    type = "button",
    leadingIcon,
    trailingIcon,
    testId,
    isLoading,
    stretch,
    ...rest
  } = props;
  return (
    <button
      {...rest}
      data-test-id={testId}
      type={type}
      className={`${props.className} ${styles.container} ${styleMap[variant]} ${stretch ? styles.stretch : ""
        }`}
    >
      {isLoading && <Spinner />}
      {leadingIcon}
      {props.children}
      {trailingIcon}
    </button>
  );
}
