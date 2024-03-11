import { DetailedHTMLProps, HTMLAttributes } from "react";
import Check from "./icons/Check";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string;
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function CheckedText({ className, text, ...rest }: IProps) {
  return (
    <div {...rest} className={`${className} flex flex-nowrap gap-2`}>
      <Check />
      <span className="whitespace-nowrap text-neutral-800 text-sm font-normal">
        {text}
      </span>
    </div>
  );
}
