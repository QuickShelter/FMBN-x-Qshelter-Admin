import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Card.module.css";
import { IPaginatedRequest } from "@/types";
import FormatHelper from "@/helpers/FormatHelper";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import RequestHelper from "@/helpers/RequestHelper";
import Status from "@/modules/common/Status";
import UserHelper from "@/helpers/UserHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: IPaginatedRequest;
}

export default function MilestoneCard(props: IProps) {
  const { data: request, ...rest } = props;

  return (
    <div {...rest} className={`${props.className} ${styles.container} group`}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col gap-2">
          <div className={styles.title}>{request?.property?.title}</div>
          <div className={styles.description}>
            {`${request?.user?.first_name} ${request?.user?.last_name}`}
          </div>
          <div className={styles.description}>
            {request?.user.email}
          </div>
          <div className="px-2 py-1.5 whitespace-nowrap bg-zinc-100 rounded-[100px] justify-start items-start gap-2.5 text-neutral-950 text-xs font-medium leading-3 inline-flex w-fit">
            Created by {request?.user ? UserHelper.getFullName(request.user) : null} •{" "}
            {FormatHelper.dateFormatter.format(request.created_at)}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className="flex gap-4 items-center">
          {request.type && (
            <div className="px-2 py-1.5 whitespace-nowrap bg-zinc-100 rounded-[100px] justify-start items-start gap-2.5 text-neutral-950 text-xs font-medium leading-3 inline-flex w-fit">
              {RequestHelper.typeToHumanMap[request.type]}
            </div>
          )}
          <ChevronRight className="thrust-child" />
        </div>
        <Status status={request.status} />
      </div>
    </div>
  );
}
