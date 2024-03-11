import { IPriceUpdateRequest, IPropertyPriceChangeApprovalDto } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Hr from "@/modules/common/Hr";
import Card from "@/modules/common/Card";
import DetailCard from "@/modules/common/DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import PropertyLinkCard from "@/modules/common/PropertyLinkCard";
import { useApprovePriceChangeMutation, useGetPropertyByIdQuery, useGetUserByIdQuery } from "@/redux/services/api";
import { useAppSelector } from "@/redux/store";
import Profile from "./Profile";
import Spinner from "@/modules/common/Spinner";
import PageBackButton from "@/modules/common/PageBackButton";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import PageTitle from "@/modules/common/PageTitle";
import Grid2 from "@/modules/common/layouts/Grid2";
import PropertyPriceChangeTemplate from "@/modules/common/export-templates/PropertyPriceChangeTemplate";
import { useNavigate } from "react-router-dom";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IPriceUpdateRequest
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function PropertyPriceChange({ className, request, ...rest }: IProps) {
  const { profile } = useAppSelector((state) => state.auth);
  const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery({
    id: request.data.poster_id ?? "",
    user_id: profile?.id ?? "",
  });
  const navigate = useNavigate()

  const { data: property, isLoading: isPropertyLoading } = useGetPropertyByIdQuery(request?.data?.project_property_id ?? "");
  const [approve, { isLoading: isApproving }] = useApprovePriceChangeMutation();

  const handleApprove = async () => {
    const payload: IPropertyPriceChangeApprovalDto = {
      id: request?.data?.id ?? '',
      user_id: profile?.id ?? "",
    }

    const response = await approve(payload).unwrap();

    if (response.ok) {
      navigate('/requests');
    }

    return response
  }

  return <div {...rest} className={`${className} flex flex-col gap-6 p-4 py-5`}>
    <PageTitleAndActions>
      <PageTitle>Property Price Update Request</PageTitle>
    </PageTitleAndActions>
    <Card className="">
      <div className="flex justify-between px-4 py-4 sm:px-8">
        <PageBackButton text="Back" className="" />
      </div>
      <Hr />
      <div className="px-4 sm:px-[3rem] py-4 sm:py-6 flex flex-col gap-4">
        {user && <Profile exportTemplate={<PropertyPriceChangeTemplate user={user} request={request} />} handleApprove={handleApprove} request={request} className="" user={user} isLoading={isApproving} />}
        {isUserLoading && <Spinner size="sm" />}
      </div>
      <Hr />

      <div className="p-4 sm:p-6">
        <div className="card-no-mobile p4 sm:p-6 flex flex-col gap-4">
          <h2 className="font-semibold">Request Details</h2>
          <Grid2>
            <DetailCard label="Price" value={request?.data?.price ? FormatHelper.nairaFormatter.format(request?.data?.price) : null} />
            <DetailCard label="Pending Price" value={request?.data?.pending_price ? FormatHelper.nairaFormatter.format(request?.data?.pending_price) : null} />
            <DetailCard label="Address" value={request?.data.address} />
            <DetailCard label="State" value={request?.data.state} />
            <DetailCard label="City" value={request?.data.city} />
            <DetailCard label="Date" value={request?.data.created_at ? FormatHelper.dateTimeFormatter.format(new Date(request?.data.created_at)) : null} />
          </Grid2>
          <div className="flex flex-col">
            {property && <Hr className="my-4" />}
            {isPropertyLoading && <div className="flex flex-1 justify-center items-center"><Spinner size="md" /></div>}
            {property && <PropertyLinkCard _property={property} />}
          </div>
        </div>
      </div>
    </Card>
  </div>
}
