import { DetailedHTMLProps, HTMLAttributes, useCallback, useState } from "react";
import Document from "@/modules/common/icons/Document";
import { IAPIError, IDevApiDocument, IDevApiStatus, IDevApiDocumentStatusUpdateDto } from "@/types";
import { useUpdateDevApiDocumentStatusMutation } from "@/redux/services/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ApprovalButtons from "../ApprovalButtons";
import DocumentDeclineModal from "./DocumentDeclineModal";
import DocumentHelper from "@/helpers/DocumentHelper";
import Indicator from "../Indicator";
import ColorHelper from "@/helpers/ColorHelper";
import DocumentViewControl from "../DocumentViewControl";
import RoleGuard from "../guards/RoleGuard";
import useToast from "@/hooks/useToast";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    document: IDevApiDocument;
    hideApproval?: boolean
}

const colorMap: Record<IDevApiStatus, string> = {
    PENDING: ColorHelper.systemWarning,
    APPROVED: ColorHelper.emerald500,
    DECLINED: ColorHelper.systemError,
};

export default function DevApiDocument({ document, hideApproval = false, className }: IProps) {
    const { profile } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const { pushToast } = useToast()
    const [updateDocumentStatus, { isLoading }] = useUpdateDevApiDocumentStatusMutation()
    const [targetStatus, setTargetStatus] = useState<IDevApiStatus | null>('PENDING')
    const [showDeclineModal, setShowDeclineModal] = useState(false)

    const subPath = DocumentHelper.getSubpath(document)

    const updateStatus = useCallback(async (status: IDevApiStatus) => {
        setTargetStatus(status)

        try {
            const payload: IDevApiDocumentStatusUpdateDto = {
                id: document.id,
                user_id: profile?.id ?? "",
                status,
                type: subPath
            }

            await updateDocumentStatus(payload).unwrap();

            pushToast({
                message: "Updated",
                type: "success",
            })
        } catch (error) {
            const err = error as IAPIError
            console.log(error);
            pushToast({
                message: err.data.message,
                type: "error",
            })
        } finally {
            setTargetStatus(null)
        }
    }, [dispatch, document.id, profile?.id, subPath, updateDocumentStatus])


    const handleApprove = () => {
        updateStatus('APPROVED')
    }

    const handleUndo = () => {
        updateStatus('PENDING')
    }

    const handleDecline = () => {
        setShowDeclineModal(true)
    }

    return (
        <div className={`${className} flex justify-between gap-4 flex-wrap`}>
            <DocumentDeclineModal document={document} type={subPath} show={showDeclineModal} onClose={() => setShowDeclineModal(false)} />
            <div className="flex gap-2 items-center w-fit max-w-full">
                {!hideApproval && <div className='flex gap-2 items-center'>
                    <Indicator className="opacity-55" color={colorMap[document.status]} />
                    <Document />
                </div>}
                <div className="flex flex-col gap-2 w-full">
                    <div className="text-ellipsis white-space-wrap w-fit max-w-full overflow-hidden">{document.name ?? document.url}</div>
                    {document.size && <div>{DocumentHelper.displaySize(document.size)}</div>}
                </div>
            </div>
            <RoleGuard allowedRoles={['legal_admin']}>
                <div className={`flex gap-2 items-start flex-wrap`}>
                    {document.url && <DocumentViewControl url={document.url} />}
                    {!hideApproval && <ApprovalButtons
                        isLoading={isLoading}
                        status={document.status}
                        targetStatus={targetStatus}
                        canApprove={true}
                        handleApprove={handleApprove}
                        handleDecline={handleDecline}
                        handleUndo={handleUndo} />}
                </div>
            </RoleGuard>
        </div >
    );
}
