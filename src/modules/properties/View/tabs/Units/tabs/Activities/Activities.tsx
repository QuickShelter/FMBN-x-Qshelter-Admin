import { DetailedHTMLProps, HTMLAttributes } from "react";
import ActivityCard from "./ActivityCard";
import Hr from "@/modules/common/Hr";
import { IMortgageActivity } from "@/types";
import Spinner from "@/modules/common/Spinner";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activities: IMortgageActivity[] | null,
  isLoading: boolean,
  offerUrl: string | null
  reasonForBankDecline: string | null
}

export default function Activities({ className, isLoading, reasonForBankDecline, offerUrl, activities = [], ...rest }: IProps) {
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
      <div {...rest} className={`${className}`}>
        {activities
          .map((activity, index) => {
            return (
              <div key={index}>
                <ActivityCard activity={activity} offerUrl={offerUrl} reasonForBankDecline={reasonForBankDecline} />
                {(index < activities.length - 1) && <Hr className="my-4" />}
              </div>
            );
          })}
      </div>
    </div>
  );
}
