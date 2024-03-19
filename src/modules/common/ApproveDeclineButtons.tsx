import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IPropertyStatus, IRequestStatus, IStatus } from "@/types";
import Button from "@/modules/common/Button";
import Spinner from "@/modules/common/Spinner";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    status: IPropertyStatus | IRequestStatus;
    handleApprove?: () => void
    handleDecline?: () => void
    isLoading: boolean
    targetStatus: IStatus | null | undefined
    canApprove: boolean
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function ApproveDeclineButtons({ className, status, handleApprove, handleDecline, isLoading, targetStatus, canApprove, ...rest }: IProps) {
    return (
        <div {...rest}
            className={`${className} flex gap-3 flex-wrap`}>
            {(status === 'pending' || status === 'on_going' || status === 'rejected' || status === 'cancelled' || status === 'declined') && handleApprove && < Button onClick={handleApprove} variant="outline" disabled={isLoading || !canApprove}>{isLoading && (targetStatus === 'approved') && <Spinner size="sm" />} Approve</Button>}
            {(status === 'pending' || status === 'on_going' || status === 'completed' || status === 'approved' || status === 'applied') && handleDecline && < Button onClick={handleDecline} variant="outline" disabled={isLoading}>{isLoading && (targetStatus === 'rejected') && <Spinner size="sm" />} Decline</Button>}
        </div>
    );
}
