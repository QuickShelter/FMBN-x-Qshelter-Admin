import { DetailedHTMLProps, HTMLAttributes, RefObject, useState } from "react";
import styles from "./NotificationDropdown.module.css";
import { useClickAway } from "@uidotdev/usehooks";
import Notification from "../../icons/Notification";
import ColorHelper from "@/helpers/ColorHelper";
import { INotificationCardData } from "@/types";
import Desktop from "../../Desktop";
import Mobile from "../../Mobile";
import NotificationListing from "./NotificationsListing";
import Modal from "../../Modal";
import useIsGuest from "@/hooks/useIsGuest";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

const notifications: INotificationCardData[] = [
  {
    id: "1",
    heading: "Updates to your property purchase",
    message: "Set notification preferences",
    created_at: "2010-03-20",
  },
  {
    id: "2",
    heading: "Updates to your property purchase",
    message: "Set notification preferences",
    created_at: "2010-03-20",
  },
  {
    id: "3",
    heading: "Updates to your property purchase",
    message: "Set notification preferences",
    created_at: "2010-03-20",
  },
  {
    id: "4",
    heading: "Updates to your property purchase",
    message: "Set notification preferences",
    created_at: "2010-03-20",
  },
];

export default function NotificationDropdown({ className, ...rest }: IProps) {
  const [show, setShow] = useState(false);
  const isAuth = useIsGuest()
  const [showModal, setShowModal] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const ref = useClickAway(() => {
    setShow(false);
  });

  if (isAuth) {
    return null
  }

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      {...rest}
      className={`${styles.container} ${className}`}
    >
      <Modal className="w-full h-full" show={showModal} onCancel={() => setShowModal(false)}>
        <div className="p-4">
          <NotificationListing notifications={notifications} />
        </div>
      </Modal>
      <Desktop>
        <button className={`${className} ${styles.button}`} onClick={toggleShow}>
          <Notification
            className={styles.unhovered}
            fill={show ? ColorHelper.green500 : ColorHelper.darkBlue500}
          />
          <Notification
            fill={ColorHelper.green500}
            className={`${styles.hovered}`}
          />
        </button>
      </Desktop>
      <Mobile>
        <button className={`${className} ${styles.button}`} onClick={toggleShowModal}>
          <Notification
            className={styles.unhovered}
            fill={show ? ColorHelper.green500 : undefined}
          />
          <Notification
            fill={ColorHelper.green500}
            className={`${styles.hovered}`}
          />
        </button>
      </Mobile>
      <div
        className={`${styles.dropdown} p-4 rounded-xl ${show ? styles.show : styles.hide
          }`}
      >
        <NotificationListing notifications={notifications} />
      </div>
    </div>
  );
}
