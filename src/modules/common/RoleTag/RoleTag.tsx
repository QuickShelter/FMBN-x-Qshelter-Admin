import ColorHelper from "@/helpers/ColorHelper";
import { IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";
import styles from "./RoleTag.module.css";
import Indicator from "@/modules/common/Indicator";
import UserHelper from "@/helpers/UserHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

export default function RoleTag({ user, ...rest }: IProps) {
  const resolvedRole = useMemo(() => {
    return UserHelper.roleAsString(user)
  }, [user]);

  return (
    <div {...rest} className={`${rest.className} ${styles.container}`}>
      <Indicator
        className={styles.indicator}
        color={user.suspended ? ColorHelper.systemError : ColorHelper.systemSuccess}
      />
      <span className={styles.role}>{resolvedRole}</span>
    </div>
  );
}
