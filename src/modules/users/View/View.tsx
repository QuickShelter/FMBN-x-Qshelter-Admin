import styles from "./View.module.css";
import { IUser } from "@/types";
import Card from "@/modules/common/Card/Card";
import { useGetAllPropertiesQuery } from "@/redux/services/api";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import Developer from "./Developer/Developer";
import UserHelper from "@/helpers/UserHelper";
import { useMemo } from "react";
import Subscriber from "./Subscriber/Subscriber";
import Hr from "@/modules/common/Hr";
import PageBackButton from "@/modules/common/PageBackButton";

interface IProps {
  user: IUser;
}

export default function View({ user }: IProps) {
  useGetAllPropertiesQuery({});

  const appropriateView = useMemo(() => {
    if (UserHelper.isDeveloper(user)) {
      return user && <Developer user={user} />;
    }

    if (UserHelper.isSubscriber(user)) {
      return user && <Subscriber user={user} />;
    }

    return <Subscriber user={user} />;
  }, [user]);

  return (
    <div className={styles.container}>
      <PageTitle>Users</PageTitle>

      <Card className={styles.card}>
        <div className="px-4 sm:px-6 py-4">
          <PageBackButton text="Back" />
        </div>
        <Hr />
        <div>
          {appropriateView}
        </div>
      </Card>
    </div>
  );
}
