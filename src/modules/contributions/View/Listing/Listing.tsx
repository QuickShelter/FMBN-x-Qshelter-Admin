import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Listing.module.css";
import Card from "./Card/Card";
import { IRequest } from "@/types";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  data: IRequest[];
}

const LIMIT = Number(import.meta.env.VITE_PAGINATION_LIMIT);

export default function Listing(props: IProps) {
  const { ...rest } = props;
  return (
    <table {...rest} className={`${props.className} ${styles.container}`}>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>NHF No.</th>
        <th>First Contribution</th>
        <th>Last Contribution</th>
        <th>Total Contribution</th>
        <th>Actions</th>
      </tr>
      <tbody>
        {[]?.map((user, index) => (
          <Card key={index} user={user} perPage={LIMIT} />
        ))}
      </tbody>
    </table>
  );
}
