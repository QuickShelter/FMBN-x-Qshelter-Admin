import styles from "../Mortgage/Mortgage.module.css";
import { IRsaRequest } from "@/types";
import Card from "@/modules/common/Card/Card";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import Hr from "@/modules/common/Hr";
import Tab from "@/modules/common/Tab";
import { DetailedHTMLProps, HTMLAttributes, useMemo, useState } from "react";
import PageBackButton from "@/modules/common/PageBackButton";
import Spinner from "@/modules/common/Spinner";
import { useAppSelector } from "@/redux/store";
import { useApproveRsaApplicationMutation, useDeclineRsaApplicationMutation, useGetUserByIdQuery } from "@/redux/services/api";
import PensionInfo from "./tabs/PensionInfo";
import MortgageInfo from "./tabs/MortgageInfo";
import Documents from "../Mortgage/tabs/Documents";
import RsaDeclineModal from "./RsaDeclineModal";
import Profile from "../Profile";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IRsaRequest,
}

type ITabs =
  | "mortgage_info"
  | "pension_info"
  | "documents";

export default function RSA({ request }: IProps) {
  const { profile } = useAppSelector((state) => state.auth);
  const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery({
    id: request.data.user_id ?? "",
    user_id: profile?.id ?? "",
  });

  const [tab, setTab] = useState<ITabs>("pension_info");

  const resolvedTab = useMemo(() => {
    switch (tab) {
      case "mortgage_info":
        return user ? <MortgageInfo isLoading={isUserLoading} user={user} /> : null;

      case "documents":
        return <Documents request={request} />;

      case "pension_info":
        return user ? <PensionInfo isLoading={isUserLoading} user={user} request={request} /> : null;

      default:
        return user ? <PensionInfo isLoading={isUserLoading} user={user} request={request} /> : null;
    }
  }, [isUserLoading, request, tab, user]);

  const [approve, { isLoading: isApproving }] = useApproveRsaApplicationMutation()
  const [decline, { isLoading: isDeclining }] = useDeclineRsaApplicationMutation()

  const handleApprove = async () => {
    const response = await approve({
      admin_id: profile?.id ?? '',
      id: request?.id,
      comment: ""
    }).unwrap()

    return response
  }

  const handleDecline = async () => {
    const response = await decline({
      admin_id: profile?.id ?? '',
      id: request?.id,
      comment: ""
    }).unwrap()

    return response
  }

  const [showDeclineModal, setShowDeclineModal] = useState(false)

  return (
    <div className={styles.container}>
      <PageTitleAndActions>
        <PageTitle>RSA Request</PageTitle>
      </PageTitleAndActions>
      <RsaDeclineModal
        onCancel={() => setShowDeclineModal(false)}
        request={request}
        show={showDeclineModal}
      />
      <Card className={styles.wrapperCard}>
        <div className="flex justify-between px-4 py-4 sm:px-8">
          <PageBackButton text="Back" className={styles.back} />
        </div>
        <Hr />
        <div className="px-4 sm:px-[3rem] py-4 sm:py-6 flex flex-col gap-4">
          {user && <Profile
            request={request}
            className=""
            user={user}
            isLoading={isApproving || isDeclining}
            exportTemplate={<></>}
            handleApprove={handleApprove}
            handleDecline={handleDecline}
          />
          }
          {isUserLoading && <Spinner size="sm" />}
        </div>
        <Tab
          className="sm:pl-[44px] text-[10px] text-[14px] flex flex-wrap justify-start"
          currentTab={tab}
          setTab={(val: string) => setTab(val as ITabs)}
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
        <div className="py-5 px-6 gap-4 flex flex-col">{resolvedTab}</div>
      </Card >
    </div >
  );
}
