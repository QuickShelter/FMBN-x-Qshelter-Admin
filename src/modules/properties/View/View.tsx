import styles from "./View.module.css";
import { IAPIError, IProperty, IPropertyStatus } from "@/types";
import Card from "@/modules/common/Card/Card";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import Hr from "@/modules/common/Hr";
import InfoTag from "@/modules/common/InfoTag";
import Status from "@/modules/common/Status";
import { StatusHelper } from "@/helpers/StatusHelper";
import FormatHelper from "@/helpers/FormatHelper";
import Tab from "@/modules/common/Tab";
import { useCallback, useMemo, useState } from "react";
import PageBackButton from "@/modules/common/PageBackButton";
import UserHelper from "@/helpers/UserHelper";
import LargeImageSlider from "@/modules/common/LargeImageSlider";
import OverView from "./tabs/OverView";
import Button from "@/modules/common/Button";
import Edit from "@/modules/common/icons/Edit";
import Export from "@/modules/common/icons/Export";
import Trash from "@/modules/common/icons/Trash";
import { Link, useNavigate } from "react-router-dom";
import Dot from "@/modules/common/Dot";
import ConfirmationModal from "@/modules/common/modals/ConfirmationModal";
import LinkButton from "@/modules/common/LinkButton";
import { useApprovePropertyMutation, useDeclinePropertyMutation, useDeletePropertyMutation, useGetDeveloperByUserIdQuery, useGetUserByIdQuery } from "@/redux/services/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { usePDF } from "react-to-pdf";
import PropertyHelper from "@/helpers/PropertyHelper";
import ExportWrapper from "@/modules/common/ExportWrapper";
import PropertyTemplate from "@/modules/common/export-templates/PropertyTemplate";
import RoleGuard from "@/modules/common/guards/RoleGuard";
import { setToast } from "@/redux/services/toastSlice";
import Spinner from "@/modules/common/Spinner";
import DeclinePropertyModal from "./DeclinePropertyModal";

import Buildings from "./tabs/Units/Buildings";
import Amenities from "./tabs/Amenities";
import Documents from "./tabs/Documents";
import ApproveDeclineButtons from "../../common/ApproveDeclineButtons";

interface IProps {
  _property: IProperty;
}

type IDeveloperTabs = "overview" | "buildings" | "documents" | "amenities";

