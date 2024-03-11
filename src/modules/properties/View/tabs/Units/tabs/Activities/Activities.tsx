import { DetailedHTMLProps, HTMLAttributes } from "react";
import ActivityCard from "./ActivityCard";
import Hr from "@/modules/common/Hr";
import { useGetMortgageActivitiesByApplicationIdQuery } from "@/redux/services/api";
import Spinner from "@/modules/common/Spinner";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  applicationId: string | null
}

export default function Activities({ className, applicationId, ...rest }: IProps) {
  const { data: activities, isLoading } = useGetMortgageActivitiesByApplicationIdQuery(applicationId)

  if (!applicationId || !activities) {
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
          .map((_, index) => {
            return (
              <div key={index}>
                <ActivityCard />
                <Hr className="my-4" />
              </div>
            );
          })}
      </div>
    </div>
  );
}
