import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Listing.module.css";
import Card from "./Card/Card";
import { ITransaction } from "@/types";
import EnvironmentHelper from "@/helpers/EnvironmentHelper";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  transactions: ITransaction[] | undefined;
  offset: number;
}

export default function Listing(props: IProps) {
  const { transactions, offset, ...rest } = props;

  return (
    <table {...rest} className={`${props.className} ${styles.container}`}>
      <thead>
        <th>#</th>
        <th>Customer</th>
        <th>Amount</th>
        <th>Phone</th>
        <th>Type</th>
        <th>Wallet ID</th>
        <th>Date</th>
        <th>Action</th>
      </thead>
      <tbody>
        {transactions?.map((request, index) => (
          <Card
            key={request.id}
            index={(offset * EnvironmentHelper.PAGINATION_LIMIT) + index + 1}
            data={request}
          />
        ))}
      </tbody>
    </table>
  );
}
