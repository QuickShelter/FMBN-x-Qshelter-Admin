import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Card.module.css";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import { Link } from "react-router-dom";
import { IApplication } from "@/types";
import Image from "@/modules/common/Image";
import Indicator from "@/modules/common/Indicator";
import UserHelper from "@/helpers/UserHelper";
import StringHelper from "@/helpers/StringHelper";
import { StatusHelper } from "@/helpers/StatusHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  application: IApplication;
}

export default function Card({ application, ...rest }: IProps) {
  return (
    <div {...rest} className={`${styles.container} ${rest.className}`}>
      <Link
        className={`${styles.card}`}
        to={`/properties/${application.property.id}`}
      >
        <Image
          loading="lazy"
          alt=""
          src={application.property.display_image}
          className={`border-solid border border-app-dark-blue-50 h-[72px] aspect-square relative rounded-3xl overflow-hidden`}
        />
        <div className={styles.middle}>
          <h3 className="text-slate-900 text-sm font-semibold leading-tight">
            Unit Name
          </h3>
          <p className="text-slate-500 text-sm font-medium leading-tight">
            2 Beds, 3 Baths
          </p>
          {application.applicant.user && (
            <div className="text-slate-500 text-sm font-medium leading-tight">
              by {UserHelper.getFullName(application.applicant.user)}
            </div>
          )}
        </div>
        <div className="flex flex-nowrap items-center gap-5">
          <div className="flex flex-nowrap items-center gap-4">
            <Indicator
              color={StatusHelper.mortgageStatusToColor[application.status]}
            />
            <span className="text-blue-950 text-sm font-medium leading-tight">
              {StringHelper.stripUnderscores(application.status)}
            </span>
          </div>
          <ChevronRight />
        </div>
      </Link>
    </div>
  );
}
