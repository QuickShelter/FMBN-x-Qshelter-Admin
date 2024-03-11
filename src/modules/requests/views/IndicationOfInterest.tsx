import { IIndicationOfInterestRequest } from "@/types";
import Card from "@/modules/common/Card/Card";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import Hr from "@/modules/common/Hr";
import PageBackButton from "@/modules/common/PageBackButton";
import DetailCard from "@/modules/common/DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import Grid2 from "@/modules/common/layouts/Grid2";

interface IProps {
  request: IIndicationOfInterestRequest;
}

export default function IndicationOfInterest({ request }: IProps) {

  const interestedPerson = request.data

  return (
    <div className={'flex flex-col gap-8 p-4 py-5'}>
      <PageTitleAndActions>
        <PageTitle>Indication of Interest Request</PageTitle>
      </PageTitleAndActions>
      <Card className="flex flex-col">
        <div className="flex justify-between px-4 py-4 sm:px-8">
          <PageBackButton text="Back" />
        </div>
        <Hr />
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
              <Grid2>
                <DetailCard label="First Name" value={interestedPerson.first_name} />
                <DetailCard label="Last Name" value={interestedPerson.last_name} />
                <DetailCard label="Email" value={interestedPerson.email} />
                <DetailCard label="Phone Number" value={interestedPerson.phone} />
                <DetailCard label="Budget" value={interestedPerson.budget ? FormatHelper.nairaFormatter.format(interestedPerson.budget) : null} />
                <DetailCard label="Location" value={interestedPerson.location} />
                <DetailCard className="col-span-2 sm:max-w-[40ch]" label="Message" value={interestedPerson.message} />
              </Grid2>
            </div>}
        </div>
      </Card>
    </div>
  );
}
