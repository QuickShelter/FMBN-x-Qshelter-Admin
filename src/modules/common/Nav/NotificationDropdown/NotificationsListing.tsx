import { INotificationCardData } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import NotificationCard from "./NotificationCard";
import Hr from "../../Hr";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  notifications: INotificationCardData[]
}


export default function NotificationListing({ className, notifications, ...rest }: IProps) {

  return (
    <div
      {...rest}
      className={`${className}`}
    >
      {notifications.map((notification, index) => {
        return (
          <div key={notification.id} className="flex flex-col">
            <NotificationCard key={notification.id} data={notification} />
            {index < notifications.length - 1 && <Hr className="my-2" />}
          </div>
        );
      })}
    </div>
  );
}