export default function View({ _property: property }: IProps) {
  const { type, status, created_at } = property;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [approve, { isLoading: isApproving }] = useApprovePropertyMutation()
  const [decline, { isLoading: isDeclining }] = useDeclinePropertyMutation()
  const { profile } = useAppSelector(state => state.auth)
  const { targetRef, toPDF } = usePDF()

  const { data: user } = useGetUserByIdQuery({
    user_id: profile?.id ?? "",
    id: property?.poster_id ?? ""
  });

  const { data: developer } = useGetDeveloperByUserIdQuery(property?.poster_id)
  const [deleteProperty, { isLoading }] = useDeletePropertyMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [targetStatus, setTargetStatus] = useState<IPropertyStatus | null>()

  const [tab, setTab] = useState<IDeveloperTabs>("overview");

  const resolvedTab = useMemo(() => {
    switch (tab) {
      case "overview":
        if (isLoading) {
          return <div className="p-6 flex flex-1 items-center justify-center">
            <Spinner size="md" />
          </div>
        }

        return <OverView _property={property} />

      case "documents":
        if (isLoading) {
          return <div className=" p-6 flex flex-1 items-center justify-center">
            <Spinner size="md" />
          </div>
        }

        return <Documents _property={property} />

      case "amenities":
        return (
          <div className="p-6">
            <Amenities _property={property} />
          </div>
        );

      case "buildings":
        return <Buildings propertyId={property.id} buildings={property.buildings} />;


      default:
        return <></>;

    }
  }, [property, tab, isLoading]);

  const [showDeclineModal, setShowDeclineModal] = useState(false)

  const updateStatus = useCallback(async (status: IPropertyStatus) => {
    try {
      setTargetStatus(status)
      const payload = {
        id: property.id,
      }

      const response = status === 'approved' ? await approve(payload).unwrap() : await decline(payload).unwrap();
      console.log(response)

      dispatch(
        setToast({
          message: "Updated",
          type: "success",
        })
      );
    } catch (error) {
      const err = error as IAPIError
      console.log(error);
      dispatch(
        setToast({
          message: err.data.message,
          type: "error",
        })
      );
    } finally {
      setTargetStatus(null)
    }
  }, [dispatch, property.id, approve, decline])

  const handleDecline = async () => {
    setShowDeclineModal(true)
  }


  const handleDelete = useCallback(async () => {
    try {
      const payload: { id: string, user_id: string } = {
        id: property.id,
        user_id: profile?.id ?? ""
      }

      await deleteProperty(payload).unwrap();

      dispatch(
        setToast({
          message: "Deleted",
          type: "success",
        })
      );
    } catch (error) {
      const err = error as IAPIError
      console.log(error);
      dispatch(
        setToast({
          message: err.data.message,
          type: "error",
        })
      );
    } finally {
      navigate('/properties')
      setShowDeleteModal(false)
    }
  }, [dispatch, navigate, deleteProperty, property.id, profile?.id])

  const handleApprove = () => {
    updateStatus('approved')
  }

  return (
    <div className={styles.container}>
      <DeclinePropertyModal _property={property} show={showDeclineModal} onClose={() => setShowDeclineModal(false)} />
      <ExportWrapper ref={targetRef}>
        {developer ? <PropertyTemplate developer={developer} _property={property} /> : <></>}
      </ExportWrapper>
      <ConfirmationModal
        show={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        secondaryButton={<Button onClick={() => setShowDeleteModal(false)} variant="secondary">Cancel</Button>}
        primaryButton={<Button onClick={handleDelete} isLoading={isLoading} variant="outline-danger">Delete</Button>}
        prompt="Are you sure you want to delete this property?"
      />
      <PageTitleAndActions>
        <PageTitle>Properties</PageTitle>
      </PageTitleAndActions>
      <Card className={styles.wrapperCard}>
        <div className="flex justify-between px-4 py-4 sm:px-8">
          <PageBackButton text="Back" className={styles.back} />
        </div>
        <Hr />
        <div className="px-4 sm:px-[3rem] py-4 sm:py-6 flex flex-col gap-4">
          <div className="flex flex-col flex-wrap sm:flex-row sm:justify-between gap-4 sm:gap-8">
            <div className="text-app-black-400 text-xl font-medium leading-relaxed">
              {property.title}
            </div>
            <RoleGuard allowedRoles={['super_admin', 'sales_admin']}>
              <div className="flex flex-no-wrap sm:flex-row gap-2 items-center">
                {property.status === 'approved' && <LinkButton
                  to={`/properties/${property.id}/edit`}
                  variant="outline"
                  trailingIcon={<Edit />}
                >
                  Edit
                </LinkButton>}
                {property.status === 'approved' && <Button onClick={() => toPDF()} variant="outline" trailingIcon={<Export />}>
                  Export
                </Button>}
                {(property.status === 'rejected' || property.status === 'pending') && <Button
                  onClick={() => setShowDeleteModal(true)}
                  variant="outline"
                  trailingIcon={<Trash />}
                >
                  Remove
                </Button>}
                <ApproveDeclineButtons status={property.status} isLoading={isApproving || isDeclining} targetStatus={targetStatus} canApprove={true} handleApprove={handleApprove} handleDecline={handleDecline} />
              </div>
            </RoleGuard>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-base font-medium text-app-green-300 leading-snug">
              <div>
                {property.city} <Dot /> {type}
              </div>
              <div>{property.address}</div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row pt-2">
              <Status
                className="text-xs font-semibold"
                status={status}
                textColor={StatusHelper.statusToTextColor[status]}
                background={StatusHelper.propertyStatusToColor[status]}
              />
              <InfoTag className="flex gap-1">
                Added by
                <Link to="" className="underline">
                  {user ? UserHelper.getFullName(user) : ""}
                </Link>
                <Dot /> {FormatHelper.dateFormatter.format(created_at)}
              </InfoTag>
            </div>
          </div>
          <div className="text-neutral-950 text-lg font-semibold leading-[27px]">
            {FormatHelper.nairaFormatter.format(property.price)}
          </div>
          <LargeImageSlider
            images={PropertyHelper.getImages(property).map((value) => ({ url: value }))}
          />
        </div>
        <Tab
          className="pl-0 pl-4 sm:pl-[44px]"
          currentTab={tab}
          setTab={(val: string) => setTab(val as IDeveloperTabs)}
          tabs={[
            {
              label: "Overview",
              value: "overview",
            },
            {
              label: "Blocks",
              value: "buildings",
            },
            {
              label: "Amenities",
              value: "amenities",
            },
            {
              label: "Documents",
              value: "documents",
            },
          ]}
        />
        <div className="">{resolvedTab}</div>
      </Card>
    </div>
  );
}