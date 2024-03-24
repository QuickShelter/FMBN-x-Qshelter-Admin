import { DetailedHTMLProps, HTMLAttributes, useMemo, useState } from "react";
import styles from "./Subscriber.module.css";
import { IEmploymentHistory, IUser } from "@/types";
import Profile from "../Profile";
import Tab from "@/modules/common/Tab";
import EmploymentDetails from "./tabs/EmploymentDetails";
import BankDetails from "./tabs/BankDetails";
import NextOfKin from "./tabs/NextOfKin";
import PersonalDetails from "./tabs/PersonalDetails";
import EmploymentHistory from "./tabs/EmploymentHistory";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

type ITabs = "personal_details" | "employment_history" | "employment_details" | "bank_details" | "next_of_kin";
const employmentHistory: IEmploymentHistory[] = [
  {
    employee: {
      nhfNumber: ''
    },
    employer: {
      employerNumber: '',
      name: '',
      nEmployees: 23
    }
  },
  {
    employee: {
      nhfNumber: ''
    },
    employer: {
      employerNumber: '',
      name: '',
      nEmployees: 23
    }
  },
  {
    employee: {
      nhfNumber: ''
    },
    employer: {
      employerNumber: '',
      name: '',
      nEmployees: 23
    }
  },
  {
    employee: {
      nhfNumber: ''
    },
    employer: {
      employerNumber: '',
      name: '',
      nEmployees: 23
    }
  }
]

export default function Subscriber({ className, user, ...rest }: IProps) {
  const [tab, setTab] = useState<ITabs>("personal_details");

  const resolvedTab = useMemo(() => {
    switch (tab) {
      case "personal_details":
        return <PersonalDetails user={user} />;

      case "employment_details":
        return <EmploymentDetails user={user} />;

      case "employment_history":
        return <EmploymentHistory history={employmentHistory} user={user} />;

      case "bank_details":
        return <BankDetails user={user} />;

      case "next_of_kin":
        return <NextOfKin user={user} />;

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
            value: "personal_details",
          },
          {
            label: "Employment Details",
            value: "employment_details",
          },
          {
            label: "Employment History",
            value: "employment_history",
          },
          {
            label: "Bank Details",
            value: "bank_details",
          },
          {
            label: "Next of Kin",
            value: "next_of_kin",
          },
        ]}
      />
      <div className="p-4 sm:p6">
        {resolvedTab}
      </div>
    </div>
  );
}
