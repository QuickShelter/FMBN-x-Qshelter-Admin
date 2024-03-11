import { IMilestoneUpdateRequest, IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import DetailCard from "../DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import StringHelper from "@/helpers/StringHelper";
import RequestHelper from "@/helpers/RequestHelper";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    request: IMilestoneUpdateRequest;
    user: IUser
}
const MilestoneUpdateTemplate = ({ className, user, request, ...rest }: IProps) => {

    return < div {...rest} className={`${className} flex flex-col gap-4 px-6 py-6`} >
        <h1 className="font-lg">Renewed Hope Milestone Update Request</h1>
        <div className="grid grid-cols-2 gap-4">
            <DetailCard label="Request Type" value={RequestHelper.typeToHumanMap[request.type]} />
            <DetailCard label="Property Code" value={request?.data?.id} />
            <DetailCard label="Title" value={request.title} />
            <DetailCard className="col-span-2" label="Description" value={request.full_desc} />
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

export default MilestoneUpdateTemplate