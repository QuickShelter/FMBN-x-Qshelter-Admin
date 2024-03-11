import { IApplicationFormRequest } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import DetailCard from "../DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import PageTitleAndActions from "../PageTitleAndActions";
import PageTitle from "../PageTitle";
import StringHelper from "@/helpers/StringHelper";
import Grid2 from "../layouts/Grid2";
import EnvironmentHelper from "@/helpers/EnvironmentHelper";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    request: IApplicationFormRequest;
}

const ApplicationFormRequestTemplate = ({ className, request, ...rest }: IProps) => {
    const data = request?.data

    return <div {...rest} className={`${className} flex flex-col gap-8 p-4 py-5`}>
        <PageTitleAndActions>
            <PageTitle>{EnvironmentHelper.PROJECT_OWNER} Application Form Request</PageTitle>
        </PageTitleAndActions>
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Summary</h3>
                <Grid2 className="gap-6">
                    <DetailCard className="col-span-2 sm:max-w-[40ch]" label="Description" value={request.full_desc} />
                    <DetailCard label="Created" value={FormatHelper.dateFormatter.format(request.created_at)} />
                </Grid2>
            </div>

            {data && <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Interest</h3>
                <Grid2 className="gap-6">
                    <DetailCard label="Property Type" value={StringHelper.stripUnderscores(data.property_type)} />
                    <DetailCard label="Payment Method" value={StringHelper.stripUnderscores(data.payment_method)} />
                </Grid2>
            </div>}

            {data && <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Applicant</h3>
                <Grid2 className="gap-6">
                    <DetailCard label="First Name" value={data?.name} />
                    <DetailCard label="Age" value={data.age} />
                    <DetailCard label="Address" value={data.address} />
                    <DetailCard label="City" value={data.city} />
                    <DetailCard label="Email" value={data.email} />
                    <DetailCard label="Occupation" value={data.occupation} />
                    <DetailCard label="Employment State" value={data.employment_status} />
                    <DetailCard label="State of Origin" value={data.state_of_origin} />
                    <DetailCard label="Nationality" value={data.nationality} />
                </Grid2>
            </div>}

            {data && <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Next of Kin</h3>
                <Grid2 className="gap-6">
                    <DetailCard label="Next of Kin" value={data.next_of_kin} />
                    <DetailCard label="Next of Kin Email" value={data.next_of_kin_email} />
                    <DetailCard label="Email" value={data.email} />
                    <DetailCard label="Next of Kin Address" value={data.next_of_kin_address} />
                    <DetailCard label="Next of Kin Phone Number" value={data.next_of_kin_phone} />
                    <DetailCard label="Next of Kin Relationship" value={data.next_of_kin_relationship} />
                </Grid2>
            </div>}
        </div>
    </div >
}

export default ApplicationFormRequestTemplate