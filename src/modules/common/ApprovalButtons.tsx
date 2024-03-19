import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IDevApiStatus, IMortgageDocumentStatus, IMortgageStatus, IPropertyStatus, IRequestStatus, IStatus } from "@/types";
import Button from "./Button";
import Spinner from "./Spinner";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    status: IDevApiStatus | IMortgageStatus | IMortgageDocumentStatus | IPropertyStatus | IRequestStatus;
    handleUndo?: () => void
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
export default function ApprovalButtons({ className, status, handleUndo, handleApprove, handleDecline, isLoading, targetStatus, canApprove, ...rest }: IProps) {
    return (
        <div {...rest}
            className={`${className} flex gap-3 flex-wrap`}>
            {(status === 'APPROVED' || status === 'DECLINED' || status === 'approved' || status === 'rejected' || status === 'cancelled' || status === 'completed' || status === 'declined') && handleUndo && < Button onClick={handleUndo} variant="outline" disabled={isLoading}>{isLoading && (targetStatus === 'PENDING' || targetStatus === 'pending') && <Spinner size="sm" />} UNDO</Button>}
            {(status === 'PENDING' || status === 'pending' || status === 'on_going') && handleApprove && < Button onClick={handleApprove} variant="outline" disabled={isLoading || !canApprove}>{isLoading && (targetStatus === 'APPROVED' || targetStatus === 'approved') && <Spinner size="sm" />} Approved</Button>}
            {(status === 'PENDING' || status === 'pending' || status === 'on_going') && handleDecline && < Button onClick={handleDecline} variant="outline" disabled={isLoading}>{isLoading && (targetStatus === 'DECLINED' || targetStatus === 'rejected') && <Spinner size="sm" />} Decline</Button>}
        </div>
    );
}
