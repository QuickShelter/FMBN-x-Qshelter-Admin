import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Listing.module.css";
import Card from "./Card/Card";
import { IPaginatedRequest } from "@/types";
import { Link } from "react-router-dom";
import Hr from "@/modules/common/Hr";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  requests: IPaginatedRequest[] | undefined;
}

export default function Listing(props: IProps) {
  const { requests, ...rest } = props;

  return (
    <section {...rest} className={`${props.className} ${styles.container}`}>
      {requests &&
        requests.length > 0 &&
        requests.map((request) => (
          <Link data-test-id='property-card-link' to={`/requests/${request.id}`}>
            <Card key={request.id} data={request} />
            <Hr className="my-6" />
          </Link>
        ))}
    </section>
  );
}
