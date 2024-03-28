import FormatHelper from "@/helpers/FormatHelper";
import RequestHelper from "@/helpers/RequestHelper";
import DetailCard from "@/modules/common/DetailCard";
import Hr from "@/modules/common/Hr";
import { IMortgageRequest } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import UnitLinkCard from "../UnitLinkCard";
import MortgageHelper from "@/helpers/MortgageHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IMortgageRequest;
}

export default function Application({ className, request, ...rest }: IProps) {

  const applicationData = RequestHelper.getApplicationDataFromRequest(request)
  const unitIds = RequestHelper.getAffectedUnitIdsFromRequest(request)
  const building = RequestHelper.getTargetBuildingFromRequest(request)

  const values = MortgageHelper.getMortgageValues(applicationData, request.data.total_price)

  return (
    <div
      {...rest}
      className={`${className} card-no-mobile flex flex-col py-6 sm:px-6 px-0 py-4 gap-4`}
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-neutral-950 text-[15px] font-medium leading-snug font-semibold">Application Details</h2>
        <div className="sm:grid sm:grid-cols-2 grid grid-cols-2 gap-4">
          <DetailCard label="Type" value={RequestHelper.typeToHumanMap[request.type]} />
          <DetailCard label="Property Code" value={request?.data.property?.id} />
          <DetailCard label="Age" value={applicationData?.age} />
          <DetailCard label="TIN" value={request?.data?.mortgage?.mortgage_applicant?.tin} />

          <DetailCard label="Price" value={FormatHelper.nairaFormatter.format(request?.data.total_price)} />
          <DetailCard label="Mortgage Amount" value={FormatHelper.nairaFormatter.format(values?.mortgage)} />
          {request.type === 'commercial_mortgage' ? <DetailCard label="Initial Payment" value={request.data.initial_payment} /> : null}
          <DetailCard label="Equity Percentage" value={FormatHelper.percentageFormatter.format(Number(applicationData?.equity_percentage) / 100)} />
          <DetailCard label="Equity From RSA" value={FormatHelper.nairaFormatter.format(values.equityFromRsa)} />
          <DetailCard label="Cash" value={FormatHelper.nairaFormatter.format(values?.cash)} />
          <DetailCard label="Equity" value={FormatHelper.nairaFormatter.format(values?.equity)} />
          <DetailCard label="Duration" value={`${applicationData?.duration ? `${applicationData?.duration} month(s)` : 'N/A'}`} />
          {RequestHelper.typeToInterestRateMap[request.type] ? <DetailCard label="Interest Rate" value={FormatHelper.percentageFormatter.format(RequestHelper.typeToInterestRateMap[request.type] / 100)} /> : null}
          <DetailCard label="Joint Application" value={request.data.mortgage.is_joint_mortgage ? 'Yes' : 'No'} />
        </div>
      </div>
      <Hr />
      {
        RequestHelper.isMortgageRequest(request) && applicationData?.rsa_balance && (applicationData?.rsa_balance > 0) ?
          <>
            <div className="flex flex-col gap-4">
              <h2 className="text-neutral-950 text-[15px] font-medium leading-snug font-semibold">RSA Details</h2>
              <div className="sm:grid sm:grid-cols-2 grid grid-cols-2 gap-4">
                <DetailCard label="RSA Balance" value={FormatHelper.nairaFormatter.format(applicationData?.rsa_balance)} />
                <DetailCard label="RSA Percentage" value={applicationData?.rsa_percentage ? FormatHelper.percentageFormatter.format(applicationData?.rsa_percentage / 100) : null} />
                <DetailCard label="Equity Contribution from RSA Balance" value={applicationData?.equity_from_rsa ? FormatHelper.nairaFormatter.format(applicationData?.equity_from_rsa) : null} />
              </div>
            </div>
            <Hr className="my-4" />
          </> : null
      }
      {(request?.data?.property != null && building) ?
        unitIds?.map((unitId) => {
          return <UnitLinkCard key={unitId} unitId={`${unitId}`} building={building} _property={request.data.property} />
        })
        : null}
    </div>
  );
}
