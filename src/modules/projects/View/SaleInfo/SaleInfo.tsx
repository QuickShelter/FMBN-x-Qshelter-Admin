import styles from "./SaleInfo.module.css";
import Card from "@/modules/common/Card/Card";
import LinkText from "@/modules/common/LinkText";
import Spinner from "@/modules/common/Spinner";
import { useGetApplicationsByPropertyIdQuery } from "@/redux/services/api";
import { IProperty } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import { Link } from "react-router-dom";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  _property: IProperty;
}

export default function SaleInfo({
  className,
  _property: property,
  ...rest
}: IProps) {
  const { data: applications, isLoading: isLoading } =
    useGetApplicationsByPropertyIdQuery(`${property?.id}`);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        {isLoading && <Spinner size="lg" />}
      </div>
    );
  }

  if (!isLoading && (!applications || applications?.data?.length < 1)) {
    return null;
  }

  return (
    <Card {...rest} className={`${className} ${styles.container}`}>
      <h3>Sale Information</h3>
      <Link
        to={`/properties/${property.id}/applications`}
        className={styles.link}
      >
        <h4 className="text-blue-950 text-sm font-semibold">
          {applications?.data.length} people processing mortgage
        </h4>
        <LinkText
          to={`/properties/${property.id}/applications`}
          className={`${styles.prompt} text-blue-600 text-sm font-semibold flex gap-2.5 items-center hover:text-blue-600`}
        >
          View Applications <ChevronRight stroke="#147EFA" />
        </LinkText>
      </Link>
    </Card>
  );
}
