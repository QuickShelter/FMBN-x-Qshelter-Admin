import PropertyHelper from "@/helpers/PropertyHelper";
import CheckedText from "@/modules/common/CheckedText";
import { IProperty } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  _property: IProperty
}

export default function Amenities({ className, _property: property, ...rest }: IProps) {
  const amenities = PropertyHelper.getAmenitiesFromProperty(property)

  return (
    <div
      {...rest}
      className={`${className} p-4 sm:p-8 flex flex-col gap-5 card-no-mobile`}
    >
      <h3 className=" text-[15px] font-medium leading-snug">Amenities</h3>
      <div className="grid sm:grid-cols-2 gap-5">
        {amenities.map(amenity => <CheckedText text={amenity} />)}
      </div>
    </div>
  );
}
