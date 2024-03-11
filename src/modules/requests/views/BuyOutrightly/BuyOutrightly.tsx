import styles from "./BuyOutrightly.module.css";
import { IBuyOutrightlyRequest, IOutrightApprovalDto } from "@/types";
import Card from "@/modules/common/Card/Card";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import Hr from "@/modules/common/Hr";
import Tab from "@/modules/common/Tab";
import { useMemo, useState } from "react";
import PageBackButton from "@/modules/common/PageBackButton";
import Application from "./tabs/Application";
import { useApproveOutrightPurchaseMutation, useDeclineOutrightPurchaseMutation, useGetUserByIdQuery } from "@/redux/services/api";
import { useAppSelector } from "@/redux/store";
import Spinner from "@/modules/common/Spinner";
import EmploymentInformation from "./tabs/EmploymentInformation";
import Documents from "./tabs/Documents";
import Profile from "../Profile";
import OutrightPurchaseRequestTemplate from "@/modules/common/export-templates/OutrightPurchaseRequestTemplate";

interface IProps {
  request: IBuyOutrightlyRequest;
}

type IDeveloperTabs =
  | "overview"
  | "employment_information"
  | "reports"
  | "documents";

export default function BuyOutrightly({ request }: IProps) {
  const { profile } = useAppSelector((state) => state.auth);
  const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery({
    id: request.data.user_id ?? "",
    user_id: profile?.id ?? "",
  });

  const [tab, setTab] = useState<IDeveloperTabs>("overview");

  const resolvedTab = useMemo(() => {
    const docs = request.data.property?.property_documents
    const docsArray = docs ? (JSON.parse(docs) as string[]) : []

    switch (tab) {
      case "overview":
        return <Application request={request} />

      case "employment_information":
        { isUserLoading && <Spinner size="lg" /> }

        return user ? <EmploymentInformation user={user} /> : null;

      case "documents":
        return <Documents documents={docsArray ?? []} />;

      default:
        break;
    }
  }, [isUserLoading, request, tab, user]);

  const [approve, { isLoading: isApproving }] = useApproveOutrightPurchaseMutation()
  const [decline, { isLoading: isDeclining }] = useDeclineOutrightPurchaseMutation()

  const updateStatus = async (action: 'approve' | 'decline') => {
    const payload: IOutrightApprovalDto = {
      user_id: profile?.id ?? "",
      application_id: request?.data?.id ?? ""
    }

    if (action === 'approve') {
      return approve(payload).unwrap()
    } else {
      return decline(payload).unwrap()
    }
  }

  const handleApprove = () => {
    return updateStatus('approve')
  }

  const handleDecline = () => {
    return updateStatus('decline')
  }

  return (
    <div className={styles.container}>
      <PageTitleAndActions>
        <PageTitle>Purchase Request</PageTitle>
      </PageTitleAndActions>
      <Card className={styles.wrapperCard}>
        <div className="flex justify-between px-4 py-4 sm:px-8">
          <PageBackButton text="Back" className={styles.back} />
        </div>
        <Hr />
        <div className="px-4 sm:px-[3rem] py-4 sm:py-6 flex flex-col gap-4">
          {user && <Profile exportTemplate={<OutrightPurchaseRequestTemplate request={request} user={user} />} handleApprove={handleApprove} handleDecline={handleDecline} request={request} className="" user={user} isLoading={isApproving || isDeclining} />}
          {isUserLoading && <Spinner size="sm" />}
        </div>
        <Tab
          className="pl-0 sm:pl-[44px] text-[10px] text-[14px]"
          currentTab={tab}
          setTab={(val: string) => setTab(val as IDeveloperTabs)}
          tabs={[
            {
              label: "Overview",
              value: "overview",
            },
            {
              label: "Employment Details",
              value: "employment_information",
            },
            // {
            //   label: "Reports",
            //   value: "reports",
            // },
            {
              label: "Documents",
              value: "documents",
            },
          ]}
        />
        <div className="py-5 px-6">{resolvedTab}</div>
      </Card>
    </div>
  );
}
