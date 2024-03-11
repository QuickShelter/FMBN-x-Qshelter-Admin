import Grid2 from "@/modules/common/layouts/Grid2";
import DetailCard from "@/modules/common/DetailCard";
import Card from "@/modules/common/Card";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IApplication, IApplicationData } from "@/types";
import FormatHelper from "@/helpers/FormatHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  application: IApplication;
}

export default function EmploymentInfo({ application }: IProps) {
  const applicationData: IApplicationData = application.application_data
    ? JSON.parse(application.application_data)
    : null;

  return (
    <Card className="p-5 flex flex-col gap-6">
      <h2 className="color-app-dark-blue-500 text-base font-bold leading-tight">
        Employment Information
      </h2>
      <Grid2>
        <DetailCard
          label="Employment Status"
          value={application.applicant.employment_status}
        />
        <DetailCard
          label="Net Salary"
          value={FormatHelper.nairaFormatter.format(
            applicationData.net_monthly_salary
          )}
        />
        <DetailCard label="RSA" value={applicationData.rsa_balance} />
        <DetailCard label="PFA" value={application.applicant.pfa} />
      </Grid2>
    </Card>
  );
}
