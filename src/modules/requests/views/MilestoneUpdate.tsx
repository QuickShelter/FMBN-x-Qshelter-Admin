import Hr from "@/modules/common/Hr";
import PropertyLinkCard from "@/modules/common/PropertyLinkCard";
import { IMilestoneUpdateApprovalDto, IMilestoneUpdateRequest } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import PageTitle from "@/modules/common/PageTitle";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import PageBackButton from "@/modules/common/PageBackButton";
import Card from "@/modules/common/Card";
import PropertyHelper from "@/helpers/PropertyHelper";
import LargeImageSlider from "@/modules/common/LargeImageSlider";
import DetailCard from "@/modules/common/DetailCard";
import { useApproveMilestoneUpdateMutation, useGetUserByIdQuery } from "@/redux/services/api";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import Profile from "./Profile";
import Spinner from "@/modules/common/Spinner";
import MilestoneUpdateTemplate from "@/modules/common/export-templates/MilestoneUpdateTemplate";
import { Link } from "react-router-dom";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IMilestoneUpdateRequest
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function MilestoneUpdate({ className, request, ...rest }: IProps) {
  const { data: property } = request
  //const navigate = useNavigate()
  const images = PropertyHelper.getImages(property)
  const profile = useGetCurrentUser()

  const { data: user, isLoading: isLoadingUser } = useGetUserByIdQuery({ id: request?.requester_id ?? "", user_id: profile?.id ?? "" })

  const [approve, { isLoading: isApproving }] = useApproveMilestoneUpdateMutation()

  const handleApprove = async () => {
    const payload: IMilestoneUpdateApprovalDto = {
      id: request?.id ?? '',
      user_id: profile?.id ?? "",
    }

    const response = await approve(payload).unwrap();

    // if (response.ok) {
    //   navigate('/requests');
    // }

    return response
  }

  return <div {...rest} className={`${className} pr-6 gap-8 flex flex-col pb-10`}>
    <PageTitleAndActions>
      <PageTitle>Milestone Update Request</PageTitle>
    </PageTitleAndActions>
    <Card className="">
      <div className="flex justify-between px-4 py-4 sm:px-8">
        <PageBackButton text="Back" className="" />
      </div>
      <Hr />
      <div className="flex flex-col">
        <div className="p-4">
          {isLoadingUser && <Spinner size="md" />}
          {user && <Profile exportTemplate={<MilestoneUpdateTemplate request={request} user={user} />} handleApprove={handleApprove} request={request} className="" user={user} isLoading={isApproving} />}
        </div>
        <Hr className="my-8" />
        <div className="p-5">
          <Card className="p-8">
            <div className="grid grid-cols-2 gap-4">
              <h3 className="col-span-2 text-neutral-950 text-[15px] font-medium leading-snug">Milestone Update</h3>
              <DetailCard label="Title" value={request.title} />
              <DetailCard className="col-span-2" label="Description" value={request.full_desc} />
              {/* <DetailCard label="Current Milestone" value={'Not Started'} />
              <DetailCard label="New MIlestone" value={'Milestone 1'} />
            */}
              <DetailCard label="Video Link" value={
                request?.data?.youtube_url ? <Link to={request.data.youtube_url}>{request.data.youtube_url}</Link> : null
              } />
            </div>
            <div className="py-6 mt-1 flex flex-col gap-3">
              <div className="text-neutral-500 text-[13px] font-normal leading-tight">Images</div>
              <div className="flex gap-[10px]">
                <LargeImageSlider images={images?.map(url => ({ url }))} />
              </div>
            </div>

            <Hr className="my-5" />
            <PropertyLinkCard className="" _property={property} />
          </Card>
        </div>
      </div>
    </Card>
  </div>;
}
