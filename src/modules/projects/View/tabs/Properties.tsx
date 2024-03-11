import AnalyticsHelper from "@/helpers/AnalyticsHelper";
import FormatHelper from "@/helpers/FormatHelper";
import DetailCard from "@/modules/common/DetailCard";
import Dot from "@/modules/common/Dot";
import Hr from "@/modules/common/Hr";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import { IProject } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  project: IProject;
}

export default function Properties({ className, project, ...rest }: IProps) {
  const properties = project.proposedProperties

  return (
    <div {...rest} className={`card-no-mobile p-4 sm:p-8 flex flex-col gap-5 ${className}`}>
      <h3 className=" text-[15px] font-medium leading-snug">Project</h3>
      <Link to="" className="flex justify-between items-center group">
        <div className="flex gap-4 w-full justify-between p-0">
          <div className="flex gap-4 items-start">
            {/* <AvatarWithSrc className="w-[3.5rem] h-[3.5rem] rounded-md" /> */}
            <div className="flex flex-col gap-1">
              <div className="text-sm font-semibold leading-[21px]">
                {project.proposedLocation}
              </div>
              <div className="text-app-green-300 font-normal leading-tight text-[13px]">
                {AnalyticsHelper.getNUnitsProposedProperties(properties)} Units <Dot /> {FormatHelper.nairaFormatter.format(AnalyticsHelper.getTotalTargetPriceFromProposedProperties(properties))}
              </div>
            </div>
          </div>
        </div>
        <ChevronRight className="thrust-child" />
      </Link>
      <h3 className=" text-[15px] font-normal leading-snug">Proposed Properties</h3>
      <div className="grid grid-cols-2 gap-4">
        {properties.map((property) => {
          return <DetailCard key={property.id} label={property.type ?? "N/A"} value={`${property.nUnits} Units • ${FormatHelper.nairaFormatter.format(property.targetPrice)} `} />;
        })}
      </div>
      {properties && properties.length > 0 && <Hr />}
      <div className="grid grid-cols-2 gap-4">
        <DetailCard label="Proposed Location" value={project.proposedLocation} />
        <DetailCard label="Is the location marketable" value={project.locationIsMarketable ? "Yes" : "No"} />
        <DetailCard label="State" value={project.state} />
        <DetailCard label="City" value={project.city} />
      </div>
      {/* AMENITIES */}
      {/* <Hr className="my-4" />
      <div className="flex flex-col gap-3">
        <h3 className=" text-[15px] font-medium leading-snug">Amenities</h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <CheckedText text="24Hrs Security" />
          <CheckedText text="Big Compound" />
          <CheckedText text="All Rooms Ensuite" />
          <CheckedText text="C of O" />
          <CheckedText text="Boys Quarter" />
        </div>
      </div> */}
    </div>
  );
}
