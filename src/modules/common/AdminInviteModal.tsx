
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IUser } from "@/types";
import Modal from "./Modal";
import InviteAdminForm from "../users/View/InviteAdminForm";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  onCancel: () => void;
  user: IUser;
  show: boolean;
}

export default function AdminInviteModal({
  className,
  onCancel,
  user,
  show,
  ...rest
}: IProps) {


  return (
    <Modal
      {...rest}
      className={`${className}`}
      closeFormClassName=""
      show={show}
      onCancel={onCancel}
    >
      <InviteAdminForm closeModal={onCancel} user={user} />
    </Modal>
  );
}
