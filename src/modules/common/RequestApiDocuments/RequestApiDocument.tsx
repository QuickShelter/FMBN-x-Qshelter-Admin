import { DetailedHTMLProps, HTMLAttributes, useCallback, useState } from "react";
import { IAPIError, IMortgageDocument, IMortgageDocumentStatus, IRequestApiDocumentStatusUpdateDto } from "@/types";
import { useUpdateMortgageDocumentStatusMutation } from "@/redux/services/api";
import { useAppDispatch } from "@/redux/store";
import BaseDocument from "./BaseDocument";
import RequestApiDocumentDeclineModal from "./RequestApiDocumentDeclineModal";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import UserHelper from "@/helpers/UserHelper";
import useToast from "@/hooks/useToast";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    document: IMortgageDocument;
    hideApproval?: boolean
}

export default function RequestApiDocument({ document, hideApproval = false }: IProps) {
    const dispatch = useAppDispatch()
    const { pushToast } = useToast()
    const [updateDocumentStatus, { isLoading }] = useUpdateMortgageDocumentStatusMutation()
    const [targetStatus, setTargetStatus] = useState<IMortgageDocumentStatus | null>('pending')
    const [showDeclineModal, setShowDeclineModal] = useState(false)
    const profile = useGetCurrentUser()

    const updateStatus = useCallback(async (status: IMortgageDocumentStatus, comment: string | undefined = undefined) => {
        setTargetStatus(status)

        try {
            const payload: IRequestApiDocumentStatusUpdateDto | IMortgageDocumentStatus = {
                id: document.id,
                status,
                comment,
                comment_by: profile?.id ? UserHelper.getFullName(profile) : ''
            }


            await updateDocumentStatus(payload).unwrap();
            pushToast({
                message: "Updated smth",
                type: "success",
            })


            pushToast({
                message: "Updated",
                type: "success",
            })

            pushToast({
                message: "Updated",
                type: "success",
            })
        } catch (error) {
            const err = error as IAPIError
            pushToast({
                message: err.data.message,
                type: "error",
            })
        } finally {
            setTargetStatus(null)
        }
    }, [dispatch, updateDocumentStatus, document.id])


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
        <>
            <RequestApiDocumentDeclineModal document={document} show={showDeclineModal} onClose={() => setShowDeclineModal(false)} />
            <BaseDocument
                hideApproval={hideApproval}
                canApprove={true}
                status={document.status}
                targetStatus={targetStatus}
                handleApprove={handleApprove}
                handleDecline={handleDecline}
                handleUndo={handleUndo}
                document={document}
                isLoading={isLoading} />
        </>
    );
}
