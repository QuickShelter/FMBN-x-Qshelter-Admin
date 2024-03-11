import FormatHelper from "@/helpers/FormatHelper";
import DetailCard from "@/modules/common/DetailCard";
import Hr from "@/modules/common/Hr";
import PropertyLinkCard from "@/modules/common/PropertyLinkCard";
import Grid2 from "@/modules/common/layouts/Grid2";
import { IBuyOutrightlyRequest, IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IBuyOutrightlyRequest;
  user: IUser
}

export default function PensionInfo({ className, user, request, ...rest }: IProps) {
  return (
    <div
      {...rest}
      className={`${className} card-no-mobile flex flex-col gap-2 sm:gap-5 py-6 sm:px-6 px-0 py-4`}
    >
      <h2 className="">Pension Details</h2>
      <Grid2>
        <DetailCard label="Amount Requested" value={FormatHelper.nairaFormatter.format(request.data.initial_payment)} />
        <DetailCard label="Percentage (Max 25%)" value={request?.data.property?.id} />
        <DetailCard label="PFA" value={user?.pfa} />
        <DetailCard label="RSA Number" value={user?.rsa} />
        <DetailCard label="RSA Balance" value={"--------"} />
      </Grid2>
      <Hr className="my-4" />
      {request?.data?.property && (
        <PropertyLinkCard _property={request?.data?.property} />
      )}
    </div>
  );
}
