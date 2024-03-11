import AnalyticsHelper from "@/helpers/AnalyticsHelper";
import FormatHelper from "@/helpers/FormatHelper";
import { StatusHelper } from "@/helpers/StatusHelper";
import UserHelper from "@/helpers/UserHelper";
import Image from "@/modules/common/Image";
import LinkButton from "@/modules/common/LinkButton";
import Status from "@/modules/common/Status";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import { IProject } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  project: IProject;
}

export default function ProjectCard({ className, project, ...rest }: IProps) {

  return (
    <div {...rest} className={`${className} flex gap-6 justify-between`}>
      <div className="flex justify-between gap-6">
        <Image src={''} alt="" className="w-[100px] h-[100px] rounded-[9px]" />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="text-app-black-400 text-sm font-medium leading-[14px]">
              {project.proposedLocation}
            </div>
            <div className="text-app-green-300 text-sm font-normal leading-[14px]">
              {project.state} • {project.city}
            </div>
            <div>{AnalyticsHelper.getTotalTargetPriceFromProposedProperties(project.proposedProperties)}</div>
          </div>
          <div className="px-2 py-1.5 bg-zinc-100 rounded-[100px] justify-start items-start gap-2.5 inline-flex w-fit">
            <div className="text-neutral-950 text-xs font-medium leading-3">
              Created by {project?.developer?.user ? UserHelper.getFullNameOfDevApiUser(project?.developer?.user) : 'N/A'} • {FormatHelper.dateFormatter.format(project.createdAt)}
            </div>
          </div>
        </div>
      </div>
      <LinkButton to="" className="" trailingIcon={<ChevronRight />}>
        <Status
          status={project.status}
          background={StatusHelper.projectStatusToColor[project.status]}
          textColor={StatusHelper.projectStatusToTextColor[project.status]}
          className="text"
        />
      </LinkButton>
    </div>
  );
}
