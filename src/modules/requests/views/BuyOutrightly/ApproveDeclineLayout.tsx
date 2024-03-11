import { HTMLAttributes, ReactElement, useState } from "react";
import Button from "@/modules/common/Button";
import Modal from "@/modules/common/Modal/Modal";
import Spinner from "@/modules/common/Spinner";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  canApprove?: boolean;
  declineForm: ReactElement;
  isApproved: boolean;
  isDeclined: boolean;
  isApproving: boolean;
  onApprove: () => void;
}

export default function ApproveDeclineLayout({
  className,
  canApprove = true,
  declineForm,
  onApprove,
  isApproving,
  isApproved,
  isDeclined,
}: IProps) {
  const handleDecline = () => setShowDeclineModal(true);

  const [showDeclineModal, setShowDeclineModal] = useState(false);

  return (
    <div
      className={`${className} flex flex-col justify-center items-stretch gap-2.5`}
    >
      <Modal
        className="w-[442px]"
        show={showDeclineModal}
        onCancel={() => setShowDeclineModal(false)}
      >
        {declineForm}
      </Modal>
      <Button
        variant="primary"
        onClick={onApprove}
        disabled={isApproving || !canApprove || isApproved}
      >
        {isApproving && <Spinner />}
        Approve
      </Button>
      <Button variant="secondary" onClick={handleDecline} disabled={isDeclined}>
        Decline
      </Button>
    </div>
  );
}
