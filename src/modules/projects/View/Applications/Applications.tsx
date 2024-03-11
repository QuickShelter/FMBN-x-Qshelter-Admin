import PageTitle from "@/modules/common/PageTitle";
import Tab from "@/modules/common/Tab";
import { IApplication } from "@/types";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import ApplicationCard from "./Card";
import Card from "@/modules/common/Card";
import PageBackButton from "@/modules/common/PageBackButton";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  applications: IApplication[];
}

type ITab = "mortgaging" | "sold" | "available" | "";

const tabs: { label: string; value: ITab }[] = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Mortgaging",
    value: "mortgaging",
  },
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Sold",
    value: "sold",
  },
];

export default function Applications({ applications }: IProps) {
  const [tab, setTab] = useState("");

  return (
    <div className="flex flex-col gap-5 mx-auto px-4">
      <div className="flex justify-between items-center mb-11">
        <PageTitle>Property</PageTitle>
      </div>
      <Card className="p-5 flex flex-col gap-5">
        <PageBackButton text="Back to Properties" />
        <div className="text-slate-900 text-base font-bold leading-tight">
          Mortgage Applications
        </div>
        <Tab
          setTab={(value: string) => {
            setTab(value);
          }}
          currentTab={tab}
          tabs={tabs}
        />
        <Card className="p-6 flex flex-col gap-6">
          {applications.map((application: IApplication) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </Card>
      </Card>
    </div>
  );
}
