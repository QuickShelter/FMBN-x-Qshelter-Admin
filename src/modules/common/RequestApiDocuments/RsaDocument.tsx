import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { IAPIError, IMortgageDocument, IMortgageDocumentStatus, IRsaDocumentApprovalDto } from "@/types";
import { useApproveRsaDocumentMutation } from "@/redux/services/api";
import BaseDocument from "./BaseDocument";
import RsaDocumentDeclineModal from "./RsaDocumentDeclineModal";
import { useToastContext } from "@/context/ToastContext_";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    document: IMortgageDocument;
    hideApproval?: boolean
}

export default function RsaDocument({ document, hideApproval = false }: IProps) {
    const { pushToast } = useToastContext()
    const [approve, { isLoading: isApproving }] = useApproveRsaDocumentMutation()
    const [targetStatus, setTargetStatus] = useState<IMortgageDocumentStatus | null>('pending')
    const [showDeclineModal, setShowDeclineModal] = useState(false)


    const handleApprove = async () => {
        setTargetStatus('approved')

        try {
            const payload: IRsaDocumentApprovalDto = {
                id: document.id
            }

            await approve(payload).unwrap();

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
    }

    const handleDecline = () => {
        setShowDeclineModal(true)
    }

    return (
        <>
            <RsaDocumentDeclineModal document={document} show={showDeclineModal} onClose={() => setShowDeclineModal(false)} />
            <BaseDocument
                hideApproval={hideApproval}
                canApprove={true}
                status={document.status}
                targetStatus={targetStatus}
                handleApprove={handleApprove}
                handleDecline={handleDecline}
                document={document}
                isLoading={isApproving}
            />
        </>
    );
}
