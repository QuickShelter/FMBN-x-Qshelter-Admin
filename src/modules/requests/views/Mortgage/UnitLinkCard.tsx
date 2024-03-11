import { DetailedHTMLProps, HTMLAttributes } from "react";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import { Link } from "react-router-dom";
import { IBuilding, IProperty } from "@/types";
import PropertyHelper from "@/helpers/PropertyHelper";
import FormatHelper from "@/helpers/FormatHelper";
import Dot from "@/modules/common/Dot";
import DetailCard from "@/modules/common/DetailCard";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    _property: IProperty; // Because 'property' is a string prop of HTMLLiElement
    unitId: string;
    building: IBuilding
}

export default function UnitLinkCard({ _property: property, building, unitId, ...rest }: IProps) {
    const unit = PropertyHelper.getApartmentsFromProperty(property)?.find(unit => unit.id == unitId)

    return (
        <div {...rest} className={`${rest.className} group`}>
            <Link data-test-id="unit-card-link" className={`flex justify-between pr-4 py-4 items-center gap-4`} to={`/properties/${property.id}/units/${unitId}`}>
                <div className="group flex flex-col gap-4">
                    <h3 className="text-neutral-950 text-sm font-semibold leading-[21px] grid grid-cols-2">
                        <DetailCard label="Unit" value={unit?.name} />
                        <DetailCard label="Building" value={building.name} />
                    </h3>
                    <span className="text-neutral-500 text-[13px] font-normal leading-none flex gap-1 flex-nowrap whitespace-nowrap;">
                        {FormatHelper.nairaFormatter.format(unit?.price)}
                        <Dot />
                        {unit?.bedroom_count ?? 0} Bedrooms
                        <Dot />
                        {unit?.bathroom_count ?? 0} Bathrooms
                    </span>
                </div>
                <ChevronRight className="thrust-child-right" />
            </Link>
        </div>
    );
}
