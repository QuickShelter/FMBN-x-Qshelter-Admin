import { IRsaRequest } from "@/types";
import { DetailedHTMLProps, HTMLAttributes, useMemo, useState } from "react";
import RequestLayout from "../RequestLayout";
import Tab from "@/modules/common/Tab";
import Documents from "../BuyOutrightly/tabs/Documents";
import Spinner from "@/modules/common/Spinner";
import { useAppSelector } from "@/redux/store";
import PensionInfo from "./tabs/PensionInfo";
import MortgageInfo from "./tabs/MortgageInfo";
import { useGetUserByIdQuery } from "@/redux/services/api";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IRsaRequest,
}

type IDeveloperTabs =
  | "pension_info"
  | "mortgage_info"
  | "documents";

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function RSA({ className, request, ...rest }: IProps) {
  const { profile } = useAppSelector((state) => state.auth);
  const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery({
    id: request.data.user_id ?? "",
    user_id: profile?.id ?? "",
  });

  const [tab, setTab] = useState<IDeveloperTabs>("pension_info");

  const resolvedTab = useMemo(() => {
    if (isUserLoading) {
      return <Spinner size="lg" />
    }

    switch (tab) {
      case "pension_info":
        return user ? <PensionInfo user={user} request={request} /> : null;
        break;

      case "mortgage_info":
        return user ? <MortgageInfo user={user} /> : null;
        break;

      case "documents":
        return <Documents documents={[]} />;
        break;

      // default:
      //   return <></>;
      //   break;
    }
  }, [isUserLoading, request, tab, user]);

  return <RequestLayout request={request} {...rest} className={`${className}`}>
    <Tab
      className="px-6 sm:pl-[44px] text-[10px] text-[14px]"
      currentTab={tab}
      setTab={(val: string) => setTab(val as IDeveloperTabs)}
      tabs={[
        {
          label: "Pension Details",
          value: "pension_info",
        },
        {
          label: "Mortgage Details",
          value: "mortgage_info",
        },
        {
          label: "Documents",
          value: "documents",
        },
      ]}
    />
    <div className="px-6">{resolvedTab}</div>
  </RequestLayout>;
}
