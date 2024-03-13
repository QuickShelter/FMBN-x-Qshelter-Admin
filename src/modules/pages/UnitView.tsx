import { useMemo, useState } from "react";
import Card from "../common/Card";
import Hr from "../common/Hr";
import PageBackButton from "../common/PageBackButton";
import PageTitle from "../common/PageTitle";
import Tab from "../common/Tab";
import Activities from "../properties/View/tabs/Units/tabs/Activities/Activities";
import Button from "../common/Button";
import Refresh from "../common/icons/Refresh";
import Export from "../common/icons/Export";
import Modal from "../common/Modal";
import { useGetPropertyByIdQuery, useGetRequestByUnitIdQuery } from "@/redux/services/api";
import Spinner from "../common/Spinner";
import FormatHelper from "@/helpers/FormatHelper";
import { useParams } from "react-router-dom";
import StringHelper from "@/helpers/StringHelper";
import { useAppSelector } from "@/redux/store";
import PropertyHelper from "@/helpers/PropertyHelper";
import PaymentDetails from "../properties/View/tabs/Units/tabs/PaymentDetails";
import Subscriber from "../properties/View/tabs/Units/tabs/Subscriber";
import ChangeUnitStatusForm from "../units/ChangeUnitStatusForm";
import ColorHelper from "@/helpers/ColorHelper";
import ChangeMortgageStatusForm from "../requests/views/Mortgage/ChangeMortgageStatusForm";
import RoleGuard from "../common/guards/RoleGuard";
import Status from "../common/Status";

type IUnits = "activities" | "payment_details" | "subscriber";

export default function UnitView() {
  const { property_id, id } = useParams();
  const { data: property, isLoading } = useGetPropertyByIdQuery(property_id ?? "");
  const unit = property ? PropertyHelper.getApartmentsFromProperty(property).find(unit => unit.id == id) : null
  const [tab, setTab] = useState<IUnits>("activities");
  const [showUnitStatusModal, setShowUnitStatusModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const { profile } = useAppSelector(state => state.auth)
  const { data: request, isLoading: isLoadingRequest } = useGetRequestByUnitIdQuery({ id: id ?? '', user_id: profile?.id ?? '' })
  const mortgage = request?.data?.mortgage
  const applicationId = mortgage?.application_id
  const userId = request?.requester_id

  const resolvedTab = useMemo(() => {
    switch (tab) {
      case "activities":
        return <Activities applicationId={applicationId ?? null} />;

      case 'payment_details':
        if (isLoadingRequest) {
          return <div className={`flex flex-1 justify-center items-center`}>
            <Spinner size='md' />
          </div>
        }

        if (!request) {
          return <div className={`flex flex-col gap-5`}>
            No Info
          </div>
        }

        return <PaymentDetails request={request} />

      case 'subscriber':
        return userId && <Subscriber userId={userId} />

      default:
        return <Activities applicationId={applicationId ?? null} />;
    }
  }, [tab, applicationId, userId, request, isLoadingRequest]);


  if (isLoading) {
    return <div className="flex flex-1 justify-center items-center">
      <Spinner size="md" />
    </div>
  }

  const status = unit ? PropertyHelper.resolveUnitStatus(unit) : null

  return (
    <div className="flex flex-col px-4 py-4 sm:py-6 sm:pr-8">
      <Modal
        className=""
        show={showUnitStatusModal}
        onCancel={() => setShowUnitStatusModal(false)}
      >
        {unit && <ChangeUnitStatusForm closeModal={() => setShowUnitStatusModal(false)} unit={unit} />}
      </Modal>
      <Modal
        className=""
        show={showStatusModal}
        onCancel={() => setShowStatusModal(false)}
      >
        {mortgage && <ChangeMortgageStatusForm closeModal={() => setShowStatusModal(false)} request={request} />}
      </Modal>
      <PageTitle className="pb-8">Properties</PageTitle>
      <Card className="">
        <div className="px-6 py-4">
          <PageBackButton text="Back" />
        </div>
        <Hr />
        <div className="flex flex-col gap-6 p-4 sm:p-6">
          <div className="flex flex-col gap-2">
            <div className="text-neutral-950 text-lg font-semibold leading-normal">
              {property?.title}
            </div>
            <div className="text-neutral-500 text-sm font-medium leading-tight">
              {unit?.bedroom_count} Beds・{unit?.bathroom_count} Baths・{StringHelper.stripUnderscores(property?.type)}
            </div>
            <div className="text-neutral-500 text-sm font-medium leading-tight">
              {property?.address}
            </div>
            <div className="flex gap-4">
              {status && <Status status={status} />}
              <div className="text-neutral-950 text-lg font-semibold leading-[27px]">
                {FormatHelper.nairaFormatter.format(unit?.price)}
              </div>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            {unit &&
              <RoleGuard allowedRoles={['sales_admin']}>
                <Button
                  testId="unit-change-status-modal-trigger"
                  onClick={() => setShowUnitStatusModal(true)}
                  variant="primary"
                  trailingIcon={<Refresh />}
                >
                  Unit Status
                </Button>
              </RoleGuard>
            }
            {!isLoadingRequest && <Spinner size="sm" />}
            {mortgage &&
              <RoleGuard allowedRoles={['mortgage_ops_admin']}>
                <Button
                  testId="mortgage-change-status-modal-trigger"
                  onClick={() => setShowStatusModal(true)}
                  variant="outline"
                  trailingIcon={<Refresh fill={ColorHelper.green300} />}
                >
                  Mortgage Status
                </Button>
              </RoleGuard>
            }
            <RoleGuard allowedRoles={['sales_admin']}>
              <Button variant="outline" trailingIcon={<Export />}>
                Export
              </Button>
            </RoleGuard>
          </div>
        </div>
        <Tab
          className="px-4 md:px-[44px]"
          currentTab={tab}
          setTab={(val: string) => setTab(val as IUnits)}
          tabs={[
            {
              label: "Activities",
              value: "activities",
            },
            {
              label: "Payment Details",
              value: "payment_details",
            },
            {
              label: "Subscriber",
              value: "subscriber",
            },
          ]}
        />
        <div className="py-5 px-6">{resolvedTab}</div>
      </Card>
    </div>
  );
}
