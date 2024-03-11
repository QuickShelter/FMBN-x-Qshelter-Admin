import { AnchorHTMLAttributes, DetailedHTMLProps, ReactElement } from "react";
import styles from "./PageBackButton.module.css";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../icons/ArrowLeft";

type variants = "primary" | "clear" | "secondary" | "outlined";

interface IProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: variants;
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
  stretch?: boolean;
  text?: string;
}

const styleMap = {
  primary: styles.primary,
  secondary: styles.secondary,
  clear: styles.clear,
  outlined: styles.outlined,
};

export default function PageBackButton(props: IProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history
  };

  const { variant = "outlined", stretch, style } = props;

  return (
    <button
      onClick={handleGoBack}
      style={style}
      className={`group ${props.className} ${styles.container} ${
        styleMap[variant]
      } ${stretch ? styles.stretch : ""}`}
    >
      <ArrowLeft className="transition-transform transform origin-left group-hover:-translate-x-1" />
      {props.text}
    </button>
  );
}
