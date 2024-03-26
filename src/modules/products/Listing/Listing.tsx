import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Listing.module.css";
import Card from "./Card/Card";
import { IProduct } from "@/types";
import EnvironmentHelper from "@/helpers/EnvironmentHelper";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  data: IProduct[];
  offset: number
}

const LIMIT = Number(import.meta.env.VITE_PAGINATION_LIMIT);

export default function Listing(props: IProps) {
  const { data, offset, ...rest } = props;
  return (
    <table {...rest} className={`${props.className} ${styles.container}`}>
      <tr>
        <th>#</th>
        <th>Product Name</th>
        <th>Active Loans</th>
        <th>Past Loans</th>
        <th>Interest p.a.</th>
        <th>Max Tenor</th>
        <th>Max Amount</th>
        <th>Actions</th>
      </tr>
      <tbody>
        {data?.map((datum, index) => (
          <Card key={datum.id} index={(offset * EnvironmentHelper.PAGINATION_LIMIT) + index + 1} data={datum} perPage={LIMIT} />
        ))}
      </tbody>
    </table>
  );
}
