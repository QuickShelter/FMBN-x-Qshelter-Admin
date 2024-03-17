import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Card.module.css";
import { IPaginatedRequest } from "@/types";
import FormatHelper from "@/helpers/FormatHelper";
import Image from "@/modules/common/Image";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import { useGetPropertyByIdQuery, useGetUserByIdQuery } from "@/redux/services/api";
import { useAppSelector } from "@/redux/store";
import UserHelper from "@/helpers/UserHelper";
import PropertyCardSkeleton from "@/modules/common/PropertyCardSkeleton";
import RequestHelper from "@/helpers/RequestHelper";
import Status from "@/modules/common/Status";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: IPaginatedRequest;
}

export default function Card(props: IProps) {
  const { data: request, ...rest } = props;
  const { profile } = useAppSelector((state) => state.auth);
  const { data: user, isLoading: isLoadingUser } = useGetUserByIdQuery({
    id: request?.requester_id ?? "",
    user_id: profile?.id ?? "",
  });


  const { data: property, isFetching: isFetchingProperty } = useGetPropertyByIdQuery(request.property.id ?? "");

  if (isFetchingProperty) <PropertyCardSkeleton />

  return (
    <div {...rest} className={`${props.className} ${styles.container} group`}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Image
          alt=""
          src={property?.display_image}
          className="w-[100px] h-[100px] aspect-square shrink-0 rounded-[9px]"
        />
        <div className="flex flex-col gap-2">
          <div className={styles.title}>{isFetchingProperty ? 'Loading...' : property?.title}</div>
          <div className={styles.price}>
            {property?.price &&
              FormatHelper.nairaFormatter.format(
                property?.price
              )}
          </div>
          <div className="mt-auto px-2 py-1.5 whitespace-nowrap bg-zinc-100 rounded-[100px] justify-start items-start gap-2.5 text-neutral-950 text-xs font-medium leading-3 inline-flex w-fit">
            {isLoadingUser ?
              <span>Loading...</span> :
              <span>Requested by {' '}
                <span className="font-semibold">{user ? UserHelper.getFullName(user) : null}</span> •{" "}
                <span>{FormatHelper.dateFormatter.format(request.created_at)}</span>
              </span>
            }
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
