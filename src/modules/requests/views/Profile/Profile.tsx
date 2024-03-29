import { DetailedHTMLProps, HTMLAttributes, ReactElement, useCallback, useState } from "react";
import styles from "./Profile.module.css";
import Avatar from "@/modules/common/Avatar";
import { IAPIError, IRequest, IResponse, IStatus, IUser } from "@/types";
import UserHelper from "@/helpers/UserHelper";
import FormatHelper from "@/helpers/FormatHelper";
import Button from "@/modules/common/Button";
import FormError from "@/modules/common/form/FormError";
import RoleTag from "@/modules/common/RoleTag";
import Export from "@/modules/common/icons/Export";
import ConfirmationModal from "@/modules/common/modals/ConfirmationModal";
import Spinner from "@/modules/common/Spinner";
import Status from "@/modules/common/Status";
import { Link } from "react-router-dom";
import Desktop from "@/modules/common/Desktop";
import Mobile from "@/modules/common/Mobile";
import { usePDF } from "react-to-pdf";
import ExportWrapper from "@/modules/common/ExportWrapper";
import ApproveDeclineButtons from "@/modules/common/ApproveDeclineButtons";
import useToast from "@/hooks/useToast";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
  request: IRequest
  isLoading: boolean
  handleApprove?: () => Promise<IResponse<IRequest>>,
  handleDecline?: () => Promise<IResponse<IRequest>>,
  exportTemplate: ReactElement,
  canApprove?: boolean
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function Profile({ canApprove = true, className, exportTemplate, user, request, isLoading, handleApprove: approve, handleDecline: decline, ...rest }: IProps) {
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showApprovalModal, setShowApproveModal] = useState(false);
  const avatarComponent = <Avatar className="w-[4rem] h-[4rem] rounded-full" user={user} />
  const { pushToast } = useToast()
  const { targetRef, toPDF } = usePDF()
  const [targetStatus, setTargetStatus] = useState<IStatus | null>()

  const handleApprove = useCallback(async () => {
    if (!approve) {
      return
    }

    setTargetStatus('approved')

    try {
      const response = await approve();

      if (response.ok || response.success) {
        pushToast({
          message: "Updated",
          type: "success",
        })
      }
    } catch (error) {
      const err = error as IAPIError
      pushToast({
        message: err.data.message,
        type: "error",
      })
    } finally {
      setShowApproveModal(false)
      setTargetStatus(null)
    }
  }, [approve])

  const handleDecline = useCallback(async () => {
    if (!decline) {
      return
    }

    setTargetStatus('declined')

    try {

      const response = await decline();

      if (response.ok) {
        pushToast({
          message: "Updated",
          type: "success",
        })
      }
    } catch (error) {
      console.log(error)
      const err = error as IAPIError
      pushToast({
        message: err.data.message,
        type: "error",
      })
      setShowDeclineModal(false)
    } finally {
      setShowDeclineModal(false)
      setTargetStatus(null)
    }
  }, [decline])

  return (
    <div {...rest} className={`${className} ${styles.container}`}>
      <ConfirmationModal
        show={showApprovalModal}
        prompt="Are you sure you want to approve this request?"
        secondaryButton={<Button variant="clear" onClick={() => setShowApproveModal(false)}>Cancel</Button>}
        primaryButton={<Button disabled={isLoading} onClick={handleApprove}>{isLoading ? <Spinner size="sm" /> : null} Approve</Button>}
        onCancel={() => setShowApproveModal(false)}
      />
      <ConfirmationModal
        show={showDeclineModal}
        prompt="Are you sure you want to decline this request?"
        secondaryButton={<Button variant="clear" onClick={() => setShowDeclineModal(false)}>Cancel</Button>}
        primaryButton={<Button disabled={isLoading} onClick={handleDecline}>{isLoading ? <Spinner size="sm" /> : null} Decline</Button>}
        onCancel={() => setShowDeclineModal(false)}
      />
      <ExportWrapper ref={targetRef}>
        {exportTemplate ? exportTemplate : <></>}
      </ExportWrapper>
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
                <div className="text-app-green-300 text-sm">
                  Created On{" "}
                  {request.created_at ? FormatHelper.dateTimeFormatter.format(new Date(request?.created_at)) : "N/A"}{" "}
                  {/* <span className="relative bottom-1 font-bold px-2">.</span>
                  Last Login{" "}
                  {FormatHelper.dateFormatter.format(user.last_login_at)} */}
                </div>
              </div>
              <div className="gap-2 flex flex-wrap sm:flex items-center">
                <ApproveDeclineButtons
                  canApprove={canApprove}
                  handleApprove={approve ? () => setShowApproveModal(true) : undefined}
                  handleDecline={decline ? () => setShowDeclineModal(true) : undefined}
                  isLoading={isLoading}
                  status={request?.status}
                  targetStatus={targetStatus}
                />
                <Button onClick={() => toPDF()} variant="outline" leadingIcon={<Export />}>
                  Export
                </Button>
                <Status status={request.status} />
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
