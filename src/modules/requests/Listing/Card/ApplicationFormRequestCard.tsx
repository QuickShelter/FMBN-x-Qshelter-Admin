import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Card.module.css";
import { IApplicationFormRequestPaginated, IInterestedPerson } from "@/types";
import FormatHelper from "@/helpers/FormatHelper"
import ChevronRight from "@/modules/common/icons/ChevronRight";
import RequestHelper from "@/helpers/RequestHelper";
import Status from "@/modules/common/Status";
import DetailCard from "@/modules/common/DetailCard";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: IApplicationFormRequestPaginated;
}

export default function ApplicationFormRequestCard(props: IProps) {
  const { data: request, ...rest } = props;
  const data = RequestHelper.getInterestedPerson(request)

  if (!data) {
    return null
  }

  const interestedPerson: IInterestedPerson = data as IInterestedPerson

  return (
    <div {...rest} className={`${props.className} ${styles.container} group`}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col gap-2">
          <div className={styles.title}>{request?.title}</div>
          <div className={styles.description}>
            {interestedPerson.email}
          </div>
          <div className="w-fit">
            {interestedPerson?.budget && <DetailCard horizontal label="Budget:" value={FormatHelper.nairaFormatter.format(interestedPerson?.budget)} />}
          </div>
          <div className="px-2 py-1.5 whitespace-nowrap bg-zinc-100 rounded-[100px] justify-start items-start gap-2.5 text-neutral-950 text-xs font-medium leading-3 inline-flex w-fit">
            Created by {`${interestedPerson.first_name ? interestedPerson.first_name : ''} ${interestedPerson.last_name ? interestedPerson.last_name : ''}`} •{" "}
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
