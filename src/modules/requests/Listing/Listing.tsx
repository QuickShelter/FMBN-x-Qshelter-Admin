import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Listing.module.css";
import Card from "./Card/Card";
import { IPaginatedRequest } from "@/types";
import { Link } from "react-router-dom";
import Hr from "@/modules/common/Hr";
import RequestHelper from "@/helpers/RequestHelper";
import IndicationOfIntererstCard from "./Card/IndicationOfIntererstCard";
import PriceUpdateCard from "./Card/PriceUpdateCard";
import MilestoneCard from "./Card/MilestoneCard";
import ApplicationFormRequestWithFileCard from "./Card/ApplicationFormRequestWithFileCard";
import ApplicationFormNoFileRequestCard from "./Card/ApplicationFormRequestNoFileCard";
import SupportCard from "./Card/SupportCard";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  requests: IPaginatedRequest[];
}

export default function Listing(props: IProps) {
  const { requests, ...rest } = props;

  return (
    <section {...rest} className={`${props.className} ${styles.container}`}>
      {requests &&
        requests.length > 0 &&
        requests.map((request: IPaginatedRequest, index: number) => (
          <Link data-test-id='request-card-link' key={request.id} to={`/requests/${request.id}`}>
            {RequestHelper.isPriceUpdateRequest(request) && (
              <PriceUpdateCard key={request.id} data={request} />
            )}
            {RequestHelper.isPropertyRequest(request) && (
              <Card key={request.id} data={request} />
            )}
            {RequestHelper.isIndicationOfInterestPaginated(request) && (
              <IndicationOfIntererstCard key={request.id} data={request} />
            )}
            {RequestHelper.isApplicationFormNoFileRequestPaginated(request) && (
              <ApplicationFormNoFileRequestCard key={request.id} data={request} />
            )}
            {RequestHelper.isApplicationFormWithFileRequestPaginated(request) && (
              <ApplicationFormRequestWithFileCard key={request.id} data={request} />
            )}
            {RequestHelper.isMilestoneUpdateRequestPaginated(request) && (
              <MilestoneCard key={request.id} data={request} />
            )}
            {RequestHelper.isSupportRequestPaginated(request) && (
              <SupportCard key={request.id} data={request} />
            )}
            {index < requests.length - 1 ? <Hr className="my-5" /> : null}
          </Link>
        ))}
    </section>
  );
}
