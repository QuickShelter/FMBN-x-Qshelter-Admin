import { DetailedHTMLProps, HTMLAttributes } from "react";
import ActivityCard from "./ActivityCard";
import Hr from "@/modules/common/Hr";
import { IMortgageActivity } from "@/types";
import Spinner from "@/modules/common/Spinner";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activities: IMortgageActivity[] | null,
  isLoading: boolean
}

export default function Activities({ className, isLoading, activities = [], ...rest }: IProps) {
  if (!activities || activities.length < 1) {
    return <div className="flex flex-col gap-5">No activity on the unit</div>
  }

  if (isLoading) {
    return <div className={`flex flex-1 justify-center items-center`}>
      <Spinner size='md' />
    </div>
  }

  return (
    <div {...rest} className={`${className} flex flex-col gap-5`}>
      <h3 className="text-neutral-950 text-sm font-medium leading-[21px]">
        Activites
      </h3>
      <div {...rest} className={`${className}`}>
        {activities
          .map((activity, index) => {
            return (
              <div key={index}>
                <ActivityCard activity={activity} />
                <Hr className="my-4" />
              </div>
            );
          })}
      </div>
    </div>
  );
}
