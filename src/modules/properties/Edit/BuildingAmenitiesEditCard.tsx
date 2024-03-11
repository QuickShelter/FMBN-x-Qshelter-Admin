import AnalyticsHelper from "@/helpers/AnalyticsHelper";
import FormatHelper from "@/helpers/FormatHelper";
import Button from "@/modules/common/Button";
import Card from "@/modules/common/Card";
import { IBuilding, IPropertyUpdateDto } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Control, FieldErrors } from "react-hook-form";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  control?: Control<IPropertyUpdateDto>;
  errors?: FieldErrors<IPropertyUpdateDto>;
  building: IBuilding
  onClick: () => void
}

export default function BuildingAmenitiesEditCard({ className, onClick, building, ...rest }: IProps) {

  return (
    <Card
      {...rest}
      className={`${className} w-full gap-8 p-4 flex justify-between bg-white rounded-lg justify-start items-start gap-8`}
    >
      <div className="flex flex-col gap-1">
        <div className="text-neutral-950 text-sm font-bold leading-[16.80px]">
          {building.bedroom_count} Bedrooms
        </div>
        <div className="text-neutral-500 text-[13px] font-normal">
          {building.apartment_count} unit(s) • {FormatHelper.nairaFormatter.format(AnalyticsHelper.getTargetPriceOfBuilding(building))}
        </div>
      </div>
      <Button variant="outline" onClick={onClick}>Edit</Button>
    </Card>
  );
}
