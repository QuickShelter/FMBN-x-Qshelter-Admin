import styles from "./Mortgage.module.css";
import { IAPIError, IMortgageRequest } from "@/types";
import Card from "@/modules/common/Card/Card";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import Hr from "@/modules/common/Hr";
import Tab from "@/modules/common/Tab";
import { useMemo, useState } from "react";
import PageBackButton from "@/modules/common/PageBackButton";
import Application from "./tabs/Application";
import Spinner from "@/modules/common/Spinner";
import EmploymentInformation from "./tabs/EmploymentInformation";
import Reports from "./tabs/Reports/Reports";
import Documents from "./tabs/Documents";
import Profile from "./Profile";
import { useAppSelector } from "@/redux/store";
import { useDeleteMortgageMutation, useGetUserByIdQuery } from "@/redux/services/api";
import Button from "@/modules/common/Button";
import ConfirmationModal from "@/modules/common/modals/ConfirmationModal";
import { useToastContext } from "@/context/ToastContext_";

interface IProps {
  request: IMortgageRequest;
}

type ITab =
  | "application"
  | "employment_information"
  | "reports"
  | "documents";

export default function Mortgage({ request }: IProps) {
  const { profile } = useAppSelector((state) => state.auth);
  const [deleteMortgage, { isLoading: isCancelling }] = useDeleteMortgageMutation()
  const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery({
    id: request.data.user_id ?? "",
    user_id: profile?.id ?? "",
  });

  const { pushToast } = useToastContext()

  const [tab, setTab] = useState<ITab>("application");

  const resolvedTab = useMemo(() => {
    switch (tab) {
      case "application":
        return <Application request={request} />;

      case "employment_information":
        {
          isUserLoading && <Spinner size="lg" />;
        }

        return user ? <EmploymentInformation request={request} user={user} /> : null;

      case "reports":
        return <Reports request={request} />

      case "documents":
        return <Documents request={request} />

      default:
        return <Application request={request} />
    }
  }, [isUserLoading, request, tab, user]);

  const handleCancel = async () => {
    const mortgageId = request?.data?.mortgage?.id

    if (!mortgageId) {
      return null
    }

    try {
      const response = await deleteMortgage(mortgageId).unwrap()

      if (response.ok) {
        pushToast({
          message: 'Suspended',
          type: 'success'
        })
      }
    } catch (error) {
      const err = error as IAPIError
      console.log(error);
      pushToast({
        message: err.data.message,
        type: "error",
      })
    } finally {
      setShowCancelModal(false)
    }
  }

  const [showCancelModal, setShowCancelModal] = useState(false)

  return (
    <div className={styles.container}>
      <PageTitleAndActions>
        <PageTitle>Mortgage Request</PageTitle>
      </PageTitleAndActions>
      <ConfirmationModal
        show={showCancelModal}
        onCancel={() => setShowCancelModal(false)}
        secondaryButton={<Button onClick={() => setShowCancelModal(false)} variant="secondary">Cancel</Button>}
        primaryButton={<Button onClick={handleCancel} isLoading={isCancelling} variant="outline-danger">Delete</Button>}
        prompt="Are you sure you want to terminate this mortgage?"
      />
      <Card className={styles.wrapperCard}>
        <div className="flex justify-between px-4 py-4 sm:px-8">
          <PageBackButton text="Back" className={styles.back} />
        </div>
        <Hr />
        <div className="px-4 sm:px-[3rem] py-4 sm:py-6 flex flex-col gap-4">
          {user && <Profile request={request} className="" user={user} />}
          {isUserLoading && <Spinner size="sm" />}
        </div>
        <Tab
          className="sm:pl-[44px] text-[10px] text-[14px] flex flex-wrap justify-start"
          currentTab={tab}
          setTab={(val: string) => setTab(val as ITab)}
          tabs={[
            {
              label: "Mortgage Application",
              value: "application",
            },
            {
              label: "Employment Details",
              value: "employment_information",
            },
            {
              label: "Reports",
              value: "reports",
            },
            {
              label: "Documents",
              value: "documents",
            },
          ]}
        />
        <div className="py-5 px-6 gap-4 flex flex-col">
          <div>{resolvedTab}</div>
          {request?.data?.mortgage?.status === 'pending' && tab == 'application' && <div className="flex">
            <Button onClick={() => setShowCancelModal(true)} className="ml-auto" variant="outline-danger">Cancel</Button>
          </div>}
        </div>
      </Card >
    </div >
  );
}
