import FormatHelper from "@/helpers/FormatHelper";
import StringHelper from "@/helpers/StringHelper";
import DetailCard from "@/modules/common/DetailCard";
import { IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

export default function EmploymentInformation({
  className,
  user,
  ...rest
}: IProps) {
  return (
    <div
      {...rest}
      className={`${className} card-no-mobile flex flex-col gap-2 sm:gap-5 sm:py-6 sm:px-6 px-0 py-4`}
    >
      <h2>Employment Information</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <DetailCard
          label="Employment Status"
          value={StringHelper.stripUnderscores(user.employment_status)}
        />
        <DetailCard label="Years with current employer" value={user.years_of_work} />
        <DetailCard
          label="Monthly Net Salary"
          value={
            user.monthly_net_salary
              ? FormatHelper.nairaFormatter.format(user.monthly_net_salary)
              : "NA"
          }
        />
        <DetailCard
          className="col-span-2"
          label="Years with current employer"
          value={user.years_of_work}
        />
        <DetailCard
          className="col-span-2"
          label="RSA Number"
          value={"-------"}
        />
        <DetailCard className="col-span-2" label="PFA" value={user.pfa} />
      </div>
    </div>
  );
}
