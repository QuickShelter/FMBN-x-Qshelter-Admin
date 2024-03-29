import { DetailedHTMLProps, HTMLAttributes } from "react";
import Button from "../Button/Button";
import styles from "./Copy.module.css";
import useToast from "@/hooks/useToast";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string;
}

export default function Copy({ text, className, ...rest }: IProps) {
  const { pushToast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      pushToast({
        type: "success",
        message: "copied",
      })
    } catch (err) {
      pushToast({
        type: "error",
        message: "Unable to copy text to clipboard",
      })
    }
  };

  return (
    <div
      {...rest}
      className={`${className} ${styles.container} pl-4 pr-2 py-2.5 bg-gray-100 rounded-lg`}
    >
      <div
        className={`${styles.text} text-slate-900 text-[15px] font-normal leading-[18px] overflow-hidden line-clamp-1`}
      >
        {text}
      </div>
      <Button
        variant="primary"
        type="button"
        onClick={handleCopy}
        className="text-white text-[15px] font-semibold"
      >
        Copy
      </Button>
    </div>
  );
}
