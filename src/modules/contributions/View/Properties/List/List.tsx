import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./List.module.css";
import { IProperty } from "@/types";
import Card from "../../../../common/PropertyLinkCard";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  properties: IProperty[];
}

export default function List(props: IProps) {
  const { properties = [], ...rest } = props;

  return (
    <ul {...rest} className={`${styles.container} ${rest.className}`}>
      {properties.map((property) => {
        return <Card _property={property} />;
      })}
    </ul>
  );
}
