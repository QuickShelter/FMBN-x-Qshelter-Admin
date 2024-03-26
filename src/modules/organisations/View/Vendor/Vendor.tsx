import { DetailedHTMLProps, HTMLAttributes, useMemo, useState } from "react";
import styles from "./Vendor.module.css";
import { IUser } from "@/types";
import Profile from "../Profile";
import Tab from "@/modules/common/Tab";
import Documents from "./Documents";
import Projects from "./Projects";
import { mockProjects } from "@/mock/project";
import OverView from "../OverView";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

type IVendorTabs = "overview" | "documents" | "projects";

export default function Vendor({ className, user, ...rest }: IProps) {
  const [tab, setTab] = useState<IVendorTabs>("overview");
  const projects = mockProjects;

  const resolvedTab = useMemo(() => {
    switch (tab) {
      case "overview":
        return <OverView user={user} />;

      case "documents":
        return <Documents user={user} />;

      case "projects":
        return <Projects projects={projects} />;

      default:
        break;
    }
  }, [projects, tab, user]);

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
        setTab={(val: string) => setTab(val as IVendorTabs)}
        tabs={[
          {
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
          },
        ]}
      />
      {resolvedTab}
    </div>
  );
}
