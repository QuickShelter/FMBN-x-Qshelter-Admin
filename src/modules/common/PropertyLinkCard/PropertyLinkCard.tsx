import { DetailedHTMLProps, HTMLAttributes } from "react";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import { Link } from "react-router-dom";
import { IProperty } from "@/types";
import Image from "../Image";
import FormatHelper from "@/helpers/FormatHelper";
import Dot from "../Dot";
import styles from "./PropertyLinkCard.module.css";
import AnalyticsHelper from "@/helpers/AnalyticsHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  _property: IProperty; // Because 'property' is a string prop of HTMLLiElement
}

export default function PropertyLinkCard({ _property, ...rest }: IProps) {
  const { title, price, display_image, id } = _property;

  return (
    <div {...rest} className={`${rest.className} ${styles.container}`}>
      <Link className={`${styles.card}`} to={`/properties/${id}`}>
        <Image
          alt=""
          src={display_image}
          className="rounded-xl w-[56px] h-[56px]"
        />
        <div className="">
          <h3 className="text-neutral-950 text-sm font-semibold leading-[21px]">
            {title}
          </h3>
          <span className="text-neutral-500 text-[13px] font-normal leading-none flex gap-1 flex-nowrap whitespace-nowrap;">
            {FormatHelper.nairaFormatter.format(price)}
            <Dot />
            {AnalyticsHelper.getNBedsFromProperty(_property)} Bedrooms
          </span>
        </div>
        <ChevronRight />
      </Link>
    </div>
  );
}
