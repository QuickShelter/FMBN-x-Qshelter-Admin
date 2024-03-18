import { ISupportRequest } from "@/types";
import Card from "@/modules/common/Card/Card";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import Hr from "@/modules/common/Hr";
import PageBackButton from "@/modules/common/PageBackButton";
import DetailCard from "@/modules/common/DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import Grid2 from "@/modules/common/layouts/Grid2";
import { Link } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import ExportWrapper from "@/modules/common/ExportWrapper";
import SupportRequestTemplate from "@/modules/common/export-templates/SupportRequestTemplate";
import Button from "@/modules/common/Button";
import Export from "@/modules/common/icons/Export";

interface IProps {
  request: ISupportRequest;
}

export default function Support({ request }: IProps) {

  const data = request.data
  const { targetRef, toPDF } = usePDF()

  return (
    <div className={'flex flex-col gap-8 p-4 py-5'}>
      <PageTitleAndActions>
        <PageTitle>Support Request</PageTitle>
      </PageTitleAndActions>
      <Card className="flex flex-col">
        <div className="flex justify-between px-4 py-4 sm:px-8">
          <PageBackButton text="Back" />
        </div>
        <Hr />
        <div className="flex flex-col gap-4 p-4 sm:p-6">
          <ExportWrapper ref={targetRef}>
            <SupportRequestTemplate request={request} />
          </ExportWrapper>
          <div>
            <Button onClick={() => toPDF()} variant="outline" leadingIcon={<Export />}>
              Export
            </Button>
          </div>
          <div className=" card-no-mobile flex flex-col py-6 sm:px-6 px-0 py-4 gap-4">
            <h3 className="font-semibold">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <DetailCard className="col-span-2 sm:max-w-[40ch]" label="Description" value={request.full_desc} />
              <DetailCard label="Created" value={FormatHelper.dateFormatter.format(request.created_at)} />
            </div>
          </div>

          {data && <Hr className="sm:hidden" />}

          {data &&
            <div className=" card-no-mobile flex flex-col py-6 sm:px-6 px-0 py-4 gap-4">
              <h3>Details</h3>
              <Grid2>
                <DetailCard label="Name" value={data.name} />
                <DetailCard label="Email" value={
                  <Link to={`mailto:${data.email}`} >{data.email}</Link>
                } />
                <DetailCard label="Phone Number" value={data.phone} />
                <DetailCard className="col-span-2 sm:max-w-[40ch]" label="Message" value={data.message} />
              </Grid2>
            </div>}
        </div>
      </Card>
    </div>
  );
}
