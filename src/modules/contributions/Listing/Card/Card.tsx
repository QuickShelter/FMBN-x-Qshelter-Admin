import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from "./Card.module.css";
import { IUser } from "@/types";
import More from "@/modules/common/More/More";
import Button from "@/modules/common/Button/Button";
import Avatar from "@/modules/common/Avatar/Avatar";
import Hr from "@/modules/common/Hr/Hr";
import Eye from "@/modules/common/icons/Eye";
import Edit from "@/modules/common/icons/Edit";
import UserHelper from "@/helpers/UserHelper";
import AdminInviteConfirmationModal from "@/modules/common/AdminInviteModal";
import { Link } from "react-router-dom";
import LinkButton from "@/modules/common/LinkButton";
import FormatHelper from "@/helpers/FormatHelper";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  user: IUser;
  perPage: number;
}

export default function Card(props: IProps) {
  const { user, ...rest } = props;
  const {
    email,
    first_name,
    last_name,
    id,
  } = user;

  const [showMore, setShowMore] = useState(false);
  const [showInvitationModal, setShowInvitationModal] =
    useState<boolean>(false);

  return (
    <tr {...rest} className={`${props.className} ${styles.container}`}>
      <AdminInviteConfirmationModal
        user={user}
        show={showInvitationModal}
        onCancel={() => setShowInvitationModal(false)}
      />
      <td className={styles.profile}>
        <Link className={styles.avatarLink} to={`/users/${id}`}>
          <Avatar className={styles.avatar} user={user} />
        </Link>
        <div className="flex flex-col gap-1">
          <Link className={styles.email} to={`mailto:${email}`}>
            {email}
          </Link>
          <Link data-test-id="user-card-link" className={styles.name} to={`/users/${id}`}>
            {`${first_name} ${last_name}`}
          </Link>
        </div>
      </td>
      <td>
        <span className={styles.userTag}>{UserHelper.roleAsString(user)}</span>
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
          <LinkButton to={`/contributions/${id}`} variant="clear" stretch>
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
