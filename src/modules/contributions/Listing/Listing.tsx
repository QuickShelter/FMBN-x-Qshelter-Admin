import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Listing.module.css";
import Card from "./Card/Card";
import { IContribution } from "@/types";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  data: IContribution[];
}

const LIMIT = Number(import.meta.env.VITE_PAGINATION_LIMIT);

export default function Listing(props: IProps) {
  const { data, ...rest } = props;
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
        {data?.map((datum) => (
          <Card key={datum.id} data={datum} perPage={LIMIT} />
        ))}
      </tbody>
    </table>
  );
}
