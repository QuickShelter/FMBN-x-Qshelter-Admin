import FormatHelper from "@/helpers/FormatHelper";
import StringHelper from "@/helpers/StringHelper";
import { IMortgageActivity } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activity: IMortgageActivity
}

export default function ActivityCard({ className, activity, ...rest }: IProps) {
  return (
    <div {...rest} className={`${className} flex flex-col gap-1`}>
      <div className="text-sm font-medium leading-tight">
        {activity.comment}
      </div>
      <div className="text-sm font-medium leading-tight">
        {StringHelper.stripUnderscores(activity.status)}
      </div>
      <div className="text-neutral-500 text-xs font-normal leading-none">
        {activity.created_at ? FormatHelper.dateTimeFormatter.format(new Date(activity.created_at)) : 'N/A'}
      </div>
    </div>
  );
}
