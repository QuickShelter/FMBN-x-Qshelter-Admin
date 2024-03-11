import Card from "@/modules/common/Card/Card";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import Hr from "@/modules/common/Hr";
import PageBackButton from "@/modules/common/PageBackButton";
import DetailCard from "@/modules/common/DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import Grid2 from "@/modules/common/layouts/Grid2";
import { IApplicationFormRequest } from "@/types";
import StringHelper from "@/helpers/StringHelper";
import Button from "@/modules/common/Button";
import { usePDF } from "react-to-pdf";
import Export from "@/modules/common/icons/Export";
import ExportWrapper from "@/modules/common/ExportWrapper";
import ApplicationFormRequestTemplate from "@/modules/common/export-templates/ApplicationFormRequestTemplate";

interface IProps {
  request: IApplicationFormRequest;
}

export default function ApplicationFormRequest({ request }: IProps) {

  const applicationFormData = request.data
  const { targetRef, toPDF } = usePDF()

  return (
    <div className={'flex flex-col gap-8 p-4 py-5'}>
      <PageTitleAndActions>
        <PageTitle>Application Form Request</PageTitle>
      </PageTitleAndActions>
      <ExportWrapper ref={targetRef}>
        {request ? <ApplicationFormRequestTemplate request={request} /> : <></>}
      </ExportWrapper>
      <Card className="flex flex-col">
        <div className="flex justify-between px-4 py-4 sm:px-8">
          <PageBackButton text="Back" />
        </div>
        <Hr />
        <div className="flex flex-col gap-4 p-4 sm:p-6">

          <div>
            <Button onClick={() => toPDF()} variant="outline" leadingIcon={<Export />}>
              Export
            </Button>
          </div>
          <div className=" card-no-mobile flex flex-col py-6 sm:px-6 px-0 py-4 gap-4">
            <h3 className="font-semibold">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <DetailCard className="col-span-2 sm:max-w-[40ch]" label="Description" value={request.full_desc} />
              <DetailCard label="Property Type" value={StringHelper.stripUnderscores(applicationFormData.finished_type)} />
              <DetailCard label="Payment Method" value={StringHelper.stripUnderscores(applicationFormData.payment_method)} />
              <DetailCard label="Created" value={FormatHelper.dateFormatter.format(request.created_at)} />
            </div>
          </div>

          {applicationFormData &&
            <div className=" card-no-mobile flex flex-col py-6 sm:px-6 px-0 py-4 gap-4">
              <h3 className="font-semibold">Applicant Details</h3>
              <Grid2>
                <DetailCard label="Name" value={applicationFormData.name} />
                <DetailCard label="Gender" value={StringHelper.stripUnderscores(applicationFormData.gender)} />
                <DetailCard label="Email" value={applicationFormData.email} />
                <DetailCard label="Age" value={applicationFormData.age} />
                <DetailCard label="Address" value={applicationFormData.address} />
                <DetailCard label="State of Origin" value={applicationFormData.state_of_origin} />
                <DetailCard label="City" value={applicationFormData.city} />
                <DetailCard label="Occupation" value={applicationFormData.occupation} />
                <DetailCard label="Nationality" value={applicationFormData.nationality} />
              </Grid2>
            </div>}

          {applicationFormData &&
            <div className=" card-no-mobile flex flex-col py-6 sm:px-6 px-0 py-4 gap-4">
              <h3 className="font-semibold">Next of Kin Details</h3>
              <Grid2>
                <DetailCard label="Next of Kin" value={applicationFormData.next_of_kin} />
                <DetailCard label="Next of Kin Email" value={applicationFormData.next_of_kin_email} />
                <DetailCard label="Email" value={applicationFormData.email} />
                <DetailCard label="Next of Kin Address" value={applicationFormData.next_of_kin_address} />
                <DetailCard label="Next of Kin Phone Number" value={applicationFormData.next_of_kin_phone} />
                <DetailCard label="Next of Kin Relationship" value={applicationFormData.next_of_kin_relationship} />
              </Grid2>
            </div>}
        </div>
      </Card>
    </div>
  );
}
