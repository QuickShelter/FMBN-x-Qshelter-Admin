import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function RadioOff({ className, ...rest }: IProps) {
  return (
    <div
      {...rest}
      className={`${className} w-4 h-4 rounded-full border-solid border-2 app-dark-blue-200`}
    ></div>
  );
}
