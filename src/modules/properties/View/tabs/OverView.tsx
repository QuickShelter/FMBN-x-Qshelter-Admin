import StringHelper from "@/helpers/StringHelper";
import DetailCard from "@/modules/common/DetailCard";
import { IProperty } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Amenities from "./Amenities";
import Documents from "./Documents";
import PropertyHelper from "@/helpers/PropertyHelper";
import FormatHelper from "@/helpers/FormatHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  _property: IProperty;
}
const Overview = ({ className, _property: property, ...rest }: IProps) => (
  <div {...rest} className={`${className} flex flex-col gap-4 py-6 sm:px-6 px-2 py-4`} >
    <OverViewSection _property={property} />
    <Amenities _property={property} />
    <Documents _property={property} />
  </div>
)

export default Overview

export function OverViewSection({ className, _property: property, ...rest }: IProps) {
  return (
    <div
      {...rest}
      className={`${className} flex flex-col gap-2 sm:gap-5`}
    >
      <div className={`p-4 sm:p-8 flex flex-col gap-1 sm:gap-5 card-no-mobile`}>
        <h3 className="text-[15px] font-medium leading-snug">Overview</h3>
        <div className="flex gap-4 flex-col sm:grid sm:grid-cols-2">
          <DetailCard
            className="col-span-2"
            label="Location"
            value={property.address}
          />
          <DetailCard label="Property Type" value="Flat" />
          <DetailCard label="Finishing Option" value={StringHelper.stripUnderscores(property.finished_status)} />
        </div>
      </div>

      <div
        className={`flex flex-col gap-5 card-no-mobile py-6 sm:px-6 px-2 py-4`}
      >
        <h3 className="text-[15px] font-medium leading-snug">Blocks</h3>
        <div className="flex gap-4 flex-col sm:grid sm:grid-cols-2">
          {property.buildings.map(building => {
            const price = PropertyHelper.getTotalValueOfBlock(building)

            return <DetailCard
              label={`${building.bedroom_count} Bedroom(s)`}
              value={StringHelper.dotSeparate([`${building.apartment_count} units`, `${price ? FormatHelper.nairaFormatter.format(price) : 'N/A'}`])}
            />
          })}
        </div>
      </div>
    </div>
  );
}
