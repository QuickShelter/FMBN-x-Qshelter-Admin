import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Card.module.css";
import { IUser } from "@/types";
import FormatHelper from "@/helpers/FormatHelper";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  user?: IUser;
  perPage: number;
}

export default function Card(props: IProps) {
  const { ...rest } = props;

  return (
    <tr {...rest} className={`${props.className} ${styles.container}`}>
      <td className={styles.profile}>
        1000002314
      </td>
      <td>
        {FormatHelper.nairaFormatter.format(319475.73)}
      </td>
      <td className="whitespace-nowrap">1000002314</td>
      {/* <td>
        {last_login_at ? new Date(last_login_at).toLocaleDateString() : "N/A"}
      </td> */}
      <td>Burger King - Lagos</td>
      <td>Jan 30, 2024</td>
    </tr>
  );
}
