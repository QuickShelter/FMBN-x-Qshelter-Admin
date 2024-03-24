import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./LinkMore.module.css";
import ChevronRight from "../icons/ChevronRight";
import LinkButton from "../LinkButton";

type variants = "primary" | "clear" | "secondary" | "outline";

interface IProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  variant?: variants;
  to: string;
}

export default function LinkMore(props: IProps) {
  const {
    type = "button",
    to,
    style,
    variant = 'outline',
    target,
  } = props;

  return (
    <LinkButton
      target={target}
      to={to}
      variant={variant}
      style={style}
      type={type}
      className={`${props.className} ${styles.container} px-3 py-2 items-center flex`}
    >
      {props.children}
      <ChevronRight className={styles.chevron} />
    </LinkButton>
  );
}
