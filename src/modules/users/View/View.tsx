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
import ViewLayout from "@/modules/common/layouts/ViewLayout";

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
    <ViewLayout>
      <div className={styles.card}>
        <div>
          {appropriateView}
        </div>
      </div>
    </ViewLayout>
  );
}
