import styles from "./Contribution.module.css";
import { IContributionRequest, IRequestStatus, IRequestStatusChangeDto } from "@/types";
import Card from "@/modules/common/Card/Card";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import Hr from "@/modules/common/Hr";
import Tab from "@/modules/common/Tab";
import { useMemo, useState } from "react";
import PageBackButton from "@/modules/common/PageBackButton";
import Application from "./tabs/Application";
import { useGetUserByIdQuery, useUpdateRequestByIdMutation } from "@/redux/services/api";
import { useAppSelector } from "@/redux/store";
import Spinner from "@/modules/common/Spinner";
import EmploymentInformation from "./tabs/EmploymentInformation";
import Documents from "./tabs/Documents";
import Profile from "../Profile";
import OutrightPurchaseRequestTemplate from "@/modules/common/export-templates/OutrightPurchaseRequestTemplate";
import Contributions from "./tabs/Contributions/Contributions";

interface IProps {
  request: IContributionRequest;
}

type IDeveloperTabs =
  | "overview"
  | "employment_information"
  | "contributions"
  | "documents";

export default function Contribution({ request }: IProps) {
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

      case "contributions":
        return <Contributions request={request} />;

      default:
        break;
    }
  }, [isUserLoading, request, tab, user]);

  const [update, { isLoading }] = useUpdateRequestByIdMutation()

  const updateStatus = async (status: IRequestStatus) => {

    const payload: IRequestStatusChangeDto = {
      id: request.id ?? '',
      comment: '',
      admin_id: profile?.id ?? "",
      status,
      affectedDocuments: []
    }

    return await update(payload).unwrap();
  }

  const handleApprove = () => {
    return updateStatus('completed')
  }

  // const handleUndo = () => {
  //   return updateStatus('cancelled')
  // }

  const handleDecline = () => {
    return updateStatus('cancelled')
  }

  return (
    <div className={styles.container}>
      <PageTitleAndActions>
        <PageTitle>Contribution</PageTitle>
      </PageTitleAndActions>
      <Card className={styles.wrapperCard}>
        <div className="flex justify-between px-4 py-4 sm:px-8">
          <PageBackButton text="Back" className={styles.back} />
        </div>
        <Hr />
        <div className="px-4 sm:px-[3rem] py-4 sm:py-6 flex flex-col gap-4">
          {user && <Profile exportTemplate={<OutrightPurchaseRequestTemplate request={request} user={user} />} handleApprove={handleApprove} handleDecline={handleDecline} request={request} className="" user={user} isLoading={isLoading} />}
          {isUserLoading && <Spinner size="sm" />}
        </div>
        <Tab
          className="pl-4 sm:pl-[44px] text-[10px] text-[14px]"
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
            {
              label: "Contributions",
              value: "contributions",
            },
            // {
            //   label: "Documents",
            //   value: "documents",
            // },
          ]}
        />
        <div className="py-5 px-6">{resolvedTab}</div>
      </Card>
    </div>
  );
}
