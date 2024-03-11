import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Card.module.css";
import { IProperty } from "@/types";
import { Link } from "react-router-dom";
import FormatHelper from "@/helpers/FormatHelper";
import Image from "@/modules/common/Image";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import Dot from "@/modules/common/Dot";
import Status from "@/modules/common/Status";
import StringHelper from "@/helpers/StringHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: IProperty;
}

export default function Card(props: IProps) {
  const { data: property, ...rest } = props;
  const { price, title, id, created_at, type, status } = property;

  return (
    <div {...rest} className={`${props.className} ${styles.container} group`}>
      <div className="flex flex-col gap-4 sm:flex-row flex-wrap">
        <Image
          alt=""
          src={property.display_image}
          className="w-[100px] h-[100px] aspect-square shrink-0 rounded-[9px]"
        />
        <div className="flex flex-col gap-2">
          <Link className={styles.title} to={`/properties/${id}`}>
            {title}
          </Link>
          <div className={styles.description}>
            {property.address} <Dot /> {StringHelper.stripUnderscores(type)}
          </div>
          <div className={styles.price}>
            {FormatHelper.nairaFormatter.format(price)}
          </div>
          <div className="px-2 py-1.5 whitespace-nowrap bg-zinc-100 rounded-[100px] justify-start items-start gap-2.5 text-neutral-950 text-xs font-medium leading-3 inline-flex w-fit">
            Created by {""} • {FormatHelper.dateFormatter.format(created_at)}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        {status && <Status className={styles.status} status={status} />}
        <ChevronRight className="thrust-child" />
      </div>
    </div>
  );
}
