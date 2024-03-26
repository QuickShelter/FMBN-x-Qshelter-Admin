import { DetailedHTMLProps, HTMLAttributes, useCallback, useMemo } from "react";
import styles from "./Subscriber.module.css";
import { IEmploymentHistory, IUser } from "@/types";
import Profile from "../Profile";
import EmploymentDetails from "./tabs/EmploymentDetails";
import BankDetails from "./tabs/BankDetails";
import NextOfKin from "./tabs/NextOfKin";
import PersonalDetails from "./tabs/PersonalDetails";
import EmploymentHistory from "./tabs/EmploymentHistory";
import { useSearchParams } from "react-router-dom";
import QueryParamsHelper from "@/helpers/QueryParamsHelper";
import ResponsiveLinkTab from "@/modules/common/LinkTab/ResponsiveLinkTab";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

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
  const [searchParams, _] = useSearchParams();

  const _tab: string = searchParams.get("tab") ?? "personal_details";

  const setTab = useCallback(
    (value: string) => {
      const params: Record<string, string> = {};

      if (value && value.length > 1) {
        params["tab"] = value;
      }

      const query = QueryParamsHelper.generateQueryString(
        params
      );

      return query
    },
    [_tab]
  );

  const resolvedTab = useMemo(() => {
    switch (_tab) {
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
        return <PersonalDetails user={user} />;
    }
  }, [_tab, user]);

  return (
    <div
      {...rest}
      className={`${className} ${styles.container}`}
    >
      <div className="p-4 sm:p-6">
        <Profile user={user} />
      </div>
      <div className="px-4 sm:px-0">
        <ResponsiveLinkTab
          defaultPath="personal_details"
          threshold={7}
          pathDeterminer={setTab}
          className="pt-2"
          field="tab"
          tabs={[
            {
              label: "Personal Details",
              link: setTab("personal_details"),
              value: "personal_details",
            },
            {
              label: "Bank Details",
              link: setTab("bank_details"),
              value: "bank_details",
            },
            {
              label: "Employment Details",
              link: setTab("employment_details"),
              value: "employment_details",
            },
            {
              label: "Next of Kin",
              link: setTab("next_of_kin"),
              value: "next_of_kin",
            },
          ]} currentValue={_tab} />
      </div>
      <div className="p-4 sm:p6">
        {resolvedTab}
      </div>
    </div>
  );
}
