import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Listing.module.css";
import Card from "./Card/Card";
import { IProperty } from "@/types";
import { Link } from "react-router-dom";
import Hr from "@/modules/common/Hr";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  properties: IProperty[] | undefined;
}

export default function Listing(props: IProps) {
  const { properties, ...rest } = props;

  return (
    <section {...rest} className={`${props.className} ${styles.container}`}>
      {properties &&
        properties.length > 0 &&
        properties.map((property) => (
          <Link data-test-id='property-card-link' to={`/properties/${property.id}`}>
            <Card key={property.id} data={property} />
            <Hr className="my-6" />
          </Link>
        ))}
    </section>
  );
}
