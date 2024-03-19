import Card from "@/modules/common/Card/Card";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import Hr from "@/modules/common/Hr";
import PageBackButton from "@/modules/common/PageBackButton";
import DetailCard from "@/modules/common/DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import StringHelper from "@/helpers/StringHelper";
import { IApplicationFormWithFileRequest } from "@/types";
import DocumentViewControl from "@/modules/common/DocumentViewControl";

interface IProps {
  request: IApplicationFormWithFileRequest;
}

export default function ApplicationFormRequestWithFile({ request }: IProps) {
  const applicationFormData = request.data

  return (
    <div className={'flex flex-col gap-8 p-4 py-5'}>
      <PageTitleAndActions>
        <PageTitle>Application Form Request</PageTitle>
      </PageTitleAndActions>
      <Card className="flex flex-col">
        <div className="flex justify-between px-4 py-4 sm:px-8">
          <PageBackButton text="Back" />
        </div>
        <Hr />
        <div className="flex flex-col gap-4 p-4 sm:p-6">

          <div>
            {request.data.form_link && <DocumentViewControl url={request.data.form_link} />}
          </div>
          <div className=" card-no-mobile flex flex-col py-6 sm:px-6 px-0 py-4 gap-4">
            <h3 className="font-semibold">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <DetailCard className="col-span-2 sm:max-w-[40ch]" label="Description" value={request.full_desc} />
              <DetailCard label="Applicant Name" value={StringHelper.stripUnderscores(applicationFormData.name)} />
              <DetailCard label="Applicant Email" value={StringHelper.stripUnderscores(applicationFormData.email)} />
              <DetailCard label="State" value={StringHelper.stripUnderscores(applicationFormData.state)} />
              <DetailCard label="Project" value={StringHelper.stripUnderscores(applicationFormData.project)} />
              <DetailCard label="Created" value={FormatHelper.dateFormatter.format(request.created_at)} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
