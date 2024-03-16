import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import FormatHelper from "@/helpers/FormatHelper";
import Status from "@/modules/common/Status";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import Dot from "@/modules/common/Dot";
import { IApartment, IProperty } from "@/types";
import PropertyHelper from "@/helpers/PropertyHelper";
import StringHelper from "@/helpers/StringHelper";
import Checkbox from "@/modules/common/form/Checkbox";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  unit: IApartment
  _property: IProperty
  isChecked?: boolean
  onChangeChecked: (id: string, isChecked: boolean) => void
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function UnitInTabCard({ className, onChangeChecked, isChecked = false, _property: property, unit, ...rest }: IProps) {

  const status = PropertyHelper.resolveUnitStatus(unit)

  return (
    <div {...rest} className={`${className}`}>
      <div
        className="flex gap-3 justify-between group"
      >
        <div className="flex flex-col gap-4 sm:flex-row items-center">
          {/* <Image
            alt=""
            src={""}
            className="w-[100px] h-[100px] aspect-square shrink-0 rounded-[9px]"
          /> */}
          <div className="flex flex-col gap-2">
            <span
              className={"text-neutral-950 text-sm font-medium leading-[14px]"}
            >
              {unit.name}
            </span>
            <div className={""}>
              {unit.bedroom_count} Beds <Dot /> {StringHelper.stripUnderscores(property.type)}
            </div>
            <div
              className={"text-neutral-950 text-sm font-medium leading-[14px]"}
            >
              {FormatHelper.nairaFormatter.format(unit.price)}
            </div>
            <div className="px-2 py-1.5 whitespace-nowrap bg-zinc-100 rounded-[100px] justify-start items-start gap-2.5 text-neutral-950 text-xs font-medium leading-3 inline-flex w-fit">
              Created{' '}
              {FormatHelper.dateFormatter.format(unit.created_at)}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <Link
            data-test-id='unit-card-link'
            to={`/properties/${property.id}/units/${unit.id}`} className={"flex flex-nowrap items-center h-fit gap-4"}>
            {status && (
              <Status
                status={status}
              />
            )}
            <ChevronRight className="thrust-child" />
          </Link>
          <label>
            <Checkbox checked={isChecked} onChange={(e) => {
              onChangeChecked(unit.id, e.target.checked)
            }} className="" />
          </label>
        </div>
      </div>
    </div>
  );
}
