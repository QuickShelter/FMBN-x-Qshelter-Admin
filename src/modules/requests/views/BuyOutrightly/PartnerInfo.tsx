import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IPartner } from "@/types";
import DetailCard from "@/modules/common/DetailCard/DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import UserHelper from "@/helpers/UserHelper";
import { useGetUserByIdQuery } from "@/redux/services/api";
import Card from "@/modules/common/Card";
import { useAppSelector } from "@/redux/store";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  partner: IPartner;
}

export default function PartnerInfo({ partner, ...rest }: IProps) {
  const { profile } = useAppSelector((state) => state.auth);
  const { data: user } = useGetUserByIdQuery({
    id: partner.user_id ?? "",
    user_id: profile?.id ?? "",
  });

  return (
    <Card {...rest} className={`${rest.className} p-5 flex flex-col gap-6 p-5`}>
      <h2 className="color-app-dark-blue-500 text-base font-bold leading-tight">
        Partner Information
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
          value={partner?.employment_status}
        />
        <DetailCard label="Date of Birth" value={partner?.date_of_birth} />
        <DetailCard
          label="Net Salary"
          value={
            partner?.monthly_net_salary
              ? FormatHelper.nairaFormatter.format(partner?.monthly_net_salary)
              : "N/A"
          }
        />
        <DetailCard label="RSA/PFA" value={partner?.pfa} />
        <DetailCard
          label="Current Employer"
          value={partner?.current_employer}
        />
        <DetailCard label="Former Employer" value={partner?.former_employer} />
        <DetailCard label="Industry" value={partner?.industry} />
        <DetailCard
          label="Years in Business"
          value={partner?.years_in_business}
        />
        <DetailCard
          label="Have Pension"
          value={partner?.have_pension ? "Yes" : "No"}
        />
      </div>
    </Card>
  );
}
