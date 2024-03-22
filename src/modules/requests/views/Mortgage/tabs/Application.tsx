import FormatHelper from "@/helpers/FormatHelper";
import RequestHelper from "@/helpers/RequestHelper";
import DetailCard from "@/modules/common/DetailCard";
import Hr from "@/modules/common/Hr";
import { IMortgageRequest } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import UnitLinkCard from "../UnitLinkCard";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IMortgageRequest;
}

export default function Application({ className, request, ...rest }: IProps) {

  const applicationData = RequestHelper.getApplicationDataFromRequest(request)
  const unitIds = RequestHelper.getAffectedUnitIdsFromRequest(request)
  const building = RequestHelper.getTargetBuildingFromRequest(request)

  return (
    <div
      {...rest}
      className={`${className} card-no-mobile flex flex-col py-6 sm:px-6 px-0 py-4 gap-4`}
    >
      <h2 className="text-neutral-950 text-[15px] font-medium leading-snug font-semibold">Application Details</h2>
      <div className="sm:grid sm:grid-cols-2 grid grid-cols-2 gap-4">
        <DetailCard label="Type" value={RequestHelper.typeToHumanMap[request.type]} />
        <DetailCard label="Property Code" value={request?.data.property?.id} />
        <DetailCard label="TIN" value={request?.data?.mortgage?.mortgage_applicant?.tin} />
        <DetailCard label="Price" value={FormatHelper.nairaFormatter.format(request?.data.property?.price)} />
        <DetailCard label="Mortgage Amount" value={FormatHelper.nairaFormatter.format(applicationData?.mortgage_amount)} />
        {request.type === 'commercial_mortgage' ? <DetailCard label="Initial Payment" value={request.data.initial_payment} /> : null}
        <DetailCard label="Equity" value={FormatHelper.nairaFormatter.format(applicationData?.equity)} />
        <DetailCard label="Duration" value={`${applicationData?.duration ? `${applicationData?.duration} month(s)` : 'N/A'}`} />
        {RequestHelper.typeToInterestRateMap[request.type] ? <DetailCard label="Interest Rate" value={FormatHelper.percentageFormatter.format(RequestHelper.typeToInterestRateMap[request.type] / 100)} /> : null}
        <DetailCard label="Joint Application" value={request.data.mortgage.is_joint_mortgage ? 'Yes' : 'No'} />
        {/* <DetailCard label="Date" value={request.created_at ? FormatHelper.dateTimeFormatter.format(new Date(request.created_at)) : null} /> */}
      </div>
      <Hr className="my-4" />
      {(request?.data?.property != null && building) ?
        unitIds?.map((unitId) => {
          return <UnitLinkCard key={unitId} unitId={`${unitId}`} building={building} _property={request.data.property} />
        })
        : null}
    </div>
  );
}
