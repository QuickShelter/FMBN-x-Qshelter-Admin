import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Card.module.css";
import { ITransaction } from "@/types";
import { useAppSelector } from "@/redux/store";
import { Link } from "react-router-dom";
import UserHelper from "@/helpers/UserHelper";
import FormatHelper from "@/helpers/FormatHelper";
import { useGetUserByIdQuery } from "@/redux/services/api";
import Spinner from "@/modules/common/Spinner";
import { formatDate } from "@/helpers/dateFormat";
import StringHelper from "@/helpers/StringHelper";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  data: ITransaction;
  index: number;
}

export default function Card(props: IProps) {
  const { data, index, ...rest } = props;

  const { profile } = useAppSelector((state) => state.auth);
  const { amount, type, created_at, id, user_id, wallet_id } = data;

  const { data: customer, isLoading: isLoadingUser } = useGetUserByIdQuery({
    id: user_id ?? "",
    user_id: profile?.id ?? "",
  });

  return (
    <tr {...rest} className={`${props.className} ${styles.container}`}>
      <td>{index}</td>
      <td className={styles.profile}>
        {isLoadingUser && <Spinner size="sm" />}
        {customer && (
          <div className="flex flex-col gap-0">
            <Link className={styles.name} to={`/users/${id}`}>
              {UserHelper.getFullName(customer)}
            </Link>
            <Link className={styles.email} to={`mailto:${customer?.email}`}>
              {customer?.email}
            </Link>
          </div>
        )}
      </td>
      <td>{FormatHelper.nairaFormatter.format(amount)}</td>
      <td>
        <Link className={styles.phone} to={`tel:${customer?.phone}`}>
          {customer?.phone}
        </Link>
      </td>
      <td>{StringHelper.stripUnderscores(type)}</td>
      <td>{wallet_id}</td>
      <td className="whitespace-nowrap">{formatDate(new Date(created_at))}</td>
      <td>
        <Link to={`/transactions/${id}`} className={styles.cta}>
          View
        </Link>
      </td>
    </tr>
  );
}
