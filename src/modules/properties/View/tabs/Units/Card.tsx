import ChevronRight from "@/modules/common/icons/ChevronRight";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import LockStat from "./LockStat";
import { IBuilding } from "@/types";
import FormatHelper from "@/helpers/FormatHelper";
import AnalyticsHelper from "@/helpers/AnalyticsHelper";
import Dot from "@/modules/common/Dot";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  building: IBuilding;
  propertyId: string
}

export default function Card({ className, propertyId, building, ...rest }: IProps) {

  return (
    <div
      {...rest}
      className={`${className} group flex flex-col gap-2 sm:gap-6 py-6 py-4 sm:flex-row justify-between`}
    >
      <Link data-test-id="building-card-link" to={`/properties/${propertyId}/building/${building.id}/units`} className="flex flex-1 flex-col">
        <div className="flex gap-6 flex-1">
          {/* <Image
            className="w-[100px] h-[100px] rounded-[9px]"
            alt=""
            src=""
          /> */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="text-neutral-950 text-md font-semibold leading-[14px]">
              {building.name}
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-neutral-950 text-sm font-medium leading-[14px]">
                {building.apartment_count} units
              </div>
              {/* <div className="text-neutral-500 text-sm font-normal leading-[14px]">
                {bedStatDisplay} Bedrooms
              </div> */}
              <Dot />
              <div className="text-neutral-950 text-sm font-semibold leading-[14px]">
                {FormatHelper.nairaFormatter.format(AnalyticsHelper.getTargetPriceOfBuilding(building))}
              </div>
            </div>
            <LockStat className="mt-4" nLockedUnits={AnalyticsHelper.getNLockedUnitsOfBuilding(building)} nUnits={building.apartment_count ?? 0} />
          </div>
        </div>
      </Link>
      <ChevronRight className="thrust-child" />
    </div>
  );
}
