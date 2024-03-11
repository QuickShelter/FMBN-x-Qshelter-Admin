import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function ActivityCard({ className, ...rest }: IProps) {
  return (
    <div {...rest} className={`${className} flex flex-col gap-1`}>
      <div className="text-neutral-950 text-sm font-medium leading-tight">
        Documents sent to Bank
      </div>
      <div className="text-neutral-500 text-xs font-normal leading-none">
        10th Aug, 2023, 16:03
      </div>
    </div>
  );
}
