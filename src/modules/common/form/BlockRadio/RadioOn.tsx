import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function RadioOn({ className, ...rest }: IProps) {
  return (
    <div
      {...rest}
      className={`${className} w-4 h-4 rounded-full border-solid border-4 border-app-green-500`}
    ></div>
  );
}
