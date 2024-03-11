import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IApplicant } from "@/types";
import DetailCard from "@/modules/common/DetailCard/DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import UserHelper from "@/helpers/UserHelper";
import { useGetUserByIdQuery } from "@/redux/services/api";
import Card from "@/modules/common/Card";
import { useAppSelector } from "@/redux/store";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  applicant: IApplicant;
}

export default function PersonalInfo({ applicant, ...rest }: IProps) {
  const { profile } = useAppSelector((state) => state.auth);
  const { data: user } = useGetUserByIdQuery({
    id: applicant.user_id ?? "",
    user_id: profile?.id ?? "",
  });
  return (
    <Card {...rest} className={`${rest.className} p-5 flex flex-col gap-6 p-5`}>
      <h2 className="color-app-dark-blue-500 text-base font-bold leading-tight">
        Employment Information
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {user && (
          <DetailCard
            className="col-span-2"
            label="Name"
            value={`${UserHelper.getFullName(user)}`}
          />
        )}
        <DetailCard
          label="Employment Status"
          value={applicant?.employment_status}
        />
        <DetailCard label="Date of Birth" value={applicant?.date_of_birth} />
        <DetailCard
          label="Net Salary"
          value={
            applicant?.monthly_net_salary
              ? FormatHelper.nairaFormatter.format(
                  applicant?.monthly_net_salary
                )
              : "N/A"
          }
        />
        <DetailCard label="RSA/PFA" value={applicant?.pfa} />
      </div>
    </Card>
  );
}
