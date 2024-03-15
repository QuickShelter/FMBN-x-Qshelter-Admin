import FormatHelper from "@/helpers/FormatHelper";
import StringHelper from "@/helpers/StringHelper";
import DocumentViewControl from "@/modules/common/DocumentViewControl";
import { IMortgageActivity } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activity: IMortgageActivity
  offerUrl: string | null
  reasonForBankDecline: string | null
}

export default function ActivityCard({ className, reasonForBankDecline, offerUrl, activity, ...rest }: IProps) {
  return (
    <div {...rest} className={`${className} flex gap-1 justify-between`}>
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium leading-tight">
          {activity.comment}
        </div>
        <div className="text-sm font-medium leading-tight">
          {StringHelper.stripUnderscores(activity.status)}
        </div>
        <div className="text-neutral-500 text-xs font-normal leading-none">
          {activity.created_at ? FormatHelper.dateTimeFormatter.format(new Date(activity.created_at)) : 'N/A'}
        </div>
      </div>
      {activity.status == 'send_offer_letter_from_bank' && offerUrl && <DocumentViewControl url={offerUrl} />}
      {activity.status == 'send_offer_letter_from_bank' && reasonForBankDecline &&
        <p className="max-w-[33ch]">{reasonForBankDecline}</p>
      }
    </div>
  );
}
