import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text?: string;
  texts?: string[];
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function Dot({ className, ...rest }: IProps) {
  return (
    <span {...rest} className={`${className}`}>
      •
    </span>
  );
}
