import { IBuyOutrightlyRequest, IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import DetailCard from "../DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import StringHelper from "@/helpers/StringHelper";
import RequestHelper from "@/helpers/RequestHelper";
import CurrencyHelper from "@/helpers/CurrencyHelper";
import EnvironmentHelper from "@/helpers/EnvironmentHelper";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    request: IBuyOutrightlyRequest;
    user: IUser
}

const OutrightPurchaseRequestTemplate = ({ className, user, request, ...rest }: IProps) => {

    return < div {...rest} className={`${className} flex flex-col gap-4 px-6 py-6`} >
        <h1 className="font-lg">{EnvironmentHelper.PROJECT_OWNER} Outright Purchase Request</h1>
        <div className="grid grid-cols-2 gap-4">
            <DetailCard label="Purchase Type" value={RequestHelper.typeToHumanMap[request.type]} />
            <DetailCard label="Property Code" value={request?.data.property?.id} />
            <DetailCard label="Price" value={request?.data.property?.price ? FormatHelper.nairaFormatter.format(request?.data.property?.price) : 'N/A'} />
            <DetailCard label="Initial Payment" value={request.data.initial_payment ? FormatHelper.nairaFormatter.format(request?.data?.initial_payment) : "N/A"} />
            <DetailCard label="Initial Payment" value={CurrencyHelper.format(request.data.initial_payment, request.data.initial_payment_currency) ?? "N/A"} />
            <DetailCard label="Initial Payment Made?" value={request.data.initial_payment_made ? "Yes" : "No"} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
            <DetailCard
                label="Employment Status"
                value={StringHelper.stripUnderscores(user.employment_status)}
            />
            <DetailCard label="Years with current employer" value={user.years_of_work} />
            <DetailCard
                label="Monthly Net Salary"
                value={
                    user.monthly_net_salary
                        ? FormatHelper.nairaFormatter.format(user.monthly_net_salary)
                        : "NA"
                }
            />
            <DetailCard
                className="col-span-2"
                label="Years with current employer"
                value={user.years_of_work}
            />
            <DetailCard
                className="col-span-2"
                label="RSA Number"
                value={"-------"}
            />
            <DetailCard className="col-span-2" label="PFA" value={user.pfa} />
        </div>
    </div >
}

export default OutrightPurchaseRequestTemplate