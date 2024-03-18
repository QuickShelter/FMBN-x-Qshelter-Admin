import FormatHelper from "@/helpers/FormatHelper";
import RequestHelper from "@/helpers/RequestHelper";
import CenteredLoader from "@/modules/common/CenteredLoader";
import DetailCard from "@/modules/common/DetailCard";
import Grid2 from "@/modules/common/layouts/Grid2";
import { IRsaRequest, IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IRsaRequest;
  user: IUser
  isLoading?: boolean
}

export default function PensionInfo({ className, isLoading, user, request, ...rest }: IProps) {
  if (isLoading) {
    return <CenteredLoader size="md" />
  }

  const applicationData = RequestHelper.getApplicationDataFromRequest(request)


  return (
    <div
      {...rest}
      className={`${className} card-no-mobile flex flex-col gap-2 sm:gap-5 py-6 sm:px-6 px-0 py-4`}
    >
      <h2 className="">Pension Details</h2>
      <Grid2>
        <DetailCard label="Equity" value={FormatHelper.nairaFormatter.format(applicationData?.equity)} />
        <DetailCard label="Equity From RSA" value={FormatHelper.nairaFormatter.format(applicationData?.equity_from_rsa)} />
        <DetailCard label="Percentage (Max 25%)" value={applicationData?.rsa_percentage} />
        <DetailCard label="PFA" value={user?.pfa} />
        <DetailCard label="RSA Number" value={user?.rsa} />
        <DetailCard label="RSA Balance" value={applicationData?.rsa_balance} />
      </Grid2>
    </div>
  );
}
