import CurrencyHelper from "@/helpers/CurrencyHelper";
import FormatHelper from "@/helpers/FormatHelper";
import RequestHelper from "@/helpers/RequestHelper";
import DetailCard from "@/modules/common/DetailCard";
import Hr from "@/modules/common/Hr";
import Grid2 from "@/modules/common/layouts/Grid2";
import { IRequest } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    request: IRequest
}

export default function PaymentDetails({ request, className, ...rest }: IProps) {
    return (
        <div {...rest} className={`${className} flex flex-col gap-5`}>
            {RequestHelper.isBuyoutrightlyRequest(request) || RequestHelper.isMortgageRequest(request) ?
                <div className="flex flex-col gap-8">
                    <div className="card-no-mobile p-4">
                        <Grid2>
                            <DetailCard label="Initial Payment" value={CurrencyHelper.format(request.data.initial_payment, request.data.initial_payment_currency)} />
                            <DetailCard label="Total Price" value={FormatHelper.nairaFormatter.format(request.data.total_price)} />
                            <DetailCard label="Initial Payment Made?" value={request.data.initial_payment_made ? "Yes" : "No"} />
                        </Grid2>
                    </div>
                    <Hr className="sm:hidden" />
                    {request?.data?.milestones?.length > 0 ?
                        <div className="card-no-mobile p-4 flex flex-col gap-4">
                            <h3 className="text-lg font-semi-bold">Milestones</h3>
                            <div className="divide-y flex flex-col">
                                {request?.data?.milestones?.map(milestone => {
                                    return <Grid2 className="py-4">
                                        <DetailCard className="col-span-2" label="Description" value={milestone?.desc} />
                                        <DetailCard label="Date" value={milestone?.updated_at ? FormatHelper.dateTimeFormatter.format(new Date(milestone.updated_at)) : null} />
                                    </Grid2>
                                })}
                            </div>
                        </div> : null}

                </div> :
                <div>Request type not yet supported on this page</div>
            }
        </div>
    );
}
