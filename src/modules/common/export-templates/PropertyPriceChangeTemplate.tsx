import { IPriceUpdateRequest, IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import DetailCard from "../DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import StringHelper from "@/helpers/StringHelper";
import UserHelper from "@/helpers/UserHelper";
import EnvironmentHelper from "@/helpers/EnvironmentHelper";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    request: IPriceUpdateRequest;
    user: IUser
}
const PropertyPriceChangeTemplate = ({ className, user, request, ...rest }: IProps) => {

    return < div {...rest} className={`${className} flex flex-col gap-4 px-6 py-6`} >
        <h1 className="font-lg">{EnvironmentHelper.PROJECT_OWNER} Property Price Update Request</h1>
        <div className="grid grid-cols-2 gap-4">
            <DetailCard label="Price" value={request?.data?.price ? FormatHelper.nairaFormatter.format(request?.data?.price) : null} />
            <DetailCard label="Pending Price" value={request?.data?.pending_price ? FormatHelper.nairaFormatter.format(request?.data?.pending_price) : null} />
            <DetailCard label="Address" value={request?.data.address} />
            <DetailCard label="State" value={request?.data.state} />
            <DetailCard label="City" value={request?.data.city} />
            <DetailCard label="Date" value={request?.data.created_at ? FormatHelper.dateTimeFormatter.format(new Date(request?.data.created_at)) : null} />
            <DetailCard label="Status" value={StringHelper.stripUnderscores(request.status)} />
            <DetailCard label="Requested By" value={UserHelper.getFullName(user)} />
        </div>
    </div >
}

export default PropertyPriceChangeTemplate