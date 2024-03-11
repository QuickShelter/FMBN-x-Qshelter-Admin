import styles from "./ProfileLinkCard.module.css";
import { IUser } from "@/types";
import UserHelper from "@/helpers/UserHelper";
import Avatar from "../Avatar/Avatar";
import { Link, LinkProps } from "react-router-dom";
import ChevronRight from "../icons/ChevronRight";

interface IProps extends Omit<LinkProps, "to"> {
  user: IUser;
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function ProfileLinkCard({ user, className, ...rest }: IProps) {
  const { id, roles } = user;
  const cleanedRoles = UserHelper.cleanUpRoles(roles);

  return (
    <Link
      {...rest}
      className={`${className} ${styles.container}`}
      to={`/users/${id}`}
    >
      <div className={styles.profileGrid}>
        <Avatar className={styles.avatar} user={user} />
        <div className={styles.text}>
          <strong>{UserHelper.getFullName(user)}</strong>
          <span className={styles.role}>
            {cleanedRoles &&
              cleanedRoles.length > 0 &&
              UserHelper.roleAsString(user)}
          </span>
        </div>
      </div>
      <ChevronRight />
    </Link>
  );
}
