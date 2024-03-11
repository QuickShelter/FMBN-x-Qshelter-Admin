import { DetailedHTMLProps, HTMLAttributes, useMemo, useState } from "react";
import styles from "./Subscriber.module.css";
import { IUser } from "@/types";
import Profile from "../Profile";
import Tab from "@/modules/common/Tab";
import Documents from "./Documents";
import OverView from "../OverView";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

type ISubscriberTabs = "overview" | "documents" | "projects";

export default function Subscriber({ className, user, ...rest }: IProps) {
  const [tab, setTab] = useState<ISubscriberTabs>("overview");

  const resolvedTab = useMemo(() => {
    switch (tab) {
      case "overview":
        return <OverView user={user} />;

      case "documents":
        return <Documents user={user} />;

      default:
        break;
    }
  }, [tab, user]);

  return (
    <div
      {...rest}
      className={`${className} ${styles.container}`}
    >
      <div className="p-4 sm:p-6">
        <Profile user={user} />
      </div>

      <Tab
        currentTab={tab}
        setTab={(val: string) => setTab(val as ISubscriberTabs)}
        tabs={[
          {
            label: "Overview",
            value: "overview",
          },
          {
            label: "Documents",
            value: "documents",
          },
        ]}
      />
      <div className="p-4 sm:p6">
        {resolvedTab}
      </div>
    </div>
  );
}
