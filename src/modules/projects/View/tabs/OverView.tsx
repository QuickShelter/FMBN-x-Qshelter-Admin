import StringHelper from "@/helpers/StringHelper";
import DetailCard from "@/modules/common/DetailCard";
import Hr from "@/modules/common/Hr";
import LinkButton from "@/modules/common/LinkButton";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import { IDeveloper, IProject } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Properties from "./Properties";
import AnalyticsHelper from "@/helpers/AnalyticsHelper";
import FormatHelper from "@/helpers/FormatHelper";
import Documents from "./Documents";
import { useGetDeveloperByIdQuery } from "@/redux/services/api";
import Spinner from "@/modules/common/Spinner";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  developer: IDeveloper;
  proposedDevelopment: IProject
}

export default function OverView({ className, proposedDevelopment, developer, ...rest }: IProps) {
  const { data: fullDeveloperData, isLoading } = useGetDeveloperByIdQuery(developer?.id ?? "")

  return (
    <div {...rest} className={`${className} flex flex-col gap-5`}>
      <div className={`card-no-mobile p-4 sm:p-8 flex flex-col gap-5`}>
        <h3 className="text-[15px] font-medium leading-snug">Developer</h3>
        <div className="flex justify-between items-start">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* <AvatarWithSrc
              className="w-[3rem] h-[3rem] rounded-[4px]"
              src={developer.logo}
            /> */}
            <div className="">
              {developer.businessName}
              <div>
                {StringHelper.stripUnderscores(developer.modeOfRegistration)}
              </div>
            </div>
          </div>
          {isLoading ? <Spinner size="md" /> : <LinkButton
            to={`/users/${fullDeveloperData?.user?.id}`}
            className="h-fit"
            variant="outline"
            trailingIcon={<ChevronRight />}
          >
            View
          </LinkButton>}
        </div>
        <Hr />
        <div className="flex gap-4 flex-col sm:grid sm:grid-cols-2">
          <DetailCard
            label="Years of Operation"
            value={developer?.yearsOfOperation}
          />
          <DetailCard
            label="Does it have Audited Accounts?"
            value={developer?.hasAuditedAccounts ? "Yes" : "No"}
          />
          <DetailCard
            label="Does any of the principals have a track record in Property Development?"
            value={developer?.hasTrackRecordInPropertyDevelopment ? "Yes" : "No"}
          />
        </div>
      </div>
      <Properties project={proposedDevelopment} />
      <Hr className="sm:hidden" />
      <div className="card-no-mobile flex flex-col gap-3 p-4 sm:p-8">
        <h3 className=" text-[15px] font-medium leading-snug">
          Project Summary
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <DetailCard
            label="Does the Land have a statutory C of O?"
            value={proposedDevelopment.landHasCoc ? "Yes" : "No"}
          />
          <DetailCard
            label="Do you have any other title which has been registered at the State Land registry where the proposed project is located ?"
            value={proposedDevelopment.developerHasAnotherTitleAtLocation ? "Yes" : "No"}
          />
          {/* <DetailCard
            label="Please, provide more information"
            value="I have two undeveloped properties on this land. My father sent me the C of O for both lands last year."
          /> */}
        </div>
        <Hr />
        <div className="flex flex-col gap-3 py-4">
          <h3 className=" text-[15px] font-medium leading-snug pb-[10px]">
            Funding
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <DetailCard
              label="Estimated Total Development Cost of the Project"
              value={FormatHelper.nairaFormatter.format(AnalyticsHelper.getTotalTargetPriceFromProposedProperties(proposedDevelopment.proposedProperties))}
            />
            <DetailCard
              label="Can you provide up to 20% of the Total Development Cost as equity contribution?"
              value={proposedDevelopment.developerCanProvideEquity ? "yes" : "No"}
            />
            <DetailCard
              label="Is this money Available?"
              value={proposedDevelopment.equityIsAvailableNow ? "Yes" : "No"}
            />
          </div>
        </div>
      </div>
      <Hr className="sm:hidden" />
      <Documents documents={proposedDevelopment.proposedDevelopmentDocuments} />
    </div>
  );
}
