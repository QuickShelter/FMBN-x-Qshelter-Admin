import { DetailedHTMLProps, HTMLAttributes, useCallback, useState } from "react";
import styles from "./Profile.module.css";
import Avatar from "@/modules/common/Avatar";
import { IAPIError, IMortgageRequest, IMortgageStatus, IMortgageStatusChangeDto, IUser } from "@/types";
import UserHelper from "@/helpers/UserHelper";
import FormatHelper from "@/helpers/FormatHelper";
import Button from "@/modules/common/Button";
import FormError from "@/modules/common/form/FormError";
import RoleTag from "@/modules/common/RoleTag";
import ConfirmationModal from "@/modules/common/modals/ConfirmationModal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useUpdateMortgageApplicationStatusMutation } from "@/redux/services/api";
import { setToast } from "@/redux/services/toastSlice";
import MortgageDeclineModal from "../MortgageDeclineModal";
import Spinner from "@/modules/common/Spinner";
import RoleGuard from "@/modules/common/guards/RoleGuard";
import Status from "@/modules/common/Status";
import { Link } from "react-router-dom";
import ApprovalButtons from "@/modules/common/ApprovalButtons";
import Desktop from "@/modules/common/Desktop";
import Mobile from "@/modules/common/Mobile";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
  request: IMortgageRequest
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function Profile({ className, user, request, ...rest }: IProps) {
  const { profile } = useAppSelector(state => state.auth)
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showApprovalModal, setShowApproveModal] = useState(false);

  const dispatch = useAppDispatch()
  const mortgage = request?.data?.mortgage
  const [targetStatus, setTargetStatus] = useState<IMortgageStatus | null>(mortgage?.status ?? 'pending')
  const [updateMortgageStatus, { isLoading }] = useUpdateMortgageApplicationStatusMutation()
  const mortgageId = mortgage?.id ?? ''
  const avatarComponent = <Avatar className="w-[4rem] h-[4rem] rounded-full" user={user} />

  const updateStatus = useCallback(async (status: IMortgageStatus) => {
    setTargetStatus(status)

    try {
      const payload: IMortgageStatusChangeDto = {
        id: mortgageId ?? '',
        comment: '',
        admin_id: profile?.id ?? "",
        status,
        affectedDocuments: []
      }

      await updateMortgageStatus(payload).unwrap();

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
  }, [dispatch, profile?.id, updateMortgageStatus, mortgageId])


  const handleApprove = () => {
    updateStatus('approved')
  }

  const handleUndo = () => {
    updateStatus('pending')
  }

  const handleDecline = () => {
    setShowDeclineModal(true)
  }

  return (
    <div {...rest} className={`${className} ${styles.container}`}>
      <ConfirmationModal
        show={showApprovalModal}
        prompt="Are you sure you want to approve this mortgage?"
        secondaryButton={<Button variant="clear" onClick={() => setShowApproveModal(false)}>Cancel</Button>}
        primaryButton={<Button testId="mortgage-approval-button" disabled={isLoading} onClick={handleApprove}>{isLoading ? <Spinner size="sm" /> : null} Approve</Button>}
        onCancel={() => setShowApproveModal(false)}
      />
      <MortgageDeclineModal
        show={showDeclineModal}
        onCancel={() => setShowDeclineModal(false)}
        request={request} />
      <div className="flex flex-col gap-6 w-full">
        {user.suspended && (
          <FormError>This user is currently suspended</FormError>
        )}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex justify-between">
              {user?.avatar ? <Link target="_blank" to={user.avatar}>
                {avatarComponent}
              </Link> : avatarComponent}
              <Mobile>
                <RoleTag user={user} />
              </Mobile>
            </div>
            <div className="flex flex-col gap-4">
              <div className="">
                <Link to={`/users/${user?.id}`} className="font-semibold leading-[21px] text-[15px] text-app-black-400">
                  {UserHelper.getFullName(user)}
                </Link>
                <div className="text-app-green-300">
                  Created On{" "}
                  {FormatHelper.dateTimeFormatter.format(new Date(request.created_at))}{" "}
                  {/* <span className="relative bottom-1 font-bold px-2">.</span>
                  Last Login{" "}
                  {FormatHelper.dateFormatter.format(user.last_login_at)} */}
                </div>
              </div>
              <div className="flex gap-4 items-center flex-wrap">
                <RoleGuard allowedRoles={['mortgage_ops_admin']}>
                  <ApprovalButtons
                    isLoading={isLoading}
                    status={request?.data?.mortgage?.status}
                    targetStatus={targetStatus}
                    canApprove={true}
                    handleApprove={handleApprove}
                    handleDecline={handleDecline}
                    handleUndo={handleUndo} />
                </RoleGuard>
                {/* <Button className="w-fit" variant="outline" leadingIcon={<Export />}>
                  Export
                </Button> */}
                {mortgage?.status && <Status status={mortgage?.status} />}
              </div>
            </div>
          </div>
          <Desktop>
            <RoleTag user={user} />
          </Desktop>
        </div>
      </div>
    </div>
  );
}
