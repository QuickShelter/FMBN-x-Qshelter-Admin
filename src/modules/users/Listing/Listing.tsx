import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Listing.module.css";
import Card from "./Card/Card";
import { IUser } from "@/types";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  users: IUser[];
}

const LIMIT = Number(import.meta.env.VITE_PAGINATION_LIMIT);

export default function Listing(props: IProps) {
  const { users, ...rest } = props;
  return (
    <table {...rest} className={`${props.className} ${styles.container}`}>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Phone Number</th>
        <th>Date Joined</th>
        <th>Actions</th>
      </tr>
      <tbody>
        {users?.map((user) => (
          <Card key={user.id} user={user} perPage={LIMIT} />
        ))}
      </tbody>
    </table>
  );
}
