import { DetailedHTMLProps, HTMLAttributes, useMemo, useState } from "react";
import styles from "./Subscriber.module.css";
import { IUser } from "@/types";
import Profile from "../Profile";
import Tab from "@/modules/common/Tab";
import OverView from "../OverView";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

type ITabs = "personal_details" | "employment_history" | "employment_details" | "bank_details" | "next_of_kin";

export default function Employee({ className, user, ...rest }: IProps) {
  const [tab, setTab] = useState<ITabs>("personal_details");

  const resolvedTab = useMemo(() => {
    switch (tab) {
      case "personal_details":
        return <OverView user={user} />;

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
        setTab={(val: string) => setTab(val as ITabs)}
        tabs={[
          {
            label: "Personal Details",
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
