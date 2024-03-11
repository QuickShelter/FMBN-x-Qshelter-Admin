import FormatHelper from "@/helpers/FormatHelper";
import RequestHelper from "@/helpers/RequestHelper";
import DetailCard from "@/modules/common/DetailCard";
import Hr from "@/modules/common/Hr";
import Grid2 from "@/modules/common/layouts/Grid2";
import { IBuyOutrightlyRequest } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import UnitLinkCard from "../../Mortgage/UnitLinkCard";
import CurrencyHelper from "@/helpers/CurrencyHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IBuyOutrightlyRequest;
}

export default function Application({ className, request, ...rest }: IProps) {
  const unitIds = RequestHelper.getAffectedUnitIdsFromRequest(request)
  const building = RequestHelper.getTargetBuildingFromRequest(request)
  const property = request?.data?.property

  return (
    <div
      {...rest}
      className={`${className} card-no-mobile flex flex-col gap-2 sm:gap-5 py-6 sm:px-6 px-0 py-4`}
    >
      <h2 className="">Purchase Request</h2>
      <Grid2>
        <DetailCard label="Purchase Type" value={RequestHelper.typeToHumanMap[request.type]} />
        <DetailCard label="Property Code" value={request?.data.property?.id} />
        <DetailCard label="Price" value={request?.data.property?.price ? FormatHelper.nairaFormatter.format(request?.data.property?.price) : 'N/A'} />
        <DetailCard label="Total Price" value={request.data.total_price ? FormatHelper.nairaFormatter.format(request?.data?.total_price) : "N/A"} />
        <DetailCard label="Initial Payment" value={CurrencyHelper.format(request.data.initial_payment, request.data.initial_payment_currency) ?? "N/A"} />
        <DetailCard label="Initial Payment Made?" value={request.data.initial_payment_made ? "Yes" : "No"} />
        {/* <DetailCard label="Duration" value={request.data.contributions?.[0]?.duration ?? "N/A"} /> */}
      </Grid2>
      <Hr className="my-4" />
      {(property != null && building) ?
        unitIds?.map((unitId) => {
          return <UnitLinkCard unitId={`${unitId}`} building={building} _property={property} />
        })
        : null}
    </div>
  );
}
