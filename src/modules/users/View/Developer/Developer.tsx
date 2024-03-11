import { DetailedHTMLProps, HTMLAttributes, useMemo, useState } from "react";
import styles from "./Developer.module.css";
import { IUser } from "@/types";
import Profile from "../Profile";
import Tab from "@/modules/common/Tab";
import OverView from "../OverView";
import Documents from "./Documents";
import Projects from "./Projects";
import { useGetProjectsByUserIdQuery } from "@/redux/services/api";
import Spinner from "@/modules/common/Spinner";
import UserHelper from "@/helpers/UserHelper";
import { useAppSelector } from "@/redux/store";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

type IDeveloperTabs = "overview" | "documents" | "projects";

export default function Developer({ className, user, ...rest }: IProps) {
  const [tab, setTab] = useState<IDeveloperTabs>("overview");
  const { profile } = useAppSelector(state => state.auth)
  const { isLoading, data: projects } = useGetProjectsByUserIdQuery(user?.id ?? "")

  const resolvedTab = useMemo(() => {
    switch (tab) {
      case "overview":
        return <OverView user={user} />;

      case "documents":
        return <Documents user={user} />;

      case "projects":
        if (isLoading) {
          return <Spinner size="md" />
        }

        return projects ? <Projects projects={projects} /> : null

      default:
        break;
    }
  }, [isLoading, projects, tab, user]);

  let tabs: { label: string; value: string; }[] = []

  if (UserHelper.isPermitted(['legal_admin'], profile)) {
    tabs = [{
      label: "Overview",
      value: "overview",
    },
    {
      label: "Projects",
      value: "projects",
    },
    {
      label: "Documents",
      value: "documents",
    },]
  }

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
        setTab={(val: string) => setTab(val as IDeveloperTabs)}
        tabs={tabs}
      />
      <div className="p-4 sm:p6">
        {resolvedTab}
      </div>
    </div>
  );
}
