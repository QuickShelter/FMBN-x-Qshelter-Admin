import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from "./Card.module.css";
import { ITransaction } from "@/types";
import More from "@/modules/common/More/More";
import Button from "@/modules/common/Button/Button";
import buttonStyles from "@/module-styles/buttons.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setToast } from "@/redux/services/toastSlice";
import { Link } from "react-router-dom";
import UserHelper from "@/helpers/UserHelper";
import FormatHelper from "@/helpers/FormatHelper";
import { useGetUserByIdQuery } from "@/redux/services/api";
import Spinner from "@/modules/common/Spinner";
import { formatDate } from "@/helpers/dateFormat";
import StringHelper from "@/helpers/StringHelper";
import Hr from "@/modules/common/Hr";

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
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

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
          <Link className="flex gap-2 items-center" to={`/transactions/${id}`}>
            {/* <Avatar className={styles.avatar} user={customer} /> */}

            {UserHelper.getFullName(customer)}
          </Link>
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
        <More
          show={show}
          onClose={() => setShow(false)}
          onOpen={() => setShow(true)}
        >
          <Button
            stretch
            variant="clear"
            onClick={() => {
              dispatch(
                setToast({
                  message: "Error: Unimplemented functionality",
                  type: "error",
                })
              );
              setShow(false);
            }}
          >
            Delete
          </Button>
          <Hr />
          <Link to={`/transactions/${id}`} className={buttonStyles.clear}>
            View
          </Link>
        </More>
      </td>
    </tr>
  );
}
