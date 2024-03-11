import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  left: ReactElement | string;
  right: ReactElement | string;
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function LeftDotRight({
  className,
  left,
  right,
  ...rest
}: IProps) {
  return (
    <div
      {...rest}
      className={`${className} px-2 py-1.5 whitespace-nowrap bg-zinc-100 rounded-[100px] text-neutral-950 text-xs font-medium leading-3 align-middle flex items-center flex-nowrap h-fit w-fit`}
    >
      {left}" • "{right}
    </div>
  );
}
