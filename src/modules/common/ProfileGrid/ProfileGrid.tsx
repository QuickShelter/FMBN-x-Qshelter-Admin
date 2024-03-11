import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./ProfileGrid.module.css";
import { IUser } from "@/types";
import UserHelper from "@/helpers/UserHelper";
import Avatar from "../Avatar/Avatar";
import LinkText from "../LinkText";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function ProfileGrid({ user, className, ...rest }: IProps) {
  const roles = UserHelper.cleanUpRoles(user.roles);

  return (
    <div {...rest} className={`${className} ${styles.container}`}>
      <Avatar className={styles.avatar} user={user} />
      <div className="flex flex-col justify-center bg-red">
        <LinkText
          to={`/users/${user.id}`}
          className="color-app-dark-blue-400 hover:color-app-dark-blue-500 text-sm leading-snug font-semibold"
        >
          {UserHelper.getFullName(user)}
        </LinkText>
        <div className="flex gap-2">
          {roles.map((role, index) => {
            return (
              <span key={role}>
                {role}
                {index < roles.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
