import AnalyticsHelper from "@/helpers/AnalyticsHelper";
import FormatHelper from "@/helpers/FormatHelper";
import { StatusHelper } from "@/helpers/StatusHelper";
import UserHelper from "@/helpers/UserHelper";
import LinkButton from "@/modules/common/LinkButton";
import Status from "@/modules/common/Status";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import { IProject } from "@/types";
import { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  project: IProject;
}

export default function ProjectCard({ className, project, ...rest }: IProps) {
  const {
    status,
    createdAt
  } = project;

  const bedStats = useMemo(() => {
    return AnalyticsHelper.getMinAndMaxBedsFromProject(project)
  }, [project])

  const nUnits = useMemo(() => {
    return AnalyticsHelper.getNUnitsProposedProperties(project.proposedProperties)
  }, [project])

  const price = useMemo(() => {
    return AnalyticsHelper.getTotalTargetPriceFromProposedProperties(project.proposedProperties)
  }, [project])

  return (
    <div {...rest} className={`${className} flex gap-6 justify-between`}>
      <div className="flex justify-between gap-6">
        {/* <Image src={img} alt="" className="w-[100px] h-[100px] rounded-[9px]" /> */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="text-app-black-400 text-sm font-medium leading-[14px]">
              {project.proposedLocation}
            </div>
            <div className="text-app-green-300 text-sm font-normal leading-[14px]">
              {bedStats.min} - {bedStats.max} Beds • {nUnits} Units
            </div>
            <div>{FormatHelper.nairaFormatter.format(price)}</div>
          </div>
          <div className="px-2 py-1.5 bg-zinc-100 rounded-[100px] justify-start items-start gap-2.5 inline-flex w-fit">
            <div className="text-neutral-950 text-xs font-medium leading-3">
              Created by {project?.developer?.user ? UserHelper.getFullNameOfDevApiUser(project?.developer?.user) : 'N/A'} • {createdAt}
            </div>
          </div>
        </div>
      </div>
      <LinkButton to="" className="" trailingIcon={<ChevronRight />}>
        <Status
          status={status}
          background={StatusHelper.projectStatusToColor[status]}
          textColor={StatusHelper.projectStatusToTextColor[status]}
          className="text"
        />
      </LinkButton>
    </div>
  );
}
