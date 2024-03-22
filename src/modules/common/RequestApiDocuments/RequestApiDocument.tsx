import { DetailedHTMLProps, HTMLAttributes, useCallback, useState } from "react";
import { IAPIError, IMortgageDocument, IMortgageDocumentStatus, IRequestApiDocumentStatusUpdateDto } from "@/types";
import { useUpdateMortgageDocumentStatusMutation } from "@/redux/services/api";
import { useAppDispatch } from "@/redux/store";
import { setToast } from "@/redux/services/toastSlice";
import BaseDocument from "./BaseDocument";
import RequestApiDocumentDeclineModal from "./RequestApiDocumentDeclineModal";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    document: IMortgageDocument;
    hideApproval?: boolean
}

export default function RequestApiDocument({ document, hideApproval = false }: IProps) {
    const dispatch = useAppDispatch()
    const [updateDocumentStatus, { isLoading }] = useUpdateMortgageDocumentStatusMutation()
    const [targetStatus, setTargetStatus] = useState<IMortgageDocumentStatus | null>('pending')
    const [showDeclineModal, setShowDeclineModal] = useState(false)

    const updateStatus = useCallback(async (status: IMortgageDocumentStatus, comment: string | undefined = undefined) => {
        setTargetStatus(status)

        try {
            const payload: IRequestApiDocumentStatusUpdateDto = {
                id: document.id,
                status,
                comment,
            }

            await updateDocumentStatus(payload).unwrap();

            dispatch(
                setToast({
                    message: "Updated",
                    type: "success",
                })
            );
            dispatch(
                setToast({
                    message: "Updated",
                    type: "success",
                })
            );
        } catch (error) {
            const err = error as IAPIError
            dispatch(
                setToast({
                    message: err.data.message,
                    type: "error",
                })
            );
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
