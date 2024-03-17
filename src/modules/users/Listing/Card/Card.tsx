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
import MakeAdmin from "@/modules/common/icons/MakeAdmin";
import AdminInviteConfirmationModal from "@/modules/common/AdminInviteModal";
import ProfileEditModal from "../../View/ProfileEditModal";
import { Link } from "react-router-dom";
import LinkButton from "@/modules/common/LinkButton";

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
    phone,
    created_at,
  } = user;

  const [showMore, setShowMore] = useState(false);
  const [showInvitationModal, setShowInvitationModal] =
    useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  return (
    <tr {...rest} className={`${props.className} ${styles.container}`}>
      <AdminInviteConfirmationModal
        user={user}
        show={showInvitationModal}
        onCancel={() => setShowInvitationModal(false)}
      />
      <ProfileEditModal
        user={user}
        show={showEditModal}
        onCancel={() => setShowEditModal(false)}
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
        <span>{UserHelper.roleAsString(user)}</span>
      </td>
      <td>
        <Link className={styles.phone} to={`tel:${phone}`}>
          {phone}
        </Link>
      </td>
      <td className="whitespace-nowrap">{created_at ? new Date(created_at).toLocaleDateString() : 'N/A'}</td>
      {/* <td>
        {last_login_at ? new Date(last_login_at).toLocaleDateString() : "N/A"}
      </td> */}
      <td>
        <More
          show={showMore}
          onClose={() => setShowMore(false)}
          onOpen={() => setShowMore(true)}
          dropdownClassName={styles.more}
          onClick={() => {
            setShowMore(true);
          }}
        >
          <LinkButton to={`/users/${id}`} variant="clear" stretch>
            <Eye /> View
          </LinkButton>
          <Hr />
          <Button
            leadingIcon={<Edit />}
            variant="clear"
            onClick={() => {
              setShowEditModal(true);
              setShowMore(false);
            }}
          >
            Edit
          </Button>
          <Hr />
          <Button
            leadingIcon={<MakeAdmin />}
            variant="clear"
            onClick={() => {
              // TODO
              setShowMore(false);
            }}
          >
            Make Admin
          </Button>
        </More>
      </td>
    </tr>
  );
}
