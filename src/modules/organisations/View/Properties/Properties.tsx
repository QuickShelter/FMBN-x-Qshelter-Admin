import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Properties.module.css";
import { IProperty } from "@/types";
import NoProperties from "@/modules/common/icons/NoProperties";
import List from "./List/List";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  properties: IProperty[];
}

export default function Properties(props: IProps) {
  const { properties = [], ...rest } = props;

  return (
    <div {...rest} className={`${styles.container} ${rest.className}`}>
      {properties.length > 0 ? (
        <List properties={properties} />
      ) : (
        <div className={styles.no}>
          <NoProperties /> <p>No properties added yet</p>
        </div>
      )}
    </div>
  );
}
