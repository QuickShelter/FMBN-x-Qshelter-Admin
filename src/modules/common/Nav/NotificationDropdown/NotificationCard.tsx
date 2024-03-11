import { DetailedHTMLProps, HTMLAttributes } from "react";
import { INotificationCardData } from "@/types";
import { formatDate } from "@/helpers/dateFormat";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: INotificationCardData;
}

export default function NotificationCard({ className, data, ...rest }: IProps) {
  const { message, heading, created_at } = data;

  return (
    <div {...rest} className={`${className} flex flex-col sm:flex-row`}>
      <div className="flex flex-col gap-2">
        <div className="text-neutral-950 text-sm font-medium line-clamp-2 sm:w-[33ch]">
          {heading}
        </div>
        <div className="text-neutral-500 text-[13px] font-normal line-clamp-2 w-[20ch] sm:w-[33ch]">
          {message}
        </div>
      </div>
      <div className="text-neutral-500 text-xs font-normal whitespace-nowrap">
        {formatDate(new Date(created_at))}
      </div>
    </div>
  );
}
