import { IEmploymentHistory, IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import EmployerSummary from "./common/EmployerSummary";
import TabCard from "@/modules/common/layouts/TabCard";
import TabCardSectionHeading from "@/modules/common/typography/TabCardSectionHeading";
import Hr from "@/modules/common/Hr";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
  history: IEmploymentHistory[]
}

export default function EmploymentHistory({ className, user, history, ...rest }: IProps) {
  return (
    <TabCard {...rest} className={`${className} `}>
      <TabCardSectionHeading className="pb-6">Employment History</TabCardSectionHeading>
      <div className="flex flex-col">
        {history.map((item, index) => {
          console.log(item)

          return <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <EmployerSummary name={"Dummy"} employeeCount={43} />
              <div className="py-[2px] px-[10px] rounded text-sm  text-app-green-400 bg-[#F3F4F3]">Current</div>
            </div>
            {(index < history.length - 1) && <Hr className="my-5" />}
          </div>
        })}
      </div>
    </TabCard>
  );
}
