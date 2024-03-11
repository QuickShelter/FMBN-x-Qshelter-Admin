import { AnchorHTMLAttributes, DetailedHTMLProps, ReactElement } from "react";
import styles from "./LinkButton.module.css";
import { Link } from "react-router-dom";

type variants = "primary" | "clear" | "secondary" | "outline";

interface IProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  variant?: variants;
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
  stretch?: boolean;
  to: string;
}

const styleMap = {
  primary: styles.primary,
  secondary: styles.secondary,
  clear: styles.clear,
  outline: styles.outline,
};

export default function LinkButton(props: IProps) {
  const {
    variant = "primary",
    type = "button",
    leadingIcon,
    trailingIcon,
    stretch,
    to,
    style,
    target,
  } = props;

  return (
    <Link
      target={target}
      to={to}
      style={style}
      type={type}
      className={`${props.className} ${styles.container} ${styleMap[variant]} ${
        stretch ? styles.stretch : ""
      }`}
    >
      {leadingIcon}
      {props.children}
      {trailingIcon}
    </Link>
  );
}
