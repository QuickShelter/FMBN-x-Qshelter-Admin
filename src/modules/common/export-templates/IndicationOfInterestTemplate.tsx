import { IIndicationOfInterestRequest, IInterestedPerson } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import DetailCard from "../DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import PageTitleAndActions from "../PageTitleAndActions";
import PageTitle from "../PageTitle";
import Card from "../Card";
import Hr from "../Hr";
import EnvironmentHelper from "@/helpers/EnvironmentHelper";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    request: IIndicationOfInterestRequest;
    interestedPerson: IInterestedPerson
}

const IndicationOfInterestTemplate = ({ className, interestedPerson, request, ...rest }: IProps) => {

    return <div {...rest} className={`${className} flex flex-col gap-8 p-4 py-5`}>
        <PageTitleAndActions>
            <PageTitle>{EnvironmentHelper.PROJECT_OWNER} Indication of Interest Request</PageTitle>
        </PageTitleAndActions>
        <Card className="flex flex-col">
            <div className="flex flex-col gap-4 p-4 sm:p-6">
                <div className=" card-no-mobile flex flex-col py-6 sm:px-6 px-0 py-4 gap-4">
                    <h3 className="font-semibold">Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <DetailCard className="col-span-2 sm:max-w-[40ch]" label="Description" value={request.full_desc} />
                        <DetailCard label="Created" value={FormatHelper.dateFormatter.format(request.created_at)} />
                    </div>
                </div>

                {interestedPerson && <Hr />}

                {interestedPerson &&
                    <div className=" card-no-mobile flex flex-col py-6 sm:px-6 px-0 py-4 gap-4">
                        <h3>Details</h3>
                        <div className="grid grid-cols-2">
                            <DetailCard label="First Name" value={interestedPerson.first_name} />
                            <DetailCard label="Last Name" value={interestedPerson.last_name} />
                            <DetailCard label="Email" value={interestedPerson.email} />
                            <DetailCard label="Phone Number" value={interestedPerson.phone} />
                            <DetailCard label="Budget" value={interestedPerson.budget ? FormatHelper.nairaFormatter.format(interestedPerson.budget) : null} />
                            <DetailCard label="Location" value={interestedPerson.location} />
                            <DetailCard className="col-span-2 sm:max-w-[40ch]" label="Message" value={interestedPerson.message} />
                        </div>
                    </div>}
            </div>
        </Card>
    </div>
}

export default IndicationOfInterestTemplate