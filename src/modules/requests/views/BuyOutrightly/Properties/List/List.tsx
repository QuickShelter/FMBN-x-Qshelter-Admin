import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./List.module.css";
import { IProperty } from "@/types";
import imageStyles from "@/module-styles/images.module.css";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import { Link } from "react-router-dom";
import Status from "@/modules/common/Status";

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
        const { display_image, title, address, id } = property;

        return (
          <li>
            <Link className={`${styles.card}`} to={`/properties/${id}`}>
              <img
                className={imageStyles.skeleton}
                src={display_image ?? ""}
                alt=""
              />
              <div className={styles.middle}>
                <h3 className={styles.summary}>{title}</h3>
                <p className={styles.address}>{address}</p>
                <Status
                  className={styles.status}
                  status="available"
                />
              </div>
              <ChevronRight />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
