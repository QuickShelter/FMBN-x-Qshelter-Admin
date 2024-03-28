import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from "./Card.module.css";
import { IContribution } from "@/types";
import More from "@/modules/common/More/More";
import Button from "@/modules/common/Button/Button";
import Hr from "@/modules/common/Hr/Hr";
import Eye from "@/modules/common/icons/Eye";
import Edit from "@/modules/common/icons/Edit";
import UserHelper from "@/helpers/UserHelper";
import { Link } from "react-router-dom";
import LinkButton from "@/modules/common/LinkButton";
import FormatHelper from "@/helpers/FormatHelper";
import { useGetUserByIdQuery } from "@/redux/services/api";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  data: IContribution;
  perPage: number;
}

export default function Card(props: IProps) {
  const { data, ...rest } = props;

  const { data: customer, isLoading: isLoadingUser } = useGetUserByIdQuery({
    id: data.user_id ?? "",
    user_id: data?.user_id ?? "",
  });

  const [showMore, setShowMore] = useState(false);

  return (
    <tr {...rest} className={`${props.className} ${styles.container}`}>
      <td className={styles.profile}>
        <div className="flex flex-col gap-0">
          {isLoadingUser ? <span>Loading...</span> : (customer ? <Link className={styles.name} to={`/users/${customer.id}`}>
            {UserHelper.getFullName(customer)}
          </Link> : 'N/A')}
          {isLoadingUser ? <span></span> : (customer ? <Link className={styles.email} to={`mailto:${customer?.email}`}>
            {customer?.email}
          </Link> : 'N/A')}
        </div>
      </td>
      <td>
        {customer ? <span className={styles.userTag}>{UserHelper.roleAsString(customer)}</span> : "N/A"}
      </td>
      <td className="whitespace-nowrap">1000002314</td>
      {/* <td>
        {last_login_at ? new Date(last_login_at).toLocaleDateString() : "N/A"}
      </td> */}
      <td>Jan 30, 2024</td>
      <td>Jan 30, 2024</td>
      <td>{FormatHelper.nairaFormatter.format(319475.73)}</td>
      <td className="flex justify-end">
        <More
          show={showMore}
          onClose={() => setShowMore(false)}
          onOpen={() => setShowMore(true)}
          dropdownClassName={styles.more}
          onClick={() => {
            setShowMore(true);
          }}
        >
          <LinkButton to={`/contributions/${data.id}`} variant="clear" stretch>
            <Eye /> View
          </LinkButton>
          <Hr />
          <Button
            leadingIcon={<Edit />}
            variant="clear"
          >
            Something
          </Button>
        </More>
      </td>
    </tr>
  );
}
