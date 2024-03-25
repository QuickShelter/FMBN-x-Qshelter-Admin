import { DetailedHTMLProps, HTMLAttributes, useMemo, useState } from "react";
import Document from "@/modules/common/icons/Document";
import { IMortgageDocument, IMortgageDocumentStatus, IStatus } from "@/types";
import Indicator from "../Indicator";
import ColorHelper from "@/helpers/ColorHelper";
import DocumentViewControl from "../DocumentViewControl";
import RequestApiDocumentDeclineModal from "./RequestApiDocumentDeclineModal";
import StringHelper from "@/helpers/StringHelper";
import RoleGuard from "../guards/RoleGuard";
import ApprovalButtons from "../ApprovalButtons";
import DocumentHelper from "@/helpers/DocumentHelper";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    document: IMortgageDocument;
    hideApproval?: boolean
    handleUndo?: () => void
    handleApprove?: () => void
    handleDecline?: () => void
    isLoading: boolean
    status: IStatus | null | undefined
    targetStatus: IStatus | null | undefined
    canApprove: boolean
}

const colorMap: Record<IMortgageDocumentStatus, string> = {
    pending: ColorHelper.systemWarning,
    approved: ColorHelper.emerald500,
    declined: ColorHelper.systemError,
};

export default function BaseDocument({ document, canApprove, isLoading, handleApprove, handleDecline, handleUndo, targetStatus, hideApproval = false, className }: IProps) {

    const [showDeclineModal, setShowDeclineModal] = useState(false)
    const resolvedName = useMemo(() => {
        if (document?.name && DocumentHelper.documentNameMap[document.name]) {
            return DocumentHelper.documentNameMap[document.name]
        }

        return StringHelper.camelCaseToTitleCase(document?.name)
    }, [document?.name])

    return (
        <div className={`${className} flex justify-between gap-4 flex-wrap`}>
            <RequestApiDocumentDeclineModal document={document} show={showDeclineModal} onClose={() => setShowDeclineModal(false)} />
            <div className="flex gap-2 items-center w-fit max-w-full">
                {!hideApproval && <div className='flex gap-2 items-center'>
                    <Indicator className="opacity-55" color={colorMap[document.status]} />
                    <Document />
                </div>}
                <div className="flex flex-col gap-2 w-full">
                    <div className="text-ellipsis white-space-wrap w-fit max-w-full overflow-hidden">{resolvedName ?? document.url}</div>
                </div>
            </div>
            <div className={`flex gap-2 items-start flex-wrap`}>
                {document.url && <RoleGuard allowedRoles={['mortgage_ops_admin']}>
                    <DocumentViewControl url={document.url} />
                </RoleGuard>}
                {!hideApproval && <RoleGuard allowedRoles={['mortgage_ops_admin']}>
                    <ApprovalButtons
                        isLoading={isLoading}
                        status={document.status}
                        targetStatus={targetStatus}
                        canApprove={canApprove}
                        handleApprove={handleApprove}
                        handleDecline={handleDecline}
                        handleUndo={handleUndo} />
                </RoleGuard>}
            </div>
        </div >
    );
}
