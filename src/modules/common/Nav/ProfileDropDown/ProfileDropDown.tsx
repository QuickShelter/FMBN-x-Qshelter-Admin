import { DetailedHTMLProps, HTMLAttributes, RefObject, useState } from "react";
import styles from "./ProfileDropDown.module.css";
import { IUser } from "@/types";
import Avatar from "../../Avatar";
import UserHelper from "@/helpers/UserHelper";
import { useClickAway } from "@uidotdev/usehooks";
import ChevronDown from "../../icons/ChevronDown";
import Button from "../../Button";
import LogoutConfirmation from "../LogoutConfirmation";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

export default function ProfileDropDown({ className, user, ...rest }: IProps) {
  const [show, setShow] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  const ref = useClickAway(() => {
    setShow(false);
  });

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      {...rest}
      className={`${styles.container} ${className}`}
    >
      <LogoutConfirmation
        show={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
      />
      <Button variant="outline" className={`${className} ${styles.button}`} onClick={toggleShow}>
        <Avatar className="h-6 w-6" user={user} />
        <span className="text-app-black-400 text-[15px] font-medium">
          {UserHelper.getOneName(user)}
        </span>
        <ChevronDown
          className={`${styles.icon} ${show ? styles.showIcon : ""}`}
        />
      </Button>
      <div className={`${styles.dropdown} ${show ? styles.show : styles.hide}`}>
        <Button
          onClick={() => setShowLogoutModal(true)}
          className=""
          variant="clear"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
