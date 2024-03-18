import { ISupportRequest } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import DetailCard from "../DetailCard";
import RequestHelper from "@/helpers/RequestHelper";
import EnvironmentHelper from "@/helpers/EnvironmentHelper";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    request: ISupportRequest
}
const SupportRequestTemplate = ({ className, request, ...rest }: IProps) => {
    return < div {...rest} className={`${className} flex flex-col gap-4 px-6 py-6`} >
        <h1 className="font-lg">{EnvironmentHelper.PROJECT_OWNER} Support Request</h1>
        <div className="grid grid-cols-2 gap-4">
            <DetailCard label="Request Type" value={RequestHelper.typeToHumanMap[request.type]} />
            <DetailCard label="Property Code" value={request?.id} />
            <DetailCard label="Title" value={request.title} />
            <DetailCard label="Name" value={request.data?.name} />
            <DetailCard label="Email" value={request.data?.email} />
            <DetailCard className="col-span-2" label="Description" value={request.full_desc} />
            <DetailCard className="col-span-2" label="Message" value={request?.data?.message} />
        </div>
    </div >
}

export default SupportRequestTemplate