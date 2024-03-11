import FormatHelper from "@/helpers/FormatHelper";
import RequestHelper from "@/helpers/RequestHelper";
import StringHelper from "@/helpers/StringHelper";
import DetailCard from "@/modules/common/DetailCard";
import { IMortgageRequest, IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IMortgageRequest;
  user: IUser
}

export default function EmploymentInformation({
  className,
  user,
  request,
  ...rest
}: IProps) {
  const applicationData = RequestHelper.getApplicationDataFromRequest(request)
  const monthlySalary = applicationData?.net_monthly_salary
  //const monthlySalary = user.monthly_net_salary

  return (
    <div
      {...rest}
      className={`${className} card-no-mobile flex flex-col gap-2 sm:gap-5 sm:py-6 sm:px-6 px-0 py-4`}
    >
      <h2>Employment Information</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <DetailCard
          label="Employment Status"
          value={StringHelper.stripUnderscores(StringHelper.stripUnderscores(request?.data?.mortgage?.mortgage_applicant?.employment_status ?? user.employment_status))}
        />
        <DetailCard
          label="Monthly Net Salary"
          value={
            monthlySalary
              ? FormatHelper.nairaFormatter.format(monthlySalary)
              : "NA"
          }
        />
        <DetailCard label="Years with current employer" value={user.years_of_work} />
        {RequestHelper.isRsaRequest(request) &&
          <DetailCard
            className="col-span-2"
            label="RSA Number"
            value={applicationData?.rsa_balance}
          />}
        {request?.data?.mortgage?.mortgage_applicant?.pfa && <DetailCard className="col-span-2" label="PFA" value={StringHelper.stripUnderscores(request?.data?.mortgage?.mortgage_applicant?.pfa)} />}
      </div>
    </div>
  );
}
